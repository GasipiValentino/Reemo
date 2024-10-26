<script>
import { subscribeToAuthState } from "../services/auth.js";
import { fetchRentedCars } from "../services/rentedCarService.js";
import CardCar from "./CardCar.vue";

let unsubscribeAuth = () => {};

export default {
  name: "RentedCar",
  components: { CardCar },
  data() {
    return {
      rentedCars: [],
      loading: false,
      internalUserId: this.userId, // Variable interna para manejar el userId
    };
  },
  props: {
    userId: {
      type: null,
      required: true,
    },
  },
  methods: {
    async loadRentedCars() {
      try {
        this.loading = true;
        
        this.rentedCars = await fetchRentedCars(this.internalUserId)

        console.log("Autos alquilados:", this.rentedCars);

      } catch (error) {
        console.error("Error al obtener los autos alquilados:", error);
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    unsubscribeAuth = subscribeToAuthState((newUserData) => {
      if (newUserData && newUserData.id) {
        this.internalUserId = newUserData.id;
        this.loadRentedCars();
      } else {
        this.internalUserId = null;
      }
    });
  },
  unmounted() {
    unsubscribeAuth();
  },
};
</script>

<template>
  <div>
    <h2 class="text-center text-2xl font-bold">Autos Alquilados</h2>
    <div v-if="loading" class="flex justify-center items-center">
      <div>Loading...</div>
    </div>
    <div v-else>
      <div v-if="rentedCars.length === 0">
        <p>No has alquilado autos.</p>
      </div>
      <div v-else class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <CardCar
          v-for="rental in rentedCars"
          :key="rental.id"
          :car="rental.car"
        />
      </div>
    </div>
  </div>
</template>
