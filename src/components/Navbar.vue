<script>
import Logout from "../icons/Logout.vue";
import Login from "../icons/Login.vue";
import Reemo from '@icons/Reemo.vue';
import AlertRented from './rental/AlertRented.vue'

export default {
  name: "Navbar",
  components: { Logout, Login, Reemo, AlertRented },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data(){
    return{
      rentalRequest: null,
    }
  },
  methods: {
    handleLogout() {
      this.$emit("logout");
    },
  },
};
</script>

<template>
  <nav class="fixed top-0 z-10 left-0 right-0 shadow-lg bg-white border-gray-200">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <router-link to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <!-- <img src="" class="h-8" alt="Reemo Logo" /> -->
        <span class="self-center text-white text-2xl font-semibold whitespace-nowrap"><Reemo /></span>
      </router-link>

      <!-- (Login/Logout) -->
      <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">

        <!-- Notificaciones de alquiler -->
        <AlertRented v-if="user && user.id"/>

        <template v-if="user.id == null">
          <router-link
            to="/Login"
            class="flex gap-2 items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
          >
            <span>Iniciar sesión</span>
            <Login />
          </router-link>
        </template>
        <template v-else>
          <form @submit.prevent="handleLogout">
            <button
              type="submit"
              class="flex gap-2 items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
            >
              <span>Cerrar sesión</span>
              <Logout />
            </button>
          </form>
        </template>

        <!-- Botón mobile -->
        <button
          data-collapse-toggle="navbar-cta"
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-cta"
          aria-expanded="false"
        >
          <span class="sr-only">Abrir menú</span>
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>

      <!-- Links de navegación -->
      <div
        class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
        id="navbar-cta"
      >
        <ul
          class="flex flex-col font-medium p-4 md:p-0 mt-4 text-white rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent"
        >
          <li class="h-full">
            <router-link
              to="/"
              class="block py-2 px-3 md:p-0 rounded md:bg-transparent md:text-gray-500 hover:gray-700"
              aria-current="page"
              active-class="!text-secondary-900 bg-blue-700"
            >
              Inicio
            </router-link>
          </li>
          <li>
            <router-link
              to="/Publications"
              class="block py-2 px-3 md:p-0 rounded md:bg-transparent md:text-gray-500 hover:gray-700"
              aria-current="page"
              active-class="!text-secondary-900 bg-blue-700"
            >
              Encontrar un auto
            </router-link>
          </li>
          <template v-if="user.id !== null">
            <li>
              <router-link
                to="/Profile"
                class="block py-2 px-3 md:p-0 rounded md:bg-transparent md:text-gray-500 hover:gray-700"
                aria-current="page"
                active-class="!text-secondary-900 bg-blue-700"
              >
                Mi perfil
              </router-link>
            </li>
          </template>
          <li>
            <router-link
              to="#"
              class="block py-2 px-3 md:p-0 rounded md:bg-transparent md:text-gray-500 hover:gray-700"
            >
              Descargar app
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
