<script>
export default {
  name: "LongArrow",
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
  <svg xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="25" 
    viewBox="0 0 24 25" 
    fill="none">
  <path d="M20.717 13.56C20.9979 13.2788 21.1557 12.8975 21.1557 12.5C21.1557 12.1025 20.9979 11.7213 20.717 11.44L15.061 5.78103C14.7796 5.49964 14.3979 5.34155 14 5.34155C13.602 5.34155 13.2204 5.49964 12.939 5.78103C12.6576 6.06243 12.4995 6.44408 12.4995 6.84203C12.4995 7.23999 12.6576 7.62164 12.939 7.90303L16.035 11L4.49999 11C4.10216 11 3.72064 11.1581 3.43933 11.4394C3.15803 11.7207 2.99999 12.1022 2.99999 12.5C2.99999 12.8979 3.15803 13.2794 3.43933 13.5607C3.72064 13.842 4.10216 14 4.49999 14L16.035 14L12.939 17.096C12.7997 17.2354 12.6891 17.4008 12.6137 17.5828C12.5383 17.7649 12.4995 17.96 12.4995 18.157C12.4995 18.3541 12.5383 18.5492 12.6137 18.7312C12.6891 18.9133 12.7997 19.0787 12.939 19.218C13.0783 19.3574 13.2437 19.4679 13.4258 19.5433C13.6078 19.6187 13.8029 19.6575 14 19.6575C14.197 19.6575 14.3922 19.6187 14.5742 19.5433C14.7562 19.4679 14.9217 19.3574 15.061 19.218L20.717 13.56Z" 
    fill="white"/>
  </svg>
</template>
