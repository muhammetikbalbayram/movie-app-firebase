<template>
  <div>
    <ul
      class="mt-5 flex justify-center border-2 rounded-lg border-gray-900 p-2 sm:flex-wrap"
    >
      <li
        @click="showTab(tab, index)"
        v-for="(tab, index) in tabs"
        :key="index"
        class="cursor-pointer first:ml-0 last:mr-0 mx-2 border-gray-900 text-white hover:text-gray-400"
        :class="isActive(index) ? 'active-tab' : ''"
      >
        {{ tab }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TabComponent",
  props: {
    tabs: Array,
  },
  data() {
    return {
      activeTab: 0,
    };
  },
  methods: {
    isActive(index) {
      return this.activeTab === index;
    },
    showTab(tab, index) {
      this.$store.state.activeTab = tab;
      this.activeTab = index;
    },
  },
  computed: {
    activeTabIndex() {
      return this.$store.state.activeTab;
    },
  },
  watch: {
    activeTabIndex(newValaue) {
      this.activeTab = this.tabs.indexOf(newValaue);
    },
  },
};
</script>

<style scoped>
.active-tab {
  font-weight: bold;
  text-decoration: underline;
}
ul {
  background-color: #395b64;
}
</style>
