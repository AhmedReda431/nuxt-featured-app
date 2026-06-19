/**
 * useIdleSession
 *
 * Watches real mouse/keyboard activity. If the user is idle for
 * `idleTimeoutMs` (default 5 minutes), we show an "are you still there?"
 * dialog. If they don't respond within `idleDialogTimeoutMs` (default
 * 10 seconds), we log them out and send them home. Answering the dialog
 * resets the idle timer and refreshes the session's 2-hour expiry.
 *
 * Only runs when the person is actually logged in - no point watching
 * activity for guests.
 */
export function useIdleSession() {
  const authStore = useAuthStore()
  const config = useRuntimeConfig()
  const router = useRouter()
  const localePath = useLocalePath()

  const showIdleDialog = ref(false)
  const dialogSecondsLeft = ref(10)

  let idleTimer = null
  let dialogTimer = null
  let dialogCountdownInterval = null

  function clearAllTimers() {
    if (idleTimer) clearTimeout(idleTimer)
    if (dialogTimer) clearTimeout(dialogTimer)
    if (dialogCountdownInterval) clearInterval(dialogCountdownInterval)
  }

  function startIdleTimer() {
    clearAllTimers()
    if (!authStore.isAuthenticated) return

    idleTimer = setTimeout(() => {
      openIdleDialog()
    }, config.public.idleTimeoutMs)
  }

  function openIdleDialog() {
    showIdleDialog.value = true
    dialogSecondsLeft.value = Math.floor(config.public.idleDialogTimeoutMs / 1000)

    dialogCountdownInterval = setInterval(() => {
      dialogSecondsLeft.value = Math.max(0, dialogSecondsLeft.value - 1)
    }, 1000)

    dialogTimer = setTimeout(async () => {
      await forceLogout()
    }, config.public.idleDialogTimeoutMs)
  }

  function confirmStillHere() {
    showIdleDialog.value = false
    clearAllTimers()
    authStore.refreshSession()
    startIdleTimer()
  }

  async function forceLogout() {
    showIdleDialog.value = false
    clearAllTimers()
    await authStore.logout()
    router.push(localePath('/'))
  }

  function resetOnActivity() {
    if (showIdleDialog.value) return // don't silently dismiss the dialog on background activity
    startIdleTimer()
  }

  function handleStart() {
    if (!authStore.isAuthenticated) return
    window.addEventListener('mousemove', resetOnActivity)
    window.addEventListener('mousedown', resetOnActivity)
    window.addEventListener('keydown', resetOnActivity)
    startIdleTimer()
  }

  function handleStop() {
    window.removeEventListener('mousemove', resetOnActivity)
    window.removeEventListener('mousedown', resetOnActivity)
    window.removeEventListener('keydown', resetOnActivity)
    clearAllTimers()
  }

  onMounted(() => {
    handleStart()
  })

  onUnmounted(() => {
    handleStop()
  })

  // If the user logs in/out while this component is alive, start/stop watching.
  watch(() => authStore.isAuthenticated, (isAuthenticated) => {
    if (isAuthenticated) handleStart()
    else handleStop()
  })

  return {
    showIdleDialog,
    dialogSecondsLeft,
    confirmStillHere,
    forceLogout,
  }
}
