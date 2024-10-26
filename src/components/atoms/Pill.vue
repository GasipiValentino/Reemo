<script>
import Wifi from "../../icons/Wifi.vue";

export default {
  name: 'Pill',
  components: { Wifi },
  props: {
    accessory: {
      type: String,
      required: true,
      validator: (value) => {
        return [
          'bt', 'gps', 'wifi', 'revCam', 'parkSense', 'cruiseCtrl',
          'heatSeats', 'ac', 'sunroof', 'touchScreen', 'wirelessCharge',
          'soundSystem', 'abs', 'airbag', 'laneAssist', 'blindSpot', 'tractionCtrl'
        ].includes(value);
      },
    },
  },
  computed: {
    IconComponent() {
      switch (this.accessory) {
        case 'wifi':
          return Wifi;
        default:
          return null;
      }
    },
  },
};
</script>

<template>
  <div :class="`chip chip-${accessory}`">
    <span class="icon" v-if="IconComponent">
    <component :is="IconComponent" />
    </span>
    <span class="label"><slot></slot></span>
  </div>
</template>

<style scoped>
.chip {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0.5rem;
  background-color: #f0f0f0;
}

.chip-bluetooth {
  background-color: #e0f7fa;
  color: #00796b;
}

.chip-gps {
  background-color: #fff9c4;
  color: #fbc02d;
}

.chip-wifi {
  background-color: #e1f5fe;
  color: #0288d1;
}

.icon {
  margin-right: 0.5rem;
}
</style>  