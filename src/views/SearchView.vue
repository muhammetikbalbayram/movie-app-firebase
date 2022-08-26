<template>
  <div>
    <movie-component :movies="get_search_data"></movie-component>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import MovieComponent from "@/components/MovieListComponent";

export default {
  name: "SearchView",
  components: { MovieComponent },
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
