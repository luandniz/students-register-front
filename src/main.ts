import { createApp } from "vue";
import App from "./App.vue";
import { Quasar } from "quasar";
import { createPinia } from "pinia";

import "./index.css";
import "quasar/src/css/index.sass";

const pinia = createPinia();

const app = createApp(App);
app.use(pinia);
app.use(Quasar, {
  plugins: {},
});

app.mount("#app");
