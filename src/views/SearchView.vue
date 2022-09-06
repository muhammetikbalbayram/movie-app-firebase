<template>
  <div>
    <movie-list-component :movies="get_search_data"></movie-list-component>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import MovieListComponent from "@/components/MovieListComponent";

export default {
  name: "SearchView",
  components: { MovieListComponent },
  data() {
    return {
      posterUrl: "https://image.tmdb.org/t/p/original",
    };
  },
  computed: {
    ...mapGetters(["get_search_data"]),
  },
};
</script>

<style scoped></style>
