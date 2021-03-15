<template>
  <div class="tradewrap">
      <el-form label-width="140px">
        <!-- 第一行 -->
        <div class="treporttitle">报告基本信息</div>
        <el-row>
            <el-col :span="12">
                <el-form-item label="报文名：">
                    <span>CSSC0000000000001‐20171206‐00000004.XML</span>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="报文交易类型：">
                    <span>可疑交易新增报文</span>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="落地时间：">
                    <span>2017-11-03 10:00</span>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="报告机构名称：">
                    <span>中国建设银行</span>
                </el-form-item>
            </el-col>
        </el-row>

        <div>
        <div class="treporttitle">可疑交易信息</div>
        <el-form :model="dialog" label-width="350px">
          <el-row >
              <el-form-item label="疑似涉罪类型-1（TOSC）：" label-width="260px">
                <span>涉嫌与毒品犯罪相关的可疑交易行为</span>
              </el-form-item>
          </el-row>
          <el-row>
            <el-col :span="14" :offset="2">
              <el-form-item label="可疑交易主体基本信息：" label-width="260px">
                <span>0001</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" :offset="2">
              <!-- <div class="title">
                <span>可疑交易主体基本信息</span>
              </div> -->
              <div class="content">
                <el-form-item label="客户号（CSNM）：">
                  <span>CUST0000001</span>
                </el-form-item>
                <el-form-item label="可疑主体国籍-1（STNT）：">
                  <span>中国</span>
                </el-form-item>
                <el-form-item label="可疑主体职业（对私）或客户行业（对公）（SEVC）：">
                  <span>处于失业、无业或离退休等情况</span>
                </el-form-item>
                <el-form-item label="可疑主体联系电话-1（SCTL）：">
                  <span>13000000000</span>
                </el-form-item>
                <el-form-item label="可疑主体住址/经营地址-1（SEAR）：">
                  <span>北京市某某区</span>
                </el-form-item>
                <el-form-item label="客户其他联系方式-1（SEEI）：">
                  <span>010-1111111</span>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" :offset="2">
              <!-- <div class="title">
                <span>可疑主体身份信息</span>
              </div> -->
              <div class="content">
                <el-form-item label="可疑主体姓名/名称（CTNM）：">
                  <span>小明</span>
                </el-form-item>
                 <el-form-item label="可疑主体身份证件/证明文件类型（CITP）：">
                  <span>居民身份证</span>
                </el-form-item>

                <el-form-item label="其他身份证件/证明文件类型（OITP）：">
                  <span>@N</span>
                </el-form-item>
                <el-form-item label="可疑主体身份证件/证明文件号码（CTID）：">
                  <span>111111111111111111</span>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" :offset="2">
              <!-- <div class="title"> -->
                <!-- <span>可疑主体法人/控股股东/实际控制人信息（SRIF）</span> -->
              <!-- </div> -->
              <div class="content">
                <el-form-item label="可疑主体法定代表人姓名（SRNM）：">
                  <span>代表人</span>
                </el-form-item>
                <el-form-item label="可疑主体法定代表人身份证件类型（SRIT）：">
                  <span>居民身份证</span>
                </el-form-item>
                <el-form-item label="可疑主体法定代表人其他身份证件/证明文件类型（ORIT）：">
                  <span>@N</span>
                </el-form-item>
                <el-form-item label="可疑主体法定代表人身份证件号码（SRID）：">
                  <span>14000000000000XXXX</span>
                </el-form-item>
                <el-form-item label="可疑主体控股股东或实际控制人名称（SCNM）：">
                  <span>张三</span>
                </el-form-item>
                <el-form-item label="可疑主体控股股东或实际控制人身份证件/证明文件类型（SCIT）：">
                  <span>居民身份证</span>
                </el-form-item>
                <el-form-item label="可疑主体控股股东或实际控制人其他身份证件/证明文件类型（OCIT）：">
                  <span>@N</span>
                </el-form-item>
                <el-form-item label="可疑主体控股股东或实际控制人身份证件/证明文件号码（SCID）：">
                  <span>14000000000000XXXX</span>
                </el-form-item>

              </div>
            </el-col>
          </el-row>
          <el-row>
            <div class="treporttitle">可疑交易具体信息</div>
            <el-col :span="20" :offset="2">
              <!-- <div class="title">
                <span>金融机构网点信息（RINI）</span>
              </div> -->
              <div class="content">
                <el-form-item label="金融机构网点代码（FINC）：">
                  <span>00003</span>
                </el-form-item>
                <el-form-item label="金融机构与客户的关系（RLFC）：">
                  <span>客户不通过账户或者银行卡发生的交易， “金融机构”为办理业务的机构</span>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" :offset="2">
              <!-- <div class="title">
                <span>客户证件信息（CIIF）</span>
              </div> -->
              <div class="content">
                <el-form-item label="客户姓名/名称（CTNM）：">
                  <span>小明</span>
                </el-form-item>
                <el-form-item label="客户身份证件/证明文件类型（CITP）：">
                  <span>居民身份证</span>
                </el-form-item>
                <el-form-item label="其他身份证件/证明文件类型（OITP）：">
                  <span>@N</span>
                </el-form-item>
                <el-form-item label="客户身份证件/证明文件号码（CTID）：">
                  <span>111111111111111111</span>
                </el-form-item>
                <el-form-item label="客户号（CSNM）：">
                  <span>CUST0000001</span>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" :offset="2">
              <!-- <div class="title">
                <span>客户账户信息（ATIF）</span>
              </div> -->
              <div class="content">
                <el-form-item label="客户账户类型（CATP）：">
                  <span>活期储蓄账户</span>
                </el-form-item>
                <el-form-item label="客户账号（CTAC）：">
                  <span>A000001</span>
                </el-form-item>
                <el-form-item label="客户账户开立时间（OATM）：">
                  <span>20100101111111</span>
                </el-form-item>
                <el-form-item label="客户账户销户时间（CATM）：">
                  <span>20100101111111</span>
                </el-form-item>
                <el-form-item label="客户银行卡类型（CBCT）：">
                  <span>借记卡</span>
                </el-form-item>
                <el-form-item label="客户银行卡其他类型（OCBT）：">
                  <span>@N</span>
                </el-form-item>
                <el-form-item label="客户银行卡号码（CBCN）：">
                  <span>62170000000000000</span>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" :offset="2">
              <!-- <div class="title">
                <span>代办人信息（TBIF）</span>
              </div> -->
              <div class="content">
                <el-form-item label="交易代办人姓名（TBNM）：">
                  <span>大明</span>
                </el-form-item>
                <el-form-item label="交易代办人身份证件/证明文件类型（TBIT）：">
                  <span>居民身份证</span>
                </el-form-item>
                <el-form-item label="其他身份证件/证明文件类型（OITP）：">
                  <span>@N</span>
                </el-form-item>
                <el-form-item label="交易代办人身份证件/证明文件号码（TBID）：">
                  <span>20100101111111</span>
                </el-form-item>
                <el-form-item label="交易代办人国籍（TBNT）：">
                  <span>中国</span>
                </el-form-item>
                <el-form-item label="客户银行卡其他类型（OCBT）：">
                  <span>@N</span>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" :offset="2">
              <!-- <div class="title">
                <span>交易明细信息（TSIF）</span>
              </div> -->
              <div class="content">
                <el-form-item label="交易时间（TSTM）：">
                  <span>20171027092201</span>
                </el-form-item>
                <el-form-item label="交易发生地（TRCD）：">
                  <span>美国</span>
                </el-form-item>
                <el-form-item label="业务标识号（TICD）：">
                  <span>jy000001</span>
                </el-form-item>
                <el-form-item label="收付款方匹配号类型（RPMT）：">
                  <span>通过银联清算的交易</span>
                </el-form-item>
                <el-form-item label="收付款方匹配号（RPMN）：">
                  <span>000001</span>
                </el-form-item>
                <el-form-item label="交易方式（TSTP）：">
                  <span>外币业务-信用证</span>
                </el-form-item>
                 <el-form-item label="非柜台交易方式（OCTT）：">
                  <span>营业场所交易</span>
                </el-form-item>
                <el-form-item label="其他非柜台交易方式（OOCT）：">
                  <span>@N</span>
                </el-form-item>
                <el-form-item label="非柜台交易方式的设备代码（OCEC）：">
                  <span>0001</span>
                </el-form-item>
                <el-form-item label="银行与支付机构之间的业务交易编码（BPTC）：">
                  <span>P000001</span>
                </el-form-item>
                <el-form-item label="涉外收支交易分类与代码（TSCT）：">
                  <span>SDASD</span>
                </el-form-item>
                <el-form-item label="资金收付标志（TSDR）：">
                  <span>收</span>
                </el-form-item>
                <el-form-item label="资金l来源和用途（CRSP）：">
                  <span>投资</span>
                </el-form-item>
                <el-form-item label="交易币种（CRTP）：">
                  <span>人民币</span>
                </el-form-item>
                <el-form-item label="交易金额（CRAT）：">
                  <span>10000</span>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" :offset="2">
              <!-- <div class="title">
                <span>交易对手信息（TCIF）</span>
              </div> -->
              <div class="content">
                <el-form-item label="对方金融机构网点名称（CFIN）：">
                  <span>中国建设银行XX网点</span>
                </el-form-item>
                <el-form-item label="对方金融机构网点代码类型（CFCT）：">
                  <span>现代化支付系统行号</span>
                </el-form-item>
                <el-form-item label="对方金融机构网点代码（CFIC）：">
                  <span>a000001</span>
                </el-form-item>
                <el-form-item label="对方金融机构网点行政区划代码（CFRC）：">
                  <span>CHV010001</span>
                </el-form-item>
                <el-form-item label="交易对手姓名/名称（TCNM）：">
                  <span>张三</span>
                </el-form-item>
                <el-form-item label="交易对手身份证件/证明文件类型（TCIT）：">
                  <span>居民身份证</span>
                </el-form-item>
                 <el-form-item label="其他身份证件/证明文件类型（OITP）：">
                  <span>@N</span>
                </el-form-item>
                <el-form-item label="交易对手身份证件/证明文件号码（TCID）：">
                  <span>1411111111111111111</span>
                </el-form-item>
                <el-form-item label="交易对手账户类型（TCAT）：">
                  <span>定活两便账户</span>
                </el-form-item>
                <el-form-item label="交易对手账号（TCAC）：">
                  <span>622222222222</span>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" :offset="2">
              <!-- <div class="title">
                <span>交易信息备注（ROTFs）</span>
              </div> -->
              <div class="content">
                <el-form-item label="交易信息备注 -1（ROTF）：">
                  <span>备注111</span>
                </el-form-item>
                <el-form-item label="交易信息备注 -2（ROTF）：">
                  <span>备注222</span>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
        </el-form>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.tradewrap {
  .treporttitle {
    font-size: 1em;
    padding: 24px 0 10px;
    margin-left: 10px;
  }
  .el-form-item{
      margin-bottom: 10px
  }
  .content{
      padding: 10px 12% 0 0;;
    //   border:  1px solid rgba(228, 228, 228, 1);
    //   .remark{
    //     .el-input {
    //       width: 80%;
    //     }
    //   }
  }
  .title {
    padding: 15px 0 10px;
    font-size: 0.9em; 
  }
  .btnalign {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
