<template>
  <div class="mx-52 my-7">
    <div class="flex justify-between">
      <div class="flex justify-start items-center ml-5 h-32 w-32 rounded-full">
        <img
          class="mr-5 border border-gray-900 h-32 w-32 rounded-full"
          :src="noUserImage"
          alt=""
        />
        <div
          class="flex flex-col justify-start justify-items-stretch flex-nowrap"
        >
          <div class="whitespace-nowrap">Kullanıcı Adı</div>
          <div class="whitespace-nowrap">Edit Profile</div>
        </div>
      </div>
      <div class="flex">
        <div
          v-for="(tab, index) in tabs"
          class="flex last:mr-7 items-center"
          :key="index"
        >
          <div class="flex flex-col justify-center items-center mx-1.5">
            <div class="mb-2 text-xl font-bold">15</div>
            <div class="text-sm">{{ tab }}</div>
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
  </div>
</template>

<script>
import TabComponent from "@/components/TabComponent";
import image from "@/assets/no-user-image-icon-27.jpg";
import WatchListComponent from "@/components/WatchListComponent";
import WatchedFilmsComponent from "@/components/WatchedFilmsComponent";
import ReviewComponent from "@/components/ReviewComponent";
import LikesComponent from "@/components/LikesComponent";
export default {
  name: "ProfileView",
  components: {
    TabComponent,
    WatchListComponent,
    WatchedFilmsComponent,
    ReviewComponent,
    LikesComponent,
  },
  data() {
    return {
      tabs: ["Films", "Watchlist", "Reviews", "Likes"],
      noUserImage: image,
    };
  },
  created() {
    this.$store.state.activeTab = "Films";
  },
};
</script>

<style scoped></style>
