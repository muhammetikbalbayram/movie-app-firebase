<template>
  <div class="bg-purple-100">
    <header-component></header-component>
    <router-view class="layout" />
    <footer-component></footer-component>
  </div>
</template>
<script>
import HeaderComponent from "@/components/HeaderComponent";
import FooterComponent from "@/components/FooterComponent";
import { getAuth } from "firebase/auth";

export default {
  name: "App",
  components: {
    HeaderComponent,
    FooterComponent,
  },
  computed: {},
  async created() {
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      this.$store.commit("updateUser", user);
      if (user) {
        this.$store.dispatch("getCurrentUser");
      }
    });
  },
};
</script>
<style>
.layout {
  min-height: calc(100vh - 176px);
}
.spinner {
  min-height: calc(100vh - 176px);
}
</style>
