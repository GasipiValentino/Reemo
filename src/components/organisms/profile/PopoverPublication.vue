<script>
export default {
  name: "PopoverPublication",
  data() {
    return {
      isVisible: false,
    };
  },
  methods: {
    togglePopover() {
      this.isVisible = !this.isVisible;
    },
    handleClickOutside(event) {
      if (this.$refs.popover && !this.$refs.popover.contains(event.target) && !this.$el.contains(event.target)) {
        this.isVisible = false;
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  unmounted() {
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>

<template>
    <div class="relative inline-block">
        <button @click="togglePopover">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256"><path fill="currentColor" d="M112 60a16 16 0 1 1 16 16a16 16 0 0 1-16-16m16 52a16 16 0 1 0 16 16a16 16 0 0 0-16-16m0 68a16 16 0 1 0 16 16a16 16 0 0 0-16-16"/></svg>
        </button>
      <div
        v-if="isVisible"
        ref="popover"
        class="absolute w-64 mt-2 text-sm text-gray-500 bg-white border border-gray-200 rounded-lg shadow-lg dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
      >
        <div class="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
          <h3 class="font-semibold text-gray-900 dark:text-white">Acciones</h3>
        </div>
        <div class="px-3 py-2"> <!-- Le podemos agregar @click="togglePopover" para que se cierre cuando se toca, pero si toca fuera de algun boton se cierra igual.
            Tenemos que agregar avisos antes de borrar por ejemplo -->
            <slot></slot>
        </div>
        <div class="absolute left-1/2 transform -translate-x-1/2 -top-2 w-3 h-3 bg-white border-t border-l border-gray-200 rotate-45 dark:bg-gray-800 dark:border-gray-600"></div>
      </div>
    </div>
  </template>
  

  