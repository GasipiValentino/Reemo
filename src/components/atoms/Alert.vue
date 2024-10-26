<script>
import Success from "../../icons/Success.vue";
import Info from "../../icons/Info.vue";
import Warning from "../../icons/Warning.vue";
import Error from "../../icons/Error.vue";

export default {
  name: 'Alert',
  components: { Success, Info, Warning, Error },
  props: {
    severity: {
      type: String,
      required: true,
      validator: (value) => {
        return ['success', 'info', 'warning', 'error'].includes(value);
      },
    },
  },
  computed: {
    IconComponent() {
      switch (this.severity) {
        case 'success':
          return Success;
        case 'info':
          return Info;
        case 'warning':
          return Warning;
        case 'error':
          return Error;
        default:
          return null;
      }
    },
  },
};
</script>

<template>
    <div :class="`alert alert-${severity}`" role="alert">
      <span class="icon" v-if="IconComponent">
        <component :is="IconComponent" />
      </span>
      <span class="message"><slot></slot></span>
    </div>
</template>

<style scoped>
.alert {
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
}

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
  margin-right: 0.5rem; /* Espacio entre el icono y el texto */
}
</style>