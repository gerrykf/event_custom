import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { setupStore } from "@/store/index";

import "./styles/styles.scss";

const app = createApp(App);

app.use(router);

setupStore(app);

app.mount("#app");
