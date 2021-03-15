<template>
  <div class="workPlatform">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>工作台</span>
      </div>
      <div class="content">
        <el-button size="medium" ref="btn1" :type="buttonhour" @click="handle">处理事项</el-button>
        <el-badge :value="num">
          <el-button size="medium" ref="btn2" :type="buttonmonth" @click="messageReminder">消息提醒</el-button>
        </el-badge>
        <div v-if="type === '0'">
          <h4>待办事项：</h4>
          <wait-handle style="margin-bottom: 100px;"></wait-handle>
          <h4>在办事项：</h4>
          <in-handle style="margin-bottom: 100px;"></in-handle>
          <h4>已办事项：</h4>
          <complete-handle></complete-handle>
        </div>
        <div v-if="type === '1'">
          <work-notice></work-notice>
        </div>
      </div>
    </el-card>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import waitHandle from '@/views/sys-monitoringAnalysis/workPlatform/components/wait-handle.vue'
import inHandle from '@/views/sys-monitoringAnalysis/workPlatform/components/in-handle.vue'
import completeHandle from '@/views/sys-monitoringAnalysis/workPlatform/components/complete-handle.vue'
import waitRead from '@/views/sys-monitoringAnalysis/workPlatform/components/wait-read.vue'
import workNotice from '@/views/sys-monitoringAnalysis/workPlatform/components/work-notice.vue'
import { formatTime } from '@/utils'
import { matterTooltip } from '@/api/sys-monitoringAnalysis/workPlatform/index.js'

export default {
  component() {
    formatTime
  },
  components: {
    waitHandle,
    inHandle,
    completeHandle,
    waitRead,
    workNotice
  },
  data() {
    return {
      buttonhour: 'primary',
      buttonmonth: '',
      toggleSearch: true,
      type: '0',
      num: '',
      active: '1',
      form: {
        region: ''
      },
      tableData: [],
      handling: [],
      handled: [],
      currentPage: 1,
      pagesize: 10,
      value6: '',
      // 查询
      formReady: {
        templateName: null,
        taskStartTime: null,
        taskCreater: null,
        taskEndTime: null,
        executionStatus: []
      }
    }
  },
  filters: {
    formatTime(date, option) {
      return formatTime(date, option)
    }
  },
  computed: {
    ...mapGetters([
      //   'name',
      'roles'
    ])
  },
  mounted() {
    if (sessionStorage.getItem('xtfNotice') !== null) {
      this.type = '1'
      this.buttonmonth = 'primary'
      this.buttonhour = ''
    }
    const paramsObj = {
      title: '',
      startDate: '',
      endDate: '',
      pageNum: 1,
      pageSize: 10
    }
    matterTooltip(paramsObj).then(res => {
      if (res.code === 200) {
        this.num = res.data.total
      }
    })
  },
  methods: {
    // handlerMsg(info) {
    //   sessionStorage.setItem('xtfInIndex', info)
    //   console.log(sessionStorage.getItem('xtfInIndex'))
    //   console.log(info)
    // },
    handle() {
      this.type = '0'
      this.buttonhour = 'primary'
      this.buttonmonth = ''
    },
    messageReminder() {
      this.type = '1'
      this.buttonmonth = 'primary'
      this.buttonhour = ''
    },
    lenFn(val) {
      this.num = val
    },
    // 分页
    handleSizeChange(val) {
      this.pagesize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
    }

  },
  created() {
    // console.log(sessionStorage.getItem('xtfInIndex'))
    // this.fetchData()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.workPlatform {
  .content {
    .content-tab {
      .el-tabs__header {
        margin-bottom: 6px;
      }
      .el-tabs__item {
        font-size: 16px;
      }
    }
    .formItem {
      .el-form--inline .el-form-item {
        margin-bottom: 8px;
        margin-right: 0px;
      }
    }
  }

  .more {
    float: right;
    padding: 5px 20px;
  }
  .item {
    margin-top: 10px;
    margin-right: 40px;
  }
}
</style>


