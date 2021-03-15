<template>
  <div class="point">
    <el-row>
      <el-form :model="form" ref="form">
        <el-col :span="12">
          <el-form-item label="机构名称">{{ form.receiver }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="监测交易笔数">{{ form.tradeNo }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="对比结果">{{ form.checkResult}}</el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <el-table :data="list">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="tradeId" label="交易ID"></el-table-column>
      <el-table-column prop="" label="对比结果"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="handleView($event, scope)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>

    <!-- 详情弹框 -->
    <el-dialog title="详情" :visible.sync="detailVisible">
      <div>
        <div>交易ID:
          <span>{{tradeId}}</span>
        </div>
        <el-table :data="dialogList">
          <el-table-column prop="element" label="关键要素项"></el-table-column>
          <el-table-column prop="center" label="中心端数据项"></el-table-column>
          <el-table-column prop="report" label="报送端数据项"></el-table-column>
          <el-table-column prop="result" label="比对结果"></el-table-column>
        </el-table>
        <el-pagination background :current-page="dialogPageInfo.pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="dialogPageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="dialogTotal">
        </el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailVisible = false">返回</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { viewData, updateForm } from '@/api/sys-monitoringAnalysis/dataGovernance/fixedPoint/receive'

export default {
  data() {
    return {
      form: {},
      list: [],
      total: 0,
      pageInfo: {
        pageNum: 1,
        pageSize: 10
      },
      detailVisible: false,
      dialogList: [],
      dialogPageInfo: {
        pageNum: 1,
        pageSize: 10
      },
      dialogTotal: 1,
      tradeId: '',
      taskId: ''
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
        this.list = newVal.comparisonResults
        this.form.receiver = newVal.receiver
        this.form.tradeNo = newVal.tradeNo
        this.form.checkResult = newVal.checkResult
        this.taskId = newVal.id
      },
      deep: true
    }
  },
  methods: {
    handleView(e, scope) {
      this.tradeId = scope.row.tradeId
      this.detailVisible = true
      this.getViewDetailData(scope.row.id)
    },
    getViewDetailData(id) {
      viewData(id).then(res => {
        if (res.code === 200) {
          this.dialogList = res.data.list
          this.dTotal = res.data.total
        }
      }).catch()
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
    },
    handleSizeChange(val) {
      this.pageInfo.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.pageInfo.pageNum = val
      this.getData()
    }
  }
}
</script>

<style>
</style>
