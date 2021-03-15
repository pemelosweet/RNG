<template>
  <div class="typereport">
    <el-card>
      <div slot="header">
        <span>查看数据详情</span>
      </div>
        <el-form label-width="140px">
        <!-- 第一行 -->
        <div class="title">报告基本信息概览</div>
        <el-row>
            <el-col :span="8">
            <el-form-item label="金融机构编码：">
                <span>C0000000000001</span>
            </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-form-item label="大额交易客户总数：">
                <span>3</span>
            </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-form-item label="大额交易总数：">
                <span>12</span>
            </el-form-item>
            </el-col>
        </el-row>
        </el-form>
        <div class="title">报文信息</div>
        <div v-html="yqtzContent" class="yqtz"></div>
        <div class="btnalign">
          <el-button type="primary" @click="routerBack"><i class="el-icon-back"></i>返 回</el-button>
        </div>
    </el-card>
  </div>
</template>

<script>

export default {
  data() {
    return {
      yqtzContent: '<xmp><?xml version="1.0" encoding="utf‐8"?>\n<MCVR>\n<BSIF>\n<RICD>报告机构编码</RICD>\n<TMLM>更正完成时限</TMLM>\n<RQDS>更正填报要求</RQDS>\n<RQNM>待更正大额交易总数</RQNM>\n</BSIF>\n<TSDTs>\n<TSDT seqno="1">\n<OCNM>原客户号</OCNM>\n<OTDT>原大额交易发生日期</OTDT>\n<OTCD>原大额交易特征代码</OTCD>\n<OTIC>原业务标识号</OTIC>\n<ITEMS>\n<ITEM seqno="1">待更正字段1</ITEM>\n<ITEM seqno="2">待更正字段2</ITEM>\n........\n</ITEMS>\n</TSDT>\n</TSDTs>\n</MCVR></xmp>'
    }
  },
  methods: {
    routerBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">
.typereport {
  .title {
    padding-bottom: 10px;
  }
  .yqtz {
    padding: 0 10px;
    border: 1px solid #ccc;
  }
  .btnalign {
    padding-top:10px;
    text-align: center;
  }
}
</style>
