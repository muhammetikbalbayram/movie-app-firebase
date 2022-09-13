<template>
  <div class="flex relative register-form">
    <div class="photo-item flex-1 opacity-60"></div>
    <div
      class="absolute left-0 bg-white card flex flex-col items-center justify-center"
    >
      <div>
        <h1 class="font-bold mb-12 text-xl">REGISTER</h1>
      </div>
      <div class="flex flex-col items-center">
        <div class="flex flex-col items-center justify-center">
          <input
            placeholder="Name.."
            class="border border-2 rounded-lg border-purple-200 focus:border-purple-700 w-96 h-10 mb-6 p-1.5"
            type="text"
            v-model="user.name"
          />
          <input
            placeholder="Last Name.."
            class="border border-2 rounded-lg border-purple-200 w-96 h-10 mb-6 p-1.5"
            type="text"
            v-model="user.lastName"
          />
          <input
            placeholder="Email.."
            class="border border-2 rounded-lg border-purple-200 w-96 h-10 mb-6 p-1.5"
            type="email"
            v-model="user.mail"
          />
          <input
            placeholder="Password.."
            class="border border-2 rounded-lg border-purple-200 w-96 h-10 mb-6 p-1.5"
            type="password"
            v-model="user.password"
          />
          <input
            placeholder="Confirm Password.."
            class="border border-2 rounded-lg border-purple-200 w-96 h-10 p-1.5"
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
          class="w-64 h-10 text-center bg-purple-700 text-white border rounded-lg border-white hover:text-purple-700 hover:bg-white hover:border-purple-700 hover:border-4"
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
import { getFirestore, doc, setDoc } from "firebase/firestore";
import router from "@/router";

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
    async submitUser() {
      if (
        this.user.name !== "" &&
        this.user.lastName !== "" &&
        this.user.mail !== "" &&
        this.user.password !== "" &&
        this.user.confirmationPassword !== "" &&
        this.user.password === this.user.confirmationPassword
      ) {
        const auth = getAuth();
        const db = getFirestore();
        await createUserWithEmailAndPassword(
          auth,
          this.user.mail,
          this.user.password
        )
          .then((result) => {
            setDoc(doc(db, "users", `${result.user.uid}`), {
              userInfo: {
                name: this.user.name,
                lastName: this.user.lastName,
                mail: this.user.mail,
              },
            });
            this.user = {
              name: "",
              lastName: "",
              mail: "",
              password: "",
              confirmationPassword: "",
            };
            console.log("succesfull");
            router.push("/");
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
.register-form {
  height: 100vh;
}
.card {
  height: 100vh;
  width: 600px;
}
.photo-item {
  background-image: url("@/assets/1589248812_518988.jpg");
}
</style>
