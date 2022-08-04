<template>
  <div
    class="text-center bg-gray-700 flex justify-between text-white h-10 items-center"
  >
    <div>
      <router-link :to="{ name: 'home' }" class="ml-5">AşilBoxD</router-link>
    </div>
    <div class="mr-5">
      <router-link class="mr-3.5" to="#">Films</router-link>
      <router-link class="mr-3.5" to="#">WatchList</router-link>
      <router-link to="#">Login</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderComponent",
};
</script>

<style scoped></style>
