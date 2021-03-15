<template>
  <div class="homewrap">
    <el-row :gutter="16" style="margin-bottom: 20px;">
      <el-col :span="8">
        <el-tabs type="border-card" class="firinline-box">
          <el-tab-pane>
            <el-badge slot="label" is-dot>
              <span>待办事项</span>
            </el-badge>
            <div v-for="(o, index) in remindList" :key="o.id" class="text item clearfix">
              <i class="el-alert__icon el-icon-warning" v-if="index%2==0 & roles.indexOf(this.GLOBAL.REPORT)===0"></i>
              <router-link :to="{ name: o.path, params: { id: o.id, title: o.title } }">
                <div class="clearfix tabs-content">
                  <span class="h-listtxt">{{ o.title }}</span>
                  <span class="tabs-state">[ {{ o.state }} ]</span>
                </div>
              </router-link>
              <div class="tabs-info ">
                <span>{{ o.from }}</span>
                <span>{{ o.createTime }}</span>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <el-badge slot="label" is-dot>
              <span>在办事项</span>
            </el-badge>
            <div v-for="(o, index) in dealtList" :key="o.id" v-loading.body="listLoading" element-loading-text="Loading" class="text item clearfix">
              <i class="el-alert__icon el-icon-warning" v-if="index%2==1 && roles.indexOf(this.GLOBAL.REPORT)===-1"></i>
              <div class="clearfix tabs-content" style="cursor: pointer;" v-if="index==1" @click="dialogFormVisible = !dialogFormVisible">
                <span class="h-listtxt">{{ o.title.content }}</span>
                <span class="tabs-state tab-new">[ {{ o.state }} ]</span>
              </div>

              <router-link :to="{ name: o.title.path, params: { id: o.id, title: o.title } } " v-else>
                <div class="clearfix tabs-content">
                  <span class="h-listtxt"> {{ o.title.content }} </span>
                  <span class="tabs-state tab-new">[ {{ o.state }} ]</span>
                </div>
              </router-link>

              <div class="tabs-info">
                <span>{{ o.from }}</span>
                <span>{{ o.createTime }}</span>
              </div>
            </div>
          </el-tab-pane>

          <el-tab-pane>
            <el-badge slot="label" is-dot>
              <span>已办事项</span>
            </el-badge>
            <div v-for="(o, index) in doneList" :key="index" v-loading.body="listLoading" element-loading-text="Loading" class="text item clearfix">
              <i class="el-alert__icon el-icon-warning" v-if="index%2==1 && roles.indexOf(this.GLOBAL.REPORT)===-1"></i>
              <div class="clearfix tabs-content" style="cursor: pointer;" v-if="index==1" @click="dialogFormVisible = !dialogFormVisible">
                <span class="h-listtxt">{{ o.title.content }}</span>
                <span class="tabs-state tab-new">[ {{ o.state }} ]</span>
              </div>

              <router-link :to="{ name: o.title.path, params: { id: o.id, title: o.title } } " v-else>
                <div class="clearfix tabs-content">
                  <span class="h-listtxt"> {{o.title.path}}{{ o.title.content }} </span>
                  <span class="tabs-state tab-new">[ {{ o.state }} ]</span>
                </div>
              </router-link>

              <div class="tabs-info">
                <span>{{ o.from }}</span>
                <span>{{ o.createTime }}</span>
              </div>
            </div>
          </el-tab-pane>

          <!-- 由孙士宾提出修改 -->

          <el-tab-pane label="待阅事项" v-if="roles.indexOf(this.GLOBAL.CENTER)!==-1">
            <div v-for="(o,index) in readList" :key="index" class="text item clearfix">
              <router-link :to="{ name: 'detail', params: { id: o.id, title: o.title } }">
                <div class="clearfix">
                  <span class="h-listtxt">{{ o.title }}</span>
                  <span class="tabs-state">[ {{ o.state }} ]</span>
                </div>
              </router-link>
              <div class="tabs-info">
                <span>{{ o.from }}</span>
                <span>{{ o.createTime }}</span>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane v-if="roles.indexOf(this.GLOBAL.CENTER)!==-1" label="系统通知">
            <div v-for="o in notificationList" :key="o.id" class="text item">
              <router-link :to="{ name: 'detail', params: { id: o.id, title: o.title } }">
                <div class="clearfix">
                  <span class="h-listtxt">{{ o.title }}</span>
                  <span class="tabs-state">[ {{ o.state }} ]</span>
                </div>
              </router-link>
              <div class="tabs-info">
                <span>{{ o.from }}</span>
                <span>{{ o.createTime }}</span>
              </div>
            </div>
          </el-tab-pane>
          <div class="cardmorebtn clearfix">
            <router-link to="/workPlatform">
              <el-button style="float: right; padding:12px 6px 0" type="text" class="button">更多></el-button>
            </router-link>
          </div>
        </el-tabs>
      </el-col>

      <el-col :span="8">
        <el-card class="box-card noticecard firinline-box">
          <div slot="header" class="header">
            <span>通知公告</span>
          </div>
          <div v-for="(o,index) in notecementList" :key="index" class="text item h-list">
            <div class="clearfix">
              <router-link :to="{ name: 'notice_detail', params: { id: o.noteId, title: o.title } }">
                <span class="h-listtxt"> {{ o.title }}</span>
              </router-link>
              <span class="tabs-state">[{{o.noteCrDate}}]</span>
            </div>
          </div>
          <div class="cardmorebtn clearfix">
            <router-link to="/institutionBuild/notice">
              <el-button style="float: right; padding:12px 6px 0" type="text" class="button">更多></el-button>
            </router-link>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card noticecard firinline-box">
          <div slot="header" class="header">
            <span>经典案例分享</span>
          </div>
          <div v-for="(o,index) in announcementList" :key="index" class="text item h-list">
            <div class="clearfix">
              <router-link :to="{ name: 'notice_detail', params: { id: o.noteId, title: o.title } }">
                <span class="h-listtxt"> {{ o.title }}</span>
              </router-link>
              <span class="tabs-state">[{{o.noteCrDate}}]</span>
            </div>
          </div>
          <div class="cardmorebtn clearfix">
            <router-link :to="{name:'list', params:{title: '经典案例分享'}}">
              <el-button style="float: right; padding:12px 6px 0" type="text" class="button">更多></el-button>
            </router-link>
          </div>
        </el-card>
      </el-col>

    </el-row>
    <!-- 第二列 -->
    <el-row :gutter="16" style="margin-bottom: 20px;">
      <!-- 需要判断是中心客户还是报送端客户 -->
      <el-col :span="line2.min" type="error" v-if="roles.indexOf(this.GLOBAL.CENTER)!==-1||roles.indexOf(this.GLOBAL.BRANCH)!==-1||roles.indexOf(this.GLOBAL.MONITOR)!==-1||roles.indexOf(this.GLOBAL.CENTER_MANAGE)!==-1||
      roles.indexOf(this.GLOBAL.MONITOR_MANAGER)!==-1||roles.indexOf(this.GLOBAL.MONITOR_TRANSFER_DIRECTOR)!==-1||roles.indexOf(this.GLOBAL.MONITOR_ANALYSIS_DIRECTOR)!==-1||
      roles.indexOf(this.GLOBAL.MONITOR_ANALYSIS_PERSON)!==-1||roles.indexOf(this.GLOBAL.MONITOR_ANALYSIS_LEADER)!==-1||roles.indexOf(this.GLOBAL.MONITOR_TRANSFER_NUMPERSON)!==-1||
      roles.indexOf(this.GLOBAL.MONITOR_TRANSFER_CENTERLEADER)!==-1||this.roles.indexOf(this.GLOBAL.MONITOR_TRANSFER_GENERAL) !== -1||this.roles.indexOf(this.GLOBAL.MONITOR_TRANSFER_CHECK) !== -1">
        <el-card class="returncard secinline-box">
          <div slot="header" class="header">
            <span>报送机构排名Top5</span>
            <ul class="ul-inline" style="float:right">
              <li>
                <el-button style="padding: 3px 0" :class="{active:dae}" type="text" @click="toggleShow1">大额交易</el-button>
              </li>
              <li>
                <el-button style="padding: 3px 0" :class="{active:keyi}" type="text" @click="toggleShow2">可疑交易</el-button>
              </li>
            </ul>
          </div>
          <ve-bar :legend-visible='false' :colors='agencColor' :extend="agencExtend" :data="submitAgence" :barWidth="AgenceBarWidth" :barHeight="AgenceBarHeight" :xAxis="agencXAxis" :grid="agencGrid" :settings="agencSeting" :height="height" :width="width" :after-config="afterConfig"></ve-bar>

        </el-card>
      </el-col>

      <el-col :span="4" v-if="roles.indexOf(this.GLOBAL.REPORT_BANK)!==-1 || roles.indexOf(this.GLOBAL.REPORT_INSURANCE)!==-1 || roles.indexOf(this.GLOBAL.REPORT_SECURITY)!==-1">
        <el-card class="fillcard secinline-box" :body-style="{'padding-top':'10px'}">
          <div slot="header" class="header">
            <span>快速填报入口</span>
          </div>
          <router-link to="dataSubmit/onlineFill">
            <div class="fillwrap editwrap">
              <div class="fillbtn">
                <i class="el-icon-edit"></i>
              </div>
              <span>在线填报</span>
            </div>
          </router-link>
          <router-link to="dataSubmit/pageLoading">
            <div class="fillwrap refreshwrap">
              <div class="fillbtn">
                <i class="el-icon-refresh"></i>
              </div>
              <span>页面加载</span>
            </div>
          </router-link>
        </el-card>
      </el-col>

      <el-col :span="line2.max">
        <el-card class="box-card submitcard secinline-box clearfix">
          <div slot="header" class="header clearfix">
            <span>报送量统计</span>
            <el-button style="float: right; padding: 3px 0; color:#666;  cursor: default;" type="text">上个月（单位/条）</el-button>
          </div>
          <el-col :span="24">
            <el-col :span="12">
              <ve-histogram  :extend="bigchartExtend" :legend-visible='false' :data="chartData" :settings="chartSettings" :width="width" :height="height" :colors="bigchartColors" :after-config="big_afterConfiger" :before-config="big_beforeConfig"></ve-histogram>
            </el-col>
            <el-col :span="12">
              <ve-histogram :extend="suschartExtend" :legend-visible='false' :data="chartDataSusp" :settings="chartSettings" :width="width" :height="height" :colors="suschartColors"  :after-config="sus_afterConfiger"></ve-histogram>
            </el-col>
          </el-col>
        </el-card>
      </el-col>
    </el-row>
    <!-- 第 3 列 -->
    <el-row v-if="roles.indexOf(this.GLOBAL.REPORT_BANK)!==-1" style="margin-bottom:10px" :gutter="16">
      <el-col :span="24">
        <el-card>
          <div slot="header">
            <span>
              报送反馈统计
            </span>
          </div>
          <el-table :data="tableData">
            <el-table-column label="类别" prop="type" min-width="100"></el-table-column>
            <el-table-column label="T-3日新增" prop="threedaysnum" min-width="100"></el-table-column>
            <el-table-column label="T-2日新增" prop="twodaysnum" min-width="100"></el-table-column>
            <el-table-column label="T-1日新增" prop="onedaynum" min-width="100"></el-table-column>
            <el-table-column label="X月未处理" prop="monthnum" min-width="100">
              <template slot-scope="scope">
                {{scope.row.monthnum===0?'0':(scope.row.monthnum?scope.row.monthnum:'-')}}
              </template>
            </el-table-column>
            <el-table-column label="近30日未处理" prop="thirtydaysnum" min-width="120">
              <template slot-scope="scope">
                {{scope.row.thirtydaysnum===0?'0':(scope.row.thirtydaysnum?scope.row.thirtydaysnum:'-')}}

              </template>
            </el-table-column>
          </el-table>
        </el-card>

      </el-col>
    </el-row>
    <!-- 第 4 列 -->
    <el-row :gutter="16">
      <el-col :span="6">
        <el-card class="filecard thirinline-box">
          <div slot="header" class="header">
            <span>文件公函</span>
          </div>
          <div v-for="(o,index) in caseshareList" :key="index" class="text item">
            <div class="clearfix">
              <router-link :to="{ name: 'institutionBuild_officialDocuments_center_look', params: { id: o.docId, title: o.docTitle } }">
                <span class="h-listtxt"> {{ o.docTitle }}</span>
              </router-link>
              <span class="tabs-state">[{{ o.pubDate }}]</span>
            </div>
          </div>
          <div class="cardmorebtn clearfix">
            <el-button style="float: right; padding:12px 6px 0" type="text" class="button">更多></el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card downcard thirinline-box">
          <div slot="header" class="header">
            <span>下载中心</span>
          </div>
          <div v-for="(o,index) in downloadList" :key="index" class="text item">
            <div class="clearfix">
              <router-link :to="{ name: 'notice_detail', params: { id: o.noteId, title: o.title } }">
                <span class="h-listtxt"> {{ o.title }}</span>
              </router-link>
              <span class="tabs-state">[{{ o.noteCrDate }}]</span>
            </div>
          </div>
          <div class="cardmorebtn clearfix">
            <router-link :to="{name:'list', params:{title: '下载中心'}}">
              <el-button style="float: right; padding:12px 6px 0" type="text" class="button">更多></el-button>
            </router-link>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card2 issuecard thirinline-box">
          <div slot="header" class="header">
            <span>常见问题</span>
          </div>
          <div v-for="(o,index) in answerList" :key="index" class="text item">
            <router-link :to="{ name: 'notice_detail', params: { id: o.noteId, title: o.title } }">
              <span class="h-listtxt">{{ o.title }}</span>
            </router-link>
            <span class="tabs-state">[{{ o.noteCrDate }}]</span>
          </div>
          <div class="cardmorebtn clearfix">
            <router-link :to="{name:'list', params:{title: '常见问题'}}">
              <el-button style="float: right; padding:12px 6px 0" type="text" class="button">更多></el-button>
            </router-link>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="traincard thirinline-box">
          <div slot="header" class="header">
            <span>报送培训</span>
          </div>
          <div v-for="(o,index) in trainList" :key="index" class="text item">
            <div class="clearfix">
              <router-link :to="{ name: 'notice_detail', params: { id: o.noteId, title: o.title } }">
                <span class="h-listtxt"> {{ o.title }}</span>
              </router-link>
              <span class="tabs-state">[{{ o.noteCrDate }}]</span>
            </div>
          </div>
          <div class="cardmorebtn clearfix">
            <router-link :to="{name:'list', params:{title: '报送培训'}}">
              <el-button style="float: right; padding:12px 6px 0" type="text" class="button">更多></el-button>
            </router-link>
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import 'echarts/lib/component/title'
import VeHistogram from 'v-charts/lib/histogram'
import VePie from 'v-charts/lib/pie'
import VeBar from 'v-charts/lib/bar'
import { getList, getTopFive } from '@/api/home/index'

export default {
  name: 'home',
  components: {
    VeBar,
    VeHistogram,
    VePie
  },
  data() {
    return {
      pieData: '',
      tableData: [],
      chartData: {
        columns: [],
        rows: []
      },
      chartDataSusp: {
        columns: [],
        rows: []
      },

      caseshareList: null,
      announcementList: null,
      notecementList: null,
      downloadList: null,
      answerList: null,
      trainList: null,
      submitAgence: {
        columns: [],
        rows: []
      },

      dealtList: null,
      readList: null,
      remindList: null,
      doneList: null,
      notificationList: null,
      listLoading: true,
      activeName: 'first',

      dae: true,
      keyi: false
    }
  },
  computed: {
    ...mapGetters(['roles']),
    line1: function(roles) {
      if (this.roles.indexOf(this.GLOBAL.CENTER) !== -1) {
        return {
          max: 9,
          min: 6
        }
      } else {
        return {
          max: 10,
          min: 4
        }
      }
    },
    line2: function() {
      if (
        this.roles.indexOf(this.GLOBAL.CENTER) !== -1 ||
        this.roles.indexOf(this.GLOBAL.BRANCH) !== -1 ||
        this.roles.indexOf(this.GLOBAL.MONITOR) !== -1 ||
        this.roles.indexOf(this.GLOBAL.CENTER_MANAGE) !== -1 ||
        this.roles.indexOf(this.GLOBAL.MONITOR_MANAGER) !== -1 ||
        this.roles.indexOf(this.GLOBAL.MONITOR_TRANSFER_DIRECTOR) !== -1 ||
        this.roles.indexOf(this.GLOBAL.MONITOR_ANALYSIS_DIRECTOR) !== -1 ||
        this.roles.indexOf(this.GLOBAL.MONITOR_ANALYSIS_PERSON) !== -1 ||
        this.roles.indexOf(this.GLOBAL.MONITOR_ANALYSIS_LEADER) !== -1 ||
        this.roles.indexOf(this.GLOBAL.MONITOR_TRANSFER_NUMPERSON) !== -1 ||
        this.roles.indexOf(this.GLOBAL.MONITOR_TRANSFER_GENERAL) !== -1 ||
        this.roles.indexOf(this.GLOBAL.MONITOR_TRANSFER_CHECK) !== -1
      ) {
        return {
          graph: {
            max: 14,
            min: 10
          },
          max: 14,
          min: 10
        }
      } else {
        return {
          graph: {
            max: 12,
            min: 12
          },
          max: 14,
          min: 6
        }
      }
    },
    totalTrade: function() {
      var aa = 0
      this.chartData.rows.forEach((item, idx) => {
        if (item.numvalue && item.numvalue >= 0) {
          aa += Number(item.numvalue)
        }
      })
      return aa
    }, // 大额总数
    totalReport: function() {
      var sum = 0
      this.chartDataSusp.rows.forEach((item, idx) => {
        if (item.numvalue && item.numvalue >= 0) {
          sum += Number(item.numvalue)
        }
      })
      return sum
    } // 可疑总数

  },
  created() {
    this.bigchartColors = ['#3398DB']
    this.chartSettings = {
      label: {
        normal: { show: true, position: 'top' }
      }
    }
    this.width = '100%'
    this.height = '200px'
    this.bigchartExtend = {
      title: {
        text: '大额新增(总数：0)',
        textStyle: {
          fontSize: '12'
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        top: 30,
        left: '2%',
        right: '2%',
        bottom: '3%',
        containLabel: true
      },
      series: {
        type: 'bar',
        barWidth: '60%'
      }
    }

    this.suschartColors = ['rgba(204, 102, 255, 1)']
    this.suschartExtend = {
      title: {
        text: '可疑新增(总数：0)',
        textStyle: {
          fontSize: '12'
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        top: 30,
        left: '2%',
        right: '2%',
        bottom: '3%',
        containLabel: true
      },
      series: {
        type: 'bar',
        barWidth: '60%'
      }
    }

    this.agencColor = ['#9bd9ff', '#64b0ff']
    this.AgenceBarWidth = '40%'
    this.AgenceBarHeight = '20%'

    this.agencSeting = {
      dataOrder: {
        label: '报送数量',
        order: 'desc'
      },
      label: {
        normal: {
          show: true,
          position: 'right',
          textStyle: {
            color: '#9EA7C4'
          }
        }
      }
    }
    this.agencGrid = [
      {
        show: false,
        x: '0%',
        y: '6%',
        width: '50%',
        height: '90%'
      }
    ]
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
    this.agencExtend = {
      axisPointer: {
        show: false
      },
      xAxisIndex: 0,
      yAxisIndex: 0,
      barWidth: '40%',
      barHeight: '20%'
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {

    fetchData() {
      getList().then(res => {
        // 反馈统计
        this.tableData = res.data.feedbackNum

        // 报送量统计 -  大额
        this.chartData.columns = res.data.tradeNum.columns ? res.data.tradeNum.columns.split(',') : ''
        this.chartData.rows = res.data.tradeNum.rows

        // 报送量统计 -  可疑
        this.chartDataSusp.columns = res.data.reportNum.columns ? res.data.reportNum.columns.split(',') : ''
        this.chartDataSusp.rows = res.data.reportNum.rows

        // 文件公函
        this.caseshareList = res.data.listPubLetter

        // 通知公告
        this.notecementList = res.data.listNoteNotice

        // 经典案例
        this.announcementList = res.data.listNoteCase

        // 下载中心
        this.downloadList = res.data.listNoteDownload

        // 常见问题
        this.answerList = res.data.listNoteQuestion

        // 报送培训
        this.trainList = res.data.listNoteTrain

        // 报送机构排名top5 - 大额
        this.submitAgence.columns = res.data.toptradeNum.columns ? res.data.toptradeNum.columns.split(',') : ''
        this.submitAgence.rows = res.data.toptradeNum.rows
        this.pieData = res.data.topRingNum.rows
      })
    },

    toggleShow1() {
      getTopFive('1').then(res => {
        this.submitAgence.columns = res.data.tradeshow.columns ? res.data.tradeshow.columns.split(',') : ''
        this.submitAgence.rows = res.data.tradeshow.rows
        this.pieData = res.data.tradeRing.rows
      })
      this.dae = true
      this.keyi = false
    },
    toggleShow2() {
      getTopFive('2').then(res => {
        this.submitAgence.columns = res.data.reportshow.columns ? res.data.reportshow.columns.split(',') : ''
        this.submitAgence.rows = res.data.reportshow.rows
        this.pieData = res.data.reportRing.rows
      })
      this.dae = false
      this.keyi = true
    }, // 可疑交易
    afterConfig(options) {
      options.series.push({
        name: '各级别投诉占比',
        type: 'pie',
        radius: '75%',
        center: ['80%', '50%'],
        labelLine: { normal: { show: false }},
        data: this.pieData,
        itemStyle: {
          normal: {
            label: {
              position: 'inside',
              formatter: '{b} \n \n{d}%',
              fontSize: 12
            }
          }
        }
      })

      return options
    }, // top5 配置
    big_afterConfiger(options) {
      options.title = {
        text: '大额新增(总数：' + this.totalTrade + ')',
        textStyle: {
          fontSize: '12'
        }
      }
      return options
    }, // 大额 配置
    big_beforeConfig(data) {
      // console.log(data)
    },
    sus_afterConfiger(options) {
      options.title = {
        text: '可疑新增(总数：' + this.totalReport + ')',
        textStyle: {
          fontSize: '12'
        }
      }
      return options
    } // 可疑配置
  },
  beforeUpdate() {
    // this.submitAgencePie = 0
    // this.submitAgence.rows.map(item => {
    //   this.submitAgencePie += Number(item[this.submitAgence.columns[1]])
    // })
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.homewrap {
  .ul-inline li {
    padding: 0 5px;
    .el-button {
      color: #303133;
    }
    .active {
      color: #409eff;
    }
  }

  // .el-badge__content.is-fixed {
  //   top: 10px;
  //   right: 0;
  // }
  // .firinline-box {
  //   height: 240px;
  // }
  // .secinline-box {
  //   .el-card__body {
  //     padding: 10px 20px;
  //   }
  //   height: 262px;
  //   .infoBlock {
  //     font-size: 12px;
  //     color: rgb(102, 102, 102);
  //   }
  //   .infoNumber {
  //     float: right;
  //     min-width: 60px;
  //     text-align: center;
  //   }
  //   .infoTitle {
  //     float: left;
  //   }
  //   .infoHeader {
  //     padding: 0 10px;
  //   }
  //   .infoItem {
  //     padding: 10px;
  //     font-size: 14px;
  //     color: #303133;
  //   }
  // }
  .thirinline-box {
    height: 240px;
  }
  // .el-card__header {
  //   padding-top: 10px;
  //   padding-bottom: 10px;
  // }
  .el-card__header .header > span {
    margin-left: -6px;
    padding-left: 6px;
    border-left-width: 4px;
    border-left-style: solid;
  }
  .noticecard .el-card__header .header > span {
    border-left-color: #0fd1dd;
  }
  .filecard .el-card__header .header > span {
    border-left-color: #a6d32e;
  }
  .returncard .el-card__header .header > span {
    border-left-color: #c3de21;
  }
  .fillcard .el-card__header .header > span {
    border-left-color: #fbc32e;
  }
  .submitcard .el-card__header .header > span {
    border-left-color: #7f9ce0;
  }
  .filecard .el-card__header .header > span {
    border-left-color: #fbc32e;
  }
  .casecard .el-card__header .header > span {
    border-left-color: #3ab7f1;
  }
  .downcard .el-card__header .header > span {
    border-left-color: #ffb81e;
  }
  .issuecard .el-card__header .header > span {
    border-left-color: #e88e8e;
  }
  .traincard .el-card__header .header > span {
    border-left-color: #e78ede;
  }
  // .header .header_tabs {
  //   float: right;
  //   font-size: 12px;
  //   font-style: normal;
  //   cursor: pointer;
  // }
  // .header .header_tabs.active {
  //   color: #409eff;
  // }

  // .el-card__body .h-list {
  //   padding: 9px 0;
  // }

  // .h-listtxt {
  //   display: inline-block;
  //   width: 70%;
  //   text-overflow: ellipsis;
  //   white-space: nowrap;
  //   overflow: hidden;
  // }
  // .el-alert__icon {
  //   float: left;
  //   text-align: top;
  //   color: #e6a23c;
  // }
  // .tabs-state {
  //   float: right;
  //   color: #999;
  //   font-size: 12px;
  // }
  // .tab-new {
  //   color: #cc2626;
  // }
  // .tabs-content {
  //   margin-left: 18px;
  // }
  // .tabs-info {
  //   margin-top: 5px;
  //   color: #999;
  //   font-size: 0.9em;
  //   span {
  //     text-indent: 16px;
  //     display: inline-block;
  //     margin-right: 30px;
  //   }
  // }
  .text {
    font-size: 14px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-bottom: 1px solid #e5e5e5;
    padding: 0.5em 0;
    color: #666;
    &:first-child {
      padding-top: 0;
    }
    &:hover {
      color: #cc2626;
    }
  }

  .box-card {
    margin-left: 0;
    margin-right: 0;
  }
  .box-card2 {
    margin-right: 0;
  }
  .el-card {
    border-radius: 0;
  }
  .el-notification {
    background-color: #ffeec8;
    & p {
      font-size: 0.8em;
    }
  }
  .fillwrap {
    text-align: center;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    -o-border-radius: 4px;
    -ms-border-radius: 4px;
    padding: 0.4em 0;
    .fillbtn {
      width: 2.8em;
      height: 2.8em;
      line-height: 2.8em;
      margin: 0 auto;
      border-radius: 4px;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      -o-border-radius: 4px;
      -ms-border-radius: 4px;
      color: #fff;
      text-align: center;
      & i.el-icon-refresh {
        width: 2em;
        height: 2em;
      }
    }
    span {
      display: inline-block;
      font-size: 0.8em;
      margin-top: 8px;
      color: #666;
    }
  }
  .editwrap .fillbtn {
    background-color: #529cf5;
  }
  .refreshwrap {
    margin-top: 10px;
    .fillbtn {
      background-color: #3fadea;
    }
  }
  .return-item {
    font-size: 0.8em;
    margin-top: 1.8em;
    &:first-child {
      margin-top: 0;
    }
    .r-txt em {
      display: inline-block;
      width: 8px;
      height: 8px;
      vertical-align: 2px;
      border-radius: 2px;
      -webkit-border-radius: 2px;
      -moz-border-radius: 2px;
      -o-border-radius: 2px;
      -ms-border-radius: 2px;
      margin-right: 6px;
      & .normal {
        background-color: #87acd9;
      }
    }
    .r-num {
      float: right;
    }
  }
  .return-list {
    margin-top: 1.8em;
    font-size: 0.8em;
    &:first-child {
      margin-top: 0;
    }
  }
  .cardmorebtn .el-button--text {
    color: #999;
    &:hover {
      color: #3699ff;
      cursor: pointer;
    }
  }
}
</style>
