<template>
  <div class="grid grid-cols-5">
    <div class="grid grid-rows-3">
      <filter-component class=""></filter-component>
    </div>
    <movie-list-component
      class="col-span-4"
      :movies="get_home_page_movies"
    ></movie-list-component>
  </div>
</template>

<script>
import FilterComponent from "@/components/FilterComponent";
import MovieListComponent from "@/components/MovieListComponent";
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "HomeView",
  components: {
    FilterComponent,
    MovieListComponent,
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
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.VUE_APP_API_KEY}`
        )
        .then((res) => (this.$store.state.homePageMovies = res.data.results));
    },
  },
  created() {
    this.$store.state.homePageMovies = [];
    setTimeout(() => {
      this.get_data();
    }, 250);

    console.log(this.get_home_page_movies);
  },
  computed: {
    ...mapGetters(["get_home_page_movies"]),
  },
};
</script>
<style scoped></style>
