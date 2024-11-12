<script>
export default {
  name: "GooglePlay",
};
</script>

<template>
  <a 
    class="playstore-button" 
    href="https://www.figma.com/proto/GEJQmePjhKuafxgkMD5wpB/Reemo?page-id=0%3A1&node-id=219-1128&node-type=canvas&viewport=-4397%2C3190%2C0.26&t=2n6JOIgAShmVTxGq-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=219%3A1128"      
    target="_blank"
    rel="noopener noreferrer">
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="icon" viewBox="0 0 512 512">
      <path d="M99.617 8.057a50.191 50.191 0 00-38.815-6.713l230.932 230.933 74.846-74.846L99.617 8.057zM32.139 20.116c-6.441 8.563-10.148 19.077-10.148 30.199v411.358c0 11.123 3.708 21.636 10.148 30.199l235.877-235.877L32.139 20.116zM464.261 212.087l-67.266-37.637-81.544 81.544 81.548 81.548 67.273-37.64c16.117-9.03 25.738-25.442 25.738-43.908s-9.621-34.877-25.749-43.907zM291.733 279.711L60.815 510.629c3.786.891 7.639 1.371 11.492 1.371a50.275 50.275 0 0027.31-8.07l266.965-149.372-74.849-74.847z"></path>
    </svg>
    <span class="texts">
      <span class="text-1">Disponible en</span>
      <span class="text-2 text-lg">Google Play</span>
    </span>
  </a>
</template>

<style scoped>
.playstore-button {
display: inline-flex;
align-items: center;
justify-content: center;
border: 2px solid #010440;
border-radius: 9999px;
background-color: rgb(255, 255, 255);
padding: 0.4rem 1.5rem;
text-align: center;
color: rgb(0, 0, 0);
outline: 0;
transition: all  .2s ease;
text-decoration: none;
}

.playstore-button:hover {
  background-color: #010440;
  color: rgb(255, 255, 255);
  transition: all  .2s ease;
  transform: translateY(-5px)
}

.icon {
  height: 1.5rem;
  width: 1.5rem;
}

.texts {
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 1;
}

.text-1 {
  margin-bottom: 0.25rem;
  font-size: 0.75rem;
  line-height: 1rem;
}

.text-2 {
  font-weight: 600;
}
</style>