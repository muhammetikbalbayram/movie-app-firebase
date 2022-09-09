<template>
  <div class="flex relative">
    <div class="photo-item flex-1 opacity-60"></div>
    <div
      class="absolute top-2.5 left-2.5 bottom-2.5 bg-white card rounded-xl p-2.5 flex flex-col items-center justify-center"
    >
      <div>
        <h1 class="font-bold mb-12 text-xl">REGISTER</h1>
      </div>
      <div class="flex flex-col items-center">
        <div class="flex flex-col items-center justify-center">
          <input
            placeholder="Name.."
            class="border border-2 rounded-lg border-purple-200 focus:border-purple-700 w-72 h-10 mb-6 p-1.5"
            type="text"
            v-model="user.name"
          />
          <input
            placeholder="Last Name.."
            class="border border-2 rounded-lg border-purple-200 w-72 h-10 mb-6 p-1.5"
            type="text"
            v-model="user.lastName"
          />
          <input
            placeholder="Email.."
            class="border border-2 rounded-lg border-purple-200 w-72 h-10 mb-6 p-1.5"
            type="email"
            v-model="user.mail"
          />
          <input
            placeholder="Password.."
            class="border border-2 rounded-lg border-purple-200 w-72 h-10 mb-6 p-1.5"
            type="password"
            v-model="user.password"
          />
          <input
            placeholder="Confirm Password.."
            class="border border-2 rounded-lg border-purple-200 w-72 h-10 p-1.5"
            :class="[!errorMessageActive ? 'mb-6' : 'mb-0']"
            type="password"
            v-model="user.confirmationPassword"
          />
          <div class="flex content-end">
            <p class="text-sm text-red-900 mt-1 mb-2" v-if="errorMessageActive">
              Please check your information
            </p>
          </div>
        </div>
        <button
          class="w-72 h-10 text-center bg-purple-700 text-white border rounded-lg border-white hover:text-purple-700 hover:bg-white hover:border-purple-700 hover:border-4"
          type="submit"
          @click="submitUser"
        >
          REGISTER
        </button>
        <div class="mt-3 flex flex-col items-center">
          <p>Already have an account?</p>
          <router-link class="font-bold text-purple-700 underline" to="/login"
            >Sign In</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
export default {
  name: "RegisterView",
  data() {
    return {
      user: {
        name: "",
        lastName: "",
        mail: "",
        password: "",
        confirmationPassword: "",
      },
      errorMessageActive: false,
    };
  },
  methods: {
    submitUser() {
      if (
        this.user.name !== "" &&
        this.user.lastName !== "" &&
        this.user.mail !== "" &&
        this.user.password !== "" &&
        this.user.confirmationPassword !== "" &&
        this.user.password === this.user.confirmationPassword
      ) {
        createUserWithEmailAndPassword(
          getAuth(),
          this.user.mail,
          this.user.password
        )
          .then(() => {
            this.user = {
              name: "",
              lastName: "",
              mail: "",
              password: "",
              confirmationPassword: "",
            };
            console.log("succesfull");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.errorMessageActive = true;
      }
    },
  },
};
</script>

<style scoped>
.card {
  height: 525px;
  width: 460px;
}
.photo-item {
  background-image: url("@/assets/1589248812_518988.jpg");
}
</style>
