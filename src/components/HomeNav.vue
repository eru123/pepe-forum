<template>
  <div class="home-nav">
    <div class="left">Pepe</div>
    <h3 class="center">Forum</h3>
    <div class="right dropdownjs">
      <span @click="dropdown = dropdown ? false : true">Settings</span>
      <div v-if="dropdown" class="dropdown-content">
        <span class="link" @click="editAccount">Edit Account</span>
        <span class="link" @click="logout">Logout</span>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.home-nav {
  position: sticky;
  top: 0;
  background: #fff;
  border-bottom: 1px solid #ccc;
  padding: 1em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }
  > * {
    flex: 1;
  }
  > .left {
    text-align: left;
  }
  > .center {
    text-align: center;
  }
  > .right {
    text-align: right;
  }
}
</style>
<script>
export default {
  name: "HomeNav",
  data() {
    return {
      dropdown: false
    };
  },
  methods: {
    editAccount() {
      this.$router.push({ name: "EditAccount" });
    },
    logout() {
      if (confirm("Are you sure you want to logout?")) {
        this.$router.push({ name: "Logout" });
      }
    }
  }
};
</script>
