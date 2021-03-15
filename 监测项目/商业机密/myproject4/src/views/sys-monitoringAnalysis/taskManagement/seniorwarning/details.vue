<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>查看详情</span>
      </div>
          <el-form v-model="this.form"  label-width="120px" >
        <el-row>
          <el-col>
            <el-form-item label="预警编号：">
              <el-input disabled v-model="this.form.code"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
         <el-col>
            <el-form-item label="主体名称：">
              <el-input disabled v-model="this.form.ctnm"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
         <el-col>
            <el-form-item label="证件号码：">
              <el-input disabled  v-model="this.form.ctid"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
         <el-row>
         <el-col>
            <el-form-item label="文档来源编码：">
              <el-input disabled v-model="this.form.listSourceDocNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
         <el-row>
         <el-col>
            <el-form-item label="来源方向：">
              <el-input  disabled v-model="this.form.sourceDire"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
         <el-row>
         <el-col>
            <el-form-item label="来源业务：">
              <el-input disabled v-model="this.form.sourceBusiness"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="信息入库日期：">
              <el-input disabled v-model="this.form.earlywarningtime"></el-input>
            </el-form-item>
            <el-form-item label="预警时间：">
              <el-input disabled v-model="this.form.earlywarningtime"></el-input>
            </el-form-item>
          <el-form-item label="处置信息："  v-if="this.form.status === '已处置'" >
              <el-button type="primary" @click="lookworkFlowInfo()">查看处置信息</el-button>
            </el-form-item>
            <el-form-item label="状态：">
              <el-input disabled v-model="this.form.workstatus"></el-input>
            </el-form-item>
      </el-form>
      <!-- <el-form v-model="this.form"  label-width="120px" >
        <el-row>
          <el-col>
            <el-form-item label="预警编号：">
              <el-input disabled v-model="this.$route.query.data.code"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
         <el-col>
            <el-form-item label="主体名称：">
              <el-input disabled v-model="this.$route.query.data.ctnm"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
         <el-col>
            <el-form-item label="证件号码：">
              <el-input disabled  v-model="this.$route.query.data.ctid"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
         <el-row>
         <el-col>
            <el-form-item label="文档来源编码：">
              <el-input disabled v-model="this.$route.query.data.listSourceDocNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
         <el-row>
         <el-col>
            <el-form-item label="来源方向：">
              <el-input  disabled v-model="this.$route.query.data.sourceDire"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
         <el-row>
         <el-col>
            <el-form-item label="来源业务：">
              <el-input disabled v-model="this.$route.query.data.sourceBusiness"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="信息入库日期：">
              <el-input disabled v-model="this.$route.query.data.earlywarningtime"></el-input>
            </el-form-item>
            <el-form-item label="预警时间：">
              <el-input disabled v-model="this.$route.query.data.earlywarningtime"></el-input>
            </el-form-item>
          <el-form-item label="处置信息："  v-if="this.form.status === '已处置'" >
              <el-button type="primary" @click="lookworkFlowInfo()">查看处置信息</el-button>
            </el-form-item>
            <el-form-item label="状态：">
              <el-input disabled v-model="this.$route.query.data.workstatus"></el-input>
            </el-form-item>
      </el-form> -->
        <div style="text-align:center">
              <el-button   @click="goback()" >返回</el-button>
        </div>
    
    </el-card>
  </div>
</template>
<script>
import { EchoList } from '@/api/sys-monitoringAnalysis/taskManagement/seniorwarning/new.js'
import {
  getReasptInfo
} from '@/api/sys-monitoringAnalysis/taskManagement/modelWarning/model.js'
export default {
  data() {
    return {
      form: {
        sourceDire: '', // 证件号码
        isdistribution: '', // 是否管理员分配
        ctnm: '', // 主体名称
        operator: '', // 操作员
        code: '', // 预警编号
        sourceBusiness: '', // 状态
        ctid: '', // 涉罪类型
        listSourceDocNum: '',
        warningTime: ' '
      }
    }
  },
  mounted() {
    console.log(this.$route.query.id, 'xxx')
    EchoList(this.$route.query.id).then(res => {
      if (res.code === 200) {
        switch (res.data.list[0].workstatus) {
          case '1':
            res.data.list[0].workstatus = '待分配'
            break
          case '2':
            res.data.list[0].workstatus = '待认领'
            break
          case '3':
            res.data.list[0].workstatus = '处理中'
            break
          case 4:
            res.data.list[0].workstatus = '已处理'
            break
        }
        this.form = res.data.list[0]
      }
    })
  },
  methods: {
    goback() {
      this.$router.go(-1)
    },
    lookworkFlowInfo() {
      getReasptInfo(this.idsRouter).then(res => {
        if (res.code === 200) {
          this.lookBackDialogVisible = true
          this.sendDealWithForm.dealWithAdive = res.data.opinion
          const seeData = res.data.subFormList
          for (let i = 0; i < seeData.length; i++) {
            this.sendDealWithForm.checkList.push(seeData[i].status)
            if (seeData[i].status === '1003' && seeData[i].extendsInfo !== '') {
              this.tranInformationtags = seeData[i].extendsInfo.split(',')
              this.oneZeroThree = true
            }
            if (seeData[i].status === '1004' && seeData[i].extendsInfo !== '') {
              this.listtitletags = seeData[i].extendsInfo.split(',')
              this.oneZeroFour = true
            }
          }
        } else if (res.code === 599) {
          this.$message({
            type: 'warning',
            message: res.message,
            duration: 6000,
            showClose: true
          })
        } else {
          this.$message({
            type: 'error',
            message: res.message,
            duration: 6000,
            showClose: true
          })
        }
      })
    }
    //   aa() {
    //     this.form = this.$route.query.content
    //     console.log(this.form, 999)
    //   }
  }
  //   created() {
  //     this.aa()
  //   }
}
</script>