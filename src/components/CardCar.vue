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
    name: 'CardCar',
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
  <div class="flex flex-col rounded-lg shadow-sm w-full max-w-xs "> 
    <div class="w-full h-96 flex align-center justify-center bg-gray-100"> 
      <img 
        class="my-auto h-full rounded-t-md object-cover" 
        :src="car.images && car.images.length > 0 ? car.images[0] : defaultCarImage" 
        @error="setDefaultImage"
        alt="Auto" 
      />
    </div>
    <div class="py-6 flex flex-1 flex-col justify-between px-4">
      <h3 class="text-lg font-semibold leading-tight text-gray-900">{{ car.marca }} {{ car.modelo }}, {{ car.año }}</h3>

      <ul class="flex justify-between mt-2 items-center gap-4">
        <li class="flex items-center gap-2">
          <Transmition />
          <p class="text-sm font-medium text-gray-500">{{ car.transmision }}</p>
        </li>
        <li class="flex items-center gap-2">
          <Chasis />
          <p class="text-sm font-medium text-gray-500">{{ car.chasis }}</p>
        </li>
      </ul>

      <div class="mt-4 flex flex-col items-center gap-4">
        <p class="text-md text-2xl font-extrabold leading-tight text-gray-900">${{ car.precio }}</p>
        <button 
          @click="goToCarDetails(car.id)" 
          type="button" 
          class="w-full flex justify-between items-center rounded-full bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          <span>Ver Detalles</span>
          <ArrowRight class="text-gray-900" />
        </button>        
      </div>
    </div>
  </div>
</template>
