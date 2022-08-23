<template>
  <div>
    <div class="flex bg-gray-300 my-5">
      <div class="m-5">
        <img
          class="img rounded-md"
          :src="posterUrl + get_movie_details.poster_path"
          alt=""
        />
      </div>
      <div class="mt-5">
        <div class="font-bold text-xl">
          {{ get_movie_details.title }} ({{
            formatReleaseYear(get_movie_details.release_date)
          }})
        </div>
        <div>{{ movieRunTime }}</div>
        <div class="flex">
          <div v-for="(genre, index) in get_movie_details.genres" :key="index">
            {{ genre.name }}
          </div>
        </div>
        <div class="text-sm mt-5 mr-48">
          {{ get_movie_details.overview }}
        </div>
        <div class="flex justify-between mt-5 mr-5">
          <div>Director</div>
          <div>director</div>
          <div>director</div>
        </div>
      </div>
    </div>

    <div class="ml-3 font-bold">
      <h1>CAST</h1>
    </div>

    <div class="flex flex-wrap">
      <div
        class="ml-3 my-5 border border-gray-900 rounded-lg hover:shadow-xl"
        v-for="(cast, index) in get_movie_cast_credits.slice(0, 10)"
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
                  cast.name.length > 14 ? cast.name.substring(0, 15) : cast.name
                }}
              </div>
            </router-link>
            <div class="text-sm italic">
              {{
                cast.character.length > 14
                  ? cast.character.substring(0, 15)
                  : cast.character
              }}
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
    };
  },
  methods: {
    setMovieDetailsData() {
      this.$store.state.movieCastCredits = [];
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${this.$route.params.id}?api_key=66478fb024c9fe12aaaec062298c77a0`
        )
        .then((res) => (this.$store.state.movieDetails = res.data));
    },
    setCastCreditData() {
      this.$store.state.movieCastCredits = [];
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${this.$route.params.id}/credits?api_key=66478fb024c9fe12aaaec062298c77a0`
        )
        .then((res) => (this.$store.state.movieCastCredits = res.data.cast));
    },
    setCrewCreditData() {
      this.$store.state.movieCrewCredits = [];
    },
    formatReleaseYear(date) {
      return date.split("-")[0];
    },
  },
  created() {
    this.setMovieDetailsData();
    this.setCastCreditData();
    this.setCrewCreditData();
  },
  computed: {
    ...mapGetters([
      "get_movie_details",
      "get_movie_cast_credits",
      "get_movie_crew_credits",
    ]),
    movieRunTime() {
      let runTime = this.get_movie_details.runtime;
      return runTime + " min";
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
  opacity: 0.5;
}
#img-film {
  width: 1519px;
  height: 489px;
  opacity: 0.5;
}
</style>
