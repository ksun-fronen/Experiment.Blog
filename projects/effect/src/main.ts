import "./style.css";
import * as Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./config/router.js";
import * as i18nModule from "./lang";

const app = Vue.createApp(App);
i18nModule.installI18n(app);
app
  .use(store)
  .use(router)
  .mount("#AppContainer");
