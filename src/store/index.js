import { createStore } from "vuex";

export default createStore({
  state: {
    homePageMovies: [],
    movieDetails: [],
    movieCastCredits: [],
    movieDirectorDetail: [],
    movieCrewCredits: [],
    castDetail: [],
    peopleCredits: [],
    personMovieCredits: [],
    movieImages: [],
    searchData: [],
    similarMovies: [],
    personPhotos: [],
  },
  getters: {
    get_home_page_movies(state) {
      return state.homePageMovies;
    },
    get_movie_details(state) {
      return state.movieDetails;
    },
    get_movie_cast_credits(state) {
      return state.movieCastCredits;
    },
    get_movie_crew_credits(state) {
      return state.movieCrewCredits;
    },
    get_cast_detail(state) {
      return state.castDetail;
    },
    get_person_movie_credits(state) {
      return state.personMovieCredits;
    },
    get_movie_images(state) {
      return state.movieImages;
    },
    get_search_data(state) {
      return state.searchData;
    },
    get_similar_movies(state) {
      return state.similarMovies;
    },
    get_person_photos(state) {
      return state.personPhotos;
    },
    get_movie_director_detail(state) {
      return state.movieDirectorDetail;
    },
  },
  mutations: {},
  actions: {},
  modules: {},
});
