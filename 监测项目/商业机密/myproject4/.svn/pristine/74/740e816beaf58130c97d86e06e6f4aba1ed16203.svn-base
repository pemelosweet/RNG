<template>
  <div class="home-organization-rank">
    <el-card class="returncard secinline-box">
      <div slot="header" class="header clearfix">
        <i class="title-mark" style="background:#e88e8e"></i>
        <span style="vertical-align:middle;font-weight:bold;">报送机构排名Top5</span>
        <div style="float:right;margin-right:20px">
          <el-button style="padding: 3px 0" type="text" :class="{bigTrade:bigTrade}" @click="toggle1">大额交易</el-button>
          <el-button style="padding: 3px 0" type="text" :class="{bigTrade:suspicious}" @click="toggle2">可疑交易报告</el-button>
        </div>
      </div>
      <el-row>
        <el-col :span="24">
          <div ref="mixEchart">
            <ve-bar  :after-set-option="getEchart"  :data-empty="dataEmpty" :legend-visible='false' :colors="agencColor" :extend="agencExtend" :data="submitAgence" :barWidth="AgenceBarWidth" :barHeight="AgenceBarHeight" :xAxis="agencXAxis" :grid="agencGrid" :settings="agencSeting" :height="height" :width="width" :after-config="afterConfig"></ve-bar>
          </div>
          <!-- :loading="loading" -->
        </el-col>
      </el-row>
    </el-card>
  </div>

</template>
<script>
import 'echarts/lib/component/title'

import VeBar from 'v-charts/lib/bar'
import VePie from 'v-charts/lib/pie'
import { getTopFive } from '@/api/home/index'
export default {
  components: {
    VeBar,
    VePie
  },

  data() {
    this.height = '220px'
    this.width = '100%'
    this.agencColor = ['#3398DB', '#36CBCB']
    this.AgenceBarWidth = '40%'
    this.AgenceBarHeight = '20%'
    this.agencExtend = {
      axisPointer: {
        show: false
      },
      xAxisIndex: 0,
      yAxisIndex: 0,
      barWidth: '40%',
      barHeight: '20%'
    }
    this.agencXAxis = [
      {
        gridIndex: 0,
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisPointer: {
          show: false
        }
      }
    ]
    this.agencGrid = [
      {
        show: false,
        x: '0%',
        y: '6%',
        width: '50%',
        height: '90%'
      }
    ]
    this.agencSeting = {
      dataOrder: {
        label: 'numvalue',
        order: 'desc'
      },
      label: {
        normal: {
          show: true,
          position: 'right',
          textStyle: {
            color: '#ccc'
          }
        }
      }
    }
    return {
      submitAgence: {
        columns: [],
        rows: []
      },
      pieList: {
        rows: []
      },
      bigTrade: false,
      suspicious: true,
      echart: null,
      dataEmpty: true,
      loading: true
    }
  },
  computed: {
    isOpen() {
      return this.$store.state.app.sidebar.opened
    }
  },
  watch: {
    isOpen() {
      setTimeout(() => {
        this.width = this.$refs.mixEchart.offsetWidth + 'px' // 获取宽度
        console.log(this.width)
        this.echart.resize()
      }, 200)
    }
  },
  created() {
    this.getData('1')
  },

  methods: {
    afterConfig(options) {
      if (options.series) {
        options.series.push({
          name: '各级别投诉占比',
          type: 'pie',
          radius: '75%',
          center: ['75%', '50%'],
          labelLine: { normal: { show: false }},
          data: this.pieList,
          itemStyle: {
            normal: {
              label: {
                position: 'inside',
                formatter: '{b} \n \n{d}%',
                fontSize: 12,
                fontStyle: 'italic',
                fontWeight: 'bold',
                color: '#fff'
              }
            }
          }
        })
      }

      return options
    },

    toggle1() {
      this.getData('1')
      this.bigTrade = false
      this.suspicious = true
    },
    toggle2() {
      this.getData('2')
      this.bigTrade = true
      this.suspicious = false
    },
    getData(params) {
      getTopFive(params).then(res => {
        if (res.code === 200) {
          if (params === '1') {
            if ((res.data.tradeshow.rows !== undefined) & (res.data.tradeshow.rows.length > 0)) {
              this.submitAgence.columns = res.data.tradeshow.columns
                ? res.data.tradeshow.columns.split(',')
                : ''
              this.submitAgence.rows = res.data.tradeshow.rows
              this.pieList = res.data.tradeRing.rows
              this.dataEmpty = false
              this.loading = false
            }
          } else {
            if ((res.data.reportshow.rows !== undefined) & (res.data.reportshow.rows.length > 0)) {
              this.submitAgence.columns = res.data.reportshow.columns
                ? res.data.reportshow.columns.split(',')
                : ''
              this.submitAgence.rows = res.data.reportshow.rows
              this.pieList = res.data.reportRing.rows
              this.dataEmpty = false
              this.loading = false
            }
          }
        }
      })
    },
    getEchart(echart) {
      this.echart = echart
    }
  },
  mounted() {}
}
</script>
<style lang="scss">
.home-organization-rank {
  .el-card__body {
    padding: 0 20px;
    height: 220px;
  }
  .bigTrade {
    color: #606266;
  }
}
</style>
