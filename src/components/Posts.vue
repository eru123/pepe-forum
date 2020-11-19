<template>
  <div class="posts mobi-width-container">
    <div class="header">Posts ({{ posts.length }})</div>
    <div v-for="(p, k) in posts" :key="k" class="post">
      <router-link
        class="title dark"
        :to="{ name: 'About', params: { id: p.id } }"
        >{{ p.title }}</router-link
      >
      <div class="author">
        <img :src="p.avatar" />
        {{ p.author }}
      </div>
      <div class="content">{{ p.content }}</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.posts {
  padding: 1em 0.5em;
  text-align: left;
  .header {
    font-weight: bold;
    font-size: 1.3em;
    margin-bottom: 0.5em;
    color: gray;
  }
  .post {
    margin-bottom: 1em;
    border-radius: 0.3em;
    border: 1px solid #ccc;
    .title {
      display: block;
      padding: 0.5em 1em 0 0.5em;
    }
    .author {
      padding: 0.5em 1em;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #f2f2f2;
      font-size: 0.8em;
      img {
        width: 1.5em;
        height: 1.5em;
        border-radius: 50%;
        margin-right: 0.5em;
        overflow: hidden;
        background: #333;
      }
    }
    .content {
      font-size: 0.9em;
      padding: 1em 0.5em;
    }
  }
}
</style>
<script>
import forum from "@/forum";

export default {
  name: "HomeNav",
  data() {
    return {
      posts: {}
    };
  },
  async created() {
    await this.retrievePosts();
  },
  methods: {
    async retrievePosts() {
      forum.readPosts(this.token, 0, 0).then(e => {
        if (typeof e.data == "object" && typeof e.data.data == "object") {
          this.posts = e.data.data;
          console.log(this.posts);
        }
      });
    }
  },
  props: {
    token: String,
    page: Number
  }
};
</script>
