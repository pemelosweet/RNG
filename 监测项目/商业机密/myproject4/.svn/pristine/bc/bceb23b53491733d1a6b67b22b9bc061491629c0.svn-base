<template>
  <div class="rosterManage-viewRoster">
    <el-card v-if="isHide">
      <div slot="header" class="clearfix">
        <span>创建人：{{form.creUser}}</span>
      </div>
      <el-form :model="form">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="主体名称：">
              <span>{{form.subjectName}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="主体证件号码：">
              <span>{{form.subjectINum}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="来源方向：">
              <span>{{form.sourceDire}}</span>
            </el-form-item>
          </el-col>
            </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="来源业务：">
              <span>{{form.sourceBusiness}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="名单来源文档编号：">
              <span>{{form.listSourceDocNum}}</span>
            </el-form-item>
          </el-col>
            </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="初步判断：">
              <span style="margin-right:18px" v-for="(item,index) in form.charosterPreliminaryJudgmentDOList" :key="index">
                {{item.preliminaryJudgme}}</span>
            </el-form-item>
          </el-col>
        </el-row>
          <div class="btnalign" style="textAlign:center">
              <el-button type="primary" style="margin-right:20px" @click="goback">返回</el-button>
          </div>
      </el-form> 
    </el-card>
    <el-card v-if="!isHide">
      <div slot="header" class="clearfix">
        <span>创建人：{{form.creUser}}</span>
      </div>
      <el-form :model="form" ref="ruleForm">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="主体名称：">
              <span>{{form.subjectName}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="主体类型：">
              <span>{{form.subjectType}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="主体国籍/地区：">
              <span>{{form.subjectNationality}}</span>
            </el-form-item>
          </el-col>
            </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="个人主体性别：">
              <span>{{form.personSubjectSex}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="主体证件类型：">
              <span>{{form.subjectIType}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="主体证件号码：">
              <span>{{form.subjectINum}}</span>
            </el-form-item>
          </el-col>
            </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="来源方向：">
              <span>{{form.sourceDire}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="来源业务：">
              <span>{{form.sourceBusiness}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="名单来源文档编号：">
              <span>{{form.listSourceDocNum}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="信息入库日期：">
              <span> {{form.infoSaveDate}} </span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="最后更新日期：">
              <span>{{form.lastUpdDate}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出生日期（或注册登记日期）：">
              <span>{{form.bornDate}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="出生地（或注册地）：">
              <span>{{form.bornPlace}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="备注：">
              <el-input v-model="form.remark" type="textarea" :rows="5" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="divider divider divider-horizontal"></div>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="主办部门：">
              <span>{{form.holdDept}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="主办部门分析员：">
              <span>{{form.holdDeptAnalyst}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="公开级别：">
              <span>{{form.publicLevel}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="名单主体对手：">
              <span>{{form.listSOpponent}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="对外移送（通报、反馈协查）日期:">
              <span>{{form.fTransforDate}}</span>
            </el-form-item>

          </el-col>
          <el-col :span="8">
            <el-form-item label="对外移送（通报、反馈协查）部门：">
              <span>{{form.fTransforDept}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24" v-if="form.charosterPreliminaryJudgmentDOList.length>0">
            <el-form-item label="初步判断：">
              <span style="margin-right:18px" v-for="(item,index) in form.charosterPreliminaryJudgmentDOList" :key="index">
                {{item.preliminaryJudgme}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="外方索引号：">
              <span>{{form.otherIndexNum}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="外方初步判断：">
              <span>{{form.foreignPreliminaryJudgment}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="外方来函细节：">
              <span>{{form.fLetterDesc}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="关联文档编号：">
              <span>{{form.relationDocNum}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="公开范围：">
              <span>{{form.publicScope}}</span>
            </el-form-item>
          </el-col>
       </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="外方来函涉及类型：">
              <span style="margin-right:18px" v-for="(item,index) in fLetterTypeArr" :key="index"> {{item}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-for="(item,index) in form.charosterAccountDOS" :key="index">
          <el-col :span="12"  >
            <el-form-item label="开户机构名称（或简称）：">
              <span>{{item.openAccountOrgName}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="账户号码：">
              <span>{{item.accountNum}}</span>
            </el-form-item>
          </el-col>
        </el-row>  
        <div class="btnalign" style="textAlign:center">
            <el-button type="primary" style="margin-right:20px" @click="goback">返回</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import { dictionary } from '@/api/sys-monitoringAnalysis/roster-warning/common.js'
import { viewRoster } from '@/api/sys-monitoringAnalysis/roster-warning/roster-manage.js'
export default {
  data() {
    return {
      rosterType: '主体类型名单',
      isHide: true,
      fLetterTypeArr: [],
      form: {
        charosterAccountDOS: [],
        otherIndexNum: '',
        fLetterType: '',
        foreignPreliminaryJudgment: '',
        fLetterDesc: '',
        relationDocNum: '',
        publicScope: '',
        creUser: '',
        subjectName: '',
        subjectType: '',
        subjectNationality: '',
        personSubjectSex: '',
        subjectIType: '',
        subjectINum: '',
        sourceDire: '',
        sourceBusiness: '',
        listSourceDocNum: '',
        infoSaveDate: '',
        lastUpdDate: '',
        bornDate: '',
        bornPlace: '',
        remark: '',
        holdDept: '',
        holdDeptAnalyst: '',
        publicLevel: '一级',
        listRival: '',
        listSOpponent: '',
        fTransforDate: '',
        fTransforDept: '',
        charosterPreliminaryJudgmentDOList: '',
        accountNum: '',
        openAccountOrgName: ''
      }
    }
  },
  mounted() {
    console.log(this.$route.params.rosterId, '---------------------------------------')
    const id = this.$route.params.rosterId
    viewRoster(id).then(res => {
      if (res.code === 200) {
        this.form = res.data
        if (res.data.state === 2 || res.data.state === 0) {
          this.isHide = false
        }
        if (this.form.fLetterType !== null) {
          this.fLetterTypeArr = this.form.fLetterType.split(',')
        } else {
          this.fLetterTypeArr = []
        }
        if (this.form.publicScope === '1') {
          this.form.publicScope = '总行公开'
        } else {
          this.form.publicScope = '全国公开'
        }
      }
    })
  },
  computed: {
    ...mapGetters(['permissions_routers'])
  },
  methods: {
    // 获取数据字典
    // getDictionary(params) {
    //   dictionary(params).then(res => {
    //     if (res.code === 200) {
    //       switch (params) {
    //         case 'COUNTRY':
    //           this.nationalityArr = res.data
    //           this.holdDeptArr.forEach(e => {
    //             if (this.form.holdDept === e.id) {
    //               this.form.holdDept = e.text
    //             }
    //           })
    //           break
    //         default:
    //           break
    //       }
    //     }
    //   })
    // },
    goback() {
      if (JSON.parse(sessionStorage.getItem('searchData'))) {
        const obj = JSON.parse(sessionStorage.getItem('searchData'))
        obj.ifReview = true
        sessionStorage.setItem('searchData', JSON.stringify(obj))
      }
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">
.rosterManage-viewRoster {
  .el-textarea.is-disabled .el-textarea__inner {
    background-color:white;
    color: #303133;
  }
  @media screen and(max-width: 1400px) {
    .el-col-8 {
      width: 50%;
    }
  }
  span{
    word-break: break-all; 
    word-wrap: break-word;
  }
}
</style>
