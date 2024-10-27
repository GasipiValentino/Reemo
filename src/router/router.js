import { createRouter, createWebHashHistory } from "vue-router";
import { subscribeToAuthState } from "../services/auth";

import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import Profile from "../pages/Profile.vue";
import ProfileEdit from "../pages/ProfileEdit.vue";
import Register from "../pages/Register.vue";
import Publications from "../pages/Publications.vue";
import Publish from "../pages/CarPublish.vue";
import CarDetails from "../pages/CarDetails.vue";
import UserEdit from "../components/organisms/UserEdit.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/Login", component: Login },
  { path: "/Profile", component: Profile, meta: { needsAuth: true } },
  { path: "/Register", component: Register },
  { path: "/Publications", component: Publications },
  { path: "/Publish", component: Publish, meta: { needsAuth: true } },
  { path: "/Profile/Edit", component: ProfileEdit, meta: { needsAuth: true }, props: { showEditModal: true }  },
  { path: "/CarDetails/:id", name: "CarDetails", component: CarDetails, props: true, meta: { requiresAuth: true } }, // Agregué 'name'
  { path: '/Profile/Edit', meta: { needsAuth: true }, component: UserEdit },
];

// Creamos el router usando las rutas que definimos y definiendo el modo
// de "historia".
const router = createRouter({
  routes,
  // routes: routes,
  history: createWebHashHistory(),
});

let loggedUser = {
  id: null,
  email: null,
  userName: null,
  name: null,
  lastName: null,
};

//Agrega un observer para ser notificado de los cambios en el estado de autenticación. Retorna una función para cancelar la suscripción.
subscribeToAuthState((newUserData) => (loggedUser = newUserData));

router.beforeEach((to) => {
  if (to.meta.needsAuth && loggedUser.id == null) {
    return {
      path: "/Login",
    };
  }
});

export default router;
