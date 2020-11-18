<template>
  <div class="home">
    <h1>Home</h1>
  </div>
</template>

<script>
import forum from "@/forum";
import sync from "@/forum/sync";

export default {
  name: "Home",
  async created() {
    this.preventUnauthorize();
    await this.myInfo();
  },
  methods: {
    preventUnauthorize() {
      if (this.$store.state.token.length <= 0) {
        this.$router.push({ name: "Login" });
      }
    },
    async myInfo() {
      if (typeof this.$store.state.my_info.id != "number") {
        await forum.myInfo(this.$store.state.token).then(async e => {
          if (typeof e.data == "object") {
            if (typeof e.data.data == "object") {
              this.$store.commit("my_info", e.data.data);
              await sync.toLocal();
            }
          }
        });
      }
    }
  }
};
</script>
