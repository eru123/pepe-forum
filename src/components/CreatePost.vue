<template>
  <div class="create-post mobi-width-container">
    <div class="create-post-form" v-if="editing">
      <div class="header">Create new post</div>
      <div class="error" v-if="error.length > 0 || errors.length > 0">
        <span>Errors</span>
        <div class="errors">
          <li v-if="error.length > 0">{{ error }}</li>
          <li v-for="(e, k) in errors" :key="k">{{ e }}</li>
        </div>
      </div>
      <input type="text" placeholder="Title" v-model="title" />
      <textarea
        rows="10"
        placeholder="Content here"
        v-model="content"
      ></textarea>
      <div class="actions">
        <button class="btn-danger" @click="editing = false">Cancel</button>
        <button class="btn-primary" @click="publish">Publish</button>
      </div>
    </div>
    <div
      class="create-post-button btn-secondary"
      v-else
      @click="editing = true"
    >
      Create new post
    </div>
  </div>
</template>
<style lang="scss" scoped>
.create-post {
  padding: 0 0.5em;

  .create-post-button {
    border: 1px solid #ccc;
    text-align: center;
    font-weight: bold;
    padding: 0.5em 1em;
    font-size: 1.1em;
    border-radius: 20px;
  }
  .create-post-form {
    border: 1px solid #ccc;
    text-align: left;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    .header {
      padding: 0.5em 1em;
      font-weight: bold;
      font-size: 1.2em;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    }
    .error {
      background: #fff;
      margin: 0;
      width: auto;
      border-top: 1px solid #ccc;
      border-left: 0;
      border-right: 0;
      border-bottom: 0;
      border-radius: 0;
      text-align: left;
      padding: 0.5em 1em;
      background: #ffbeb3;
      span {
        color: #b31b00;
        font-weight: bold;
      }
      > .errors {
        margin: 0.3em 0.5em;
        padding: 0;
        border: 0;
        background: none;
        li {
          color: #b31b00;
          font-weight: lighter;
        }
      }
    }
    input[type="text"] {
      width: auto;
      border-top: 1px solid #ccc;
      border-left: 0;
      border-right: 0;
      border-bottom: 0;
      padding: 1em;
    }
    textarea {
      resize: none;
      width: auto;
      border-left: 0;
      border-right: 0;
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      padding: 1em;
      font-family: Arial, Helvetica, sans-serif;
    }
    .actions {
      text-align: right;
      padding: 0.5em 1em;
      button {
        margin-left: 1em;
        border-radius: 5px;
        border: 0;
        padding: 0.5em 0.8em;
        font-weight: bold;
      }
    }
  }
}
</style>
<script>
import forum from "@/forum";
export default {
  name: "CreatePost",
  data() {
    return {
      editing: false,
      title: "",
      content: "",
      error: "",
      errors: []
    };
  },
  methods: {
    async publish() {
      if (confirm("Publish this post?")) {
        this.emitter.emit("app-loading", false);
        await forum
          .createPost(this.token, this.title, this.content)
          .then(e => {
            if (typeof e.data == "object") {
              console.log(e.data);
              if (typeof e.data.result == "boolean" && e.data.result === true) {
                this.error = "";
                this.errors = [];
                this.title = "";
                this.content = [];
                this.editing = false;
                alert("Your post has been published");
              } else if (typeof e.data.error == "string") {
                this.error = e.data.error;
              } else if (typeof e.data.errors == "object") {
                this.errors = e.data.errors;
              } else {
                this.error = "Unknow error, try again later.";
                this.errors = [];
              }
            } else {
              this.error = "Unknow error, try again later.";
              this.errors = [];
            }
          })
          .catch(() => {
            this.error = "Unknow error, try again later.";
            this.errors = [];
          })
          .finally(() => this.emitter.emit("app-loading", false));
      }
    }
  },
  props: {
    token: String
  }
};
</script>
