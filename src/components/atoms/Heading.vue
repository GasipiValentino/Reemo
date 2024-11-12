<script>
export default {
  name: "Heading",
  props: {
    type: {
      type: [Number, String],
      default: 1,
      validator(value) {
        return [1, 2, 3, 4, 5, 6].includes(Number(value));
      },
    },
  },
  computed: {
    tag() {
      return `h${this.type}`;
    },
    textSize() {
      // Establece tamaños de texto según el tipo de encabezado
      return {
        1: "text-3xl mb-4 sm:text-4xl",
        2: "text-3xl mb-3 sm:text-2xl",
        3: "text-2xl mb-2 sm:text-xl",
        4: "text-xl mb-1 sm:text-lg",
        5: "text-lg mb-0.5 sm:text-md",
        6: "text-base",
      }[this.type];
    },
  },
};
</script>
<template>
  <component :is="tag" :class="`${textSize} font-bold text-gray-900 `">
    <slot />
  </component>
</template>