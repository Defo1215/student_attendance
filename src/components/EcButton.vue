<template>
  <button class="ec-button">
    <slot></slot>
  </button>
</template>


<style scoped>
.ec-button {
  @apply relative inline-block  rounded-3 text-gray-7 border  border-gray-3 border-2 outline outline-transparent outline-5;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  transition: all 0.3s ease-out;
}

.ec-button:hover {
  @apply text-emerald-5 border-emerald-3;
}

.ec-button:active {
  @apply border-emerald-5 outline-emerald-3 outline-0;
  transform: scale(0.98);
  transition: transform 0.1s, outline 0s;
}
</style>
