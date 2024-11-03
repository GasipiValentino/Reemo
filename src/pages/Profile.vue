<script>
import { collection, getDocs, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../services/firebase.js";
import { ref, deleteObject } from "firebase/storage";
import { subscribeToAuthState } from "../services/auth.js";

import Heading from "../components/atoms/Heading.vue";
import CardCar from "../components/CardCar.vue";
import User from "../components/User.vue";
import RentedCar from "../components/RentedCar.vue";
import PopoverPublication from "../components/organisms/profile/PopoverPublication.vue";

let unsubscribeAuth = () => { };

export default {
  name: "MyProfile",
  components: { Heading, CardCar, User, RentedCar, PopoverPublication },
  data() {
    return {
      cars: [],
      loading: false,
      loggedUser: {
        id: null,
        email: null,
        userName: null,
        name: null,
        lastName: null,
      },
      loading: false,
    };
  },
  methods: {
    async fetchCars() {
      try {
        this.loading = true;
        const carsCollection = collection(db, "cars");
        const carsSnapshot = await getDocs(carsCollection);
        const allCars = carsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const userCars = allCars.filter(
          (car) => car.user_id === this.loggedUser.id,
        );
        this.cars = userCars;
      } catch (error) {
        console.error("Error al obtener los autos:", error);
      } finally {
        this.loading = false;
      }
    },
    addCar(newCar) {
      this.cars.push(newCar);
    },
    goToCarDetails(carId) {
      this.$router.push({ name: "CarDetails", params: { id: carId } });
    },



    async handleDelete(carId) {
      try {
        this.loading = true;
        const carRef = doc(db, "cars", carId);
        const carSnapshot = await getDoc(carRef);

        if (carSnapshot.exists()) {
          const carData = carSnapshot.data();
          const imageUrls = carData.images || [];

          for (const imageUrl of imageUrls) {
            const imageRef = ref(storage, imageUrl);
            try {
              await deleteObject(imageRef);
            } catch (deleteError) {
              console.error(`Error al eliminar la imagen ${imageUrl}:`, deleteError);
            }
          }

          await deleteDoc(carRef);
          this.cars = this.cars.filter((car) => car.id !== carId);
          console.log("El auto y sus fotos fueron borrados con éxito.");
        } else {
          console.error("El auto no existe.");
        }
      } catch (error) {
        console.error("Error al borrar el auto y sus fotos:", error);
      } finally {
        this.loading = false;
      }
    },

    async handleToggleAvailability(carId) {
      try {
        this.loading = true;
        const carRef = doc(db, "cars", carId);
        const carSnapshot = await getDoc(carRef);

        if (carSnapshot.exists()) {
          const carData = carSnapshot.data();
          const newAvailability = !carData.isAvailable; // Para cambiare la disponibilidad del auto

          await updateDoc(carRef, {
            isAvailable: newAvailability, // Para actualizar el estado en Firestore
          });

          // PAra actualizar el estado del auto en el array cars, es para que se actualice el estado localmente y se muestren bien los botones de des/habilitar
          const carIndex = this.cars.findIndex(car => car.id === carId);
          if (carIndex !== -1) {
            this.cars[carIndex].isAvailable = newAvailability; //Aca le asignamos la nueva disponivbilidad
          }

          console.log(`La disponibilidad del auto ${carId} ahora es: ${newAvailability}`);
        } else {
          console.error("El auto no existe.");
        }
      } catch (error) {
        console.error("Error al cambiar la disponibilidad del auto:", error);
      } finally {
        this.loading = false;
      }
    }
  },
  mounted() {
    unsubscribeAuth = subscribeToAuthState((newUserData) => {
      // console.log('Datos del usuario:', newUserData);
      this.loggedUser = newUserData;
      if (this.loggedUser.id) {
        this.fetchCars();
        // console.log('Cars:', this.cars)
      }
    });
  },
  unmounted() {
    unsubscribeAuth();
  },
};
</script>

<template>
  <div class="flex flex-col justify-center items-center mb-4">
    <Heading :type="1">Perfil</Heading>
    <p class="text-sm text-gray-500 truncate">
      {{ loggedUser.email }}
    </p>
  </div>

  <User :user="loggedUser" />
  <div class="p-4 max-w-md mx-auto md:max-w-screen-xl">
    <Heading :type="2">Mis autos</Heading>
  </div>

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
  <div
    class="max-w-md mx-auto md:max-w-screen-xl p-4 mb-4 grid gap-4 md:grid-cols-2 md:mb-8 lg:grid-cols-4"
  >
  <div
  v-for="(car, index) in cars"
  :key="index"
  class="border-4 rounded-lg shadow-md relative"
>
  <CardCar :car="car" />
  <PopoverPublication class="absolute top-2 right-2">
    <div 
      v-if="car.user_id === loggedUser.id" 
      @click="handleDelete(car.id)" 
      class="flex items-center justify-between space-x-2 cursor-pointer mb-5 hover:text-red-400"
    >
      <p>Eliminar Vehículo</p>
      <button>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3zM7 6h10v13H7zm2 2v9h2V8zm4 0v9h2V8z"/></svg>
      </button>
    </div>

    <div v-if="car.user_id === loggedUser.id" @click="handleToggleAvailability(car.id)" class="flex items-center justify-between space-x-2 cursor-pointer" 
      :class="car.isAvailable ? 'hover:text-yellow-400' : 'hover:text-green-400'"
    >
      <p>{{ car.isAvailable ? 'Marcar como No Disponible' : 'Marcar como Disponible' }}</p>
      <button>
        <svg v-if="car.isAvailable" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fill="currentColor" fill-rule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10m-4.906-3.68L18.32 7.094A8 8 0 0 1 7.094 18.32M5.68 16.906A8 8 0 0 1 16.906 5.68z"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16">
          <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m2.75 8.75l3.5 3.5l7-7.5" />
        </svg>
      </button>
    </div>
  </PopoverPublication>



</div>
    <router-link
      to="/Publish"
      class="flex flex-col justify-center items-center text-gray-300 border-4 border-gray-200 hover:text-gray-400 hover:border-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
      >Registrar Vehículo
      <span class="text-3xl font-bold">+</span>
    </router-link>
  </div>

  <!-- componente de autos alquilados -->
  <div class="p-4 max-w-md mx-auto md:max-w-screen-lg">
    <RentedCar :userId="loggedUser.id" />
  </div>
</template>
