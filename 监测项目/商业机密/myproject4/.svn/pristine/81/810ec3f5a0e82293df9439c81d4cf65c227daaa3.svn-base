<template>
  <div class="approvalwrap">
    <el-card>
      <div slot="header">
        <span>清理任务审批</span>
      </div>
      <el-form :model="searchForm" ref="searchForm" label-width="120px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="报告机构：" prop="organ">
              <el-select v-model="searchForm.organ" placeholder="报告机构">
                <!-- <el-option label="大额漏报" value="shanghai"></el-option>
                    <el-option label="收付方帐号相同" value="beijing"></el-option>
                    <el-option label="帐号长度，内容异常" value="beijing"></el-option>
                    <el-option label="身份证类型和编码规则不一致" value="beijing"></el-option>
                    <el-option label="机构帐号编码重复" value="beijing"></el-option>
                    <el-option label="月度大额日均报送量" value="beijing"></el-option> -->
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="交易ID：" prop="id">
              <el-input v-model="searchForm.id"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="分析员：" prop="analyst">
              <el-input v-model="searchForm.analyst"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="清理来源：" prop="source">
              <el-select v-model="searchForm.source">
                <el-option label="全部" value="0"></el-option>
                <el-option label="数据抽查" value="1"></el-option>
                <el-option label="自动扫描" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发起时间：" prop="dateValue">
              <el-date-picker v-model="searchForm.dateValue" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" unlink-panels>
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="审批状态：" prop="state">
              <el-select v-model="searchForm.state">
                <el-option label="全部" value="0"></el-option>
                <el-option label="待审批" value="1"></el-option>
                <el-option label="已审批" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="16" class="btnalign">
            <el-button type="primary" @click="handleQuery">查询</el-button>
            <el-button type="primary" plain @click="resetForm('searchForm')">重 置</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-row class="handleBtn">
        <span>待审批列表：</span>
      </el-row>
      <el-table style="width: 100%" :data="list">
        <el-table-column type="index" label="序号" min-width="55"></el-table-column>
        <el-table-column prop="tradeId" label="交易ID" min-width="110"></el-table-column>
        <el-table-column prop="reportName" label="报告机构" min-width="110"></el-table-column>
        <el-table-column prop="tradeType" label="交易类型" min-width="140"></el-table-column>
        <el-table-column prop="origin" label="清理来源" min-width="110"></el-table-column>
        <el-table-column prop="planName" label="清理方案" min-width="100"></el-table-column>
        <el-table-column prop="startTime" label="发起时间" min-width="100"></el-table-column>
        <el-table-column prop="opratorName" label="操作员" min-width="100"></el-table-column>
        <el-table-column prop="state" label="审批状态" min-width="100"></el-table-column>
        <el-table-column label="操作" min-width="80">
          <template slot-scope="scope">
            <el-button type="text" @click="handleView($event)" v-if="scope.row.state === '待审批'">审批</el-button>
            <el-button type="text" @click="handleView($event)" v-if="scope.row.state !== '待审批'">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" background></el-pagination>
    </el-card>

    <!-- 审批弹框 -->
    <el-dialog title="自动清理信息" :visible.sync="dialogVisible" width="60%">
      <div>
        <el-row :gutter="20">
          <el-col :span="12">报告机构编码：C00000001</el-col>
          <!-- <el-col :span="8">报告机构名称：上海**银行</el-col> -->
          <el-col :span="12">申请人：韩梅梅</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">报告机构名称：上海**银行</el-col>
          <!-- <el-col :span="8"></el-col> -->
          <el-col :span="12">申请时间：2017-10-27 11:11</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <h3>申请信息</h3>
            <div>清理方案：方案1</div>
            <div>清理原因：主体名称不规范</div>
          </el-col>
          <el-col :span="12">
            <h3>原交易详情</h3>
            <div v-html="bwydContent" class="bwyd"></div>
          </el-col>
        </el-row>
        <div class="divider divider-horizontal"></div>
        <!-- <h3>结果反馈</h3> -->
        <el-row :gutter="20">
          <el-col :span="23">
            <el-form ref="dialogForm" :model="dialogForm" :rules="rules" label-width="120px" :disabled="disabled">
              <el-form-item label="审批结果：" prop="result">
                <el-select v-model="dialogForm.result">
                  <el-option value="pass" label="通过"></el-option>
                  <el-option value="2" label="不通过"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="审批意见：" prop="option">
                <el-input type="textarea" v-model="dialogForm.option"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">返回</el-button>
        <el-button @click="onSubmit('dialogForm')" type="primary">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/sys-monitoringAnalysis/dataGovernance/dataClean/task'

export default {
  name: 'auto',
  data() {
    return {
      disabled: false, // 弹框只读
      searchForm: {
        organ: '',
        id: '',
        analyst: '',
        source: '',
        dateValue: '',
        state: ''
      },
      dialogVisible: false,
      list: [],
      // 每页显示条数
      total: 1,
      pageInfo: {
        pageNum: 1,
        pageSize: 10
      },
      yqtzContent:
        '<xmp><?xml version="1.0" encoding="utf‐8"?>\n<MCVR>\n<BSIF>\n<RICD>报告机构编码</RICD>\n<TMLM>更正完成时限</TMLM>\n<RQDS>更正填报要求</RQDS>\n<RQNM>待更正大额交易总数</RQNM>\n</BSIF>\n<TSDTs>\n<TSDT seqno="1">\n<OCNM>原客户号</OCNM>\n<OTDT>原大额交易发生日期</OTDT>\n<OTCD>原大额交易特征代码</OTCD>\n<OTIC>原业务标识号</OTIC>\n<ITEMS>\n<ITEM seqno="1">待更正字段1</ITEM>\n<ITEM seqno="2">待更正字段2</ITEM>\n........\n</ITEMS>\n</TSDT>\n</TSDTs>\n</MCVR></xmp>',
      bwydContent:
        '<xmp><?xml version="1.0" encoding="utf‐8"?>\n<MCVR>\n<BSIF>\n<RICD>报告机构编码</RICD>\n<TMLM>更正完成时限</TMLM>\n<RQDS>更正填报要求</RQDS>\n<RQNM>待更正大额交易总数</RQNM>\n</BSIF>\n<TSDTs>\n<TSDT seqno="1">\n<OCNM>原客户号</OCNM>\n<OTDT>原大额交易发生日期</OTDT>\n<OTCD>原大额交易特征代码</OTCD>\n<OTIC>原业务标识号</OTIC>\n<ITEMS>\n<ITEM seqno="1">待更正字段1</ITEM>\n<ITEM seqno="2">待更正字段2</ITEM>\n........\n</ITEMS>\n</TSDT>\n</TSDTs>\n</MCVR></xmp>',
      dialogForm: {
        result: ''
      },
      rules: {
        result: [{ required: true, message: '请选择审批结果', trigger: 'change' }],
        option: [{ required: true, message: '请填写审批意见', trigger: 'blur' }]
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
    this.getData()
  },
  methods: {
    getData() {
      getList(this.searchForm, this.pageInfo).then(res => {
        console.log('task-res', res.data)
        this.list = res.data.list
        this.total = res.data.total
      })
    },
    handleQuery() {
      this.getData()
    },
    // 分页
    handleSizeChange(val) {
      this.pageInfo.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.pageInfo.pageNum = val
      this.getData()
    },
    onSubmit(formName) {
      // 审批提交
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dialogVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleView(e) { // 查看
      this.dialogVisible = true
      const txt = e.target.innerText
      if (txt === '查看') {
        this.disabled = true
      } else {
        this.disabled = false
      }
    },
    resetForm(formName) {
      // 重置清空操作
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss">
.approvalwrap {
  .handleBtn {
    padding-bottom: 10px;
  }
  .btnalign {
    text-align: right;
  }
  .yqtz {
    height: 300px;
    overflow-y: auto;
    border: 1px solid #ccc;
    padding-left: 16px;
  }
  .bwyd {
    height: 300px;
    overflow-y: auto;
    border: 1px solid #ccc;
    padding-left: 16px;
  }
}
</style>
