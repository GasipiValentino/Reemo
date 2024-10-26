<script>
import { logout, subscribeToAuthState } from "./services/auth";

import Navbar from "./components/Navbar.vue";
import FooterLayout from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Navbar,
    FooterLayout,
  },
  data() {
    return {
      loggedUser: {
        id: null,
        email: null,
        photoURL: null,
        userName: null,
        name: null,
        lastName: null,
      },
    };
  },
  methods: {
    handleLogout() {
      logout();
      this.loggedUser = {
        id: null,
        email: null,
      };
      this.$router.push("/Login");
    },
  },
  mounted() {
    subscribeToAuthState((newUserData) => (this.loggedUser = newUserData));
  },
};
</script>

<template>
  <Navbar :user="loggedUser" @logout="handleLogout" />

  <main class="flex flex-col min-h-screen pt-20 mx-auto">
    <router-view />
  </main>

  <FooterLayout />
</template>
