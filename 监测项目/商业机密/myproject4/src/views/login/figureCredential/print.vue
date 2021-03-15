<template>
  <el-card class="box-card">
    <div slot="header">
      <span>中国反洗钱监测分析中心报送业务</span>
      <span>报告机构证书操作申请</span>
      <router-link :to="{name:'login'}">
        <el-button style="float: right; padding: 3px 0" size="medium" type="text">返回登录</el-button>
      </router-link>
    </div>

    <el-form :model="formData" label-width="140px">
      <el-row>
        <el-col :offset="2" :span="20">
          <h4>证书申请信息</h4>
          <el-form-item label="基本情况：">
            <span>证书种类：{{basicMas.cerType}}；</span>
            <span>证书数量：{{basicMas.cerCount}}张；</span>
            <span>证书期限：{{basicMas.cerDeadline}}年期</span>
            <!-- <span>证书种类：企业普通证书；证书数量：1张；证书期限：5年期</span> -->
          </el-form-item>
          <el-form-item label="申请日期：">
            <span>{{basicMas.applyDate}}</span>
          </el-form-item>
          <el-form-item label="业务类型：">
            <span>{{formData.businessType}}</span>
            <!-- <el-checkbox v-model="formData.businessType" disabled>新申请</el-checkbox> -->
          </el-form-item>
          <el-form-item label="备注描述：">
            <el-checkbox-group  size="mini" disabled>
              <el-checkbox v-for="item in noteArr" :label="item.value" :key="item.value">{{item.value}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="UKey外壳编号：">
            <span>{{formData.ukeyCode}}</span>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :offset="2" :span="20">
          <h4>申请机构信息</h4>
          <el-form-item label="机构名称：">
            <span>{{basicOrg.rinm}}</span>
            <!-- <span>中国工商银行</span> -->
          </el-form-item>
          <el-form-item label="英文/拼音简称：">
            <span>{{formData.shortName}}</span>
          </el-form-item>
          <!-- <el-form-item label="机构证件类型：">
            <span>金融机构编码</span>
          </el-form-item> -->
          <el-form-item label="报告机构编码：">
            <span>{{basicOrg.ricd}}</span>
            <!-- <span>C00000000000001</span> -->
          </el-form-item>

        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="2" :span="20">
          <h4>机构经办人信息</h4>
          <el-form-item label="经办人姓名：">
            <span>{{formData.managerName}}</span>
          </el-form-item>
          <el-form-item label="经办人证件类型：">
            <span>{{formData.paperworkCode}}</span>
          </el-form-item>
          <el-form-item label="经办人证件号码：">
            <span>{{formData.paperworkNum}}</span>
          </el-form-item>
          <el-form-item label="收件地址：">
            <span>{{formData.receiptAddress}}</span>
          </el-form-item>
          <el-form-item label="邮箱：" label-width="130px">
            <span>{{formData.email}}</span>
          </el-form-item>
          <el-form-item label="联系方式：" label-width="130px">
            <span>{{formData.phoneNumber}}</span>
          </el-form-item>

        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="2" :span="20">
          <h4>申请机构声明</h4>
          <el-form-item label="">
            <span>本机构承诺以上所填写的申请资料真实、有效。本机构已认真阅读并同意遵守重金金融认证中心有限公司（CFCA）网站（http://www.cfca.com.cn）发布的《数字证书服务协议》、《电子认证业务规则（CPS）》中规定的相关义务。</span>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-row>
        <el-col :offset="2" :span="20">
          <el-form-item label="上传附件">
            <el-button type="primary">选择文件</el-button>
          </el-form-item>
        </el-col>
      </el-row> -->

    </el-form>
    <div style="text-align:center">
      <el-button type="primary" @click="printPag" plain>打 印</el-button>
      <el-button type="primary" @click="downBtn" plain>下 载</el-button>
      <!-- <el-button @click="dialogVisible =true" type="primary">提交申请表单</el-button> -->
    </div>

    <el-dialog :visible.sync='dialogVisible' width='25em' center>
      <el-row style='text-align:center;'>
        <el-col :span="24">
          <h4>申请成功</h4>
          <p>申请表提交成功，请通过进度查询功能关注审批进度。</p>
        </el-col>
      </el-row>
    </el-dialog>

  </el-card>

</template>
<script>
import { getToken } from '@/utils/auth'
import { getList } from '@/api/login/figureCredential'
export default {
  data() {
    return {
      cerId: '',
      formData: {
        cerType: '',
        cerCount: '',
        cerDeadline: '',
        businessType: '',
        ukeyCode: '',
        rinm: '',
        shortName: '',
        ricd: '',
        managerName: '',
        paperworkCode: '',
        paperworkNum: '',
        receiptAddress: '',
        email: '',
        phoneNumber: ''
      },
      basicMas: {},
      basicOrg: {},
      noteArr: [],
      dialogVisible: false,
      token: getToken()
    }
  },
  computed: {
    downHref: function() {
      return '/certificate/download/' + this.cerId + '?token=' + this.token
    }
  },
  created() {
    this.cerId = this.$route.query.cerId
    this.basicMas = this.$route.query.basicMas
    this.basicOrg = this.$route.query.basicOrg
    this.getData()
  },
  methods: {
    getData() {
      const paramsObj = {
        cerId: this.cerId,
        riid: '001'
      }
      getList(paramsObj).then(res => {
        this.formData = res.data.cerInfo
        this.noteArr = res.data.noteList
        this.formData.shortName = res.data.orgInfo.shortName
      })
    },
    downBtn() {
      // 下载
      location.href = this.downHref
    },
    printPag() {
      // 打印
      window.print()
    }
  }
}
</script>

