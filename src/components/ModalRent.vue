<script>
import { isCarAlreadyRented, submitRentalRequest } from "../services/rentedCarService";
import { addAlert } from "../services/alerts";

export default {
  props: ["car", "loggedUser", "rented"],
  name: "ModalRent",
  data() {
    return {
      isVisible: false,
      rentedFromDate: "", // Fecha de inicio
      rentedUntilDate: "", // Fecha de fin
    };
  },
  methods: {
    open() {
      this.isVisible = true;
    },
    close() {
      this.isVisible = false;
      this.rentedFromDate = "";
      this.rentedUntilDate = "";
    },
    async submitRental() {
      
      if (
        !this.car ||
        !this.loggedUser ||
        !this.rentedFromDate ||
        !this.rentedUntilDate
      ) {
        addAlert("Por favor, completa todos los campos.", "error");
        return;
      }

      try {
        const alreadyRented = await isCarAlreadyRented(this.car.id);

        if (alreadyRented) {
          addAlert("este auto ya esta alquilado", "info");
          return;
        }

        const rentalRequest = {
          car_id: this.car.id,
          rented: true,
          user_id: this.loggedUser.id,
          rented_from: this.rentedFromDate, // Fecha de Busqueda del vehiculo
          rented_until: this.rentedUntilDate, // Fecha de devolucion del vehiculo
          status: "pendiente", // Inicialmente en estado pendiente
          rental_price: this.rentalPrice || 0, // Precio calculado
        };

        await submitRentalRequest(rentalRequest);

      } catch (error) {
        addAlert("Error al enviar solicitud de alquiler", "error");
      }

      this.close();

      this.$router.push('/Profile')
    },
  },
};
</script>

<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
    @click.self="close"
  >
    <div class="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
      <h2 class="text-xl font-bold mb-4">Solicitar Alquiler</h2>
      <form @submit.prevent="submitRental">

        <!-- Fecha de inicio del alquiler -->
        <div class="mb-4">
          <label for="rentedFromDate" class="block text-sm font-medium"
            >Fecha de Inicio:</label
          >
          <input
            type="date"
            id="rentedFromDate"
            v-model="rentedFromDate"
            required
            class="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <!-- Fecha de fin del alquiler -->
        <div class="mb-4">
          <label for="rentedUntilDate" class="block text-sm font-medium"
            >Fecha de Fin:</label
          >
          <input
            type="date"
            id="rentedUntilDate"
            v-model="rentedUntilDate"
            required
            class="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div class="flex justify-end">
          <button type="button" @click="close" class="mr-2 text-gray-600">
            Cancelar
          </button>
          <button
            @click="rentCar"
            type="submit"
            class="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Enviar Solicitud
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
