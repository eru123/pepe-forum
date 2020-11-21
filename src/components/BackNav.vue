<template>
  <div class="back-nav">
    <div class="link" @click="$router.go(-1)">Back</div>
    <div class="title">{{ title }}</div>
  </div>
</template>
<style lang="scss" scoped>
.back-nav {
  position: sticky;
  top: 0;
  background: #fff;
  border-bottom: 1px solid #ccc;
  padding: 1em;
  display: flex;
  justify-content: space-between;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }
  .link {
    &:hover {
      text-shadow: 1px 1px 5px gray;
    }
  }
  .title {
    font-weight: bold;
  }
}
</style>
<script>
export default {
  name: "BackNav",
  props: {
    title: String
  }
};
</script>
