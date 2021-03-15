<template>
  <div class="approvalwrap">
    <div class="approvaltitle">交易详情：</div>
    <Trade class="mainwrap"></Trade>
    <div class="divider divider-horizontal"></div>
    <div class="approvaltitle">人工补正通知：</div>
    <el-row>
      <el-col :span="24" class="inforow">
        <el-col :span="12">申请人：韩梅梅</el-col><el-col :span="12" class="infoalign">申请时间：2018-1-11</el-col>
      </el-col>
      <el-form :model="form" label-width="130px">
        <!-- 第一块 -->
        <el-col :span="24">
          <el-col :span="12">
            <el-form-item label="交易ID：">
              <span>98000001</span>
            </el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item label="报告机构：">
              <span>中国建设银行</span>
            </el-form-item>
          </el-col>
        </el-col>

        <el-col :span="24">
          <el-col :span="12">
            <el-form-item label="补正要求类型：">
              <span>信息补充</span>
            </el-form-item>
          </el-col>
           <el-col :span="12">
              <el-form-item label="客户账号：">
                <span>287683199710248096</span>
              </el-form-item>
          </el-col>
        </el-col>

        <el-col :span="24">
          <el-col :span="12">
            <el-form-item label="补充开始时间：">
              <span>2018-1-12</span>
            </el-form-item>
          </el-col>
           <el-col :span="12">
              <el-form-item label="补充完成时间：">
                <span>2018-1-14</span>
              </el-form-item>
          </el-col>
        </el-col>

        <el-col :span="24">
          <el-col :span="12">
            <el-form-item label="客户证件类型：">
              <span>身份证</span>
            </el-form-item>
          </el-col>
           <el-col :span="12">
              <el-form-item label="客户身份证件号码：" label-width="140px">
                <span>287683199710248096</span>
              </el-form-item>
          </el-col>
        </el-col>

        <el-col :span="24">
          <!-- <el-col :span="12"> -->
            <el-form-item label="客户身份证件号码：" label-width="140px">
              <span>287683199710248096</span>
            </el-form-item>
          <!-- </el-col> -->
        </el-col>
        <el-col class="divider divider-horizontal"></el-col>

        <!-- 第三块 -->
        <el-col :span="24">
            <el-form-item label="审批结果：">
              <el-select v-model="form.type" placeholder="审批结果">
                <el-option label="全部" value="all"></el-option>
                <el-option label="通过" value="beijing"></el-option>
                <el-option label="不通过" value="beijing"></el-option>
                </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="审批意见：">
            <el-input type="textarea"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import Trade from '@/views/sys-monitoringAnalysis/dataGovernance/dataClean/correction/approval_dloge_trade'
export default {
  // name: addNotice,
  data() {
    return {
      form: {
        type: ''
      }
    }
  },
  components: {
    Trade
  }
}
</script>

<style lang="scss">
.approvalwrap {
  .inforow {
    font-weight: bold;
  }
  .infoalign {
    text-align: right;
  }
  .approvaltitle {
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 6px;
  }
  .mainwrap {
    width:100%;
    height: 300px;
    overflow: auto;
    // border: 1px solid #eee;
    margin-bottom: 5px;
  }
}
</style>
