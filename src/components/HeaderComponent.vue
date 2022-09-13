<template>
  <div
    class="text-center bg-gradient-to-b from-purple-600 to-purple-900 flex justify-between h-20 items-center"
  >
    <div class="text-white hover:text-gray-400 ml-24">
      <router-link :to="{ name: 'home' }" class="ml-5"
        ><i class="fa-solid fa-clapperboard mr-1.5"></i>AşilBoxD</router-link
      >
    </div>

    <div class="mr-24 flex">
      <div class="mr-3">
        <div class="flex">
          <input
            type="text"
            placeholder="Search Movies..."
            v-model="search"
            @keyup.enter="searchFilms"
            class="rounded-l p-0.5 pl-1.5"
          />
          <button
            @click="searchFilms"
            class="border border-white px-1.5 rounded-r"
          >
            <i class="fa-solid fa-magnifying-glass text-white"></i>
          </button>
        </div>
      </div>
      <div class="text-white flex">
        <div
          class="mr-3.5 flex flex-col z-50 hover:text-gray-400 cursor-pointer"
          @click="goToWatchedFilms"
        >
          Films
        </div>
        <div
          class="mr-3.5 hover:text-gray-400 cursor-pointer"
          @click="goToWatchList"
        >
          WatchList
        </div>
        <router-link
          v-if="!get_user"
          class="mr-3.5 hover:text-gray-400"
          :to="{ name: 'login' }"
          >Login</router-link
        >
        <div
          @click="signOut"
          v-if="get_user"
          class="hover:text-gray-400 cursor-pointer"
        >
          Logout
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";
import { mapGetters } from "vuex";
import { getAuth, signOut } from "firebase/auth";

export default {
  name: "HeaderComponent",
  data() {
    return {
      search: "",
      showDropdown: false,
    };
  },
  methods: {
    searchFilms() {
      this.$store.state.searchData = [];
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=${process.env.VUE_APP_API_KEY}&query=${this.search}`
        )
        .then((res) => (this.$store.state.searchData = res.data.results));
      this.search = "";
      router.push({ name: "search" });
    },
    goToWatchedFilms() {
      if (this.get_user) {
        router.push({ name: "watched-films" });
      } else {
        router.push({ name: "login" });
      }
    },
    goToWatchList() {
      if (this.get_user) {
        router.push({ name: "watch-list" });
      } else {
        router.push({ name: "login" });
      }
    },
    toggleShow() {
      this.showDropdown = !this.showDropdown;
    },
    signOut() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          console.log("Sign-out successful");
        })
        .catch(() => {
          console.log("An error happened");
        });
      router.push("/");
    },
  },
  computed: {
    ...mapGetters(["get_user"]),
  },
};
</script>

<style scoped></style>
