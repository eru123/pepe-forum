<template>
  <div>
    <div v-if="loading" class="app-loading"></div>
    <router-view></router-view>
  </div>
</template>

<script>
import sync from "./forum/sync";
export default {
  name: "App",
  data(){
    return {
      loading: false
    }
  },
  async created() {
    await sync.both();
    
    const globalLoading = (e) =>{
      this.loading = e;
    }

    this.emitter.on('app-loading', e => {
      globalLoading(e)
    })
  }
};
</script>
