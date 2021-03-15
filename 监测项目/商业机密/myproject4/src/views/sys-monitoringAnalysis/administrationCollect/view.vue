<template>
  <div class="administrationCollect-dataUpload">
    <el-card>
      <div slot="header" class="clearfix">
        <span>行政调查数据上传</span>
      </div>

      <el-form :model="form" label-width="120px" ref="validFom">
        <el-form-item label="分支机构:">
          {{form.branchBank}}
        </el-form-item>
        <el-form-item label="行政调查文号:" prop="admNum">
          <span>{{form.admNum}}</span>
        </el-form-item>

        <el-form-item label="涉及主体、账号:">
          <el-table :data="tableData" style="margin-top:10px">
            <el-table-column label="序号" type="index"></el-table-column>
            <el-table-column label="姓名/单位名称" prop="name"></el-table-column>
            <el-table-column
              prop="certificateType"
              label="证件类型"
              min-width="260"
            >
              <template slot-scope="scope">
                <el-form-item
                >
                  <el-select
                    clearable
                    v-model="scope.row.certificateType"
                    placeholder="请选择"
                    disabled="disabled"
                  >
                    <el-option
                      v-for="(item,index) in typeId"
                      :key="index"
                      :label="item.codeName"
                      :value="item.codeId"
                    >
                    </el-option>
                  </el-select>

                </el-form-item>

              </template>
            </el-table-column>
            <el-table-column label="证件号码" prop="certificateNum"></el-table-column>
            <el-table-column label="账号" prop="accountNum"></el-table-column>
            <el-table-column label="开户行" prop="openBank"></el-table-column>
            <!-- <el-table-column
              prop="branchBank"
              label="负责分析的分支行"
              min-width="260"
            >
              <template slot-scope="scope">
                <el-form-item                 
                >
                  <el-select
                  clearable
                    filterable
                    v-model="scope.row.branchBank"
                    placeholder="请选择"
                    disabled="disabled"
                  >
                    <el-option
                      v-for="(item,index) in organDoListData"
                      :key="index"
                      :label="item.codeName"
                      :value="item.codeId"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>

              </template>
            </el-table-column> -->
          </el-table>
          <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.pageNum" :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length" background>
          </el-pagination> -->

        </el-form-item>
        <el-form-item label="初步判断:">
          <span>{{preJudgmentStr}}</span>
        </el-form-item>
        <el-form-item label="附件:">
          <ul>
            <li v-for="(item,index) in admAttachDos" :key="index">
              <el-button type="text" @click="downloadAttach(item)"> {{item.attachName}} </el-button>
            </li>
          </ul>

        </el-form-item>

      </el-form>
      <div style="text-align:center">

        <el-button @click="go2Bck">返 回</el-button>
      </div>

    </el-card>

  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { branch } from '@/api/sys-monitoringAnalysis/conjointAnalysis/index.js'
import { getToken } from '@/utils/auth'
import { getSingle } from '@/api/sys-monitoringAnalysis/administration-collect/query.js'
export default {
  data() {
    return {
      form: {
        branchBank: '',
        admNum: ''
      },
      tableData: [],
      pageInfo: {
        pageNum: 1,
        pageSize: 10
      },
      typeId: [],
      preJudgmentDoList: [],
      preJudgmentStr: '',
      admAttachDos: [],
      token: getToken(),
      organDoListData: [],
      branchBank: ''
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  mounted() {
    this.getBranch()
    this.getTypeId()
    this.echoSingle()
  },
  methods: {
    // 获取分支机构
    getBranch() {
      branch({ typeId: 'FZJG' }).then(res => {
        if (res.code === 200) {
          this.organDoListData = res.data.list
        }
      })
    },
    // 获取证件类型
    getTypeId() {
      branch({ typeId: 'SFZJ' }).then(res => {
        if (res.code === 200) {
          this.typeId = res.data.list
        }
      })
    },
    echoSingle() {
      getSingle({ admId: this.$route.params.id }).then(res => {
        if (res.code === 200) {
          const obj = res.data.selectByPage[0]
          this.form.branchBank = obj.branchBank
          this.form.admNum = obj.admNum
          this.organDoListData.forEach(el => {
            if (el.codeId === obj.branchBank) {
              this.form.branchBank = el.codeName
              return
            }
          })
          // this.tableData = obj.accountDoList.concat(obj.mainDoList)
          obj.preJudgmentDoList.forEach(element => {
            this.preJudgmentDoList.push(element.preliminaryJudgme)
          })
          this.preJudgmentStr = this.preJudgmentDoList.join()
          this.admAttachDos = obj.attachDoList
          // const object = {}
          if (res.data.selectByPage[0].mainDoList.length > 0) {
            this.tableData = res.data.selectByPage[0].mainDoList
          }
          // if (res.data.Main !== null) {
          //   res.data.Main.forEach(el => {
          //     object.name = el.name
          //     object.certificateNum = el.certificateNum
          //     object.certificateType = el.certificateType
          //     if (res.data.Account !== null) {
          //       res.data.Account.forEach(item => {
          //         object.accountNum = item.accountNum
          //         object.branchBank = item.branchBank
          //         object.openBank = item.openBank
          //       })
          //     }
          //     this.tableData.push(object)
          //   })
          // }
          // if (res.data.Account !== null) {
          //   res.data.Main.forEach(el => {
          //     object.accountNum = el.accountNum
          //     object.branchBank = el.branchBank
          //     object.openBank = el.openBank
          //     if (res.data.Main !== null) {
          //       res.data.Main.forEach(item => {
          //         object.name = item.name
          //         object.certificateNum = item.certificateNum
          //         object.certificateType = item.certificateType
          //       })
          //     }
          //     this.tableData.push(object)
          //   })
          // }
        }
      })
    },

    // 切换分页条数
    handleSizeChange(size) {
      this.pageInfo.pageSize = size
    },
    // 点击切换分页
    handleCurrentChange(pageNum) {
      this.pageInfo.pageNum = pageNum
    },
    downloadAttach(params) {
      location.href = '/file-service/upload/download/' + params.attachId + '?moduleName=' + encodeURI('行政调查数据收集')
    },

    // go2Bck 返回
    go2Bck() {
      if (JSON.parse(sessionStorage.getItem('administrationCollect'))) {
        const obj = JSON.parse(sessionStorage.getItem('administrationCollect'))
        obj.ifReview = true
        sessionStorage.setItem('administrationCollect', JSON.stringify(obj))
      }
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.main-account {
  display: inline-block;
}
.el-form-item--small.el-form-item{
  margin-bottom:0;
 }
</style>

