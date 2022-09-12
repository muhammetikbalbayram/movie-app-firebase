<template>
  <div class="flex relative">
    <div class="photo-item flex-1 opacity-60"></div>
    <div
      class="absolute top-3.5 left-3.5 bottom-2.5 bg-white card rounded-xl p-2.5 flex flex-col items-center justify-center"
    >
      <div>
        <h1 class="font-bold mb-12 text-xl">SIGN IN</h1>
      </div>
      <div class="flex flex-col items-center">
        <div class="flex flex-col items-center justify-center">
          <input
            placeholder="Email.."
            class="border border-2 rounded-lg border-purple-200 focus:border-purple-700 w-72 h-10 mb-6 p-1.5"
            type="text"
            v-model="user.mail"
          />
          <input
            placeholder="Password.."
            class="border border-2 rounded-lg border-purple-200 w-72 h-10 mb-6 p-1.5"
            type="password"
            v-model="user.password"
          />
        </div>
        <div>
          <div class="font-bold text-purple-700">
            <router-link to="#">Forgot Password?</router-link>
          </div>
        </div>
        <button
          class="w-72 h-10 text-center bg-purple-700 text-white border rounded-lg border-white hover:text-purple-700 hover:bg-white hover:border-purple-700 hover:border-4"
          type="submit"
          @click="signIn"
        >
          LOGIN
        </button>
        <div class="mt-3 flex flex-col items-center">
          <p>Don't have an account?</p>
          <router-link class="font-bold text-purple-700" to="/register"
            >Register</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import router from "@/router";
export default {
  name: "LoginView",
  data() {
    return {
      user: {
        mail: "",
        password: "",
      },
      errorMessageActive: false,
    };
  },
  methods: {
    async signIn() {
      if (this.user.mail !== "" && this.user.password !== "") {
        let auth = getAuth();
        await signInWithEmailAndPassword(
          auth,
          this.user.mail,
          this.user.password
        )
          .then(() => {
            this.user = {
              mail: "",
              password: "",
            };
            router.push("/");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>

<style scoped>
.login-form {
  min-width: 35vw;
}
.card {
  height: 525px;
  width: 460px;
}
.photo-item {
  background-image: url("@/assets/1589248812_518988.jpg");
}
</style>
