<script>
import { getUserCars } from "@services/car-service.js";
import { subscribeToAuthState } from "@services/auth.js";
import { fetchRentedCars } from "@services/rentedCarService.js";

import Heading from "@components/atoms/Heading.vue";
import CardCar from "@components/my-cars/CardCar.vue";
import User from "@components/user/User.vue";
import RentedCar from "@components/rental/RentedCar.vue";
import Loading from "@icons/Loading.vue";

let unsubscribeAuth = () => { };

export default {
  name: "MyProfile",
  components: { Heading, CardCar, User, RentedCar, Loading },
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
      rentedCars: [],
    };
  },
  methods: {
    async loadRentedCars() {
      try {
        this.loading = true;

        this.rentedCars = await fetchRentedCars(this.loggedUser.id)
        console.log("Autos alquilados: ", this.rentedCars);

      } catch (error) {
        console.error("Error al obtener los autos alquilados:", error)
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
  },
  mounted() {
    unsubscribeAuth = subscribeToAuthState((newUserData) => {
      this.loggedUser = newUserData;
      if (this.loggedUser.id) {
        this.loading = true;
        // Llamamos a la función del servicio para obtener los autos
        this.unsubscribeCars = getUserCars(this.loggedUser.id, (cars) => {
          this.cars = cars;
          this.loading = false;
        });
      }
      if (newUserData && newUserData.id) {
        if (newUserData && newUserData.id && this.internalUserId !== newUserData.id) {
          this.internalUserId = newUserData.id;
          this.loadRentedCars();
        }
      } else {
        this.internalUserId = null;
      }
    });
  },
  unmounted() {
    unsubscribeAuth();
    if (this.unsubscribeCars) {
      this.unsubscribeCars(); // Desuscribimos al componente de la consulta de autos
    }
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
  <div class="flex sm:flex-row gap-8 justify-around items-center mb-4 flex-col">
    <User :user="loggedUser" />
    <div>
      <Heading :type="2">Autos alquilados</Heading>
      <div v-for="rental in rentedCars" :key="index"
        class="p-4 rounded-2xl shadow-md relative flex flex-row shadow-sm w-full overflow-hidden hover:bg-primary-300">
        <RentedCar :key="rental.id" :car="rental.car" />
      </div>
    </div>
  </div>
  <div class="p-4 max-w-md mx-auto md:max-w-screen-xl">
    <Heading :type="2">Mis autos</Heading>
  </div>

  <div v-if="loading" class="flex items-center justify-center w-fit mx-auto bg-gray-50">
    <Loading role="status" />

    <span class="sr-only">Cargando...</span>
  </div>

  <div class="max-w-md mx-auto md:max-w-screen-xl mb-4 grid gap-4 md:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
    <div v-for="(car, index) in cars" :key="index"
      class="rounded-2xl shadow-md relative flex relative flex-col shadow-sm overflow-hidden hover:bg-primary-300">
      <CardCar :car="car" />
    </div>
    <router-link to="/Publish"
      class="flex flex-col justify-center items-center text-gray-300 border-4 border-gray-200 hover:text-gray-400 hover:border-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center">Registrar
      Vehículo
      <span class="text-3xl font-bold">+</span>
    </router-link>
  </div>
</template>
