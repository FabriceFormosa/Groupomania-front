import Login from "../components/pages/Login.vue";
import Wall from "../components/pages/Wall.vue";
import Profile from "../components/pages/Profile.vue";
import CreateProfile from "../components/pages/CreateProfile.vue";
import UpdateProfile from "../components/pages/UpdateProfile.vue";
import DeleteProfile from "../components/pages/DeleteProfile.vue";

import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/login", component: Login },
  { path: "/home", component: Wall },
  { path: "/viewprofile", component: Profile },
  { path: "/createprofile", component: CreateProfile },
  { path: "/updateprofile", component: UpdateProfile },
  { path: "/deleteprofile", component: DeleteProfile },
  { path: "/", redirect: "login" },
];

const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach((to, from) => {
  // pour acceder à une page privée il faut verifier l existence d'un token
  
  if (isPrivatePage(to) && !isTokenPresent()) {
   
    return router.push("/login");
  }
  
  
});

function isPrivatePage(to) {
  const publicPages = ["/login", "/signup"];
  return !publicPages.includes(to.path);
}

function isTokenPresent() {
  const token = localStorage.getItem("token");
  
  return token != null;
}

function isTokenValid() {
  return localStorage.getItem("token") === "my JWT token";
}

export { router };
