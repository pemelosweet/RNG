<template>
  <div class="mstrIndex">
    <el-card>
      <span slot="header">自助分析</span>
      <div class="connectMstr" :style="backGroundImg">
        <el-button type="primary" :disabled="disableBloorn" icon="el-icon-thumb" @click="openWindowMstr" class="mstrBtn"> mstr报表工具</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getData, login } from '@/api/sys-monitoringAnalysis/macroAnalysis/index.js'
export default {
  data() {
    return {
      backGroundImg: {
        backgroundImage: 'url(' + require('@/assets/back/msrtBackgroundImg.png') + ')',
        backgroundSize: '100%  100%'
      },
      urlInfo: '',
      disableBloorn: false
    }
  },
  computed: {
    ...mapGetters(['user_name'])
  },
  mounted() {
    this.disableBloorn = true
    this.getEasayData()
  },
  methods: {
    getEasayData() {
      login('').then(res => {
        if (res.code === 200) {
          getData('').then(res => {
            if (res.code === 200) {
              this.urlInfo = res.data.accept[0].url
              this.disableBloorn = false
            } else {
              this.disableBloorn = false
              this.$router.push({ name: 'login' })
            }
          })
            .catch(() => {

            })
        }
      })
    },
    openWindowMstr() {
      login('').then(res => {
        if (res.code === 200) {
          window.open(this.urlInfo + '&mtoken=' + this.user_name, '_blank')
        } else {
          this.$router.push({ name: 'login' })
        }
      })
    }
  }
}
</script>

<style lang="scss">
.mstrIndex{
  .connectMstr{
    text-align: center;
    height: 77vh;
    position: relative;
    .mstrBtn {
      border-radius: 10px;
      font-size: 20px;
      line-height: 2;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      .el-icon-thumb {
        font-size: 35px !important;
      }
      span {
          font-size: 22px !important;
      }
    }
  }
}
</style>
