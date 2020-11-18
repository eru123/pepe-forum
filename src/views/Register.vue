<template>
  <div class="centered-container">
    <form class="form-type-1" @submit.prevent="submitForm">
      <h1 class="header">Create Account</h1>
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
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
export default {
  name: "Login",
  methods: {
    preventAuthorize() {
      if (this.$store.state.token.length > 0) {
        this.$router.push({ name: "Home" });
      }
    }
  }
};
</script>
