<template>
  <div class="grid grid-cols-12">
    <div class="grid grid-rows-3 col-span-2">
      <filter-component class="row-span-1"></filter-component>
    </div>
    <div class="col-span-10">
      <div class="spinner-home flex justify-center items-center" v-if="loading">
        <div>
          <dot-loader
            :loading="loading"
            :color="loader.color"
            :size="loader.size"
          ></dot-loader>
        </div>
      </div>
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
      loading: false,
      loader: {
        color: "#9333ea",
        size: "35px",
      },
    };
  },
  watch: {},
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
        });
    },
  },
  created() {
    this.$store.state.homePageMovies = [];
    setTimeout(() => {
      this.get_data();
    }, 250);

    //console.log(this.get_home_page_movies);
  },
  computed: {
    ...mapGetters(["get_home_page_movies"]),
  },
};
</script>
<style scoped>
.spinner-home {
  min-height: 90vh;
}
</style>
