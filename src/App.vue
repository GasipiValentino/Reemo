<script>
import { logout, subscribeToAuthState } from './services/auth';

import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  },
  data(){
    return {
      loggedUser: {
        id:null,
        email:null
      },
    };
  },
  methods: {
    handleLogout(){
      logout();
      this.loggedUser = {
        id:null,
        email:null
      };
      this.$router.push('/Login');
    },
  },
  mounted(){
    subscribeToAuthState(newUserData => this.loggedUser = newUserData);
  }
}

</script>

<template>
  <Navbar :user="loggedUser" @logout="handleLogout" />
  
  <main class="container min-h-screen pt-24 mx-auto">
      <router-view />
  </main>

  <Footer/>
</template>