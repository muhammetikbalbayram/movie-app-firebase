import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ForgotPasswordView from "@/views/ForgotPasswordView";
import LoginView from "@/views/LoginView";
import FilmDetailsView from "@/views/FilmDetailsView";
import CastDetail from "@/views/CastDetail";
import SearchView from "@/views/SearchView";
import RegisterView from "@/views/RegisterView";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      title: "Home",
    },
  },
  {
    path: "/search",
    name: "search",
    component: SearchView,
    meta: {
      title: "Search",
    },
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: ForgotPasswordView,
    meta: {
      title: "Forgot Password",
    },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: {
      title: "Login",
    },
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
    meta: {
      title: "Register",
    },
  },
  {
    path: "/movie/:id",
    name: "movie",
    component: FilmDetailsView,
    meta: {
      title: "Movie",
    },
  },
  {
    path: "/cast/:id",
    name: "cast",
    component: CastDetail,
    meta: {
      title: "Cast",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  next();
});

export default router;
