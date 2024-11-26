<script>
import Reemo from '@icons/Reemo-white.vue';

export default {
  name: "FooterLayout",
  components: { Reemo },
};
</script>

<template>
  <footer class="shadow bg-zinc-900">
    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
      <div class="sm:flex sm:items-center sm:justify-between">
        <a href="#" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
          <span class="self-center text-white text-2xl font-semibold whitespace-nowrap">
            <Reemo />
          </span>
        </a>
        <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0">
          <li>
            <a class="hover:underline me-4 md:me-6">Sobre Reemo</a>
          </li>
          <li>
            <a class="hover:underline me-4 md:me-6">Beneficios</a>
          </li>
          <li>
            <a class="hover:underline me-4 md:me-6">Facilidades</a>
          </li>
          <li>
            <a class="hover:underline">Pagos</a>
          </li>
        </ul>
      </div>
      <hr class="my-6 border-gray-200 sm:mx-auto lg:my-8" />
      <span class="block text-sm text-gray-500 sm:text-center">
        © 2024 Reemo. Todos los derechos reservados.
      </span>
    </div>
  </footer>
</template>
