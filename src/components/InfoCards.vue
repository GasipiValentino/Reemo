<script>
export default {
  name: 'InfoCards',
}
</script>

<template>
<section class="bg-white ">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
        <div class="bg-gray-50  border-gray-200  rounded-lg p-8 md:p-12 mb-8">
            <span class="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md  mb-2">
                Prestar
            </span>
            <h1 class="text-gray-900  text-3xl md:text-5xl font-extrabold mb-2">¿Es fácil alquilar mi auto?</h1>
            <p class="text-lg font-normal text-gray-500  mb-6">Generar ingresos alquilando tu auto nunca fue tán fácil. Comenzá ahora <a href="/#Login" class="text-blue-600 0 hover:underline">iniciando sesión</a> o <a href="/#Register" class="text-blue-600 0 hover:underline">creando una cuenta</a> para publicar tu vehículo. Recibirás un respuesta de tu petición en un lapso de 2 a 5 días</p>
            <a href="/#Publish" class="inline-flex justify-center items-center py-2.5 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 ">
                Publicar 
                <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </a>
        </div>
        <div class="grid md:grid-cols-2 gap-8">
            <div class="bg-gray-50  border border-gray-200  rounded-lg p-8 md:p-12">
                <span class="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md  mb-2">

                    Alquilar
                </span>
                <h2 class="text-gray-900  text-3xl font-extrabold mb-2">¿Qué necesito para usar un auto?</h2>
                <p class="text-lg font-normal text-gray-500  mb-4">Cualquier persona con registro de conducir puede alquilar un auto. Solamente tenés que <a href="/Login" class="text-blue-600 0 hover:underline">iniciar sesión</a> o <a href="/Register" class="text-blue-600 0 hover:underline">crear una cuenta</a> para alquiler el vehículo de algún dueño. Recibirás un respuesta de tu petición en un lapso de 2 a 5 días</p>
            </div>
            <div class="bg-gray-50  border border-gray-200  rounded-lg p-8 md:p-12">
              <span class="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md  mb-2">
                General
            </span>
                <h2 class="text-gray-900  text-3xl font-extrabold mb-2">¿Necesito mucho tiempo para publicar un auto?</h2>
                <p class="text-lg font-normal text-gray-500  mb-4">El proceso de creación de una publicación de auto no lleva más de 10 minutos. Ténes que ingresar datos del mismo, como la patente, kilometraje, marca, modelo, etc. Y depués de entre 2 a 5 días recibirás una respuesta positiva si los datos son correctos</p>
            </div>
        </div>
    </div>
</section>


</template>