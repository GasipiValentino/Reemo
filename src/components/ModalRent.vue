<script>
import { isCarAlreadyRented, submitRentalRequest } from "../services/rentedCarService";
import { addAlert } from "../services/alerts";

export default {
  props: ["car", "loggedUser", "rented"],
  name: "ModalRent",
  data() {
    return {
      isVisible: false,
      rentedFromDate: "", 
      rentedUntilDate: "",
      selectedTime: '00:00', 
      selectedUntilTime: '00:00', 
      timeOption: [],
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
      
      if ( !this.car || !this.loggedUser || !this.rentedFromDate || !this.rentedUntilDate ) {
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
          rented: false,
          owner_id: this.car.user_id,
          user_id: this.loggedUser.id,
          rented_from: this.rentedFromDate, // Fecha de Busqueda del vehiculo
          rented_until: this.rentedUntilDate, // Fecha de devolucion del vehiculo
          selectedTime: this.selectedTime || '00:00', 
          selectedUntilTime: this.selectedUntilTime || '00:00', 
          status: "pendiente", 
          rental_price: this.car.precio || null, // Precio calculado
        };

        await submitRentalRequest(rentalRequest);

        this.$emit('add-alert', 'Solicitud de alquiler enviada con exito.', 'success')

      } catch (error) {
        addAlert("Error al enviar solicitud de alquiler", "error");
      }

      this.close();

      this.$router.push('/Profile')
    },
    timeOptions(){
      for (let hour = 0; hour < 24; hour++){ 
        for (let minute = 0; minute < 60; minute += 30){
            const formattedHour = hour < 10 ? '0' + hour : hour;
            const formattedMinute = minute < 10 ? '0' + minute : minute;
            this.timeOption.push(`${formattedHour}:${formattedMinute}`)
         }
      }
    }
  },
  mounted(){
    this.timeOptions();
  }
};
</script>

<template>
  <div v-if="isVisible" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
    @click.self="close">
    <div class="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
      <h2 class="text-xl font-bold mb-4">Solicitar Alquiler</h2>
      <form @submit.prevent="submitRental">
        <!-- Fecha de inicio -->
        <div>
          <label for="rentedFromDate" class="block text-sm font-medium">Fecha de Inicio:</label>
          <div class="grid grid-cols-2 gap-4 mb-4">
            <input type="date" id="rentedFromDate" v-model="rentedFromDate" required
              class="mt-1 block w-full p-2 border border-gray-300 rounded" />

            <select id="time-select" v-model="selectedTime"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-max-80 p-2.5">
              <option v-for="time in timeOption" :key="time" :value="time">{{ time }}</option>
            </select>
          </div>
        </div>

        <!-- Fecha de Fin -->
        <div>
          <label for="rentedUntilDate" class="block text-sm font-medium">Fecha de Fin:</label>
          <div class="grid grid-cols-2 gap-4 mb-4">
            <input type="date" id="rentedUntilDate" v-model="rentedUntilDate" required
              class="mt-1 block w-full p-2 border border-gray-300 rounded" />

            <select id="time-select" v-model="selectedUntilTime"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-max-80 p-2.5">
              <option v-for="time in timeOption" :key="time" :value="time">{{ time }}</option>
            </select>
          </div>
        </div>



        <div class="flex justify-end">
          <button type="button" @click="close" class="mr-2 text-gray-600">
            Cancelar
          </button>
          <button @click="rentCar" type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">
            Enviar Solicitud
          </button>
        </div>
      </form>
    </div>
  </div>




</template>
