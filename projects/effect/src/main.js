import { createApp }   from "vue";
import "./style.css";
import App           from "./App.vue";
import store         from "./store";
import { installI18n } from "./lang/index";

const app = createApp(App);
installI18n(app);
app.use(store).mount("#AppContainer");
