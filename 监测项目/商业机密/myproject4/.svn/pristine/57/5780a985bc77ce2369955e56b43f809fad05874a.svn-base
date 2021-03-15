<template>
  <div class="plan-approval" style="margin: 0 20px">
    <el-form :model="form" ref="form">
      <el-row :gutter="20">
        <h3>申请信息</h3>
          <div v-for="(val, key) in cNoticeHtml" :key="key" style="margin: 0 30px">
            <el-form-item :label="key + ':'">
              {{val}}
            </el-form-item>
          </div>
      </el-row>
      <el-row :gutter="20">
        <h3>原交易详情</h3>
          <div class="plainMain">  
            <TradeDetail :detailOptions="detailOptions" :tradeId="tradeId"></TradeDetail>
          </div>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.pageNum" :page-size="pageInfo.pageSize" background layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
      </el-row>
    </el-form>
  </div>
</template> 

<script>
import { mapGetters } from 'vuex'
import { updateForm } from '@/api/sys-monitoringAnalysis/dataGovernance/dataClean/task.js'
import TradeDetail from '@/views/sys-monitoringAnalysis/dataGovernance/common/tradeDetail/components/tradeDetail'

export default {
  components: {
    TradeDetail
  },
  data() {
    return {
      form: {},
      cNoticeHtml: {},
      tradeId: '',
      detailOptions: null,
      pageInfo: {
        pageNum: 1,
        pageSize: 1
      },
      list: [],
      total: null,
      contentList: null
    }
  },
  computed: {
    ...mapGetters(['businessFlag', 'workFlow2business', 'formContent'])
  },
  watch: {
    businessFlag(val) {
      if (val) this.updateForm()
    },
    formContent: {
      handler(newVal, oldVal) {
        this.list = newVal.list
        this.cNoticeHtml = newVal.report
        if (newVal.list.length > 0) {
          this.contentList = newVal.list
          const obj = JSON.parse(newVal.list[0])
          this.detailOptions = obj.trade
          this.total = newVal.list.length
        } else {
          this.detailOptions = '无数据'
        }
        this.tradeId = newVal.workflow.pkId
      },
      deep: true
    }
  },
  methods: {
    updateForm() {
      updateForm(this.workFlow2business, this.tradeId).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '提交成功',
            type: 'success'
          })
          this.$store.dispatch('changeFlag', false)
          setTimeout(() => {
            this.$router.push({ name: 'home' })
          }, 1000)
        }
      })
    },
    handleSizeChange(val) {
      this.pageInfo.pageSize = val
      this.getPagInfo(val)
    },
    // 弹窗分页
    handleCurrentChange(val) {
      this.pageInfo.pageNum = val
      this.getPagInfo(val)
    },
    getPagInfo(val) {
      if (this.contentList[parseInt(val) - 1]) {
        this.detailOptions = JSON.parse(this.contentList[parseInt(val) - 1]).trade
      }
    }
  }
}
</script>

<style lang="scss">
.plan-approval {
  .plainMain {
    // width: 100%;
    height: 300px;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 15px;
    margin: 15px;
    border: 1px solid #eeeeee;
    font-size: 14px;
  }
  .el-form-item__content {
    word-break: break-word;
  }
}
</style>
