import "./style.css";
import * as Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./config/router.js";
import { installI18n } from "./lang";

const app = Vue.createApp(App);
installI18n(app);
app
  .use(store)
  .use(router)
  .mount("#AppContainer");
