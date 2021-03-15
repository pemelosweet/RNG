<template>
  <div class="launchDetail">
    <el-card>
      <div slot="header">
        <span>已补正交易列表</span>
      </div>
      <el-table :data="tableData" style="width: 100%;">
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="id" label="交易ID"></el-table-column>
        <el-table-column prop="organ" label="报告机构"></el-table-column>
        <el-table-column prop="tradeType" label="交易类型"></el-table-column>
        <el-table-column prop="correctionType" label="补正要求类型"></el-table-column>
        <el-table-column prop="startDate" label="补正要求发起时间"></el-table-column>
        <el-table-column prop="state" label="补正状态"></el-table-column>
        <el-table-column prop="result" label="核对结果"></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="dialogVisible = true">查看</el-button>
            <!-- <el-button type="text">人工补正</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
      </el-pagination>

      <!-- 查看和反馈 -->
      <el-dialog title="人工补正信息" :visible.sync="dialogVisible" width="60%">
        <div>
          <el-row :gutter="20">
            <el-col :span="8">报告机构编码：C00000001</el-col>
            <el-col :span="8">报告机构名称：上海**银行</el-col>
            <el-col :span="8">申请人：韩梅梅</el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">补正要求类型：信息更正</el-col>
            <el-col :span="8">补正完成时限：一个工作日</el-col>
            <el-col :span="8">申请时间：2017-10-27 11:11</el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <h3>人工补正要求通知</h3>
              <div v-html="yqtzContent" class="yqtz"></div>
            </el-col>
            <el-col :span="12">
              <h3>原交易详情</h3>
              <div v-html="bwydContent" class="bwyd"></div>
            </el-col>
          </el-row>
          <div class="divider divider-horizontal"></div>
          <h3>结果反馈</h3>
          <el-row :gutter="20">
            <el-col :span="23">
              <el-form ref="dialogForm" :model="dialogForm" :rules="rules" :disabled="disabled" label-width="120px">
                <el-form-item label="补正反馈情况：" prop="result">
                  <el-select v-model="dialogForm.result">
                    <el-option value="pass" label="合格"></el-option>
                    <el-option value="2" label="不合格"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="不合格原因：" prop="reason">
                  <el-input type="textarea" v-model="dialogForm.reason"></el-input>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">返回</el-button>
          <el-button @click="submitForm('dialogForm')" type="primary">确定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      currentPage: 1,
      disabled: true,
      tableData: [
        {
          id: '9000000001',
          organ: '中国建设银行',
          tradeType: '大额',
          correctionType: '信息更正',
          startDate: '2017-12-18 11:11',
          state: '待补正',
          result: ''
        },
        {
          id: '9000000002',
          organ: '中国建设银行',
          tradeType: '可疑',
          correctionType: '信息补充',
          startDate: '2017-12-18 11:11',
          state: '已补正',
          result: '合格'
        }
      ],
      yqtzContent:
        '<xmp><?xml version="1.0" encoding="utf‐8"?>\n<MCVR>\n<BSIF>\n<RICD>报告机构编码</RICD>\n<TMLM>更正完成时限</TMLM>\n<RQDS>更正填报要求</RQDS>\n<RQNM>待更正大额交易总数</RQNM>\n</BSIF>\n<TSDTs>\n<TSDT seqno="1">\n<OCNM>原客户号</OCNM>\n<OTDT>原大额交易发生日期</OTDT>\n<OTCD>原大额交易特征代码</OTCD>\n<OTIC>原业务标识号</OTIC>\n<ITEMS>\n<ITEM seqno="1">待更正字段1</ITEM>\n<ITEM seqno="2">待更正字段2</ITEM>\n........\n</ITEMS>\n</TSDT>\n</TSDTs>\n</MCVR></xmp>',
      bwydContent:
        '<xmp><?xml version="1.0" encoding="utf‐8"?>\n<MCVR>\n<BSIF>\n<RICD>报告机构编码</RICD>\n<TMLM>更正完成时限</TMLM>\n<RQDS>更正填报要求</RQDS>\n<RQNM>待更正大额交易总数</RQNM>\n</BSIF>\n<TSDTs>\n<TSDT seqno="1">\n<OCNM>原客户号</OCNM>\n<OTDT>原大额交易发生日期</OTDT>\n<OTCD>原大额交易特征代码</OTCD>\n<OTIC>原业务标识号</OTIC>\n<ITEMS>\n<ITEM seqno="1">待更正字段1</ITEM>\n<ITEM seqno="2">待更正字段2</ITEM>\n........\n</ITEMS>\n</TSDT>\n</TSDTs>\n</MCVR></xmp>',
      dialogForm: {
        result: '不合格',
        reason: 'XXXXXXXXXX'
      },
      rules: {
        result: [{ required: true, message: '请选择审批结果', trigger: 'change' }],
        reason: [{ required: true, message: '请填写审批原因', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dialogVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      // 重置清空操作
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss">
.launchDetail {
  .btnalign {
    text-align: right;
  }
  .tradetime {
    .el-date-editor--datetimerange.el-input__inner {
      width: 200px;
    }
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
