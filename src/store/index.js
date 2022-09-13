import { createStore } from "vuex";

import { getDoc, doc, getFirestore, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

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
    genreMovies: [],
    user: null,
    profileEmail: null,
    profileName: null,
    profileLastName: null,
    profileUsername: null,
    profileId: null,
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
    get_genre_movies(state) {
      return state.genreMovies;
    },
    get_user(state) {
      return state.user;
    },
  },
  mutations: {
    setProfileInfo(state, doc) {
      state.profileId = doc.id;
      state.profileEmail = doc.data().userInfo.mail;
      state.profileName = doc.data().userInfo.name;
      state.profileLastName = doc.data().userInfo.lastName;
    },
    updateUser(state, payload) {
      state.user = payload;
    },
    changeFirstName(state, payload) {
      state.profileFirstName = payload;
    },
    changeLastName(state, payload) {
      state.profileLastName = payload;
    },
    changeUsername(state, payload) {
      state.profileUsername = payload;
    },
  },
  actions: {
    async getCurrentUser({ commit }) {
      const auth = await getAuth();
      const db = getFirestore();

      const dbResults = await getDoc(
        doc(db, "users", `${auth.currentUser.uid}`)
      );
      commit("setProfileInfo", dbResults);
    },
    async updateUserSettings({ state }) {
      const db = getFirestore();
      const userUpdate = doc(db, "users", `${state.profileId}`);
      await updateDoc(userUpdate, {
        "userInfo.name": state.profileName,
        "userInfo.lastName": state.profileLastName,
      });
    },
  },
  modules: {},
});
