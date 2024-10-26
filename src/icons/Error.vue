<script>
export default {
  name: "Error",
};
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" 
    x-bind:width="size" 
    x-bind:height="size" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    x-bind:stroke-width="stroke" 
    stroke-linecap="round" 
    stroke-linejoin="round" 
    width="32" 
    height="32" 
    stroke-width="2">
    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
    <path d="M12 9v4"></path>
    <path d="M12 16v.01"></path>
  </svg>
</template>
