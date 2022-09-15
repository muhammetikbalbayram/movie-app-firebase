<template>
  <div
    class="relative mr-3 text-center border border-gray-500 rounded-xl overflow-hidden w-52 mx-4 my-3 shadow shadow-md hover:shadow-xl"
  >
    <router-link :to="/movie/ + movie.id">
      <img class="h-64 w-52" :src="posterUrl + movie.poster_path" alt="" />
    </router-link>
    <div class="absolute top-2.5 right-1.5 flex">
      <div v-if="get_user">
        <button
          @click="toggleIsInWatchList"
          v-if="!isInWatchList"
          class="h-8 w-8 text center text-xl rounded-full mr-0.5"
        >
          <i class="fa-solid fa-list cursor-pointer"></i>
        </button>
        <button
          v-if="isInWatchList"
          class="h-8 w-8 text center text-xl rounded-full mr-0.5"
        >
          <i class="fa-solid fa-check cursor-pointer"></i>
        </button>
      </div>
      <div v-if="get_user">
        <button
          @click="toggleWatched"
          v-if="!isWatched"
          class="h-8 w-8 text center text-xl rounded-full"
        >
          <i class="fa-solid fa-plus cursor-pointer"></i>
        </button>
        <button
          v-if="isWatched"
          class="h-8 w-8 text center text-xl rounded-full mr-0.5"
        >
          <i class="fa-solid fa-check cursor-pointer"></i>
        </button>
      </div>
    </div>

    <div class="hover:text-gray-500">
      <router-link :to="/movie/ + movie.id">
        <div>{{ movie.title }}</div>
      </router-link>
      <div>({{ formatReleaseYear(movie.release_date) }})</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MovieComponent",
  props: ["movie"],
  data() {
    return {
      posterUrl: "https://image.tmdb.org/t/p/original",
      isInWatchList: false,
      isWatched: false,
    };
  },
  methods: {
    toggleWatched() {
      this.isWatched = !this.isWatched;
      console.log(this.movie);
    },
    toggleIsInWatchList() {
      this.isInWatchList = !this.isInWatchList;
      console.log(this.movie);
    },
    formatReleaseYear(date) {
      return date.split("-")[0];
    },
  },
  computed: {
    ...mapGetters(["get_user"]),
  },
};
</script>

<style scoped>
button {
  background-color: #395b64;
  color: #e7f6f2;
}

button:hover {
  background-color: white;
  color: #395b64;
}
</style>
