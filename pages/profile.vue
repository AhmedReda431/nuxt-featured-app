<script setup>
definePageMeta({ middleware: 'auth' })

const { t } = useI18n()
const authStore = useAuthStore()
const themeStore = useThemeStore()
const toastStore = useToastStore()

useAppSeo({ title: t('profile.title'), description: t('profile.subtitle') })

const isEditing = ref(false)
const isSaving = ref(false)
const errors = reactive({})

const form = reactive({
  firstName: authStore.user?.firstName || '',
  lastName: authStore.user?.lastName || '',
  email: authStore.user?.email || '',
  phone: authStore.user?.phone || '',
  address: authStore.user?.address || '',
  gender: authStore.user?.gender || '',
})

function resetForm() {
  form.firstName = authStore.user?.firstName || ''
  form.lastName = authStore.user?.lastName || ''
  form.email = authStore.user?.email || ''
  form.phone = authStore.user?.phone || ''
  form.address = authStore.user?.address || ''
  form.gender = authStore.user?.gender || ''
  Object.keys(errors).forEach(key => delete errors[key])
}

function startEditing() {
  resetForm()
  isEditing.value = true
}

function cancelEditing() {
  resetForm()
  isEditing.value = false
}

function validate() {
  Object.keys(errors).forEach(key => delete errors[key])

  if (!form.firstName.trim()) errors.firstName = t('auth.fieldRequired')
  if (!form.email.trim()) errors.email = t('auth.fieldRequired')
  else if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = t('auth.invalidEmail')

  return Object.keys(errors).length === 0
}

async function saveProfile() {
  if (!validate()) return

  isSaving.value = true
  try {
    await authStore.updateProfile({ ...form })
    toastStore.show(t('profile.saveSuccess'))
    isEditing.value = false
  }
  catch {
    toastStore.show(t('profile.saveError'), 'error')
  }
  finally {
    isSaving.value = false
  }
}

const themeOptions = computed(() => [
  { value: 'light', label: t('profile.themeLight') },
  { value: 'dark', label: t('profile.themeDark') },
  { value: 'system', label: t('profile.themeSystem') },
])
</script>

<template>
  <section class="section profile-page">
    <div class="container container--narrow">
      <UiSectionTitle :title="t('profile.title')" :subtitle="t('profile.subtitle')" />

      <div class="profile-card card">
        <div class="profile-card__header">
          <NuxtImg
            v-if="authStore.user?.image"
            :src="authStore.user.image"
            :alt="authStore.fullName"
            :width="72"
            :height="72"
            class="profile-card__avatar"
          />
          <div>
            <h2 class="profile-card__name">{{ authStore.fullName }}</h2>
            <p class="profile-card__username">@{{ authStore.user?.username }}</p>
          </div>
        </div>

        <form @submit.prevent="saveProfile">
          <fieldset class="profile-section">
            <legend>
              {{ t('profile.personalInfo') }}
              <button
                v-if="!isEditing"
                type="button"
                class="btn btn--outline btn--sm profile-section__edit-btn"
                @click="startEditing"
              >
                {{ t('profile.editButton') }}
              </button>
            </legend>

            <div class="profile-section__row">
              <div class="form-group">
                <label class="form-label" for="firstName">{{ t('profile.firstName') }}</label>
                <input
                  id="firstName"
                  v-model="form.firstName"
                  type="text"
                  class="form-input"
                  :disabled="!isEditing"
                  :aria-invalid="!!errors.firstName"
                >
                <p v-if="errors.firstName" class="form-error">{{ errors.firstName }}</p>
              </div>
              <div class="form-group">
                <label class="form-label" for="lastName">{{ t('profile.lastName') }}</label>
                <input id="lastName" v-model="form.lastName" type="text" class="form-input" :disabled="!isEditing">
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="email">{{ t('profile.email') }}</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                class="form-input"
                :disabled="!isEditing"
                :aria-invalid="!!errors.email"
              >
              <p v-if="errors.email" class="form-error">{{ errors.email }}</p>
            </div>

            <div class="profile-section__row">
              <div class="form-group">
                <label class="form-label" for="phone">{{ t('profile.phone') }}</label>
                <input id="phone" v-model="form.phone" type="tel" class="form-input" :disabled="!isEditing">
              </div>
              <div class="form-group">
                <label class="form-label" for="gender">{{ t('profile.gender') }}</label>
                <select id="gender" v-model="form.gender" class="form-select" :disabled="!isEditing">
                  <option value="">—</option>
                  <option value="male">{{ t('profile.genderMale') }}</option>
                  <option value="female">{{ t('profile.genderFemale') }}</option>
                  <option value="other">{{ t('profile.genderPreferNot') }}</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="address">{{ t('profile.address') }}</label>
              <input id="address" v-model="form.address" type="text" class="form-input" :disabled="!isEditing">
            </div>

            <div class="form-group">
              <label class="form-label">{{ t('profile.username') }}</label>
              <input type="text" class="form-input" :value="authStore.user?.username" disabled>
              <p class="form-hint">{{ t('profile.usernameNote') }}</p>
            </div>

            <div v-if="isEditing" class="profile-section__actions">
              <button type="button" class="btn btn--ghost" :disabled="isSaving" @click="cancelEditing">
                {{ t('profile.cancelEdit') }}
              </button>
              <button type="submit" class="btn btn--primary" :disabled="isSaving">
                <span v-if="isSaving" class="spinner" aria-hidden="true" />
                {{ isSaving ? t('profile.saving') : t('profile.saveChanges') }}
              </button>
            </div>
          </fieldset>
        </form>

        <div class="profile-section">
          <h3 class="profile-section__title">{{ t('profile.appearance') }}</h3>
          <div class="form-group">
            <label class="form-label" for="theme-select">{{ t('profile.theme') }}</label>
            <ClientOnly>
              <select
                id="theme-select"
                :value="themeStore.preference"
                class="form-select"
                @change="themeStore.setPreference($event.target.value)"
              >
                <option v-for="opt in themeOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
              </select>
            </ClientOnly>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.profile-card {
  padding: 1.75rem;
}

.profile-card__header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.profile-card__avatar {
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;
  object-fit: cover;
}

.profile-card__name {
  margin: 0 0 0.125rem;
  font-size: 1.25rem;
}

.profile-card__username {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.9375rem;
}

.profile-section {
  border: none;
  padding: 0;
  margin: 0 0 2rem;

  &:last-child {
    margin-bottom: 0;
  }

  legend,
  &__title {
    font-weight: 700;
    font-size: 1.0625rem;
    margin-bottom: 1.25rem;
    padding: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  &__actions {
    display: flex;
    gap: 0.75rem;
    margin-top: 0.5rem;
  }
}

.form-input:disabled,
.form-select:disabled {
  background: var(--color-bg-alt);
  color: var(--color-text-muted);
  cursor: not-allowed;
}

@media (max-width: 600px) {
  .profile-section__row {
    grid-template-columns: 1fr;
  }
}
</style>
