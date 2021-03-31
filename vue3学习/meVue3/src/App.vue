<template>
     <router-view></router-view>
</template>
<script>
import { watch } from 'vue'
export default {
  name: 'App',
  watch:{
     $route(to,from){
    // console.log(to.path);
  }
  }
}
</script>
