<template>
  <div class="interAddForm">
    <div>
      <el-row style="height:80px;line-height:80px;">
        <el-col :span="3" style="font-size:20px;font-weight: bold">编号移送流程审批</el-col>
        <el-col :span="3">
          <el-button type="primary" style="text-align:left" size="mini" @click="returnList()">返回列表</el-button>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-row style="height:60px;line-height:60px;">
        <el-col :span="2">流程操作：</el-col>
        <el-col :span="2">
          <el-button plain size="mini" diasbled class="buttonSize">打印</el-button>
        </el-col>
        <el-col :span="2">
          <el-button plain size="mini" class="buttonSize">保存</el-button>
        </el-col>
        <el-col :span="2">
          <el-button plain size="mini" class="buttonSize">提交</el-button>
        </el-col>
        <el-col :span="2">
          <el-button plain size="mini" class="buttonSize">意见</el-button>
        </el-col>
        <el-col :span="2">
          <el-button plain size="mini" class="buttonSize">关闭</el-button>
        </el-col>
      </el-row>
    </div>
    <el-tabs type="border-card">
      <el-tab-pane label="签呈批单">
        <!-- <QianCheng></QianCheng> -->
        <div>
          <el-form :model="petitionForm" label-width="100px" label="签呈批单表单">
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
                        type="datetime"
                        placeholder="选择日期时间">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-col>
                <!-- 第二行 -->
                <el-col :span="24">
                  <el-col :span="12">
                    <el-form-item label="签/呈：" prop="sign">
                      <el-select v-model="petitionForm.sign" placeholder="请选择活动区域">
                        <el-option label="签批单" value="shanghai"></el-option>
                        <el-option label="呈批单" value="beijing"></el-option>
                        <el-option label="均起草" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="类  别：" prop="s_type">
                      <el-select v-model="petitionForm.s_type" placeholder="请选择活动区域">
                        <el-option label="线索" value="shanghai"></el-option>
                        <el-option label="通报" value="beijing"></el-option>
                        <el-option label="协查--受托" value="beijing"></el-option>
                        <el-option label="协查--委 托" value="beijing"></el-option>
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
                    <el-form-item label="发送单位：" prop="sendDepart">
                      <el-select v-model="petitionForm.sendDepart" placeholder="请选择活动区域">
                        <el-option label="公安部" value="公安部"></el-option>
                        <el-option label="中纪委" value="中纪委"></el-option>
                        <el-option label="最高检" value="最高检"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="签批单备注：" prop="signRemark">
                      <el-input type="textarea" v-model="petitionForm.signRemark"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
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
              <!-- <div class="ptitle">附件情况：</div>
              <el-row>
                <el-col :span="22">
                  <el-form-item label="文件2：">
                    <el-input v-model="petitionForm.odd"></el-input>
                  </el-form-item>
                </el-col>
              <el-col :span="2">
                <i class="el-icon-circle-plus-outline icon-add"></i>
              </el-col>
              </el-row> -->
            </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="情报字函">
        <el-row class="table">
          <el-form :model="qingBaoForm" :rules="qingBaoRules" ref="qingBaoRef">
            <table border="1">
            <tr>
              <td width="850" colspan="6" height="70;" align="center">
                <h2>中国反洗钱监测分析中心</h2>
                <p>
                  <el-form-item prop="nNum">【1】
                    <el-input v-model="qingBaoForm.nNum" placeholder="中心情报字（2018）号" style="width:40%"></el-input>
                  </el-form-item>
                </p>
              </td>
            </tr>
            <tr>
              <td height="900" colspan="6">
                <p class="p1">
                  <el-form-item prop="nTitle">
                    【2】
                    <el-input  v-model="qingBaoForm.nTitle" placeholder="关于有关账户协查结果的函" style="width:40%"></el-input>
                  </el-form-item>
                </p>
                <p class="p2">
                  <el-form-item prop="nDepart">【3】
                    <el-input  v-model="qingBaoForm.nDepart" placeholder="海关总署缉私局：" style="width:40%"></el-input>
                  </el-form-item>
                </p>
                <p class="p2">
                  <el-form-item prop="nContent" style="margin-left:60px;">来函（【4】
                    <el-input  v-model="qingBaoForm.receNum" placeholder="缉私情函（2018）号" style="width:40%"></el-input>）收悉，业经监测分析。现将协查结果提供
                  </el-form-item>
                  <el-form-item prop="nDepart">【5】
                    <el-input  v-model="qingBaoForm.nDepart" placeholder="贵局" style="width:40%"></el-input>，请查收
                  </el-form-item>
                  </p>
                <p class="p3">
                  <el-form-item prop="nAttachsuit">【6】
                    <el-input  v-model="qingBaoForm.nAttachsuit" placeholder="附件：协查结果反馈表（共一份）" style="width:40%"></el-input>
                  </el-form-item>
                  
                </p>
                <p class="p4">【7】中国反洗钱监测分析中心</p>
                <p class="p5"> 2018年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日</p>
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
              <el-table-column type="selection" width="55" fixed></el-table-column>
              <el-table-column type="index" width="120" label="序号" fixed></el-table-column>
              <el-table-column prop="type" label="附件类型" min-width="120" fixed></el-table-column>
              <el-table-column prop="name" label="附件名称" min-width="180" fixed></el-table-column>
              <el-table-column prop="option" fixed="right" label="操作" min-width="80">
                <template slot-scope="scope">
                  <el-button type="text" @click="delRow(scope)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
      </el-tab-pane>
      <el-tab-pane label="流转信息">
        <Conduct></Conduct>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Conduct from '@/views/sys-monitoringAnalysis/cueManage/intelligence/addForm/conduct'
import FileInfo from '@/views/sys-monitoringAnalysis/cueManage/intelligence/addForm/fileInfo'
// import QianCheng from '@/views/sys-monitoringAnalysis/cueManage/intelligence/addForm/qianCheng'
// 情报文件接口引用
import { fileLists, getSignDetailInfo } from '@/api/sys-monitoringAnalysis/cueManage/intelligence/intelligence.js'
export default {
  components: {
    Conduct,
    FileInfo
  },
  data() {
    return {
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
        numSuit: '', // 编号情况
        receNum: '' // 来函号
      },
      // 情报自涵表单
      qingBaoForm: {
        nNum: '', // '情报字号',
        nTitle: '', // '标题',
        nDepart: '', // '来文单位',
        receNum: '', // '内容',
        nAttachsuit: '', // '附件情况',
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
          {
            type: '类型1',
            name: '关于***国际协查单'
          },
          {
            type: '类型2',
            name: '关于***附件'
          },
          {
            type: '类型3',
            name: '关于***附件'
          }
        ],
        // 默认开始页码
        currentPage: 1,
        // 每页显示条数
        pagesize: 10
      }
    }
  },
  mounted() {
    this.infoId = this.$route.query.infoId
    this.getSignDetailInfoById()
    console.log(this.infoId)
    // this.getFileList() // 获取附件列表
  },
  methods: {
    returnList() {
      this.$router.go(-1)
    },
    // 签呈批单数据回显
    getSignDetailInfoById() {
      getSignDetailInfo(this.infoId).then(res => {
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
        // 情报自函数据
        this.qingBaoForm.nNum = res.data.data.letterDO.nnum
        this.qingBaoForm.nTitle = res.data.data.letterDO.ntitle
        this.qingBaoForm.nDepart = res.data.data.letterDO.ndepart
        this.qingBaoForm.nContent = res.data.data.letterDO.ncontent
        this.qingBaoForm.nAttachsuit = res.data.data.letterDO.nattachsuit
        console.log(res)
      })
    },
    // 获取附件列表
    getFileList() {
      const obj = {
        infoId: this.infoId,
        pageNum: this.accessoryTable.currentPage,
        pageSize: this.accessoryTable.pagesize
      }
      fileLists(obj).then(res => {
        console.log(res)
      })
    },
    // 删除附件
    delRow(scope) {
      const index = scope.$index
      this.$confirm('确定要删除此附件吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.accessoryTable.list.splice(index, 1)
      }).catch(() => {})
    }
  }
}
</script>

<style scoped lang="scss">
.interAddForm{
  .buttonSize{
    width: 86px;
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
