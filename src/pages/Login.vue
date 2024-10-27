<script>
import { login } from "../services/auth";
import Heading from "../components/atoms/Heading.vue";

export default {
  name: "Login",
  components: { Heading },
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      loading: false,
      errorMsg: "",
    };
  },
  methods: {
    async handleSubmit() {
      this.loading = true;
      this.errorMsg = "";

      try {
        await login({
          // email: this.user.email,
          // password: this.user.password,
          ...this.user,
        });
        console.log("Usuario autenticado con éxito :D");

        // Redireccionamos al perfil.
        this.$router.push("/Profile");
      } catch (error) {
        let errorCode = error.code;

        if (errorCode === "auth/invalid-credential") {
          this.errorMsg =
            "Credenciales inválidas. Por favor, revisa tu correo y contraseña.";
        }

        console.error("[Login.vue] Error al autenticar: ", error);
        // throw error;
      }
      this.loading = false;
    },
  },
};
</script>

<template>
  <form action="#" @submit.prevent="handleSubmit" class="max-w-md w-96 m-auto">
    <Heading :type="1">Iniciar sesión</Heading>
    <div
      v-if="errorMsg"
      class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
      role="alert"
    >
      {{ errorMsg }}
    </div>
    <div class="relative z-0 w-full mb-5 group">
      <input
        type="email"
        id="email"
        placeholder=" "
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        v-model="user.email"
        name="email"
      />
      <label
        for="email"
        class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >Email</label
      >
    </div>
    <div class="relative z-0 w-full mb-5 group">
      <input
        type="password"
        id="password"
        placeholder=" "
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        v-model="user.password"
        name="password"
      />
      <label
        for="password"
        class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >Contraseña</label
      >
    </div>
    <button
      type="submit"
      class="transition-all py-2 px-4 rounded bg-blue-700 text-white focus:bg-blue-500 hover:bg-blue-500 active:bg-blue-900"
    >
      Ingresar
    </button>
    <p class="mt-8 mb-3">¿No tenés cuenta?</p>
    <router-link
      to="/Register"
      class="transition-all py-2 px-4 rounded bg-yellow-700 text-white focus:bg-blue-500 hover:bg-blue-500 active:bg-blue-900"
      >Crear Cuenta</router-link
    >
  </form>
</template>
