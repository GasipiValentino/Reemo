<script>
import { logout, subscribeToAuthState } from "./services/auth";

import Navbar from "./components/Navbar.vue";
import FooterLayout from "./components/Footer.vue";
import Alert from "./components/atoms/Alert.vue";

export default {
  name: "App",
  components: {
    Navbar,
    FooterLayout,
    Alert,
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

  <main class="flex flex-col min-h-screen mt-20 mx-auto">
    <router-view />
  </main>
  <Alert />

  <FooterLayout />
</template>

<style>
html {
    font-family:
      "Onest",
      Monaco,
      Lucida Console,
      "Courier New",
      Courier,
      monospace;
    background: #fff;
    letter-spacing: -0.025rem;
  }

  body,
  figure {
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  h1,
  h2,
  h3,
  h4 {
    margin: 0;
    font-family:
      "Onest",
      sans-serif,
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      "Open Sans",
      "Helvetica Neue",
      sans-serif;
  }
  .no-scroll {
    overflow: hidden;
  }
</style>