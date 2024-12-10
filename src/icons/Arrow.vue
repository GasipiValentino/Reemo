<script>
export default {
  name: "Arrow",
  props: {
    direction: {
      type: String,
      default: "right",
      validator(value) {
        return ["right", "down", "left", "up"].includes(value);
      },
    },
  },
  computed: {
    rotationClass() {
      const rotations = {
        right: "rotate-0",
        down: "rotate-90",
        left: "rotate-180",
        up: "-rotate-90",
      };
      return rotations[this.direction] || "rotate-0";
    },
  },
};
</script>

<template>
  <svg
    :class="['w-3 h-3 tranform transition-transform duration-300', rotationClass]"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 8 14"
  >
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
    ></path>
  </svg>
</template>
