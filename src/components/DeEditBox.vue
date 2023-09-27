<template>
  <div class="de-edit-text" relative >
    <input
      :class="['de-edit-text__input', `${borderColor}`]"
      :id="name"
      type="text"
      placeholder=" "
      autocomplete="off"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <label class="de-edit-text__label" :for="name">{{ placeHolder }}</label>
  </div>
</template>

<script setup>
const props = defineProps({
  name: String,
  placeHolder: String,
  modelValue: String,
  borderColor:{
    type: String,
    default: 'border-gray-3',
  }
});

const emit = defineEmits(["update:modelValue"]);
</script>

<style>
.de-edit-text__input {
  @apply block px-3 pb-3 pt-4 w-full text-sm text-gray-9  rounded-lg border-2 duration-300;
}

.de-edit-text__label {
  @apply absolute top-4 left-1 px-2 bg-white  text-sm text-gray-5 duration-300;
}

.de-edit-text__input:focus {
  @apply outline-none ring-0 border-blue-6;
}

.de-edit-text__input:not(:placeholder-shown) ~ .de-edit-text__label,
.de-edit-text__input:focus ~ .de-edit-text__label {
  @apply -translate-y-6 scale-75;
}

.de-edit-text__input:focus ~ .de-edit-text__label {
  @apply text-blue-6;
}
</style>
