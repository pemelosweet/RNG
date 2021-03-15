<template>
  <div class="problemwrap">
    <div class="probletitle">已有标注</div>
    <el-table :data="list" style="width:100%;">
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <el-table-column prop="problem" label="标注问题" min-width="140" show-overflow-tooltip></el-table-column>
      <el-table-column prop="analyst" label="分析员" min-width="140"></el-table-column>
      <el-table-column prop="taggingTime" label="标注时间" min-width="140"></el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next" :total="total" background></el-pagination>
    <el-form :model="dialogForm" ref="dialogForm" :rules="dialogRules">
      <div class="probletitle">我的标注</div>
      <el-form-item label="标注问题：" prop="problem">
        <!-- <el-checkbox-group v-model="dialogForm.problem">
          <el-checkbox label="金额错误" value="金额错误"></el-checkbox>
          <el-checkbox label="交易对手名称缺失" value="交易对手名称缺失"></el-checkbox>
          <el-checkbox label="其他" value="其他" @change="handleRulesChange"></el-checkbox>
        </el-checkbox-group> -->
        <el-radio-group v-model="dialogForm.problem">
          <el-radio label="金额错误" @change="handleRulesChange"></el-radio>
          <el-radio label="交易对手名称缺失" @change="handleRulesChange"></el-radio>
          <el-radio label="其他" @change="handleRulesChange"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="" prop="taggType" label-width="0" v-if="isProblemShow">
        <el-input type="textarea" v-model="dialogForm.taggType" maxlength="500" rows="4" show-word-limit placeholder="最大长度为500位"></el-input>
      </el-form-item>

    </el-form>
    <div class="btnalign">
      <el-button type="primary" @click="addSubmit" :loading="loading">确 定</el-button>
      <el-button type="default" @click="onCencel">取 消</el-button>
    </div>
  </div>
</template>

<script>
import { getList, addTagData } from '@/api/sys-monitoringAnalysis/dataGovernance/common/markProblem'
export default {
  props: {
    markdialogVisible: {
      type: Boolean
    },
    tradeId: {
      type: String
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
        problem: '',
        taggType: ''
      },
      dialogRules: {
        taggType: [
          { required: true, message: '内容不能为空', trigger: 'change' }
        ],
        problem: [{ required: true, message: '请至少选择一个标注类型', trigger: 'blur' }]
      },
      isProblemShow: false
    }
  },
  watch: {
    markdialogVisible(val) {
      if (val) this.getData()
    }
  },
  mounted() {
    if (this.tradeId) {
      this.getData()
    }
  },
  methods: {
    getData() {
      this.$refs['dialogForm'].resetFields()
      this.isProblemShow = false
      const paramsObj = {
        tradeId: this.tradeId,
        pageNum: this.pageInfo.pageNum,
        pageSize: this.pageInfo.pageSize
      }
      getList(paramsObj).then(res => {
        if (res.code === 200) {
          this.list = res.data.list
          this.total = res.data.total
        } else {
          this.$message.error(res.message)
        }
      })
    },
    addSubmit() {
      this.$refs['dialogForm'].validate(valid => {
        if (valid) {
          // 添加标注
          this.loading = true
          const paramsObj = {
            problem: this.dialogForm.problem === '其他' ? this.dialogForm.taggType : this.dialogForm.problem,
            tradeId: this.tradeId
          }
          addTagData(paramsObj).then(res => {
            if (res.code === 200) {
              this.loading = false
              this.markVisible = false
              this.$emit('setMarkVisible', this.markVisible)
              this.$message({
                type: 'success',
                message: '添加标注成功！'
              })
            } else {
              this.loading = false
            }
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    handleSizeChange(val) {
      this.pageInfo.pageSize = val
      this.getData(this.pageInfo)
    },
    handleCurrentChange(val) {
      this.pageInfo.pageNum = val
      this.getData(this.pageInfo)
    },
    onCencel() {
      this.markVisible = false
      this.$emit('setMarkVisible', this.markVisible)
    },
    handleRulesChange(val) {
      if (val === '其他') {
        this.isProblemShow = true
      } else {
        this.isProblemShow = false
      }
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
    text-align: right;
    margin-top: 10px;
  }
}
</style>
