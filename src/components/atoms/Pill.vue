<script>
import Bluetooth from "../../icons/Bluetooth.vue";
import GPS from "../../icons/GPS.vue";
import Wifi from "../../icons/Wifi.vue";
import RevCam from "../../icons/RevCam.vue";
import ParkSense from "../../icons/ParkSense.vue";
import CruiseCtrl from "../../icons/CruiseCtrl.vue";
import HeatSeat from "../../icons/HeatSeat.vue";
import AC from "../../icons/AC.vue";
import SunRoof from "../../icons/SunRoof.vue";
import TouchScreen from "../../icons/TouchScreen.vue";
import WirelessCharge from "../../icons/WirelessCharge.vue";
import SoundSystem from "../../icons/SoundSystem.vue";
import ABS from "../../icons/ABS.vue";
import AirBag from "../../icons/AirBag.vue";
import LaneAssist from "../../icons/LaneAssist.vue";
import BlindSpot from "../../icons/BlindSpot.vue";
import TractionCtrl from "../../icons/TractionCtrl.vue";

export default {
  name: 'Pill',
  components: { 
    Bluetooth, 
    GPS, 
    Wifi, 
    RevCam, 
    ParkSense, 
    CruiseCtrl, 
    HeatSeat, 
    AC, 
    SunRoof, 
    TouchScreen, 
    WirelessCharge, 
    SoundSystem, 
    ABS, 
    AirBag, 
    LaneAssist, 
    BlindSpot, 
    TractionCtrl 
  },
  props: {
    accessory: {
      type: String,
      required: true,
      validator: (value) => {
        return [
          'bt', 'gps', 'wifi', 'revCam', 'parkSense', 'cruiseCtrl',
          'heatSeat', 'ac', 'sunRoof', 'touchScreen', 'wirelessCharge',
          'soundSystem', 'abs', 'airbag', 'laneAssist', 'blindSpot', 'tractionCtrl'
        ].includes(value);
      },
    },
    name: {
      type: String,
      required: true,
    }
  },
  computed: {
    IconComponent() {
      switch (this.accessory) {
        case 'wifi':
          return Wifi;
        case 'gps':
          return GPS;
        case 'bt':
          return Bluetooth;
        case 'revCam':
          return RevCam;
        case 'parkSense':
          return ParkSense;
        case 'cruiseCtrl':
          return CruiseCtrl;
        case 'heatSeat':
          return HeatSeat;
        case 'ac':
          return AC;
        case 'sunRoof':
          return SunRoof;
        case 'touchScreen':
          return TouchScreen;
        case 'wirelessCharge':
          return WirelessCharge;
        case 'soundSystem':
          return SoundSystem;
        case 'abs':
          return ABS;
        case 'airbag':
          return AirBag;
        case 'laneAssist':
          return LaneAssist;
         case 'blindSpot':
          return BlindSpot;
        case 'tractionCtrl':
          return TractionCtrl;
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
    <span class="label">{{ name }}</span>
  </div>
</template>

<style scoped>
.chip {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem .5rem;
  border-radius: .5rem;
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0.5rem;
  background-color: #f0f0f0;
}

.icon {
  margin-right: 0.5rem;
}
</style>  