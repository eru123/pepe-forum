<template>
  <div>
    <div
      @loading:class="
        'loading-global';


      "
    ></div>
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<script>
import sync from "./forum/sync";
export default {
  name: "App",
  async created() {
    await sync.both();
    this.emitter.on("loading", function(value) {
      console.log("global-loading-status:", value);
    });
  }
};
</script>
