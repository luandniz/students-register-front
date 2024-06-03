import { createApp } from "vue";
import App from "./App.vue";
import { Quasar, Notify } from "quasar";
import { createPinia } from "pinia";

import "./index.css";
import "quasar/src/css/index.sass";
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/fontawesome-v5/fontawesome-v5.css";
import "@quasar/extras/fontawesome-v6/fontawesome-v6.css";

const pinia = createPinia();

const app = createApp(App);
app.use(pinia);
app.use(Quasar, {
  plugins: {
    Notify,
  },
  config: {},
});

app.mount("#app");
