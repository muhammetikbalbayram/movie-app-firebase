<template>
  <div v-if="loading" class="spinner flex justify-center items-center">
    <dot-loader
      :loading="loading"
      :color="loader.color"
      :size="loader.size"
    ></dot-loader>
  </div>
  <div v-if="!loading">
    <div class="flex bg-purple-300 my-5">
      <div class="m-5">
        <img
          class="img rounded-md"
          :src="posterUrl + get_cast_detail.profile_path"
          alt=""
        />
      </div>
      <div class="mt-5">
        <div class="font-bold text-xl">
          {{ get_cast_detail.name }}
        </div>

        <div>
          <div class="inline">
            {{
              get_cast_detail.birthday
                ? formatBirth(get_cast_detail.birthday)
                : "No Birthday Information"
            }}
            <div class="inline" v-if="get_cast_detail.deathday">
              -
              {{
                get_cast_detail.deathday
                  ? formatBirth(get_cast_detail.deathday)
                  : "No Deathday Information"
              }}
            </div>
          </div>
        </div>
        <div class="text-sm mt-5 mr-5">
          {{
            get_cast_detail.biography
              ? get_cast_detail.biography
              : "No Biography Information"
          }}
        </div>
      </div>
    </div>
    <div class="ml-3 font-bold">
      <h1>PHOTOS</h1>
    </div>
    <div class="flex flex-wrap">
      <div
        class="ml-3 my-5 border border-gray-900 rounded-lg hover:shadow-xl"
        v-for="(photo, index) in get_person_photos.slice(0, 5)"
        :key="index"
      >
        <a :href="posterUrl + photo.file_path">
          <img
            class="img-movie rounded-lg"
            :src="posterUrl + photo.file_path"
            alt=""
          />
        </a>
      </div>
    </div>
    <div class="ml-3 font-bold">
      <h1>MOVİES</h1>
    </div>
    <div class="flex flex-wrap">
      <div
        class="ml-3 my-5 border border-gray-900 rounded-lg hover:shadow-xl"
        v-for="(movie, index) in get_person_movie_credits.slice(0, 18)"
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
  name: "CastDetail",
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
  methods: {
    setCastDetailsData() {
      this.$store.state.castDetail = [];
      axios
        .get(
          `https://api.themoviedb.org/3/person/${this.$route.params.id}?api_key=${process.env.VUE_APP_API_KEY}`
        )
        .then((res) => {
          this.$store.state.castDetail = res.data;
          console.log(res.data);
        });
    },
    setCastMovieCreditsData() {
      this.$store.state.personMovieCredits = [];
      axios
        .get(
          `https://api.themoviedb.org/3/person/${this.$route.params.id}/movie_credits?api_key=${process.env.VUE_APP_API_KEY}`
        )
        .then((res) => {
          this.$store.state.personMovieCredits = res.data.cast;
          console.log(res.data.cast);
        });
    },
    setCastPhotos() {
      this.$store.state.personPhotos = [];
      axios
        .get(
          `https://api.themoviedb.org/3/person/${this.$route.params.id}/images?api_key=${process.env.VUE_APP_API_KEY}`
        )
        .then((res) => {
          this.$store.state.personPhotos = res.data.profiles;
        });
    },
    getData() {
      this.setCastDetailsData();
      this.setCastMovieCreditsData();
      this.setCastPhotos();
    },
    formatBirth(birth) {
      let birthDate = birth.split("-").reverse();
      return birthDate[0] + "/" + birthDate[1] + "/" + birthDate[2];
    },
    formatReleaseDate(date) {
      let releaseDate = date.split("-").reverse();
      return releaseDate[0] + "/" + releaseDate[1] + "/" + releaseDate[2];
    },
  },
  created() {
    this.loading = true;
    this.getData();
    setTimeout(() => {
      this.loading = false;
    }, 500);
  },
  computed: {
    ...mapGetters([
      "get_cast_detail",
      "get_person_movie_credits",
      "get_person_photos",
    ]),
  },
};
</script>

<style scoped>
.img {
  height: 450px;
  min-width: 300px;
}

.img-movie {
  height: 175px;
  min-width: 138px;
}
.title {
  max-width: 138 px;
}
</style>
