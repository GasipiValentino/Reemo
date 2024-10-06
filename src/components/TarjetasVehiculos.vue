<script>


export default {
    name: 'TarjetasVehiculos',
    props: {
      car: {
        type: Object,
        required: true
      }
    },
    methods: {
      goToCarDetails(id) {
        this.$router.push({ name: 'CarDetails', params: { id: id } });
      }
    }
}


</script>

<template>
  <div class="rounded-lg p-12 shadow-sm max-w-lg">
    <div class="h-56 w-full">
      <img class="mx-auto h-full " src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg" alt="" />
      <img class="mx-auto hidden h-full " src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg" alt="" />
    </div>
    <div class="pt-6">
      <a href="#" class="text-lg font-semibold leading-tight text-gray-900 hover:underline "> {{ car.modelo }} {{ car.marca }}, {{ car.año }}</a>

      <ul class="mt-2 flex items-center gap-4">
        <svg class="h-4 w-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M8 7V6c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-1M3 18v-7c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
        </svg>
        <li class="flex items-center gap-2">
          <p class="text-sm font-medium text-gray-500 ">{{car.transmision}}</p>
        </li>

        <li class="flex items-center gap-2">
          <svg class="h-4 w-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M8 7V6c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-1M3 18v-7c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
          </svg>
          <p class="text-sm font-medium text-gray-500 ">{{ car.kilometraje }} km</p>
        </li>
      </ul>

      <div class="mt-4 flex items-center justify-between gap-4">
        <p class="text-2xl font-extrabold leading-tight text-gray-900 ">${{ car.precio }}45000</p>

        <button @click="goToCarDetails(car.id)" type="button" class="inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4  focus:ring-blue-300 ">
          Ver Detalles
        </button>        
      </div>

    </div>
  </div>

</template>