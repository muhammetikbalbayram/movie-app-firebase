<template>
  <div
    class="text-center bg-gradient-to-b from-purple-600 to-purple-900 flex justify-between h-20 items-center"
  >
    <div class="text-white hover:text-gray-400 ml-24">
      <router-link :to="{ name: 'home' }" class="ml-5">AşilBoxD</router-link>
    </div>
    <div class="mr-24 flex">
      <div class="flex items-center justify-center mr-3.5">
        <div class="flex border-2 border-gray-200 rounded bg-black">
          <input
            type="text"
            class="px-4 py-2 w-48 h-6"
            placeholder="Search..."
            v-model="search"
            @keyup.enter="searchFilms"
          />
          <button
            @click="searchFilms"
            class="px-4 text-white bg-gray-600 border-l"
          >
            Search
          </button>
        </div>
      </div>
      <div class="text-white flex">
        <router-link
          class="mr-3.5 flex flex-col z-50"
          to="#"
          @click="toggleShow"
          >Films
        </router-link>
        <router-link class="mr-3.5" to="#">Lists</router-link>
        <router-link class="mr-3.5" to="#">WatchList</router-link>
        <router-link :to="{ name: 'login' }">Login</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";

export default {
  name: "HeaderComponent",
  data() {
    return {
      search: "",
      showDropdown: false,
    };
  },
  methods: {
    searchFilms() {
      this.$store.state.homePageMovies = [];
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=66478fb024c9fe12aaaec062298c77a0&query=${this.search}`
        )
        .then((res) => (this.$store.state.homePageMovies = res.data.results));
      this.search = "";
      router.push({ name: "home" });
      console.log(this.$store.state.homePageMovies);
    },
    toggleShow() {
      this.showDropdown = !this.showDropdown;
    },
  },
};
</script>

<style scoped></style>
