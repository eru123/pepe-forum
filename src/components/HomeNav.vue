<template>
    <div class="home-nav">
        <div class="left">Left</div>
        <h3 class="center">Forum</h3>
        <div class="right">Right</div>
    </div>
</template>
<style lang="scss" scoped>
.home-nav {
    border-bottom: 1px solid #ccc;
    padding: 1em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    h1,h2,h3,h4,h5,h6 {
        margin: 0;
    }
    > * {
        flex:1
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
    name: "HomeNav"
}
</script>