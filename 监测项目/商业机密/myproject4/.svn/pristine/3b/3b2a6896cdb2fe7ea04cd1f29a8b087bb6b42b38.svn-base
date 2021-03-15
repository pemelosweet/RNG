<template>
  <div class="runHistory">
      <p>请使用非ie浏览器访问如下链接，登陆sophon系统，链接：{{this.absAderrss}}</p>
  </div>
</template>

<script>
 export default {
   data() {
     return {
       activePane: '1',
       absAderrss: ''
     }
   },
   created() {
     this.absAderrss = window.sophonAddress
     if (this.$route.params.name) this.activePane = this.$route.params.name
     if (this.isIE()) {
       this.$alert('请使用非ie浏览器访问如下链接，登陆sophon系统 链接：' + window.sophonAddress, '提示', {
         confirmButtonText: '确定',
         callback: action => {
         }
       })
     }
     window.open(window.sophonAddress, '_blank')
   },
   methods: {
     isIE() {
       if (!!window.ActiveXObject || 'ActiveXObject' in window) {
         return true
       } else {
         return false
       }
     }
   }

 }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
    .runHistory {
        position: relative;
        width: 100%;
        height: 100%;
        min-height: calc(100vh - 120px);
        .iframeHtml {
            min-height: calc(100vh - 120px);
        }
    }
</style>
