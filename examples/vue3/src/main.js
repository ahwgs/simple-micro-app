import { createApp } from "vue";
import App from "./App.vue";
import SimpleMicroApp, { app } from "simple-micro-app";
import router from "./routers";

console.log("app", SimpleMicroApp);

SimpleMicroApp.start();

const vueApp = createApp(App);

vueApp.use(router);

vueApp.mount("#app");
