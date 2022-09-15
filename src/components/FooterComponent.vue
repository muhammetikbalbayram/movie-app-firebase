<template>
  <div
    class="bottom-0 left-0 w-full text-center text-white h-24 flex justify-between items-center footer"
  >
    <div>
      <router-link class="ml-5" :to="{ name: 'home' }"
        ><i class="fa-solid fa-clapperboard mr-1.5"></i>AşilBoxD</router-link
      >
    </div>
    <div>Copyrighted 2022</div>
    <div class="mr-5">
      <div><i class="fa-brands fa-instagram mr-1.5"></i>Instagram</div>
      <div><i class="fa-brands fa-twitter mr-1.5"></i>Twitter</div>
      <div><i class="fa-brands fa-facebook mr-1.5"></i>Facebook</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterComponent",
};
</script>

<style scoped>
.footer {
  background-color: #395b64;
}
</style>
