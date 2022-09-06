<template>
  <div class="flex relative">
    <div class="photo-item flex-1 opacity-60"></div>
    <div class="absolute top-2.5 left-2.5 bottom-2.5 bg-white card rounded-xl">
      Login
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginView",
};
</script>

<style scoped>
.login-form {
  min-width: 35vw;
}
.card {
  height: 555px;
  width: 460px;
}
.photo-item {
  background-image: url("@/assets/1589248812_518988.jpg");
}
</style>
