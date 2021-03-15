<template>
  <div class="rulesWarning_details">
    <el-card>
      <div slot="header" class="clearfix">
        <span>查看详情</span>
      </div>
      <el-form v-model="this.form"  label-width="120px">
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
              <el-input disabled v-model="this.form.ctid"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="预警编号：">
              <el-input disabled v-model="this.form.warningNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="预警日期：">
              <el-input disabled v-model="this.form.datBegin"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="处置信息：" v-if="this.diageouer">
          <!-- <el-input v-model="this.form.state"></el-input> -->
          <el-button type="primary" @click="lookworkFlowInfo()">查看处置信息</el-button>
        </el-form-item>
        <el-form-item label="状态：">
          <el-input disabled v-model="this.form.status"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align:center">
      <!-- <el-tabs v-model="activeIndex"  class="el-tabs-demo" type="card" @tab-click="handleClick">
        <el-tab-pane label="流程图" name="first">
          <div>
              <el-steps :active="2" align-center>
                <el-step title="步骤1" description="这是一段很长很长很长的描述性文字"></el-step>
                <el-step title="步骤2" description="这是一段很长很长很长的描述性文字"></el-step>
                <el-step title="步骤3" description="这是一段很长很长很长的描述性文字"></el-step>
                <el-step title="步骤4" description="这是一段很长很长很长的描述性文字"></el-step>
              </el-steps>
          </div>
        </el-tab-pane>
        <el-tab-pane label="当前处理状态" name="second">
          <div>
              <div slot="header" class="clearfix">
                <span>当前信息环节</span>
              </div>
              <el-table :data="tableData" border style="width: 100%">
                  <el-table-column prop="date" label="日期" width="180"></el-table-column>
                  <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                  <el-table-column prop="address" label="地址"></el-table-column>
              </el-table>
              <div slot="header" class="clearfix">
                <span>当前用户信息</span>
              </div>
              <el-table :data="tableData" border style="width: 100%">
                  <el-table-column prop="date" label="日期" width="180"></el-table-column>
                  <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                  <el-table-column prop="address" label="地址"></el-table-column>
              </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="流转记录" name="third">
          <div>
              <el-table :data="tableData" border style="width: 100%">
                  <el-table-column prop="date" label="日期" width="180"></el-table-column>
                  <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                  <el-table-column prop="address" label="地址"></el-table-column>
              </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="操作日志" name="fourth">
          <div>
            <el-table :data="tableData" border style="width: 100%">
                  <el-table-column prop="date" label="日期" width="180"></el-table-column>
                  <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                  <el-table-column prop="address" label="地址"></el-table-column>
              </el-table>
          </div>
        </el-tab-pane>
      </el-tabs> -->
        <el-button type="primary" @click="goback()">返回</el-button>
      </div>
    </el-card>
    <!-- 查看处置信息 -->
    <el-dialog title="查看处置信息" :visible.sync="lookBackDialogVisible" width="70%">
      <el-form :model="sendDealWithForm" disabled label-width="80px">
        <el-form-item label="处置状态">
            <el-checkbox-group ref="checkGround" v-model="sendDealWithForm.checkList" style="display: flex;flex-direction: column;width:80%">
              <el-checkbox label="1001">1001-经初步分析，不能确定为可疑</el-checkbox>
              <el-checkbox label="1002" >1002-列入关注名单</el-checkbox>
              <el-checkbox label="1003">1003-已移送，中心对外移送情报（通报）字函号 </el-checkbox>
              <div v-if="oneZeroThree">
                <el-tag
                  v-for="(tag,idx) in tranInformationtags"
                  :key="idx"
                  style="margin-left:5px"
                  closable>
                  {{tag}}
                </el-tag>
              </div>
              <el-checkbox label="1004">1004-加入已有的分析任务中</el-checkbox>
              <div v-if='oneZeroFour'>
                <el-tag
                  v-for="(tag,idx) in listtitletags"
                  :key="idx"
                  style="margin-left:5px">
                  {{tag}}
                </el-tag>
              </div>
              <el-checkbox label="1005">1005-创建新的分析任务</el-checkbox>
              <el-checkbox label="1006">1006-其他</el-checkbox>
            </el-checkbox-group>
        </el-form-item>

        <el-form-item label="处置意见" >
          <el-input maxlength="500" v-model="sendDealWithForm.dealWithAdive" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="lookBackDialogVisible = false">返 回</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getLookRuleList
} from '@/api/sys-monitoringAnalysis/taskManagement/rulesWarning/rules.js'
import {
  getReasptInfo,
  getNoAllReaspt
} from '@/api/sys-monitoringAnalysis/taskManagement/modelWarning/model.js'
export default {
  data() {
    return {
      form: {
        Idcard: '522400197501159392', // 证件号码
        isdistribution: '是', // 是否管理员分配
        reporting: '工商银行', // 主体名称
        operator: '李四', // 操作员
        code: '1000292891', // 预警编号
        state: '待分配', // 状态
        crime: '0101', // 涉罪类型
        updateTime: '2017-01-18 ',
        warningTime: '2019-01-18 '
      },
      // ----------查看处置信息--------
      lookBackDialogVisible: false,
      sendDealWithForm: {
        checkList: [],
        dealWithAdive: ''
      },
      oneZeroThree: false,
      oneZeroFour: false,
      listtitletags: [],
      // -------------------------
      idsRouter: '',
      activeIndex: 'first',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }],
      diageouer: false
    }
  },
  methods: {
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
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    goback() {
      if (JSON.parse(sessionStorage.getItem('searchDataLookXqSxp'))) {
        const obj = JSON.parse(sessionStorage.getItem('searchDataLookXqSxp'))
        obj.ifReviewLookXqSxp = true
        sessionStorage.setItem('searchDataLookXqSxp', JSON.stringify(obj))
      }
      this.$router.go(-1)
    }
  },
  created() {
    if (this.$route.query.isView) {
      this.idsRouter = this.$route.query.id
    }
    getNoAllReaspt(this.idsRouter).then(res => {
      if (res.code === 200) {
        switch (res.data) {
          case 'true':
            this.diageouer = true
            break
          case 'false':
            this.diageouer = false
            break
        }
      }
    })
    getLookRuleList(this.idsRouter).then(res => {
      if (res.code === 200) {
        this.form = res.data
      }
    })
  }
}
</script>
<style lang="scss">
.rulesWarning_details {
  .el-card{
    .el-card__body{
        .el-tabs-demo{
          width: 100%;
            .el-tabs__header{
              display: flex;
              justify-content: center;
              align-items: center;
            }
        }
    }
  }

}
</style>
