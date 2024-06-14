import "./style.css";
import * as Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./config/router.js";
import i18n from "./lang";

const app = Vue.createApp(App);

app
  .use(store)
  .use(router)
  .use(i18n)
  .mount("#AppContainer");

window.$$application = app;
