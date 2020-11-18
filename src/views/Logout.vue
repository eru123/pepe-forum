<template>
  <div class="centered-container">
    <h1>Logging out</h1>
  </div>
</template>
<script>
import sync from "@/forum/sync";
export default {
    name: "Logout",
    async created(){
        this.$store.commit('token','');
        this.$store.commit('my_info',{});
        this.$store.commit('posts',{});
        this.$store.commit('comments',{});
        this.$store.commit('replies',{});
        this.$store.commit('notifications',{});
        
        await sync.clearLocal().then(async () => {
            await sync.delay(1000)
             this.$router.push({name: "Login"})
        });
    }
}
</script>