<script setup>
const props = defineProps({
  open: { type: Boolean, required: true },
  title: { type: String, required: true },
  dismissible: { type: Boolean, default: true },
})

const emit = defineEmits(['close'])
const dialogRef = ref(null)

function handleKeydown(event) {
  if (event.key === 'Escape' && props.dismissible) {
    emit('close')
  }
}

watch(() => props.open, (isOpen) => {
  if (isOpen && import.meta.client) {
    document.body.style.overflow = 'hidden'
    nextTick(() => dialogRef.value?.focus())
  }
  else if (import.meta.client) {
    document.body.style.overflow = ''
  }
})

onUnmounted(() => {
  if (import.meta.client) document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="modal" @keydown="handleKeydown">
      <div class="modal__overlay" @click="dismissible && emit('close')" />
      <div
        ref="dialogRef"
        class="modal__panel"
        role="dialog"
        aria-modal="true"
        :aria-label="title"
        tabindex="-1"
      >
        <div class="modal__header">
          <h2 class="modal__title">{{ title }}</h2>
          <button
            v-if="dismissible"
            type="button"
            class="modal__close"
            aria-label="Close dialog"
            @click="emit('close')"
          >
            &times;
          </button>
        </div>
        <div class="modal__body">
          <slot />
        </div>
        <div v-if="$slots.footer" class="modal__footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.modal {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.modal__overlay {
  position: absolute;
  inset: 0;
  background: rgb(15 23 42 / 0.55);
  backdrop-filter: blur(2px);
}

.modal__panel {
  position: relative;
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  max-width: 420px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.modal__title {
  margin: 0;
  font-size: 1.125rem;
}

.modal__close {
  width: 2rem;
  height: 2rem;
  border: none;
  background: var(--color-bg-alt);
  border-radius: var(--radius-full);
  font-size: 1.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal__body {
  padding: 1.5rem;
}

.modal__footer {
  display: flex;
  gap: 0.75rem;
  padding: 1.25rem 1.5rem;
  border-top: 1px solid var(--color-border);
}
</style>
