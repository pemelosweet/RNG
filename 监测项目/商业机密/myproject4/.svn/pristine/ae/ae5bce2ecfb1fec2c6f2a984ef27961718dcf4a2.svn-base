<template>
  <div class="knowledge">
    请点击左侧"知识资料库"导航, 进入sophon环境!!
  </div>
</template>
<script>
import { routerJump } from '@/api/sys-monitoringAnalysis/knowledgeBaseForum/index.js'
export default {
  data() {
    return {

    }
  },
  created() {
    this.initApi()
  },
  methods: {
    initApi() {
      routerJump().then(res => {
        if (res.code === 200) {
          window.open(res.data.knowledge)
        }
      })
    }
  }
}
</script>
<style lang="scss">
  .knowledge {
    background: white;
    width: 100%;
    height: 100%;
    padding: 10px;
    min-height: calc(100vh - 120px);
  }
</style>