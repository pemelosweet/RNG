<template>
  <div class="interAddForm">
    <a @click="goBack" class="back" :style="backImg"></a>
    <div>
      <el-row style="height:80px;line-height:80px;">
        <el-col :span="12" style="font-size:20px;font-weight: bold">编号移送流程审批</el-col>
        <!-- <el-col :span="3">
          <el-button type="primary" style="text-align:left" size="mini" @click="returnList()">返回列表</el-button>
        </el-col> -->
      </el-row>
    </div>
    <div>
      <el-row style="height:60px;line-height:60px;">
        <!-- <el-col :span="2">流程操作：</el-col>
        <el-col :span="2">
          <el-button plain size="mini" diasbled class="buttonSize">打印</el-button>
        </el-col> -->
        <el-col :span="2">
          <el-button type="primary" v-if="this.keyIndex ==='2'" size="mini" @click="submitIntelligence" :loading="isUpLoading" class="buttonSize">修改</el-button>
        </el-col>
        <!-- <el-col :span="2">
          <el-button plain size="mini" class="buttonSize">提交</el-button>
        </el-col>
        <el-col :span="2">
          <el-button plain size="mini" class="buttonSize">意见</el-button>
        </el-col>
        <el-col :span="2">
          <el-button plain size="mini" class="buttonSize">关闭</el-button>
        </el-col> -->
      </el-row>
    </div>
    <el-tabs type="border-card">
      <el-tab-pane label="签呈批单">
        <!-- <QianCheng></QianCheng> -->
        <div>
          <el-form :model="petitionForm" ref="petitionFormRef" :rules="petitionFormRules" label-width="100px" :disabled="this.keyIndex ==='1'" label="签呈批单表单">
              <el-row>
                <!-- 第一行 -->
                <el-col :span="24">
                  <el-col :span="12">
                    <el-form-item label="单号：" prop="number">
                      <el-input v-model="petitionForm.number"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="保存时间：" class="oddinput" prop="saveDt">
                      <el-date-picker
                        v-model="petitionForm.saveDt"
                        type="date"
                        value-format="yyyy-MM-dd">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-col>
                <!-- 第二行 -->
                <el-col :span="24">
                  <el-col :span="12">
                    <el-form-item label="签/呈：" prop="sign" class="oddinput">
                      <el-select v-model="petitionForm.sign" placeholder="请选择">
                        <el-option label="签批单" value="签批单"></el-option>
                        <el-option label="呈批单" value="呈批单"></el-option>
                        <!-- <el-option label="均起草" value="均起草"></el-option> -->
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="类  别：" prop="s_type" class="oddinput">
                      <el-select v-model="petitionForm.s_type" @change="changeSTitle" placeholder="请选择">
                        <el-option label="线索" value="线索"></el-option>
                        <el-option label="通报" value="通报"></el-option>
                        <el-option label="协查--受托" value="协查--受托"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-col>
                <!-- 第三行 -->
                <el-col :span="24">
                  <el-form-item label="单标题：" class="ptitleitem" prop="stitle">
                      <el-input v-model="petitionForm.stitle"></el-input>
                  </el-form-item>
                </el-col>
                <!-- 第四行 -->
                <el-col :span="24">
                  <el-col :span="12">
                    <el-form-item label="份数：" prop="copiesNum">
                      <el-input v-model="petitionForm.copiesNum"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="发送单位：" prop="sendDepart" class="oddinput">
                      <el-select style="width:100% !important" v-model="petitionForm.sendDepart" clearable placeholder="请选择">
                        <el-option v-for="(item,index) in departArr" :key="index" :label="item.text" :value="item.code"></el-option>
                      </el-select>
                    </el-form-item>   
                    <!-- <el-form-item label="发送单位：" prop="sendDepart" class="oddinput">
                      <el-select v-model="petitionForm.sendDepart" placeholder="请选择活动区域">
                        <el-option label="公安部" value="公安部"></el-option>
                        <el-option label="中纪委" value="中纪委"></el-option>
                        <el-option label="最高检" value="最高检"></el-option>
                      </el-select>
                    </el-form-item> -->
                  </el-col>
                </el-col>
                <el-col :span="24" v-if="petitionForm.sign==='签批单'">
                  <el-form-item label="签批单备注：" prop="signRemark">
                      <el-input type="textarea" v-model="petitionForm.signRemark"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24" v-if="petitionForm.sign==='呈批单' ">
                  <el-form-item label="呈批单备注：" prop="showRemark">
                      <el-input type="textarea" v-model="petitionForm.showRemark"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-col :span="12">
                    <el-form-item label="函标题：" prop="letterTitle">
                      <el-input v-model="petitionForm.letterTitle"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="来函号：" prop="receNum">
                      <el-input v-model="petitionForm.receNum"></el-input>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="函正文：" prop="letterText">
                      <el-input type="textarea" v-model="petitionForm.letterText"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <!-- <el-col :span="12">
                    <el-form-item label="单内流水号：">
                      <router-link :to="{name:'cueManage_analysis_fileList',params:{name:'second'}}">
                        <el-button type="text">{{this.waterNum}}</el-button>
                      </router-link>
                    </el-form-item>
                  </el-col> -->
                  <el-col :span="12">
                    <el-form-item label="编号情况：" prop="numSuit">
                      <el-input v-model="petitionForm.numSuit"></el-input>
                    </el-form-item>
                  </el-col>
                </el-col>
              </el-row>
              <!-- <div class="ptitle">附件情况：</div> -->
              <el-row>
                <!-- <el-col :span="24">
                  <el-form-item label="附件情况：">
                    <el-input v-model="petitionForm.enclosureInf"></el-input>
                  </el-form-item>
                </el-col> -->
              <!-- <el-col :span="2">
                <i class="el-icon-circle-plus-outline icon-add"></i>
              </el-col> -->
              </el-row>
            </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="情报字函">
        <el-row class="table">
          <el-form :model="qingBaoForm" :rules="qingBaoRules" :disabled="this.keyIndex ==='1'" ref="qingBaoRef">
            <table border="1">
            <tr>
              <td width="850" colspan="6" height="70;" align="center">
                <h2>中国反洗钱监测分析中心</h2>
                <p>
                  <el-form-item prop="nNum">
                    <el-input v-model="qingBaoForm.nNum" placeholder="中心情报字（2018）号" style="width:40%"></el-input>
                  </el-form-item>
                </p>
              </td>
            </tr>
            <tr>
              <td height="900" colspan="6">
                <p class="p1">
                  <el-form-item prop="nTitle">
                    <el-input  v-model="qingBaoForm.nTitle" placeholder="关于有关账户协查结果的函" style="width:40%"></el-input>
                  </el-form-item>
                </p>
                <p class="p2">
                  <el-form-item prop="nDepart">
                    <el-input  v-model="qingBaoForm.nDepart" placeholder="海关总署缉私局：" style="width:40%"></el-input>
                  </el-form-item>
                </p>
                <p class="p2">
                  <el-form-item prop="nContent" style="margin-left:60px;">来函（
                    <el-input  v-model="qingBaoForm.receNum" placeholder="缉私情函（2018）号" style="width:40%"></el-input>）收悉，业经监测分析。现将协查结果提供
                  </el-form-item>
                  <el-form-item prop="nDepart">
                    <el-input  v-model="qingBaoForm.sendDepart" placeholder="贵局" style="width:40%"></el-input>，请查收
                  </el-form-item>
                  </p>
                <p class="p3">
                  <el-form-item prop="nAttachsuit">
                    <el-input  v-model="qingBaoForm.nAttachsuit" placeholder="附件：协查结果反馈表（共一份）" style="width:40%"></el-input>
                  </el-form-item>
                  
                </p>
                <p class="p4">中国反洗钱监测分析中心</p>
                <p class="p5"> {{this.qingBaoForm.nReceTime}}</p>
                <p class="p6"> 根据《中华人民共和国反洗钱法》的规定，本中心移送的线索内容及客户身份资料和交易信息须严格保密， 未经本中心同意严禁向线索涉及单位和个人及其他第三方披露，并只能用于法律规定的目的，不可作为执法、司法的证据。 另，线索及相关资料使用完毕须及时销毁，并请将使用情况及时反馈本中心。
                </p>
              </td>
            </tr>
          </table>
          </el-form>
          
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="附件信息">
        <!-- <FileInfo></FileInfo> -->
        <div class="accestitle">附件列表</div>
            <el-table style="width: 100%" :data="accessoryTable.list">
              <!-- <el-table-column type="selection" width="55" fixed></el-table-column> -->
              <el-table-column type="index" width="120" label="序号" fixed></el-table-column>
              <!-- <el-table-column prop="type" label="附件类型" min-width="120" fixed></el-table-column> -->
              <el-table-column prop="attachName" label="附件名称" min-width="180" fixed></el-table-column>
              <el-table-column prop="option" fixed="right" label="操作" min-width="80">
                <template slot-scope="scope">
                  <el-button type="text" @click="downloadFileById(scope.row.attachId)">下载</el-button>
                  <el-button type="text" @click="delRow(scope)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
      </el-tab-pane>
      <el-tab-pane label="线索信息" v-if="showXSInfo">
        <!-- <el-badge slot="label" v-show="showXSInfo">
          <span>线索信息</span>
        </el-badge> -->
        <div style="width: 94%; margin: 0 auto" v-for="(item,index) in formTwoXS1" :key="index">
          <el-row style="margin: 10px 0;">
            <el-col :span="24">线索信息{{index+1}}:</el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="12">
              <span class="biaoStyle">可疑交易名称：</span><el-input v-model="item.cdispose" :maxlength="30" disabled placeholder="可疑交易名称,最长为30字符" ></el-input>
            </el-col>
            <el-col :span="12">
              <span class="biaoStyle">关联移送记录：</span><el-input type="textarea"  placeholder="关联移送记录,最长为200字符" disabled  v-model="item.ctriggerMessage" :maxlength="200"></el-input>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="12">
              <span class="biaoStyle">主要交易发生地：</span><el-input v-model="item.cbodymessage" disabled placeholder="主要交易发生地：,最长为50字符"  :maxlength="50"></el-input>
            </el-col>
            <el-col :span="12">
              <span class="biaoStyle">交易时间段：</span><el-date-picker
                  v-model="item.cdealdate"
                  disabled
                  style="width: 100%"
                  type="daterange"
                  range-separator="至"
                  format="yyyy-MM-dd" 
                  value-format="yyyy-MM-dd"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="12">
              <span class="biaoStyle">累计交易金额（人民币）：</span><el-input v-model="item.crmb" disabled placeholder="万元，最长为10字符" :maxlength="10"></el-input>
            </el-col>
            <el-col :span="12">
              <span class="biaoStyle">累计交易金额（外币）：</span><el-input v-model="item.cyb" disabled placeholder="万美元，最长为10字符" :maxlength="10"></el-input>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="12">
              <span class="biaoStyle">涉及交易笔数：</span><el-input v-model="item.cnumber" disabled placeholder="涉及交易笔数,最长为10字符"  :maxlength="10"></el-input>
            </el-col>
            <el-col :span="12">
              <span class="biaoStyle">涉及主要账户个数：</span><el-input v-model="item.cmainnumber" disabled  placeholder="涉及主要账户个数,最长为10字符"  :maxlength="10"></el-input>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <!-- <el-col :span="12">
              <span class="biaoStyle">初步判断：</span><el-select style="width:100%" v-model="item.cJudge" clearable placeholder="请选择" multiple>
                  <el-option  v-for="item in this.sheZui" :key="item.codeId" :label="item.codeName" :value="item.codeId"></el-option>
                </el-select>
            </el-col> -->
            <el-col :span="12">
              <span class="biaoStyle">初步判断：</span><el-input  placeholder="初步判断："  v-model="item.cjudge" disabled :maxlength="200"></el-input>
            </el-col>
            <el-col :span="12">
              <span class="biaoStyle">监测分析触发点：</span><el-input  placeholder="监测分析触发点：,最长为200字符" disabled v-model="item.cpoints" type="textarea" :maxlength="200"></el-input>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="12">
              <span class="biaoStyle">交易主体身份及相关信息：</span><el-input  placeholder="交易主体身份及相关信息：,最长为200字符"  v-model="item.csubject" type="textarea" disabled :maxlength="200"></el-input>
            </el-col>
            <el-col :span="12">
              <span class="biaoStyle">建议：</span><el-input  placeholder="建议,最长为200字符" disabled v-model="item.csuggest" type="textarea" :maxlength="200"></el-input>
            </el-col>
          </el-row>
          <!-- <el-row :gutter="40">
            <el-col :span="24">
              <span class="biaoStyle">分析概述：</span>
              <el-table style="width: 100%" :data="fenXiTable.list">
                  <el-table-column type="index" label="序号" fixed></el-table-column>
                  <el-table-column prop="attachName" label="附件名称" align="right"></el-table-column>
                  <el-table-column prop="option" fixed="right" label="操作" min-width="80" align="right">
                    <template slot-scope="scope">
                      <el-button type="text" @click="downloadFileById(scope.row.attachId)">下载</el-button>
                    </template>
                  </el-table-column>
                </el-table>
            </el-col>
          </el-row> -->
        </div>
        <!-- <el-form v-show="showXSInfo"  disabled label-width="200px">
          <template v-for="(item,index) in formTwoXS1"  >
          <el-row :key="index">
            <el-col :span="12">
              <el-form-item label="可疑交易名称：">
                <el-input v-model="item.cDispose" :maxlength="30" placeholder="可疑交易名称,最长为30字符" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="关联移送记录：">
                <el-input type="textarea"  placeholder="关联移送记录,最长为200字符"  v-model="item.ctriggerMessage" :maxlength="200"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="主要交易发生地：">
                <el-input v-model="item.cbodyMessage"  placeholder="主要交易发生地：,最长为50字符"  :maxlength="50"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" >
              <el-form-item label="交易时间段：" >
                <el-date-picker
                  v-model="item.cDealdate"
                  style="width: 100%"
                  type="daterange"
                  range-separator="至"
                  format="yyyy-MM-dd" 
                  value-format="yyyy-MM-dd"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="累计交易金额（人民币）：">
                <el-input v-model="item.cRmb" placeholder="万元，最长为10字符" :maxlength="10"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="累计交易金额（外币）：">
                <el-input v-model="item.cYb" placeholder="万美元，最长为10字符" :maxlength="10"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="涉及交易笔数：">
                <el-input v-model="item.cNumber"  placeholder="涉及交易笔数,最长为10字符"  :maxlength="10"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="涉及主要账户个数：" >
                <el-input v-model="item.cMainnumber"  placeholder="涉及主要账户个数,最长为10字符"  :maxlength="10"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="初步判断：">
                <el-select style="width:100%" v-model="item.cJudge" clearable placeholder="请选择" multiple>
                  <el-option  v-for="item in this.sheZui" :key="item.codeId" :label="item.codeName" :value="item.codeId"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="监测分析触发点：">
                <el-input  placeholder="监测分析触发点：,最长为200字符"  v-model="item.cPoints" type="textarea" :maxlength="200"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="交易主体身份及相关信息：">
                <el-input  placeholder="交易主体身份及相关信息：,最长为200字符"  v-model="item.cSubject" type="textarea" :maxlength="200"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="建议：">
                <el-input  placeholder="建议,最长为200字符"  v-model="item.cSuggest" type="textarea" :maxlength="200"></el-input>
              </el-form-item>
            </el-col>
            <el-col >
              <el-form-item label="分析概述："  :key="'分析概述：' + index" >
              <el-table style="width: 100%" :data="fenXiTable.list">
                  <el-table-column type="index" label="序号" fixed></el-table-column>
                  <el-table-column prop="attachName" label="附件名称" align="right"></el-table-column>
                  <el-table-column prop="option" fixed="right" label="操作" min-width="80" align="right">
                    <template slot-scope="scope">
                      <el-button type="text" @click="downloadFileById(scope.row.attachId)">下载</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
            </el-col>
            <el-col></el-col>
          </el-row>   
          </template>
 
        </el-form> -->
      </el-tab-pane>
      <!-- <el-tab-pane label="附件信息">
        <div class="accestitle">附件列表</div>
            <el-table style="width: 100%" :data="accessoryTable.list">
              <el-table-column type="selection" width="55" fixed></el-table-column>
              <el-table-column type="index" width="120" label="序号" fixed></el-table-column>
              <el-table-column prop="attachName" label="附件名称" min-width="180" fixed></el-table-column>
              <el-table-column prop="option" fixed="right" label="操作" min-width="80">
                <template slot-scope="scope">
                  <el-button type="text"><a @click="downloadUrl(scope.row.attachId)">下载</a></el-button>
                  <el-button type="text" @click="delRow(scope)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
      </el-tab-pane> -->
      <!-- <el-tab-pane label="流转信息">
        <Conduct></Conduct>
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import Conduct from '@/views/sys-monitoringAnalysis/cueManage/intelligence/addForm/conduct'
import FileInfo from '@/views/sys-monitoringAnalysis/cueManage/intelligence/addForm/fileInfo'
// import QianCheng from '@/views/sys-monitoringAnalysis/cueManage/intelligence/addForm/qianCheng'
// 情报文件接口引用
import { deleteFileById } from '@/api/sys-monitoringAnalysis/cueManage/investigation/investigation.js'
import { noNothing, commonPattern } from '@/utils/formValidate' // 校验规则
import { getSignDetailInfo, getFileList, signDataUpdate, getClueInfoById, getDepart } from '@/api/sys-monitoringAnalysis/cueManage/intelligence/intelligence.js'
import { getSheZui } from '@/api/sys-monitoringAnalysis/cueManage/autonomousAnalysis/autonomousAnalysis.js'
export default {
  components: {
    Conduct,
    FileInfo
  },
  data() {
    return {
      backImg: {
        backgroundImage: 'url(' + require('@/assets/back/back.png') + ')',
        backgroundRepeat: 'no-repeat'
      },
      // 签呈批单数据
      petitionValue: '',
      petitionForm: {
        number: '', // 单号
        saveDt: '', // 保存时间
        sign: '', // 签、呈
        s_type: '', // 类别
        stitle: '', // 单标题
        copiesNum: '', // 分数
        sendDepart: '', // 发送单位
        signRemark: '', // 签批单备注
        showRemark: '', // 呈批单备注
        letterTitle: '', // 函标题
        letterText: '', // 函正文
        numSuit: '', // 编号情况,
        receNum: '' // 来函号
      },
      showXSInfo: false,
      sheZui: [], // 涉罪类型
      departArr: [],
      // 可疑交易线索数据
      formTwoXS1: [
      ],
      formTwoXS: {
        // ------下面是可疑交易线索数据字段------//
        cDispose: '', // 可疑交易线索----可疑交易名称
        ctriggerMessage: '', // 可疑交易线索----关联移送记录
        cbodyMessage: '', // 可疑交易线索----主要交易发生地
        cDealdate: '', // 可疑交易线索----交易时间段
        cRmb: '', //  可疑交易线索----累计交易金额(人民币)
        cYb: '', //  可疑交易线索----累计交易金额(外币)
        cNumber: '', //  可疑交易线索----涉及交易笔数
        cMainnumber: '', //  可疑交易线索----涉及主要账户个数
        cJudge: [], //  可疑交易线索----初步判断
        cSubject: '', // 可疑交易线索----交易主体身份及相关信息
        cPoints: '', // 可疑交易线索----检测分析触发点
        cSuggest: '' // 可疑交易线索----建议，
      },
      fenXiTable: {
        // 请求信息分页
        list: [],
        // 默认开始页码
        currentPage: 1,
        // 每页显示条数
        pagesize: 10,
        // 总条数
        total: 0
      },
      petitionFormRules: {
        signId: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: noNothing, trigger: 'blur' }
        ], // '主键',
        number: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: noNothing, trigger: 'blur' }
        ], // '单号',
        sign: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: noNothing, trigger: 'blur' }
        ], //  '签/呈/签呈',
        saveDt: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ], // '保存时间',
        s_type: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: noNothing, trigger: 'blur' }
        ], // '类别-线索 协查 通报',
        stitle: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: this.mynoSpaceAndTs, trigger: 'blur' }
        ], // '单标题',
        copiesNum: [
          { required: false, message: '内容不能为空', trigger: 'blur' },
          { validator: this.onlyNumberValidate, trigger: 'blur' }
        ], // '份数',
        sendDepart: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: noNothing, trigger: 'blur' }
        ], // 'sendDepart',
        signRemark: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
          // { validator: noNothing, trigger: 'blur' }
        ], // '签批单备注',
        showRemark: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
          // { validator: noNothing, trigger: 'blur' }
        ], // '呈批单备注',
        letterTitle: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: noNothing, trigger: 'blur' }
        ], // '函标题',
        receNum: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: noNothing, trigger: 'blur' }
        ], // '来函号',
        letterText: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
          // { validator: noNothing, trigger: 'blur' }
        ], // '函正文',
        enclosureInf: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: noNothing, trigger: 'blur' }
        ], // '附件情况',
        numSuit: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: noNothing, trigger: 'blur' }
        ], // '编号情况',
        status: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: noNothing, trigger: 'blur' }
        ] // '状态'
      },
      // 情报自涵表单
      qingBaoForm: {
        nId: '', // 主键
        nNum: '', // '情报字号',
        nTitle: '', // '标题',
        nDepart: '', // '来文单位',
        receNum: '', // '来函号',
        sendDepart: '', // 去文单位
        nAttachsuit: '', // '附件情况',
        nReceTime: '', // 处理时间
        singId: '' // '签批单ID'
      },
      // 情报自涵校验
      qingBaoRules: {},
      // 传过来的infoId
      infoId: '',
      // 附件列表
      accessoryTable: {
        // 请求信息分页
        list: [
        ],
        // 默认开始页码
        currentPage: 1,
        // 每页显示条数
        pagesize: 10,
        total: ''
      },
      nId: '',
      stopRepeat: 0,
      isUpLoading: false,
      keyIndex: ''// 传过来的标记
    }
  },
  mounted() {
    this.getDepart()
    if (this.$route.query.isView === '1') {
      this.signId = this.$route.query.id
      this.keyIndex = '1'
      this.getSignDetailInfoById()
      this.getClueInfoById()
      this.getSheZuiLX()
    } else {
      this.signId = this.$route.query.signId
      this.keyIndex = this.$route.query.keyIndex
      this.getSignDetailInfoById()
      this.getClueInfoById()
      this.getSheZuiLX()
    }

    this.getFileList() // 获取附件列表
  },
  methods: {
    getDepart() {
      getDepart().then(res => {
        if (res.code === 200) {
          this.departArr = res.data
        }
      })
    },
    // 获取涉罪类型
    getSheZuiLX() {
      getSheZui('TOSC').then(res => {
        this.sheZui = res.data
      })
    },
    getClueInfoById() {
      getClueInfoById(this.signId).then(res => {
        if (res.code === 200) {
          if (res.data.length === 0) {
            this.showXSInfo = false
          } else {
            this.showXSInfo = true
            this.formTwoXS1 = res.data
            this.formTwoXS1.forEach(res => {
              res.cdealdate = res.cdealdate.split(',')
              res.cjudge = res.cjudge.slice(0, res.cjudge.length - 1)
            })
          }
        }
      }).catch(() => {
        console.log(111)
      })
    },
    downloadFileById(scope) {
      location.href = '/file-service/upload/download/' + scope + '?moduleName=' + encodeURI('线索管理')
    },
    onlyNumberValidate(rule, value, callback) {
      if (!commonPattern.spaceBar.test(value)) {
        callback(new Error('内容不能含有空格'))
      } else if (commonPattern.specialChar.test(value) || commonPattern.specialEng.test(value)) {
        callback(new Error('内容不能填写特殊字符'))
      } else if (!commonPattern.number.test(value) && value !== '') {
        callback(new Error('必须输入数值'))
      } else {
        callback()
      }
    },
    mynoSpaceAndTs(rule, value, callback) {
      var my = {
        specialSignEng: /[`~!@#$%^&*_+<>?:"{},.\/;']/im,
        specialSignChar: /[·！#￥——：；“”‘’、，|《。》？、【】]/im
      }
      if (!commonPattern.spaceBar.test(value)) {
        callback(new Error('内容不能含有空格'))
      } else if (my.specialSignChar.test(value) || my.specialSignEng.test(value)) {
        callback(new Error('内容不能填写特殊字符'))
      } else {
        callback()
      }
    },
    zzInfo(rule, value, callback) {
      if (!commonPattern.spaceBar.test(value)) {
        callback(new Error('内容不能含有空格'))
      } else {
        callback()
      }
    },
    // 下载附件
    downloadUrl(scope) {
      location.href = '/file-service/upload/download/' + scope + '?moduleName=' + encodeURI('线索管理')
    },
    returnList() {
      this.$router.go(-1)
    },
    // 签呈批单表单类别联动
    changeSTitle() {
      // this.petitionForm.sTitle = ''
      if (this.petitionForm.s_type === '线索') {
        this.petitionForm.stitle = '关于移送X某等账户可疑交易线索的函'
      } else if (this.petitionForm.s_type === '通报') {
        this.petitionForm.stitle = '关于通报X某等账户可疑交易信息的函'
      } else if (this.petitionForm.s_type === '协查--受托') {
        this.petitionForm.stitle = 'XXX函[' + new Date().getFullYear() + ']Y号协查结果反馈'
      } else {
        this.petitionForm.sTitle = ''
      }
    },
    // 签呈批单数据回显
    getSignDetailInfoById() {
      getSignDetailInfo(this.signId).then(res => {
        // 签呈批单数据
        this.petitionForm.number = res.data.data.signDO.number
        this.petitionForm.saveDt = res.data.data.signDO.saveDt
        this.petitionForm.sign = res.data.data.signDO.sign
        this.petitionForm.s_type = res.data.data.signDO.s_type
        this.petitionForm.stitle = res.data.data.signDO.stitle
        this.petitionForm.copiesNum = res.data.data.signDO.copiesNum
        this.petitionForm.sendDepart = res.data.data.signDO.sendDepart
        this.petitionForm.signRemark = res.data.data.signDO.signRemark
        this.petitionForm.showRemark = res.data.data.signDO.showRemark
        this.petitionForm.letterTitle = res.data.data.signDO.letterTitle
        this.petitionForm.letterText = res.data.data.signDO.letterText
        this.petitionForm.numSuit = res.data.data.signDO.numSuit
        this.petitionForm.receNum = res.data.data.signDO.receNum
        // 情报自函数据
        if (res.data.data.letterDO) {
          this.nId = res.data.data.letterDO.nId
          this.qingBaoForm.nNum = res.data.data.letterDO.nnum
          this.qingBaoForm.nTitle = res.data.data.letterDO.ntitle
          this.qingBaoForm.nDepart = res.data.data.letterDO.ndepart
          this.qingBaoForm.receNum = res.data.data.letterDO.receNum
          this.qingBaoForm.sendDepart = res.data.data.letterDO.sendDepart
          this.qingBaoForm.nAttachsuit = res.data.data.letterDO.nattachsuit
          this.qingBaoForm.nReceTime = res.data.data.letterDO.nreceTime
        }
      })
    },
    // 获取附件列表
    getFileList() {
      // const obj = {
      //   infoId: this.signId,
      //   pageNum: this.accessoryTable.currentPage,
      //   pageSize: this.accessoryTable.pagesize
      // }
      getFileList(this.signId).then(res => {
        if (res.code === 200) {
          this.accessoryTable.list = res.data
        }
      })
    },
    // 删除附件
    // delRow(scope) {
    //   const index = scope.$index
    //   this.$confirm('确定要删除此附件吗？', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     this.accessoryTable.list.splice(index, 1)
    //   }).catch(() => {})
    // },
    delRow(scope) {
      this.$confirm('确定要删除此附件吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteFileById(scope.row.attachId).then(res => {
          if (res.code === 200) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getFileList()
          } else {
            this.$message({
              message: '删除失败',
              type: 'error'
            })
          }
        })
      }).catch(() => {})
    },
    // 新增签呈批单
    submitIntelligence() {
      if (this.stopRepeat === 1) {
        return false
      } else {
        this.$refs['petitionFormRef'].validate((valid) => {
          if (valid) {
            this.stopRepeat++
            const formArchivesInfo = {
              signDO: {
                signId: this.signId,
                number: this.petitionForm.number,
                sign: this.petitionForm.sign,
                saveDt: this.petitionForm.saveDt,
                s_type: this.petitionForm.s_type,
                sTitle: this.petitionForm.stitle,
                copiesNum: this.petitionForm.copiesNum,
                sendDepart: this.petitionForm.sendDepart,
                signRemark: this.petitionForm.signRemark,
                showRemark: this.petitionForm.showRemark,
                letterTitle: this.petitionForm.letterTitle,
                receNum: this.petitionForm.receNum,
                letterText: this.petitionForm.letterText,
                numSuit: this.petitionForm.numSuit
              },
              letterDO: {
                nId: this.nId,
                nNum: this.qingBaoForm.nNum,
                nTitle: this.qingBaoForm.nTitle,
                nDepart: this.qingBaoForm.nDepart,
                receNum: this.qingBaoForm.receNum,
                nAttachsuit: this.qingBaoForm.nAttachsuit
              }

            }
            this.isUpLoading = true
            signDataUpdate(formArchivesInfo).then(res => {
              if (res.code === 200) {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
                this.stopRepeat = 0
                this.isUpLoading = false
                setTimeout(() => {
                  this.$router.push({ name: 'cueManage_intelligence_analysis' })
                }, 1000)
              } else {
                this.isUpLoading = false
              }
            }).catch(() => {
              this.isUpLoading = false
            })
          }
        })
      }
    },
    // 返回
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="scss">
.interAddForm{
  position: relative;
  .biaoStyle{
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .back {
    position: absolute;
    top: 0px;
    right: 0px;
  }
  .buttonSize{
    width: 86px;
  }
  .oddinput .el-date-editor--date{
    width: 100% !important;
    
  }
  .oddinput .el-select {
    display: block
  }
  .oddinputXS .el-form-item__content {
    line-height: 33px !important;
  }
  .table {
    table {
      border-collapse: collapse;
      text-align: center;
      margin: 0 auto;
    }
    table p {
      text-align: center;
      margin-top: 20px;
    }
    table span {
      display: inline-block;
      width: 430px;
      text-align: right;
    }
    #time span {
      width: 30px;
    }
    .p2 {
      margin-left: 10px;
      text-align: left;
      margin-top: 30px;
    }
    .p3 {
      margin-left: 10px;
      text-align: left;
      margin-top: 100px;
    }
    .p4 {
      margin-left: 10px;
      text-align: right;
      margin-right: 30px;
      margin-top: 200px;
    }
    .p5 {
      text-align: right;
      margin-right: 30px;
    }
    .p6 {
      width: 800px;
      margin: 240px auto 0;
      text-align: -webkit-auto;
    }
  }
}


</style>
