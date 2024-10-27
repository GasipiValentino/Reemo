<script>
export default {
  name: "LaneAssist",
};
</script>

<template>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    x-bind:width="size" 
    x-bind:height="size" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    x-bind:stroke-width="stroke" 
    stroke-linecap="round" 
    stroke-linejoin="round" 
    width="16" 
    height="16" 
    stroke-width="2">
    <path d="M4 19l4 -14"></path>
    <path d="M16 5l4 14"></path>
    <path d="M12 8v-2"></path>
    <path d="M12 13v-2"></path>
    <path d="M12 18v-2"></path>
  </svg>
</template>
