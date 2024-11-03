<script>
import Heading from "../components/atoms/Heading.vue";
import Pill from '../components/atoms/Pill.vue';

export default {
  name: "Home",
  components: { Heading, Pill },
};
</script>

<template>
    <section
    class="flex items-center mx-auto min-h-96 gap-x-8 flex-wrap max-w-5xl mt-6 px-4"
  >
    <div class="order-1 md:order-2 max-w-md mx-auto mb-6">
      <div class="img">
        <img src="../assets/home.webp" alt="Auto" class="rounded-lg" />
      </div>
    </div>
    <div class="mx-auto max-w-lg order-2 md:order-1 mb-6">
      <Heading :type="1" class="mb-8 text-center sm:text-5xl lg:text-left">
        Bienvenidos a <b>Reemo</b>!
      </Heading>
      <p class="text-center lg:text-left">
        Con Reemo tenés la posibilidad de ganar dinero alquilando tu propio
        auto, o también podes solicitar su tenencia por un tiempo específico por
        un precio accesible
        <span class="font-bold mb-8"
          >¡Generá ingresos o movete libremente!</span
        >
      </p>
      <a
        href="/#Publications"
        class="block mt-8 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >Ver Autos</a
      >
    </div>
  </section>
  <a href="/#Publish" class="my-14"
    ><img
      class="hidden lg:block h-auto mb-8 max-w-5xl rounded-lg mx-auto"
      src="../assets/banner.jpg"
      alt="banner de rent car"
  /></a>
  <section class="bg-white mb-12 max-w-6xl mx-auto">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
      <div class="bg-gray-50 border-gray-200 rounded-lg p-8 md:p-12 mb-8">
        <span
          class="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md mb-2"
        >
          Prestar
        </span>
        <h1 class="text-gray-900 text-3xl md:text-5xl font-extrabold mb-2">
          ¿Es fácil alquilar mi auto?
        </h1>
        <p class="text-lg font-normal text-gray-500 mb-6">
          Generar ingresos alquilando tu auto nunca fue tán fácil. Comenzá ahora
          <a href="/#Login" class="text-blue-600 0 hover:underline"
            >iniciando sesión</a
          >
          o
          <a href="/#Register" class="text-blue-600 0 hover:underline"
            >creando una cuenta</a
          >
          para publicar tu vehículo. Recibirás un respuesta de tu petición en un
          lapso de 2 a 5 días
        </p>
        <a
          href="/#Publish"
          class="inline-flex justify-center items-center py-2.5 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
        >
          Publicar
          <svg
            class="w-3.5 h-3.5 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
      <div class="grid md:grid-cols-2 gap-8">
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-8 md:p-12">
          <span
            class="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md mb-2"
          >
            Alquilar
          </span>
          <h2 class="text-gray-900 text-3xl font-extrabold mb-2">
            ¿Qué necesito para usar un auto?
          </h2>
          <p class="text-lg font-normal text-gray-500 mb-4">
            Cualquier persona con registro de conducir puede alquilar un auto.
            Solamente tenés que
            <a href="/Login" class="text-blue-600 0 hover:underline"
              >iniciar sesión</a
            >
            o
            <a href="/Register" class="text-blue-600 0 hover:underline"
              >crear una cuenta</a
            >
            para alquiler el vehículo de algún dueño. Recibirás un respuesta de
            tu petición en un lapso de 2 a 5 días
          </p>
        </div>
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-8 md:p-12">
          <span
            class="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md mb-2"
          >
            General
          </span>
          <h2 class="text-gray-900 text-3xl font-extrabold mb-2">
            ¿Necesito mucho tiempo para publicar un auto?
          </h2>
          <p class="text-lg font-normal text-gray-500 mb-4">
            El proceso de creación de una publicación de auto no lleva más de 10
            minutos. Ténes que ingresar datos del mismo, como la patente,
            kilometraje, marca, modelo, etc. Y depués de entre 2 a 5 días
            recibirás una respuesta positiva si los datos son correctos
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
