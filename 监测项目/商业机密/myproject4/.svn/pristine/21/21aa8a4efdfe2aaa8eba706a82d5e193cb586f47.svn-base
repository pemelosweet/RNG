<template>
  <div class="dashboard">
    <!-- <iframe ref="iframe" :style="style" :src="iframeUrl" frameborder="0"></iframe> -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getUrl } from '@/api/sys-monitoringAnalysis/dashboard/dashboard.js'
export default {
  name: 'dashboard',
  data() {
    return {
      iframeUrl: '',
      style: {
        width: '100%',
        height: this.grtHeight()
      },
      loading: true
    }
  },
  computed: {
    ...mapGetters(['user_name'])
  },
  methods: {
    // 获取iframe显示高度
    grtHeight() {
      // eslint-disable-next-line no-return-assign
      return window.innerHeight - 156 + 'px'
    },
    // 判断iframe加载是否完成
    // loadFinish() {
    //   const loading = this.$loading({
    //     lock: true,
    //     text: '正在加载仪表盘，请耐心等候！',
    //     spinner: 'el-icon-loading',
    //     background: 'rgba(0, 0, 0, 0.7)'
    //   })
    //   var iframe = this.$refs.iframe
    //   // eslint-disable-next-line no-irregular-whitespace
    //   if (iframe.attachEvent) {
    //     iframe.attachEvent('onload', function() {
    //       loading.close()
    //     })
    //   } else {
    //     iframe.onload = function() {
    //       loading.close()
    //     }
    //   }
    // },
    // 获取iframe的地址
    getUrl() {
      // window.open("http://www.cnblogs.com/liumengdie/","_blank")
      getUrl('').then(res => {
        if (res.code === 200) {
          // this.isShow = true
          this.iframeUrl = res.data.dashboard[0].url + '&mtoken=' + this.user_name
          window.open(this.iframeUrl, '_blank')
        }
      })
    }
  },
  mounted() {
    this.getUrl()
    // this.loadFinish()
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.dashboard {
  .el-card .el-card__header a span {
    color: #409EFF;
  };
}
</style>

