import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router/router";
import store from './store'

const app = createApp(App);

import ElementPlus from 'element-plus'
import "element-plus/theme-chalk/index.css"
app.use(ElementPlus)
app.use(router);
app.use(store)
app.mount("#app");

// инициализация корня проекта и подключение плагинов
