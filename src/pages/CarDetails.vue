<script>
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase.js';

import Heading from '../components/Heading.vue';
import Comments from '../components/Comments.vue';
import Transmition from '../icons/Transmition.vue';
import Chasis from '../icons/Chasis.vue';
import Engine from '../icons/Engine.vue';
import GasStation from '../icons/GasStation.vue';
import Accelerometer from '../icons/Accelerometer.vue';
import Check from '../icons/Check.vue';

// let unsubscribeAuth = () => {};

export default {
    props: ['id'],
    name: 'CarDetails',
    components: { Heading, Comments, Transmition, Chasis, Engine, GasStation, Accelerometer, Check },
    data() {
    return {
      car: null,
      
      loading: false,
      errorMsg: ''
    };
  },
  async created() {
    this.errorMsg = '';
    try{
      this.loading = true;
      console.log('ID del auto:', this.id);
    const carId = this.id;
    const carDoc = doc(db, 'cars', carId); 
      const carSnapshot = await getDoc(carDoc); 
      if (carSnapshot.exists()) {
        console.log('Documento encontrado:'), 
        this.car = carSnapshot.data(); 
        this.car.id = carSnapshot.id;
      }
    }catch(error){
      this.errorMsg = 'Hubo un error al obtener los detalles del auto. Volvé a intentar';
    }
    this.loading = false;
    
  }

}


</script>

<template>
  <div v-if="loading" class="flex items-center justify-center w-fit mx-auto bg-gray-50">
    <div role="status">
        <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
        <span class="sr-only">Cargando...</span>
    </div>
  </div>
<div v-if="car">
  <section class="py-8 bg-white md:py-16 antialiased">
    <div class="max-w-screen-xl px-4 mx-auto 2xl:px-0">
      <div class="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">

        <div class="shrink-0 max-w-md lg:max-w-lg mx-auto">
          <img class="w-full" src="/public/Car-Img.png" alt="" />
        </div>

        <div class="mt-6 sm:mt-8 lg:mt-0">
          <h1 class="text-2xl font-bold text-gray-900 sm:text-3xl">
            {{ car.marca }} {{ car.modelo }}, {{ car.año }}
          </h1>
          <div class="mt-4 sm:items-center sm:gap-4 sm:flex">
            <p class="text-2xl font-bold text-gray-900 sm:text-3xl">
              ${{ car.precio }} /día
            </p>
          </div>

          <div class="flex items-center gap-4 mt-4">
            <span class="flex items-center gap-2 w-fit bg-blue-100 py-1 px-2 rounded-full">
              <Check/>
              <p class="text-sm font-medium text-blue-800">
                <strong class="hidden md:inline">Estado:</strong>
                {{ car.estado }}
              </p>
            </span>

            <span class="flex items-center gap-2 w-fit bg-green-100 py-1 px-2 rounded-full">
              <Accelerometer/>
              <p class="text-sm font-medium text-green-800">
                <strong class="hidden md:inline">Kilometraje:</strong>
                {{ car.kilometraje }} km
              </p>
            </span>
          </div>

          <hr class="my-6 md:my-8 border-gray-200 " />

          <p class="mb-6 text-gray-500">
            {{ car.description }}
          </p>

          <ul class="flex flex-wrap gap-2 text-gray-600">
            <li class="flex items-center gap-2 w-fit bg-gray-200 py-2 px-4 rounded-full">
              <Engine/>
              <p class="text-md font-medium text-gray-500 ">
                <strong class="hidden md:inline">Motor:</strong>
                {{ car.motor }}
              </p>
            </li>

            <li class="flex items-center gap-2 w-fit bg-gray-200 py-2 px-4 rounded-full">
              <Chasis/>
              <p class="text-md font-medium text-gray-500 ">
                <strong class="hidden md:inline">Chasis:</strong>
                {{ car.chasis }}
              </p>
            </li>

            <li class="flex items-center gap-2 w-fit bg-gray-200 py-2 px-4 rounded-full">
              <Transmition/>
              <p class="text-md font-medium text-gray-500 ">
                <strong class="hidden md:inline">Transmisión:</strong>
                {{ car.transmision }}
              </p>
            </li> 

            <li class="flex items-center gap-2 w-fit bg-gray-200 py-2 px-4 rounded-full">
              <GasStation/>
              <p class="text-md font-medium text-gray-500 ">
                <strong class="hidden md:inline">Combustible:</strong>
                {{ car.combustible }}
              </p>
            </li> 
          </ul>

        </div>
      </div>
    </div>
    <Comments :carId="car.id" />
  </section>
</div>
<div v-else>
  <p>Cargando...</p>
</div>




</template>




