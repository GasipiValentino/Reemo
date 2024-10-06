<script>
export default {
  name: 'Comments',
}
</script>


<template>

<div id="accordion-open" data-accordion="open">
  <h2 id="accordion-open-heading-1">
    <button type="button" class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl   hover:bg-gray-100 hover:text-black gap-3" data-accordion-target="#accordion-open-body-1" aria-expanded="true" aria-controls="accordion-open-body-1">
      <span class="flex items-center"><svg class="w-5 h-5 me-2 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg> ¿Es fácil alquilar mi auto?</span>
      <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
      </svg>
    </button>
  </h2>
  <div id="accordion-open-body-1" class="hidden" aria-labelledby="accordion-open-heading-1">
    <div class="p-5 border border-b-0 border-gray-200">
      <p class="mb-2 text-gray-500 ">Generar ingresos alquilando tu auto nunca fue tán fácil. Comenzá ahora <a href="Login" class="text-blue-600 0 hover:underline">iniciando sesión</a> o <a href="/Register" class="text-blue-600 0 hover:underline">creando una cuenta</a> para publicar tu vehículo. Recibirás un respuesta de tu petición en un lapso de 2 a 5 días</p>
    </div>
  </div>
  <h2 id="accordion-open-heading-2">
    <button type="button" class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200   hover:bg-gray-100 hover:text-black gap-3" data-accordion-target="#accordion-open-body-2" aria-expanded="false" aria-controls="accordion-open-body-2">
      <span class="flex items-center"><svg class="w-5 h-5 me-2 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>¿Qué necesito para usar un auto?</span>
      <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
      </svg>
    </button>
  </h2>
  <div id="accordion-open-body-2" class="hidden" aria-labelledby="accordion-open-heading-2">
    <div class="p-5 border border-b-0 border-gray-200 ">
        <p class="mb-2 text-gray-500 ">Cualquier persona con registro de conducir puede alquilar un auto. Solamente tenés que <a href="/Login" class="text-blue-600 0 hover:underline">iniciar sesión</a> o <a href="/Register" class="text-blue-600 0 hover:underline">crear una cuenta</a> para alquiler el vehículo de algún dueño. Recibirás un respuesta de tu petición en un lapso de 2 a 5 días</p>
    </div>
  </div>
  <h2 id="accordion-open-heading-3">
    <button type="button" class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200   hover:bg-gray-100 hover:text-black gap-3" data-accordion-target="#accordion-open-body-3" aria-expanded="false" aria-controls="accordion-open-body-3">
      <span class="flex items-center"><svg class="w-5 h-5 me-2 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg> ¿Necesito mucho tiempo para publicar un auto?</span>
      <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
      </svg>
    </button>
  </h2>
  <div id="accordion-open-body-3" class="hidden" aria-labelledby="accordion-open-heading-3">
    <div class="p-5 border border-t-0 border-gray-200 ">
      <p class="mb-2 text-gray-500 ">El proceso de creación de una publicación de auto no lleva más de 10 minutos. Ténes que ingresar datos del mismo, como la patente, kilometraje, marca, modelo, etc. Y depués de entre 2 a 5 días recibirás una respuesta positiva si los datos son correctos</p>
    </div>
  </div>
</div>

</template>