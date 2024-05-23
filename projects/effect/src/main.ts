import { createApp }   from "vue";
import "./style.css";
import App           from "./App.vue";
import router from "./config/router.js";
import store         from "./store";
import { installI18n } from "./lang";

const app = createApp(App);
installI18n(app);
app
  .use(store)
  .use(router)
  .mount("#AppContainer");
