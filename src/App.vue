<template>
  <div class="bg-purple-100">
    <header-component></header-component>
    <router-view />
    <footer-component></footer-component>
  </div>
</template>
<script>
import HeaderComponent from "@/components/HeaderComponent";
import FooterComponent from "@/components/FooterComponent";

export default {
  name: "App",
  components: {
    HeaderComponent,
    FooterComponent,
  },
};
</script>
<style></style>
