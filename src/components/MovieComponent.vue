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
          class="h-8 w-8 text center text-xl rounded-full bg-purple-800 hover:bg-white mr-0.5"
        >
          <i
            class="fa-solid fa-list text-white hover:text-purple-500 cursor-pointer"
          ></i>
        </button>
        <button
          v-if="isInWatchList"
          class="h-8 w-8 text center text-xl rounded-full bg-purple-800 hover:bg-white mr-0.5"
        >
          <i
            class="fa-solid fa-check text-white hover:text-purple-500 cursor-pointer"
          ></i>
        </button>
      </div>
      <div v-if="get_user">
        <button
          @click="toggleWatched"
          v-if="!isWatched"
          class="h-8 w-8 text center text-xl rounded-full bg-purple-800 hover:bg-white"
        >
          <i
            class="fa-solid fa-plus text-white hover:text-purple-500 cursor-pointer"
          ></i>
        </button>
        <button
          v-if="isWatched"
          class="h-8 w-8 text center text-xl rounded-full bg-purple-800 hover:bg-white mr-0.5"
        >
          <i
            class="fa-solid fa-check text-white hover:text-purple-500 cursor-pointer"
          ></i>
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

<style scoped></style>
