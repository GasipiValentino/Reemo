<script>
export default {
  name: 'HomeLayout',
}
</script>

<template>
    <section class="flex items-center mx-auto min-h-96 min-h-max gap-x-8 flex-wrap max-w-5xl mt-6 px-4">
        <div class="mx-auto max-w-lg order-2 md:order-1 mb-6">
            <h2 class="text-5xl mb-8  text-center lg:text-left"> Bienvenidos a <b>Reemo</b>! </h2>
            <p class=" text-center lg:text-left">Con Reemo tenés la posibilidad de ganar dinero alquilando tu propio auto, o también podes solicitar su tenencia por un tiempo específico por un precio accesible
            <span class="font-bold mb-8">¡Generá ingresos o movete libremente!</span></p>
            <a href="/#Publications" class="block mt-8 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">Ver Autos</a>
        </div>

        <div class="order-1 md:order-2 max-w-md mx-auto mb-6">
            <div class="img">
                <img src="/public/home.webp" alt="Auto" class="rounded-lg" />
            </div>
        </div>
    </section>
</template>