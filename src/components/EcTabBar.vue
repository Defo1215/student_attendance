<template>
  <ul class="tab-bar">
    <div
      class="tab-bar-border"
      :style="{
        transform: `translateX(${position.startX}px)`,
        width: `${position.width}px`,
      }"
    ></div>
    <li
      v-for="(tab, index) in tabs"
      :key="index"
      :class="[
        'tab-bar-item',
        selected === index ? 'tab-bar-item--active' : '',
      ]"
      @click="(e) => {
        selected == index ? tab.selectedFunc && tab.selectedFunc(e.currentTarget) : selectTab(index)
      }"
    >
      <div :class="['tab-bar-item__icon', selected == index ? tab.selectedIcon || tab.icon : tab.icon]" />
      <div class="tab-bar-item__text">{{ selected == index ? tab.selectedText || tab.text : tab.text }}</div>
    </li>
  </ul>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import gsap from "gsap";


const props = defineProps({
  tabs: Array,
  curIndex: {
    type: Number,
    default: 0
  }
});


const emit = defineEmits(["onChange"]);

const selected = ref(props.curIndex);
const position = reactive({ startX: 0, width: 0 });

function selectTab(index) {
  selected.value = index;
  // 通知
  emit("onChange", index);
  // 移动背景边框
  const tab = document.querySelectorAll(".tab-bar-item")[index];
  const rect = tab.getBoundingClientRect();
  gsap.to(position, {
    startX: rect.left,
    width: rect.width,
    duration: 0.3,
    // ease: "elastic.out(1, 0.3)",
  });
}

onMounted(() => selectTab(props.curIndex));
</script>

<style>
.tab-bar {
  box-shadow: rgba(29, 78, 216, 0.2) 0px 8px 24px;
  @apply w-full py-3 list-none text-white
          flex justify-around items-center overflow-hidden;
  /*  bg-emerald-5 */
  background-color: #A5B4FC;
}

.tab-bar-border {
  @apply absolute left-0 h-11 rounded-xl;
  /* bg-emerald-7 */
  background-color: #6366F1;
}

.tab-bar-item {
  @apply flex items-center gap-2 px-3 py-1;
}

.tab-bar-item__icon {
  @apply text-3xl;
  transform: translateX(70%);
  transition: all 0.3s ease;
}

.tab-bar-item__text {
  @apply text-sm font-bold;
  opacity: 0;
  transform: translateX(-50%);
  transition: all 0.3s ease;
}

.tab-bar-item--active .tab-bar-item__icon {
  transform: translateX(0);
}

.tab-bar-item--active .tab-bar-item__text {
  opacity: 1;
  transform: translateX(0);
}
</style>
