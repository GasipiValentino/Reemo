<script>
import ArrowRight from '../icons/ArrowRight.vue';
import Chasis from '../icons/Chasis.vue';
import Transmition from '../icons/Transmition.vue';
import defaultCarImage from '../assets/Car-Img.png';

export default {
    data() {
      return {
        defaultCarImage, 
      };
    },
    name: 'TarjetasVehiculos',
    components: { ArrowRight, Transmition, Chasis },
    props: {
      car: {
        type: Object,
        required: true
      }
    },
    methods: {
      goToCarDetails(id) {
        this.$router.push({ name: 'CarDetails', params: { id: id } });
      },

    // Método que muestra la imagen por defecto si hay error (por si borramos imagenes desde storage)
    setDefaultImage(event) {
      event.target.src = this.defaultCarImage;
    }
    }
}


</script>

<template>
  <div class="flex justify-around flex-row align-center md:flex-col md:justify-between rounded-lg py-4 px-4 md:p-12 shadow-sm max-w-lg">
    <div class="md:w-full flex align-center justify-center md:justify-start">
      <img 
        class="my-auto h-16 mx-auto md:h-full" 
        :src="car.images && car.images.length > 0 ? car.images[0] : defaultCarImage" @error="setDefaultImage"
        alt="Auto" 
      />
    </div>
    <div class="md:pt-6 flex flex-1 px-2 md:px-0 md:flex-col justify-between">
      <h3 class="text-lg flex items-center font-semibold leading-tight text-gray-900">{{ car.marca }} {{ car.modelo }}, {{ car.año }}</h3>

      <ul class="hidden justify-between md:flex mt-2 items-center gap-4">
        <li class="flex items-center gap-2">
          <Transmition/>
          <p class="text-sm font-medium text-gray-500 ">{{car.transmision}}</p>
        </li>

        <li class="flex items-center gap-2">
          <Chasis/>
          <p class="text-sm font-medium text-gray-500 ">{{ car.chasis }}</p>
        </li>
      </ul>

      <div class="md:mt-4 flex md:flex-col items-center justify-between gap-4">
        <p class="hidden md:block text-md md:text-2xl font-extrabold leading-tight text-gray-900 ">${{ car.precio }}</p>

        <button 
          @click="goToCarDetails(car.id)" 
          type="button" 
          class="flex justify-between items-center rounded-full bg-blue-700 px-2.5 md:px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 md:w-full"
          >
          <span class="hidden md:block">Ver Detalles</span>
          <ArrowRight class="text-gray-900"/>
        </button>        
      </div>

    </div>
  </div>

</template>

