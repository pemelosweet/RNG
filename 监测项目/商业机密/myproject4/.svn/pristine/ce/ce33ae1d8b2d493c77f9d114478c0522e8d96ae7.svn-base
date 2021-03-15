<template>
  <div class="home-Page">
    <el-row :gutter="16">
      <el-col :span="8">
        <!-- 工作台 -->
        <operate-platform></operate-platform>
      </el-col>
      <el-col :span="8">
        <!-- 通知公告 -->
        <common-assembly :data="noticeAnnouncementData" :title="'通知公告'" :titleMarkColor="'#0fd1dd'" :noDataFlag="noDataFlag"></common-assembly>
      </el-col>
      <el-col :span="8">
        <!-- 经典案例分享 -->
        <common-assembly :data="caseShareData" :title="'经典案例分享'" :titleMarkColor="'#a6d32e'" :noDataFlag="noDataFlag"></common-assembly>
      </el-col>
    </el-row>

    <!-- 报送端用户 -->
    <el-row :gutter="16" v-if="isReport">
      <el-col :span="4">
        <!-- 快速入口 -->
        <quick-entry></quick-entry>
      </el-col>
      <!-- 新三类布局 -->
      <template v-if="isNewThree || isBank">
        <el-col :span="20">
          <!-- 报送量统计 -->
          <message-statistics :bigTrade="bigTrade" :suspTrade="suspTrade"></message-statistics>
        </el-col>
        <el-col :span="24">
          <feedback-statistics :data="feedbackStatisticsData"></feedback-statistics>
        </el-col>
      </template>
      <!-- 通用布局 -->
      <template v-else>
        <el-col :span="10">
          <!-- 报送量统计 -->
          <message-statistics :bigTrade="bigTrade" :suspTrade="suspTrade"></message-statistics>

        </el-col>
        <el-col :span="10">
          <feedback-statistics :data="feedbackStatisticsData"></feedback-statistics>
        </el-col>

      </template>

    </el-row>

    <!-- 中心用户 -->
    <el-row :gutter="16" class="home-echarts" v-else>
      <el-col :span="10">
        <!-- 机构排名 -->
        <organization-rank :barData="barData" :pieData="pieData"></organization-rank>
      </el-col>
      <el-col :span="14">
        <!-- 报送量统计 -->
        <message-statistics :bigTrade="bigTrade" :suspTrade="suspTrade"></message-statistics>
      </el-col>
    </el-row>

    <el-row :gutter="16">
      <el-col :span="6">
        <!-- 文件公函 -->
        <file-missive :data="fileMissiveData" :noDataFlag="noDataFlag"></file-missive>

      </el-col>
      <el-col :span="6">
        <!-- 下载中心 -->
        <common-assembly :data="downloadCenterData" :title="'下载中心'" :titleMarkColor="'#fbc32e'" :size="'small'" :noDataFlag="noDataFlag"></common-assembly>
      </el-col>
      <el-col :span="6">
        <!-- 常见问题 -->
        <common-assembly :data="comonProblemData" :title="'常见问题'" :titleMarkColor="'#7f9ce0'" :size="'small'" :noDataFlag="noDataFlag"></common-assembly>
      </el-col>
      <el-col :span="6">
        <!-- 报送培训 -->
        <common-assembly :data="enrollTrainData" :title="'报送培训'" :titleMarkColor="'#fbc32e'" :size="'small'" :noDataFlag="noDataFlag"></common-assembly>
      </el-col>
    </el-row>

  </div>

</template>
<script>
import { getList } from '@/api/home/index'
import feedbackStatistics from '@/views/home/components/feedback-statistics.vue'
import fileMissive from '@/views/home/components/file-missive.vue'
import messageStatistics from '@/views/home/components/message-statistics.vue'
import operatePlatform from '@/views/home/components/operate-platform.vue'
import organizationRank from '@/views/home/components/organization-rank.vue'
import quickEntry from '@/views/home/components/quick-entry.vue'
import commonAssembly from '@/views/home/components/common-assembly.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    fileMissive,
    feedbackStatistics,
    messageStatistics,
    operatePlatform,
    organizationRank,
    quickEntry,
    commonAssembly
  },
  data() {
    return {
      caseShareData: [],
      comonProblemData: [],
      downloadCenterData: [],
      enrollTrainData: [],
      feedbackStatisticsData: [],
      fileMissiveData: [],
      bigTrade: {
        columns: '',
        rows: []
      },
      suspTrade: {
        columns: '',
        rows: []
      },
      noticeAnnouncementData: [],
      operatePlatformData: [],
      barData: {
        columns: '',
        rows: []
      },
      pieData: {
        columns: '',
        rows: []
      },
      quickEntryData: null,
      noDataFlag: false
    }
  },
  computed: {
    ...mapGetters(['institution', 'roles']),
    isReport() {
      return this.institution === this.GLOBAL.INSTITUTION_REPORT
    },
    isCenter() {
      return this.institution === this.GLOBAL.INSTITUTION_CENTER
    },
    isBranch() {
      return this.institution === this.GLOBAL.INSTITUTION_BRANCH
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
  methods: {
    fetchData() {
      getList().then(res => {
        // 反馈统计
        this.feedbackStatisticsData = res.data.feedbackNum

        // 报送量统计 -  大额
        this.bigTrade = res.data.tradeNum

        // 报送量统计 -  可疑
        this.suspTrade = res.data.reportNum

        // 文件公函
        this.fileMissiveData = res.data.listPubLetter

        // 通知公告
        this.noticeAnnouncementData = res.data.listNoteNotice

        // 经典案例
        this.caseShareData = res.data.listNoteCase

        // 下载中心
        this.downloadCenterData = res.data.listNoteDownload

        // 常见问题
        this.comonProblemData = res.data.listNoteQuestion

        // 报送培训
        this.enrollTrainData = res.data.listNoteTrain

        // 报送机构排名top5 - 大额
        this.barData = res.data.toptradeNum
        this.pieData = res.data.topRingNum
        // this.noDataFlag = true
      })
    }
  },
  mounted() {
    //     中心端：
    // 通知公告  listNoteNotice    时间noteCrDate  标题title
    // 经典案例分享  listNoteCase  时间noteCrDate  标题title
    // 下载中心  listNoteDownload   时间noteCrDate  标题title
    // 常见问题  listNoteQuestion   时间noteCrDate  标题title
    // 报送培训  listNoteTrain     时间noteCrDate  标题title
    // 文件公函  listPubLetter   时间creDate  标题docTitle
    this.fetchData()
  }
}
</script>
<style lang="scss" >
.home-Page {
  .el-card {
    margin-bottom: 18px;
    .title-mark {
      display: inline-block;
      height: 18px;
      width: 4px;
      vertical-align: middle;
      // font-weight: bold;
    }
  }
  .el-tabs--border-card {
    border: 0px;
  }
  .el-card {
    border-radius: 4px;
    border: 0px;
    background-color: #fff;
    overflow: hidden;
    color: #303133;
    transition: 0.3s;
  }
  .el-card__header {
    padding: 0;
    line-height: 39px;
    padding-left: 18px;
  }

  @media screen and(max-width: 1400px) {
    .home-echarts {
      .el-col-10 {
        width: 100%;
      }
      .el-col-14 {
        width: 100%;
      }
    }
  }
}
</style>
