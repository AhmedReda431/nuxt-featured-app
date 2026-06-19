<script setup>
const { t } = useI18n()
const { showIdleDialog, dialogSecondsLeft, confirmStillHere, forceLogout } = useIdleSession()
</script>

<template>
  <UiModal
    :open="showIdleDialog"
    :title="t('session.idleTitle')"
    :dismissible="false"
  >
    <p>{{ t('session.idleMessage') }}</p>
    <p class="idle-dialog__countdown" aria-live="assertive">
      {{ t('session.idleCountdown', { seconds: dialogSecondsLeft }) }}
    </p>

    <template #footer>
      <button type="button" class="btn btn--ghost btn--block" @click="forceLogout">
        {{ t('session.logoutNow') }}
      </button>
      <button type="button" class="btn btn--primary btn--block" @click="confirmStillHere">
        {{ t('session.stillHere') }}
      </button>
    </template>
  </UiModal>
</template>

<style scoped lang="scss">
.idle-dialog__countdown {
  font-weight: 700;
  color: var(--color-danger);
  font-size: 1.125rem;
}
</style>
