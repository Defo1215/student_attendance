import { createApp } from 'vue'
import './style.css'
import App from './App.vue'


import "uno.css";
import "@unocss/reset/tailwind.css";

import { createPinia } from "pinia";
const pinia = createPinia();
import piniaPersist from "pinia-plugin-persistedstate";
pinia.use(piniaPersist)

import router from "./router";
import { Field, CellGroup } from 'vant';

//  ElementPlus组件库
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(Field);
app.use(CellGroup);
app.use(ElementPlus)
app.mount("#app");