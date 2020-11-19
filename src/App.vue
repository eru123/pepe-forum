<template>
  <div>
    <div v-if="loading" class="app-loading"></div>
    <router-view></router-view>
  </div>
</template>

<script>
import forum from "./forum";
import sync from "./forum/sync";

export default {
  name: "App",
  data() {
    return {
      loading: false
    };
  },
  async created() {
    await sync.both();

    const globalLoading = e => {
      this.loading = e;
    };

    var tokenCheck = async () => {
      if (this.$store.state.token.length > 0) {
        await forum
          .watchAuth(this.$store.state.token)
          .then(e => {
            if (typeof e.data == "object" && typeof e.data.auth == "boolean") {
              if (e.data.auth === false) {
                this.$router.push({ name: "Logout" });
              }
            }
          })
          .catch(() =>
            console.warn("Failed to authenticate the app. retrying in a minute")
          );
      }
      await sync.delay(9999);
      await tokenCheck();
    };

    this.emitter.on("app-loading", e => {
      globalLoading(e);
    });

    await sync.delay(5000);
    await tokenCheck();
  }
};
</script>
