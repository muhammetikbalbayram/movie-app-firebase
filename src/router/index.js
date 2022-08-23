import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ForgotPasswordView from "@/views/ForgotPasswordView";
import LoginView from "@/views/LoginView";
import FilmDetailsView from "@/views/FilmDetailsView";
import CastDetail from "@/views/CastDetail";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/adventure",
    name: "adventure",
    component: HomeView,
  },
  {
    path: "/forgotpassword",
    name: "forgotpassword",
    component: ForgotPasswordView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/movie/:id",
    name: "movie",
    component: FilmDetailsView,
  },
  {
    path: "/cast/:id",
    name: "cast",
    component: CastDetail,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;