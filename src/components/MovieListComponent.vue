<template>
  <div class="mt-10 mx-24 mb-24">
    <div class="flex flex-row flex-auto flex-wrap">
      <movie-component
        v-for="(movie, index) in movies"
        :key="index"
        :movie="movie"
      ></movie-component>
    </div>
  </div>
</template>

<script>
import MovieComponent from "@/components/MovieComponent";
export default {
  name: "MovieListComponent",
  components: {
    MovieComponent,
  },
  props: ["movies"],
  data() {
    return {
      posterUrl: "https://image.tmdb.org/t/p/original",
    };
  },
  methods: {},
};
</script>

<style scoped></style>
