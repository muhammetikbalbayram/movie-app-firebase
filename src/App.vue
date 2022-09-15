<template>
  <div class="app-bg-color">
    <header-component v-if="!navigation"></header-component>
    <router-view class="layout" />
    <footer-component v-if="!navigation"></footer-component>
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
  data() {
    return {
      navigation: false,
    };
  },
  methods: {
    checkRoute() {
      if (
        this.$route.name === "login" ||
        this.$route.name === "register" ||
        this.$route.name === "forgot-password"
      ) {
        this.navigation = true;
        return;
      }
      this.navigation = false;
    },
  },
  computed: {},
  async created() {
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      this.$store.commit("updateUser", user);
      console.log(this.$store.state.user);
      if (user) {
        this.$store.dispatch("getCurrentUser");
      }
    });
    this.checkRoute();
  },
  watch: {
    $route() {
      this.checkRoute();
    },
  },
};
</script>
<style>
.layout {
  min-height: calc(100vh - 176px);
}
.app-bg-color {
  background-color: #e7f6f2;
}
.spinner {
  min-height: calc(100vh - 176px);
}
</style>
