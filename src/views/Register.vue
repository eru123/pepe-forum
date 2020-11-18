<template>
  <div class="centered-container">
    <form class="form-type-1" @submit.prevent="submitForm">
      <h1 class="header">Create Account</h1>
      <div class="error" v-if="error.length > 0" @click="error = ''">
        {{ error }}
      </div>
      <div class="errors" v-if="errors.length > 0" @click="errors = []">
        <li v-for="(e, k) in errors" :key="k">{{ e }}</li>
      </div>
      <input v-model="user" type="text" placeholder="Username" />
      <input v-model="fname" type="text" placeholder="Firstname" />
      <input v-model="lname" type="text" placeholder="Lastname" />
      <input v-model="pass" type="password" placeholder="Password" />
      <input v-model="cpass" type="password" placeholder="Confirm Password" />
      <input class="btn-primary" type="submit" value="Register" />
      <p align="center">OR</p>
      <button class="btn-secondary" @click="$router.push({ name: 'Login' })">
        Login
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
export default {
  name: "Register",
  data() {
    return {
      errors: [],
      error: "",
      user: "",
      fname: "",
      lname: "",
      pass: "",
      cpass: ""
    };
  },
  created() {
    this.preventAuthorize();
  },
  methods: {
    preventAuthorize() {
      if (typeof this.$store.state.token == "string" && this.$store.state.token.length > 0) {
        this.$router.push({ name: "Home" });
      }
    },
    submitForm() {
      if(this.pass == this.cpass) {
        this.emitter.emit("loading", true);
      forum
        .register(this.user, this.pass, this.fname, this.lname)
        .then(async e => {
          console.log(e.data);
          if (typeof e.data == "object" && typeof e.data.result == "boolean" && e.data.result == true) {
            if(confirm("Your account is sucessfully created, do you want to login now?")){
              this.$router.push({name:'Login'});
            } else {
              this.user = ""
              this.fname = ""
              this.lname = ""
              this.pass = ""
              this.cpass = ""
            }
            this.preventAuthorize();
          } else if (typeof e.data.error == "string") {
            this.error = e.data.error;
          } else if (typeof e.data.errors == "object") {
            this.error = "";
            this.errors = e.data.errors;
          } else {
            this.errors = [];
          }
        })
        .catch((e) => {
          console.log(e)
          this.error = "Unknown error, try again.";
          this.errors = [];
        })
        .finally(() => {
          this.emitter.emit("loading", false);
        });
      } else {
        this.error = "Password does not match";
        this.errors = [];
      }
    }
  }
};
</script>
