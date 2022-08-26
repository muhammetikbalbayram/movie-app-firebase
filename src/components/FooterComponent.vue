<template>
  <div
    class="bottom-0 left-0 w-full text-center text-white h-24 bg-gradient-to-t from-purple-600 to-purple-900 flex justify-between items-center"
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

<style scoped></style>
