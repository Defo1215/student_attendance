<template>
  <div @scroll="handleContainerScroll" h-full overflow-auto>
    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <Component :is="Component" />
      </Transition>
    </RouterView>
  </div>
  <div
    z-10
    v-show="tabbarShow"
    absolute
    bottom-0
    w-full
    p-3
    transition-all
    duration-500
    transform
    :class="[showTabs ? 'translate-y-0' : 'translate-y-full']"
  >
    <EcTabBar
      rounded-4
      :tabs="tabs"
      @onChange="onTabChange"
      :curIndex="curIndex"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useTabbarStore } from "../../store/tabbarStore";
import EcTabBar from "../../components/EcTabBar.vue";
import { hide } from "@popperjs/core";

const router = useRouter();

//  TabBar切换
const tabbarStore = useTabbarStore();
const curIndex = ref(tabbarStore.index);
const tabs = [
  {
    icon: "i-carbon-home",
    text: "首页",
    path: "/",
  },
  {
    icon: "i-jam-write",
    text: "记录",
    path: "/record",
  },
];
function onTabChange(index) {
  tabbarStore.index = index;
  router.replace({ path: tabs[index].path });
}

// 底部栏显示动画
const showTabs = ref(false);
onMounted(() => {
  showTabs.value = true;
});

// 滚动时自动隐藏底部栏
let oldScrollTop = 0;
function handleContainerScroll(event) {
  if (!event.target) return;
  const curScrollTop = event.target.scrollTop;
  showTabs.value = curScrollTop < oldScrollTop;
  oldScrollTop = curScrollTop;
}

//  监听页面变化,防止输入法把tabbar弹起来
const height = ref(window.innerHeight)
const tabbarShow = ref(true);
const changeTabbarShow = () => {
  if ( height.value - window.innerHeight > 0) {
    tabbarShow.value = false;
  } else {
    tabbarShow.value = true;
  }
  // tabbarShow.value = !tabbarShow.value
};
onMounted(() => {
  window.addEventListener("resize", changeTabbarShow);
});

onUnmounted( () => {
    window.removeEventListener("resize", changeTabbarShow);
})

</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
