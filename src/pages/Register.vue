<script>
import Heading from "../components/Heading.vue";
import { register } from "../services/auth";

export default {
  name: "Register",
  components: { Heading },

  data() {
    return {
      user: {
        // name: '',
        // lastName: '',
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
        await register({ ...this.user });

        this.$router.push("/Profile/Edit");
        console.log("Usuario creado con éxito");
      } catch (error) {
        let errorCode = error.code;

        if (errorCode === "auth/missing-password") {
          this.errorMsg = "Para crear un usuario debes ingresar una contraseña";
        } else if (errorCode === "auth/weak-password") {
          this.errorMsg = "La contraseña debe tener al menos 6 caracteres";
        } else if (errorCode === "auth/email-already-in-use") {
          this.errorMsg = "El email utilizado ya tiene un usuario asignado";
        } else if (errorCode === "auth/invalid-email") {
          this.errorMsg = "El email ingresado no es válido";
        }

        console.error("[Login.vue] Error al registrar: ", error);
      }

      this.loading = false;
    },
  },
};
</script>

<template>
  <div
    v-if="loading"
    class="flex items-center justify-center w-fit mx-auto bg-gray-50"
  >
    <div role="status">
      <svg
        aria-hidden="true"
        class="w-8 h-8 text-gray-200 animate-spin fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span class="sr-only">Cargando...</span>
    </div>
  </div>

  <form action="#" @submit.prevent="handleSubmit" class="max-w-md w-96 m-auto">
    <Heading>Crear una Cuenta</Heading>

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
      Crear Cuenta
    </button>
    <p class="mt-12 mb-3">¿Ya tenés cuenta?</p>
    <router-link
      to="/Login"
      class="transition-all py-2 px-4 rounded bg-yellow-700 text-white focus:bg-blue-500 hover:bg-blue-500 active:bg-blue-900"
      >Iniciar Sesión</router-link
    >
  </form>
</template>
