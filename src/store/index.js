import { createStore } from "vuex";

export default createStore({
  state: {
    homePageMovies: [],
    movieDetails: [],
    movieCastCredits: [],
    movieCrewCredits: [],
    castDetail: [],
    peopleCredits: [],
    personMovieCredits: [],
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
  },
  mutations: {},
  actions: {},
  modules: {},
});
