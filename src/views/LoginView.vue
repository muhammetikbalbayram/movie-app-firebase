<template>
  <div class="flex relative login-form">
    <div class="photo-item flex-1 opacity-60"></div>
    <div
      class="absolute left-0 bg-white card flex flex-col items-center justify-center"
    >
      <div>
        <h1 class="font-bold mb-12 text-xl">SIGN IN</h1>
      </div>
      <div class="flex flex-col items-center">
        <div class="flex flex-col items-center justify-center">
          <input
            placeholder="Email.."
            class="border border-2 rounded-lg w-96 h-10 mb-6 p-1.5"
            type="text"
            v-model="user.mail"
          />
          <input
            placeholder="Password.."
            class="border border-2 rounded-lg w-96 h-10 mb-6 p-1.5"
            type="password"
            v-model="user.password"
          />
        </div>
        <div>
          <div class="font-bold forgot-item">
            <router-link to="#">Forgot Password?</router-link>
          </div>
        </div>
        <button
          class="w-64 h-10 text-center border rounded-lg hover:border-4"
          type="submit"
          @click="signIn"
        >
          LOGIN
        </button>
        <div class="mt-3 flex flex-col items-center">
          <p>Don't have an account?</p>
          <router-link class="font-bold register-item" to="/register"
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
  components: {},
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
  min-height: 100vh;
}
.card {
  height: 100vh;
  width: 600px;
}
.photo-item {
  background-image: url("@/assets/1589248812_518988.jpg");
}
input {
  border-color: #74959a;
}
.forgot-item {
  color: black;
}
.register-item {
  color: black;
}
button {
  background-color: #74959a;
  color: white;
  border-color: white;
}
button:hover {
  background-color: white;
  color: #74959a;
  border-color: #74959a;
}
</style>
