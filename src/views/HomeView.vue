<template>
  <div class="flex">
    <genre-component class="filter-comp"></genre-component>
    <div class="home-comp">
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
import GenreComponent from "@/components/GenreComponent";
import MovieListComponent from "@/components/MovieListComponent";
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "HomeView",
  components: {
    GenreComponent,
    MovieListComponent,
  },
  data() {
    return {
      posterUrl: "https://image.tmdb.org/t/p/original",
      loading: false,
      loader: {
        color: "#395b64",
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
.filter-comp {
  flex: 1;
  max-height: 616px;
}
.home-comp {
  flex: 6;
}
</style>
