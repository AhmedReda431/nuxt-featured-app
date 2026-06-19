<template>
  <div class="auth-layout">
    <NuxtLink to="/" class="auth-layout__logo" aria-label="Home">
      Universal Starter
    </NuxtLink>
    <main class="auth-layout__main">
      <slot />
    </main>
  </div>
</template>

<style scoped lang="scss">
.auth-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  background: linear-gradient(135deg, var(--color-bg-alt) 0%, #e0e7ff 100%);
}

.auth-layout__logo {
  position: absolute;
  top: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-secondary);
  text-decoration: none;
}

.auth-layout__main {
  width: min(100%, 420px);
}
</style>
