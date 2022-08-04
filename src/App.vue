<template>
  <header-component></header-component>
  <router-view />
  <footer-component></footer-component>
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
