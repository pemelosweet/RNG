<template>
  <div class="home-message-statistics">
    <el-card>
      <div slot="header" class="header clearfix">
        <i class="title-mark" style="background:#3ab7f1"></i>
        <span style="vertical-align:middle">报送量统计</span>
        <span style="float:right;font-size:12px;color:#555;margin-right:20px">近 5 个工作日</span>
      </div>
      <div ref="suspEchart" v-if="isCommonOther||isNewThree">
        <ve-histogram :title="suspChartTitle" :extend="suschartExtend" :loading="loading" :data-empty="dataEmpty" :legend-visible='false' :data="suspTData" :settings="suspSettings" :width="width" :height="height" :colors="suschartColors" :after-set-option="getSuspEcharts">
            </ve-histogram>
      </div>
      <el-row v-else>
        <el-col :span="11">
          <div ref="bigEchart">
            <ve-histogram :title="bigChartTitle" :extend="bigchartExtend" :loading="loading" :data-empty="dataEmpty" :legend-visible='false' :data="bigData" :settings="bigSettings" :width="width" :height="height" :colors="bigchartColors" :after-set-option="getBigEcharts">
            </ve-histogram>
          </div>
        </el-col>
        <el-col :span="2" style="text-align:center">
          <div class="split-line"></div>
        </el-col>
        <el-col :span="11">
          <div ref="suspEchart">
            <ve-histogram  :title="suspChartTitle" :extend="suschartExtend" :loading="loading" :data-empty="dataEmpty" :legend-visible='false' :data="suspTData" :settings="suspSettings" :width="width" :height="height" :colors="suschartColors" :after-set-option="getSuspEcharts">
            </ve-histogram>
          </div>
        </el-col>

      </el-row>

    </el-card>
  </div>

</template>
<script>
import VeHistogram from 'v-charts/lib/histogram'
import 'v-charts/lib/style.css'
import { mapGetters } from 'vuex'
export default {
  components: {
    VeHistogram
  },
  props: {
    bigTrade: {
      type: Object,
      default: function() {
        return {}
      }
    },
    suspTrade: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    // 大额
    this.bigchartColors = ['#3398DB']
    this.bigChartTitle = {
      text: `大额交易（单位：条） `,
      top: 0,
      textStyle: {
        fontSize: '12'
      }
    }

    this.bigchartExtend = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        top: '35px',
        left: '1%',
        right: '1%',
        bottom: '1%',
        containLabel: true
      },

      series: {
        type: 'bar',
        barWidth: '60%',
        label: { show: true, position: 'top' }
      }
    }
    this.bigSettings = {
      label: {
        normal: { show: true, position: 'top' }
      },
      labelMap: {
        numvalue: '交易数量'
      }
    }
    this.width = '100%'
    this.height = '200px'
    // 可疑
    this.suspSettings = {
      label: {
        normal: { show: true, position: 'top' }
      },
      labelMap: {
        numvalue: '报文数量'
      }
    }
    this.suschartColors = ['rgba(204, 102, 255, 1)']
    this.suspChartTitle = {
      top: 0,
      text: `可疑交易报告（单位：份）`,
      textStyle: {
        fontSize: '12'
      }
    }
    this.suschartExtend = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        top: '35px',
        left: '1%',
        right: '1%',
        bottom: '1%',
        containLabel: true
      },
      series: {
        type: 'bar',
        barWidth: '60%'
      }
    }
    return {
      bigData: {
        columns: [],
        rows: []
      },
      suspTData: {
        columns: [],
        rows: []
      },
      bigEchart: null,
      suspEchart: null,
      dataEmpty: true,
      loading: true
    }
  },
  computed: {
    ...mapGetters(['institution', 'roles']),
    isOpen() {
      return this.$store.state.app.sidebar.opened
    },
    isReport() {
      return this.institution === this.GLOBAL.INSTITUTION_REPORT
    },
    isBank() {
      const permissionRoles = [
        this.GLOBAL.ROLE_REPORT_BANK,
        this.GLOBAL.ROLE_REPORT_SECURITY,
        this.GLOBAL.ROLE_REPORT_INSURANCE
      ]
      return permissionRoles.includes(this.roles)
    },
    isCommonOther() {
      const permissionRoles = [this.GLOBAL.ROLE_REPORT_AUTOMOBILE]
      return permissionRoles.includes(this.roles)
    },
    isNewThree() {
      const permissionRoles = [
        this.GLOBAL.ROLE_REPORT_UNIONPAY,
        this.GLOBAL.ROLE_REPORT_CAPITAL_SETTLEMENT,
        this.GLOBAL.ROLE_REPORT_PAYAGENCY
      ]
      return permissionRoles.includes(this.roles)
    }
  },
  watch: {
    bigTrade: {
      handler: function(val, oldVal) {
        const bigObj = JSON.parse(JSON.stringify(val))
        if ((bigObj !== undefined) & (bigObj.rows.length > 0)) {
          this.bigData.columns = bigObj.columns ? bigObj.columns.split(',') : []
          this.bigData.rows = bigObj.rows
          this.loading = false
        }
        this.dataEmpty = false
      },
      deep: true
    },
    suspTrade: {
      handler: function(val, oldVal) {
        const suspObj = JSON.parse(JSON.stringify(val))
        if ((suspObj !== undefined) & (suspObj.rows.length > 0)) {
          this.suspTData.columns = suspObj.columns ? suspObj.columns.split(',') : []
          this.suspTData.rows = suspObj.rows
          this.loading = false
        }
        this.dataEmpty = false
      },
      deep: true
    },
    isOpen(val) {
      setTimeout(() => {
        this.width = this.$refs.bigEchart.offsetWidth + 'px' // 获取宽度
        console.log(this.width)
        this.bigEchart.resize()
        this.suspEchart.resize()
      }, 200)
    }
  },
  created() {},
  methods: {
    getBigEcharts(echart) {
      this.bigEchart = echart
    },
    getSuspEcharts(echart) {
      this.suspEchart = echart
    }
  },
  mounted() {}
}
</script>
<style lang="scss">
.home-message-statistics {
  .el-card__header {
    font-weight: bold;
  }
  .el-card__body {
    height: 220px;
    padding: 10px 0px;
    .split-line {
      margin-top: 10px;
      height: 180px;
      display: inline-block;
      width: 1px;
      background: #ebeef5;
    }
  }
}
</style>


