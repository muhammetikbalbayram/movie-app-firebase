<template>
  <div
    class="bottom-0 left-0 w-full text-center text-white h-24 bg-gradient-to-t from-purple-600 to-purple-900 flex justify-between items-center"
  >
    <div>
      <router-link class="ml-5" :to="{ name: 'home' }">AşilBoxD</router-link>
    </div>
    <div>Copyrighted 2022</div>
    <div class="mr-5">
      <div>Instagram</div>
      <div>Twitter</div>
      <div>Facebook</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterComponent",
};
</script>

<style scoped></style>
