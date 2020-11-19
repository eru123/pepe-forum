<template>
  <div class="home">
    <Nav />
    <h1>Home</h1>
    <CreatePost :token="token" />
    <Posts :token="token" :page="0" />
  </div>
</template>

<script>
import forum from "@/forum";
import sync from "@/forum/sync";
import Nav from "@/components/HomeNav";
import Posts from "@/components/Posts";
import CreatePost from "@/components/CreatePost";

export default {
  name: "Home",
  data() {
    return {};
  },
  computed: {
    token() {
      return this.$store.state.token;
    }
  },
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
  },
  components: {
    Nav,
    Posts,
    CreatePost
  }
};
</script>
