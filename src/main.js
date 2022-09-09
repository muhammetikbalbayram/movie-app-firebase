import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import DotLoader from "vue-spinner/src/DotLoader";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBkbRMqhiW24HaCeR1M4cjCxD9E7I_9DcE",
  authDomain: "movie-app-firebase-101eb.firebaseapp.com",
  projectId: "movie-app-firebase-101eb",
  storageBucket: "movie-app-firebase-101eb.appspot.com",
  messagingSenderId: "659323624675",
  appId: "1:659323624675:web:baa5ea82ca524fe2d279d6",
};

initializeApp(firebaseConfig);

const app = createApp(App);

app.component("DotLoader", DotLoader);

app.use(store).use(router).mount("#app");
