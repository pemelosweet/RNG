<template>
  <div class="problemwrap">
    <div class="probletitle">已有标注</div>
    <el-table :data="list" style="width:100%;">
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <el-table-column prop="labelQuestion" label="标注问题" min-width="140" show-overflow-tooltip></el-table-column>
      <el-table-column prop="proposer" label="分析员" min-width="140"></el-table-column>
      <el-table-column prop="labelTime" label="标注时间" min-width="140"></el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next" :total="total" background></el-pagination>
    <el-form :model="dialogForm">
      <div class="probletitle">我的标注</div>
      <el-form-item label="选择标注类型：">
        <el-checkbox-group v-model="dialogForm.labelType">
          <el-checkbox label="金额错误" name="type"></el-checkbox>
          <el-checkbox label="交易对手名称缺失" name="type"></el-checkbox>
          <el-checkbox label="其他" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-input type="textarea" v-model="dialogForm.labelQuestion"></el-input>
    </el-form>
    <div class="btnalign">
      <el-button type="primary" @click="addSubmit" :loading="loading">确 定</el-button>
      <el-button type="default" @click="routerBack">返 回</el-button>
    </div>
  </div>
</template>

<script>
import { getList, addTagData } from '@/api/sys-monitoringAnalysis/dataGovernance/common/markProblem'
export default {
  props: {
    markdialogVisible: {
      type: Boolean
    }
  },
  data() {
    return {
      loading: false,
      markVisible: this.markdialogVisible,
      list: [],
      total: 0,
      pageInfo: {
        pageNum: 1,
        pageSize: 10
      },
      dialogForm: {
        labelQuestion: '',
        labelType: []
      }
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.getData(this.pageInfo)
  },
  methods: {
    getData(pageInfo) {
      getList(pageInfo).then(res => {
        this.list = res.data
        this.total = res.data.total
      })
    },
    addSubmit() { // 添加标注
      this.loading = true
      this.dialogForm.labelType = this.dialogForm.labelType.toString()
      addTagData(this.dialogForm).then(res => {
        if (res.code === 200) {
          this.loading = false
          this.markVisible = false
          this.$emit('setLargeVisible', this.markVisible)
        } else {
          this.loading = false
        }
      }).catch(() => {
        this.loading = false
      })
      this.dialogForm.labelType = this.dialogForm.labelType.split(',')
    },
    handleSizeChange(val) {
      this.pageInfo.pageSize = val
      this.getData(this.pageInfo)
    },
    handleCurrentChange(val) {
      this.pageInfo.pageNum = val
      this.getData(this.pageInfo)
    },
    routerBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">
.problemwrap {
  .probletitle {
    font-size: 14px;
    font-weight: bold;
    padding: 10px 0;
  }
  .btnalign {
    text-align: center;
  }
}
</style>
