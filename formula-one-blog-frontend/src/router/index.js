import { createRouter, createWebHashHistory } from "vue-router";
import {
  Home,
  Blogs,
  LoginRegister,
  ForgotPassword,
  Profile,
  Admin,
} from "../views";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Home",
    },
  },
  {
    path: "/blogs",
    name: "Blogs",
    component: Blogs,
    meta: {
      title: "Blogs",
    },
  },
  {
    path: "/newPost",
    name: "NewPost",
    component: Home,
  },
  {
    path: "/login",
    name: "LoginRegister",
    component: LoginRegister,
    meta: {
      title: "Login",
    },
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta: {
      title: "ForgotPassword",
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      title: "Profile",
    },
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      title: "Admin",
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Formula One Blog`;
  next();
});

export default router;
