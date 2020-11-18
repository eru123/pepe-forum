<template>
  <div class="centered-container">
    <form class="form-type-1" @submit.prevent="submitForm">
      <h1 class="header">Login to Forum</h1>
      <div class="error" v-if="error.length > 0" @click="error = ''">
        {{ error }}
      </div>
      <div class="errors" v-if="errors.length > 0" @click="errors = []">
        <li v-for="(e, k) in errors" :key="k">{{ e }}</li>
      </div>
      <input v-model="user" type="text" placeholder="Username" />
      <input v-model="pass" type="password" placeholder="Password" />
      <input class="btn-primary" type="submit" value="Login" />
      <p align="center">OR</p>
      <button class="btn-secondary" @click="$router.push({ name: 'Register' })">
        Create Account
      </button>
      <p>
        <small
          >By creating and logging in your account, <br />
          you agreed to our
          <router-link :to="{ name: 'About' }"
            >Terms and Agreements</router-link
          ></small
        >
      </p>
    </form>
  </div>
</template>
<script>
import forum from "@/forum";
import sync from "@/forum/sync";
export default {
  name: "Login",
  data() {
    return {
      errors: [],
      error: "",
      user: "",
      pass: ""
    };
  },
  created() {
    this.preventAuthorize();
  },
  methods: {
    preventAuthorize() {
      if (this.$store.state.token.length > 0) {
        this.$router.push({ name: "Home" });
      }
    },
    submitForm() {
      this.error = "";
      this.errors = [];
      this.emitter.emit("loading", true);
      forum
        .login(this.user, this.pass)
        .then(async e => {
          console.log(e.data);
          if (typeof e.data == "object" && typeof e.data.token == "string") {
            this.$store.commit("token", e.data.token);
            await sync.toLocal();
            this.preventAuthorize();
          } else if (typeof e.data.error == "string") {
            this.error = e.data.error;
          } else if (typeof e.data.errors == "object") {
            this.errors = e.data.errors;
          }
        })
        .catch(() => {
          this.error = "Unknown error, try again.";
        })
        .finally(() => {
          this.emitter.emit("loading", false);
        });
    }
  }
};
</script>
