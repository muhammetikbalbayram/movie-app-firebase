<template>
  <div
    class="border border-gray-900 mt-14 ml-8 rounded rounded-xl shadow shadow-xl flex flex-col items-center w-52"
  >
    <div
      v-for="(genre, index) in genres"
      :key="index"
      class="text-center last:mb-2"
    >
      <button
        @click="setMoviesWithGenres(genre.id)"
        class="mt-2"
        :class="isGenreActive(genre.id) ? 'genre-active' : ''"
      >
        {{ genre.name }}
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";

export default {
  name: "FilterComponent",
  data() {
    return {
      genres: [
        {
          id: 28,
          name: "Action",
        },
        {
          id: 12,
          name: "Adventure",
        },
        {
          id: 16,
          name: "Animation",
        },
        {
          id: 35,
          name: "Comedy",
        },
        {
          id: 80,
          name: "Crime",
        },
        {
          id: 99,
          name: "Documentary",
        },
        {
          id: 18,
          name: "Drama",
        },
        {
          id: 10751,
          name: "Family",
        },
        {
          id: 14,
          name: "Fantasy",
        },
        {
          id: 36,
          name: "History",
        },
        {
          id: 27,
          name: "Horror",
        },
        {
          id: 10402,
          name: "Music",
        },
        {
          id: 9648,
          name: "Mystery",
        },
        {
          id: 10749,
          name: "Romance",
        },
        {
          id: 878,
          name: "Science Fiction",
        },
        {
          id: 10770,
          name: "TV Movie",
        },
        {
          id: 53,
          name: "Thriller",
        },
        {
          id: 10752,
          name: "War",
        },
        {
          id: 37,
          name: "Western",
        },
      ],
      activeGenre: null,
    };
  },
  methods: {
    setMoviesWithGenres(genre) {
      this.$store.state.homePageMovies = [];
      this.activeGenre = genre;
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=66478fb024c9fe12aaaec062298c77a0&with_genres=${genre}`
        )
        .then((res) => (this.$store.state.homePageMovies = res.data.results));
      router.push({ name: "home" });
    },
    isGenreActive(genre) {
      return this.activeGenre === genre;
    },
  },
};
</script>

<style scoped>
.genre-active {
  font-weight: bold;
}
</style>
