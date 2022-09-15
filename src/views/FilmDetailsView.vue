<template>
  <div v-if="loading" class="spinner flex justify-center items-center">
    <dot-loader
      :loading="loading"
      :color="loader.color"
      :size="loader.size"
    ></dot-loader>
  </div>
  <div v-if="!loading">
    <div class="relative my-5">
      <div
        class="main-div bg-cover"
        :style="{
          'background-image': `url(${
            get_movie_images[0].file_path
              ? posterUrl + get_movie_images[0].file_path
              : posterUrl + get_movie_details.poster_path
          })`,
        }"
      ></div>

      <div class="flex absolute top-0 left-0">
        <div class="m-5">
          <img
            class="img rounded-md"
            :src="posterUrl + get_movie_details.poster_path"
            alt=""
          />
        </div>
        <div class="mt-5">
          <div class="flex">
            <div class="font-bold text-xl mr-5">
              {{ get_movie_details.title }} ({{
                formatReleaseYear(get_movie_details.release_date)
              }})
            </div>
            <div v-if="get_user">
              <button
                @click="toggleIsInWatchList"
                v-if="!isInWatchList"
                class="text center text-white text-sm rounded-full bg-purple-800 hover:bg-white hover:text-purple-500 mr-2 p-2"
              >
                Add Watchlist
                <i
                  class="fa-solid fa-list hover:text-purple-500 cursor-pointer"
                ></i>
              </button>
              <button
                @click="toggleIsInWatchList"
                v-show="isInWatchList"
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
                v-show="!isWatched"
                class="text center text-white text-sm rounded-full bg-purple-800 hover:bg-white hover:text-purple-500 p-2"
              >
                Add Watched Movies
                <i
                  class="fa-solid fa-plus hover:text-purple-500 cursor-pointer"
                ></i>
              </button>
              <button
                @click="toggleWatched"
                v-show="isWatched"
                class="h-8 w-8 text center text-xl rounded-full bg-purple-800 hover:bg-white mr-0.5"
              >
                <i
                  class="fa-solid fa-check text-white hover:text-purple-500 cursor-pointer"
                ></i>
              </button>
            </div>
          </div>

          <div>{{ movieRunTime }}</div>
          <div v-if="get_movie_details.budget > 0">
            {{ get_movie_details.budget.toLocaleString("en-US") }}$
          </div>
          <div class="flex">
            <div
              v-for="(genre, index) in get_movie_details.genres"
              :key="index"
            >
              {{
                index < get_movie_details.genres.length - 1
                  ? genre.name + ", "
                  : genre.name
              }}
            </div>
          </div>
          <div class="text-sm mt-5 mr-48">
            {{ get_movie_details.overview }}
          </div>
          <div class="flex justify-between mt-5 mr-5">
            <div class="flex flex-col items-center">
              <div>{{ get_movie_director_detail[0].job }}</div>
              <div class="font-bold">
                {{ get_movie_director_detail[0].name }}
              </div>
            </div>
            <div
              v-show="get_movie_crew_credits.length > 0"
              v-for="(crew, index) in get_movie_crew_credits.slice(0, 5)"
              :key="index"
              class="flex flex-col items-center"
            >
              <div>{{ crew.job }}</div>
              <div class="font-bold">{{ crew.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="ml-3 font-bold">
      <h1>CAST</h1>
    </div>

    <div class="flex flex-wrap">
      <div
        class="ml-3 my-5 border border-gray-900 rounded-lg hover:shadow-xl"
        v-for="(cast, index) in get_movie_cast_credits.slice(0, 9)"
        :key="index"
      >
        <div class="">
          <router-link :to="/cast/ + cast.id">
            <img
              class="img-cast rounded-t-lg"
              :src="posterUrl + cast.profile_path"
              alt=""
            />
          </router-link>
          <div class="text-center">
            <router-link :to="/cast/ + cast.id">
              <div class="mt-1 font-bold hover:text-gray-600">
                {{
                  cast.name.length > 14
                    ? cast.name.substring(0, 15) + "..."
                    : cast.name
                }}
              </div>
            </router-link>
            <div class="text-sm italic">
              {{
                cast.character.length > 14
                  ? cast.character.substring(0, 15) + "..."
                  : cast.character
              }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="ml-3 font-bold">
      <h1>SIMILAR MOVIES</h1>
    </div>

    <div class="flex flex-wrap">
      <div
        class="ml-3 my-5 border border-gray-900 rounded-lg hover:shadow-xl"
        v-for="(movie, index) in get_similar_movies.slice(0, 9)"
        :key="index"
      >
        <div class="">
          <router-link :to="/movie/ + movie.id">
            <img
              class="img-movie rounded-t-lg"
              :src="posterUrl + movie.poster_path"
              alt=""
            />
          </router-link>
          <div class="text-center">
            <router-link :to="/movie/ + movie.id">
              <div class="title mt-1 font-bold hover:text-gray-600">
                {{
                  movie.title.length > 12
                    ? movie.title.substring(0, 12) + "..."
                    : movie.title
                }}
              </div>
            </router-link>
            <div class="text-sm italic">
              {{ formatReleaseDate(movie.release_date) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "FilmDetailsView",
  data() {
    return {
      posterUrl: "https://image.tmdb.org/t/p/original",
      isInWatchList: false,
      isWatched: false,
      loading: false,
      loader: {
        color: "#395b64",
        size: "35px",
      },
    };
  },
  watch: {
    paramsId(newValue, oldValue) {
      this.getData();
      console.log(oldValue, newValue);
    },
  },
  methods: {
    setMovieDetailsData() {
      this.$store.state.movieCastCredits = [];
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${this.paramsId}?api_key=${process.env.VUE_APP_API_KEY}`
        )
        .then((res) => (this.$store.state.movieDetails = res.data));
    },
    setCastCreditData() {
      this.$store.state.movieCastCredits = [];
      this.$store.state.movieCrewCredits = [];
      this.$store.state.movieDirectorDetail = [];
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${this.paramsId}/credits?api_key=${process.env.VUE_APP_API_KEY}`
        )
        .then((res) => {
          this.$store.state.movieCastCredits = res.data.cast;
          this.$store.state.movieDirectorDetail = res.data.crew.filter(
            (item) => item.job == "Director"
          );
          this.$store.state.movieCrewCredits = res.data.crew.filter(
            (item) => item.job == "Producer"
          );
        });
    },
    setMovieImages() {
      this.$store.state.movieImages = [];
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${this.paramsId}/images?api_key=${process.env.VUE_APP_API_KEY}`
        )
        .then((res) => (this.$store.state.movieImages = res.data.backdrops));
    },
    setSimilarMovies() {
      this.$store.state.similarMovies = [];
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${this.paramsId}/similar?api_key=${process.env.VUE_APP_API_KEY}`
        )
        .then((res) => (this.$store.state.similarMovies = res.data.results));
    },
    getData() {
      this.loading = true;
      this.setMovieDetailsData();
      this.setCastCreditData();
      this.setMovieImages();
      this.setSimilarMovies();
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
    toggleWatched() {
      this.isWatched = !this.isWatched;
    },
    toggleIsInWatchList() {
      this.isInWatchList = !this.isInWatchList;
    },
    formatReleaseYear(date) {
      return date.split("-")[0];
    },
    formatReleaseDate(date) {
      let releaseDate = date.split("-").reverse();
      return releaseDate[0] + "/" + releaseDate[1] + "/" + releaseDate[2];
    },
  },
  created() {
    this.getData();
  },
  computed: {
    ...mapGetters([
      "get_movie_details",
      "get_movie_cast_credits",
      "get_movie_crew_credits",
      "get_movie_images",
      "get_similar_movies",
      "get_movie_director_detail",
      "get_user",
    ]),
    movieRunTime() {
      let runTime = this.get_movie_details.runtime;
      return runTime + " min";
    },
    paramsId() {
      return this.$route.params.id;
    },
  },
};
</script>

<style scoped>
.img {
  height: 450px;
  min-width: 300px;
}
.img-cast {
  height: 175px;
  min-width: 138px;
}
.main-div {
  width: 1519px;
  height: 489px;
  opacity: 0.3;
}
#img-film {
  width: 1519px;
  height: 489px;
  opacity: 0.5;
}

.img-movie {
  height: 175px;
  min-width: 138px;
}
</style>
