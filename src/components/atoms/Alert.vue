<script>
import Success from "../../icons/Success.vue";
import Info from "../../icons/Info.vue";
import Warning from "../../icons/Warning.vue";
import Error from "../../icons/Error.vue";

export default {
  name: "Alert",
  components: { Success, Info, Warning, Error },
  props: {
    severity: {
      type: String,
      required: true,
      validator: (value) => ["success", "info", "warning", "error"].includes(value),
    },
    duration: {
      type: Number,
      default: 3000, // Duración en milisegundos antes de desaparecer
    },
  },
  data() {
    return {
      isVisible: true,
    };
  },
  computed: {
    IconComponent() {
      switch (this.severity) {
        case "success":
          return Success;
        case "info":
          return Info;
        case "warning":
          return Warning;
        case "error":
          return Error;
        default:
          return null;
      }
    },
  },
  mounted() {
    setTimeout(() => {
      this.isVisible = false; // Desactiva la alerta después del tiempo especificado
    }, this.duration);
  },
};
</script>

<template>
  <transition name="slide-fade">
    <div v-if="isVisible" class="alert-container">
      <div :class="`alert alert-${severity}`" role="alert">
        <span class="icon" v-if="IconComponent">
          <component :is="IconComponent" />
        </span>
        <span class="message"><slot /></span>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.alert-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%; /* Ocupa el ancho completo */
  display: flex;
  justify-content: center; /* Centra horizontalmente */
  align-items: flex-end; /* Alinea en la parte inferior */
  z-index: 1000;
}

.alert {
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  transition: all 0.5s linear;
}

/* Estilos de severidad */
.alert-success {
  background-color: #d4edda;
  color: #155724;
}

.alert-info {
  background-color: #cce5ff;
  color: #004085;
}

.alert-warning {
  background-color: #fff3cd;
  color: #856404;
}

.alert-error {
  background-color: #f8d7da;
  color: #721c24;
}

.icon {
  margin-right: 0.5rem;
}

/* Animación personalizada */
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.5s linear;
}

.slide-fade-enter {
  opacity: 0;
  transform: translateY(100%);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
</style>