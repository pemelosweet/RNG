<template>
  <div class="BeginBulk">
     <p>请使用非IE浏览器进入sophon环境!!</p>
  </div>
</template>

<script>
 export default {
   data() {
     return {
       activePane: '1'
     }
   },
   created() {
     if (this.$route.params.name) {
       this.activePane = this.$route.params.name
     }
     window.open(window.sophonAddress, '_blank')
     //  + ':8066/projects/43f1991e-6adc-4aa8-99ca-69cb8f18e043/dataset'
   },
   methods: {
   }

 }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
    .BeginBulk {
        position: relative;
        width: 100%;
        height: 100%;
        min-height: calc(100vh - 120px);
        .iframeHtml {
            min-height: calc(100vh - 120px);
        }
    }
</style>
