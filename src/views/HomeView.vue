<template>
  <div class="grid grid-cols-12">
    <div v-if="!loading" class="grid grid-rows-4 col-span-2">
      <filter-component class="row-auto"></filter-component>
    </div>
    <div class="col-span-10">
      <spinner-component :loading="loading"></spinner-component>
      <movie-list-component
        v-if="!loading"
        :movies="get_home_page_movies"
      ></movie-list-component>
    </div>
  </div>
</template>

<script>
import FilterComponent from "@/components/FilterComponent";
import MovieListComponent from "@/components/MovieListComponent";
import SpinnerComponent from "@/components/SpinnerComponent";
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "HomeView",
  components: {
    FilterComponent,
    MovieListComponent,
    SpinnerComponent,
  },
  data() {
    return {
      posterUrl: "https://image.tmdb.org/t/p/original",
      loading: false,
    };
  },
  methods: {
    get_data() {
      this.$store.state.homePageMovies = [];
      this.loading = true;
      axios
        .get(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.VUE_APP_API_KEY}`
        )
        .then((res) => {
          this.$store.state.homePageMovies = res.data.results;
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.loading = true;
        });
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
<style scoped>
.spinner {
  width: 100vw;
}
</style>
