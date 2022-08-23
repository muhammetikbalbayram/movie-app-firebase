<template>
  <div class="grid grid-cols-5">
    <div class="grid grid-rows-3">
      <filter-component class=""></filter-component>
    </div>

    <div class="mt-10 mx-24 mb-24 col-span-4">
      <div class="flex flex-row flex-auto flex-wrap">
        <div
          v-for="(movie, index) in get_home_page_movies"
          :key="index"
          class="mr-3 text-center border border-gray-500 rounded-xl overflow-hidden w-52 mx-4 my-3 shadow shadow-md hover:shadow-xl"
        >
          <router-link :to="/movie/ + movie.id">
            <img
              class="h-64 w-52"
              :src="posterUrl + movie.poster_path"
              alt=""
            />
          </router-link>
          <div class="hover:text-gray-500">
            <router-link :to="/movie/ + movie.id">
              <div>{{ movie.title }}</div>
            </router-link>
            <div>({{ formatReleaseYear(movie.release_date) }})</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FilterComponent from "@/components/FilterComponent";
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "HomeView",
  components: {
    FilterComponent,
  },
  data() {
    return {
      posterUrl: "https://image.tmdb.org/t/p/original",
    };
  },
  methods: {
    get_data() {
      this.$store.state.homePageMovies = [];
      axios
        .get(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=66478fb024c9fe12aaaec062298c77a0`
        )
        .then((res) => (this.$store.state.homePageMovies = res.data.results));
    },
    formatReleaseYear(date) {
      return date.split("-")[0];
    },
  },
  created() {
    this.$store.state.homePageMovies = [];
    this.get_data();
    console.log(this.get_home_page_movies);
  },
  computed: {
    ...mapGetters(["get_home_page_movies"]),
  },
};
</script>
