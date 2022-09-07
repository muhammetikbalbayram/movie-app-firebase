import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import DotLoader from "vue-spinner/src/DotLoader";

const app = createApp(App);

app.component("DotLoader", DotLoader);

app.use(store).use(router).mount("#app");
