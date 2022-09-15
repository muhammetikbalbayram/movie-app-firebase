<template>
  <div class="mx-52 my-7 sm:flex sm:flex-col">
    <div class="flex justify-between sm:flex-wrap">
      <div class="flex justify-start items-center ml-5 h-32 w-32 rounded-full">
        <img
          class="mr-5 border border-gray-900 h-32 w-32 rounded-full"
          :src="noUserImage"
          alt=""
        />
        <div class="flex flex-col justify-start items-center flex-nowrap">
          <div class="whitespace-nowrap">
            {{ capitalize(this.$store.state.profileName) }}
          </div>
          <button
            class="whitespace-nowrap border-2 rounded-md p-0.5 mt-4 shadow-xl edit-button"
          >
            Edit Profile
          </button>
        </div>
      </div>
      <div class="flex">
        <div
          v-for="(tab, index) in tabs"
          class="flex last:mr-7 items-center"
          :key="index"
        >
          <div class="flex flex-col justify-center items-center mx-1.5 sm:mt-3">
            <div v-if="tab !== 'Profile'" class="mb-2 text-xl font-bold">
              15
            </div>
            <div
              @click="goToComponent(tab)"
              v-if="tab !== 'Profile'"
              class="text-sm cursor-pointer hover:text-gray-600"
            >
              {{ tab }}
            </div>
          </div>
          <div
            v-if="index < tabs.length - 1"
            class="h-10 w-3 border-r-2 border-gray-400"
          ></div>
        </div>
      </div>
    </div>
    <tab-component :tabs="tabs"></tab-component>
    <watch-list-component
      v-if="this.$store.state.activeTab == 'Watchlist'"
    ></watch-list-component>
    <watched-films-component
      v-if="this.$store.state.activeTab == 'Films'"
    ></watched-films-component>
    <review-component
      v-if="this.$store.state.activeTab == 'Reviews'"
    ></review-component>
    <likes-component
      v-if="this.$store.state.activeTab == 'Likes'"
    ></likes-component>
    <profile-component
      v-if="this.$store.state.activeTab == 'Profile'"
    ></profile-component>
  </div>
</template>

<script>
import TabComponent from "@/components/TabComponent";
import image from "@/assets/no-user-image-icon-27.jpg";
import WatchListComponent from "@/components/WatchListComponent";
import WatchedFilmsComponent from "@/components/WatchedFilmsComponent";
import ReviewComponent from "@/components/ReviewComponent";
import LikesComponent from "@/components/LikesComponent";
import ProfileComponent from "@/components/ProfileComponent";
export default {
  name: "ProfileView",
  components: {
    TabComponent,
    WatchListComponent,
    WatchedFilmsComponent,
    ReviewComponent,
    LikesComponent,
    ProfileComponent,
  },
  data() {
    return {
      tabs: ["Profile", "Films", "Watchlist", "Reviews", "Likes"],
      noUserImage: image,
    };
  },
  methods: {
    capitalize(name) {
      return name.charAt(0).toUpperCase() + name.slice(1);
    },
    goToComponent(tab) {
      return (this.$store.state.activeTab = tab);
    },
  },
  computed: {},
  created() {
    this.$store.state.activeTab = "Profile";
  },
};
</script>

<style scoped>
.edit-button {
  color: #395b64;
  border-color: #395b64;
}
.edit-button:hover {
  background-color: #395b64;
  color: white;
}
</style>
