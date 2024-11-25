<script>
import { subscribeToAuthState } from "@services/auth.js";
import { unsubscribeToPublication, toggleAvailability } from '@services/publication.js';
import { addAlert } from "@services/alerts.js";

import Heading from "../atoms/Heading.vue";
import ArrowRight from '@icons/ArrowRight.vue';
import Chasis from '@icons/Chasis.vue';
import Transmition from '@icons/Transmition.vue';
import defaultCarImage from '@assets/Car-Img.png';
import PopoverPublication from './PopoverPublication.vue';

let unsubscribeAuth = () => { };

export default {
    data() {
      return {
        defaultCarImage, 
        loading: false,
        loggedUser: {
          id: null
        },
      };
    },
    name: 'CardCar',
    components: { Heading, ArrowRight, Transmition, Chasis, PopoverPublication },
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
    },

    async handleDelete(id) {
  this.loading = true;
  try {
    const result = await unsubscribeToPublication(id);
    if (result.success) {
      console.log('Publicación eliminada');
      addAlert(`${this.car.marca} ${this.car.modelo} eliminado`, 'success');
    } else {
      console.error(result.message);
      addAlert('Error al eliminar la publicación', 'error');
    }
  } catch (error) {
    addAlert('Error al eliminar la publicación', 'error');
    console.error('Error al eliminar la publicación:', error);
  } finally {
    this.loading = false;
  }
},

async handleToggleAvailability(carId) {
  this.loading = true;
  try {
    const result = await toggleAvailability(carId);
    if (result.success) {
      this.car.isAvailable = result.newAvailability;
      if (result.newAvailability) {
        addAlert(`${this.car.marca} ${this.car.modelo} Disponible`, 'success');
      } else {
        addAlert(`${this.car.marca} ${this.car.modelo} No Disponible`, 'error');
      }
    } else {
      console.error(result.message);
      addAlert('Error al cambiar la disponibilidad', 'error');
    }
  } catch (error) {
    addAlert('Error al cambiar la disponibilidad:', 'error');
  } finally {
    this.loading = false;
  }
},
    },
  mounted() {
    unsubscribeAuth = subscribeToAuthState((newUserData) => {
      this.loggedUser = newUserData;
    });
  },
  unmounted() {
    unsubscribeAuth();
  },
}
</script>

<template>
    <figure class="flex relative align-center justify-center m-2 "> 
      <img
        class="aspect-square w-full h-full object-cover rounded-xl overflow-hidden"
        :src="car.images && car.images.length > 0 ? car.images[0] : defaultCarImage" 
        @error="setDefaultImage"
        :alt="car.marca + ' ' + car.modelo" 
      />
    </figure>
    <div class="flex flex-1 flex-col justify-between p-2">
      <article class="flex align-end justify-between">
        <Heading :type="3">{{ car.marca }} {{ car.modelo }}</Heading>
        <p class="text-md text-xl font-extrabold leading-tight text-gray-900">${{ car.precio }} /día</p>
      </article>

      <ul class="flex mt-2 items-center gap-4">
        <li class="flex items-center bg-secondary-200 px-2 py-1 rounded-full text-sm font-medium text-secondary-900 gap-2">
          <Transmition />
          <p class="text-sm font-medium text-gray-500">{{ car.transmision }}</p>
        </li>
        <li class="flex items-center bg-secondary-200 px-2 py-1 rounded-full text-sm font-medium text-secondary-900 gap-2">
          <Chasis />
          <p class="text-sm font-medium text-gray-500">{{ car.chasis }}</p>
        </li>
      </ul>

      <div class="mt-4 flex flex-col items-center gap-4">
        <button 
          @click="goToCarDetails(car.id)" 
          type="button" 
          class="w-full flex justify-between items-center rounded-xl bg-secondary-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-secondary-800 focus:outline-none focus:text-secondary-900 focus:ring-4 focus:ring-secondary-900  focus:bg-white"
        >
          <span>Ver Detalles</span>
          <ArrowRight class="hover:text-secondary-900"/>
        </button>        
      </div>
    </div>
    <PopoverPublication
      :isOwner="car.user_id === loggedUser.id"
      :isAvailable="car.isAvailable"
      :loading="loading"
      :onDelete="() => handleDelete(car.id)"
      :onToggleAvailability="() => handleToggleAvailability(car.id)"
    />
</template>
