<template>
  <div class="point">
    <el-row>
      <el-form :model="form" ref="form">
        <el-col :span="12">
          <el-form-item label="机构名称">{{ form.dataFrom }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="监测交易笔数">{{ form.tradeNo }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <!-- <el-form-item label="落地时间">{{ form.startDate}} -- {{ form.endDate }}</el-form-item> -->
          <el-form-item label="落地时间">{{ form.redt}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <!-- <el-form-item label="交易发生地">{{ form.}}</el-form-item> -->
        </el-col>
        <!-- <el-col :span="12">
          <el-form-item label="支付方式">{{ form.tradeNo}}</el-form-item>
        </el-col> -->
        <el-col :span="12">
          <el-form-item label="大额交易特征">{{ form.crcd }}</el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <el-table :data="list" v-loading="tabLoading">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="tradeId" label="交易ID"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="handleView(scope)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>

     <el-dialog title="交易详情" width="70%" :visible.sync="tradeDetailVisible">
        <tradeDetail :tradeDetailVisible="tradeDetailVisible" :tradeId="tradeId" :type="type" @setTradeDetailVisible="getTradeDetailVisible"></tradeDetail>
      </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { updateForm, taskGetList, dataTask } from '@/api/sys-monitoringAnalysis/dataGovernance/fixedPoint/index.js'
import tradeDetail from '@/views/sys-monitoringAnalysis/dataGovernance/common/tradeDetail/components/tradeDetail_dialog.vue'

export default {
  components: {
    tradeDetail
  },
  data() {
    return {
      tabLoading: false,
      form: {},
      list: [],
      total: 0,
      pageInfo: {
        pageNum: 1,
        pageSize: 10
      },
      tradeDetailVisible: false,
      tradeId: '',
      taskId: '',
      type: ''
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
        this.taskId = newVal.id
        this.type = newVal.businessType
        // this.list = newVal.comparisonResults
        this.form.receiver = newVal.receiver
        this.form.dataFrom = newVal.dataFrom
        this.form.tradeNo = newVal.tradeNo
        this.form.payType = newVal.payType
        // this.form.startDate = newVal.startDate
        this.form.redt = newVal.redt
        // this.form.endDate = newVal.endDate
        this.form.tradePlace = newVal.tradePlace
        if (newVal.crcd) {
          dataTask('CRCD').then(res => {
            if (res.code === 200) {
              res.data.map(item => {
                if (item.codeId === newVal.crcd) {
                  this.form.crcd = item.codeName
                }
              })
            }
          })
        } else {
          this.form.crcd = newVal.crcd
        }
        this.getData(this.taskId)
      },
      deep: true
    }
  },
  methods: {
    getData(id) {
      this.tabLoading = true
      taskGetList(id, this.pageInfo).then(res => {
        this.tabLoading = false
        if (res.code === 200) {
          this.list = res.data.list
          this.total = res.data.total
        }
      }).catch(() => {
        this.tabLoading = false
      })
    },
    handleView(scope) {
      this.tradeId = scope.row.tradeId
      this.tradeDetailVisible = true
    },
    getTradeDetailVisible(val) {
      this.tradeDetailVisible = val
    },
    handleSizeChange(val) {
      this.pageInfo.pageNum = 1
      this.pageInfo.pageSize = val
      this.getData(this.taskId)
    },
    handleCurrentChange(val) {
      this.pageInfo.pageNum = val
      this.getData(this.taskId)
    },
    updateForm() {
      updateForm(this.workFlow2business, this.taskId).then(res => {
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
    }
  }
}
</script>

<style>
</style>
