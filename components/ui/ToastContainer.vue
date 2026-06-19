<script setup>
const toastStore = useToastStore()
</script>

<template>
  <Teleport to="body">
    <div class="toast-container" role="region" aria-label="Notifications" aria-live="polite">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toastStore.toasts"
          :key="toast.id"
          class="toast"
          :class="`toast--${toast.type}`"
          role="status"
        >
          {{ toast.message }}
          <button type="button" class="toast__close" aria-label="Dismiss notification" @click="toastStore.dismiss(toast.id)">
            &times;
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.toast-container {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 3000;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  max-width: calc(100vw - 2rem);
}

[dir="rtl"] .toast-container {
  right: auto;
  left: 1.5rem;
}

.toast {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  border-radius: var(--radius-md);
  background: var(--color-secondary);
  color: #fff;
  box-shadow: var(--shadow-lg);
  font-size: 0.9375rem;
  min-width: 240px;
}

.toast--success {
  background: var(--color-success);
}

.toast--error {
  background: var(--color-danger);
}

.toast__close {
  margin-left: auto;
  background: none;
  border: none;
  color: inherit;
  font-size: 1.125rem;
  cursor: pointer;
  opacity: 0.8;
}

.toast__close:hover {
  opacity: 1;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(40px);
}
</style>
