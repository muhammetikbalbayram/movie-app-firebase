<template>
  <div class="flex justify-center items-center">
    <dot-loader :loading="loading" :color="color" :size="size"></dot-loader>
  </div>
</template>

<script>
import DotLoader from "vue-spinner/src/DotLoader";
export default {
  name: "SpinnerComponent",
  components: {
    DotLoader,
  },
  props: ["loading"],
  data() {
    return {
      color: "#9333ea",
      size: "35px",
    };
  },
};
</script>

<style scoped></style>
