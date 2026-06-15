<template>
  <div class="space-y-2">
    <label v-if="label" class="text-sm font-medium text-slate-700">{{ label }}</label>
    <div class="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2">
      <Icon v-if="icon" :name="icon" class="w-5 h-5 text-slate-400" />
      <input
        v-bind="fieldProps"
        v-model="model"
        class="flex-1 bg-transparent outline-none"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: [String, Number], default: "" },
  label: { type: String, default: "" },
  type: { type: String, default: "text" },
  icon: { type: String, default: "" },
  required: { type: Boolean, default: false },
  maxlength: { type: Number }
})
const emit = defineEmits(["update:modelValue"])

const model = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
})

const fieldProps = computed(() => ({
  type: props.type,
  required: props.required,
  maxlength: props.maxlength,
}))
</script>
