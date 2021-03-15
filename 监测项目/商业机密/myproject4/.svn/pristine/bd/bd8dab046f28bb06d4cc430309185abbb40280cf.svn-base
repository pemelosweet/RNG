<template>
  <div onpaste="return false">
    <el-dialog title="抽样评价" width="90%" :visible.sync="diaComOne" @open="openDialogTableVisible" :append-to-body="true">
      <el-table :data="tableData" style="width: 100%" v-loading="tabLoading" element-loading-text="拼命加载中">
        <el-table-column prop="version" label="版本号" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="transactionName" label="可疑交易报告名称" show-overflow-tooltip width="350">
          <template slot-scope="scope">
            <el-button  v-if="scope.row.tableId" type="text" @click="exportXml(scope.row)">{{scope.row.transactionName}}</el-button>
            <span v-else>{{scope.row.transactionName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="affiliate" label="所属机构" show-overflow-tooltip width="300"></el-table-column>
        <el-table-column prop="rept" label="报告时间" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="suspiciousDescription" label="可疑描述" show-overflow-tooltip width="300"></el-table-column>
        <el-table-column label="评价指标（100）" width="130">
          <template v-if="tableData.length > 0">
            <el-table-column v-for="(item, index) in myCol.children" :key="index" :label="item.label" width="300">
              <template slot-scope="scope">
                <el-input v-model="scope.row.idexes[index].samplingIndexScore.score" maxlength="3" @input="scoreFn(scope.$index)" :onkeyup="scope.row.idexes[index].samplingIndexScore.score=scope.row.idexes[index].samplingIndexScore.score.replace(/[^\d]/g,'')"></el-input>
              </template>
            </el-table-column>
          </template>
        </el-table-column>
        <el-table-column prop="totalScore" label="总分" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.totalScore > 100 || scope.row.totalScore < 0" style="color: #F56C6C;">{{scope.row.totalScore}}</span>
            <span v-else style="color: #67C23A;">{{scope.row.totalScore}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remarks" label="备注" width="200">
          <template slot-scope="scope">
            <el-input type="textarea" :rows="2" v-model="scope.row.remarks"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="location" label="所在处室" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="evaluator" label="评价人员" show-overflow-tooltip width="100"></el-table-column>
      </el-table>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-button type="primary" @click="histroy">评价历史</el-button>
        </el-col>
        <el-col :span="12">
          <!-- <el-button type="primary" style="float: right;margin-left: 20px;" @click="returnEvent">取消</el-button> -->
          <el-button type="primary" style="float: right;" @click="saveFn" :loading="saveFnLoading">确定</el-button>
        </el-col>
      </el-row>
      <history :paramsId="id" :dialogTable="diaTypes" @setDia="setDia"></history>
    </el-dialog>
  </div>
</template>

<script>
import { organizationList, save } from '@/api/sys-monitoringAnalysis/dataGovernance/samplingEvaluetion/querySer.js'
// import MyTable from '@/views/sys-monitoringAnalysis/dataGovernance/samplingEvaluation/randomSampling/MyTable.vue'
import history from '@/views/sys-monitoringAnalysis/dataGovernance/samplingEvaluation/result/queryHistory.vue'
export default {
  props: {
    dialogType: {
      type: Boolean,
      default: false
    },
    ricd: {
      type: String,
      default: ''
    },
    myObj: {
      type: Object,
      default: function() {
        return {}
      }
    },
    queryObj: {
      type: Object,
      default: function() {
        return {}
      }
    },
    xmlId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      id: '',
      diaTypes: false,
      tabLoading: false,
      newTableData: [],
      tableData: [],
      myCol: { prop: 'idexes', label: '评价指标（100）', children: [] },
      saveFnLoading: false
    }
  },
  mounted() {
    // console.log(this.$route.query.datas)
    // this.initData()
  },
  components: {
    history
  },
  computed: {
    diaComOne: {
      get: function() {
        return this.dialogType
      },
      set: function(val) {
        this.$emit('dialogSwitch', val)
      }
    }
  },
  methods: {
    exportXml(row) {
      if (row) {
        location.href = `monitor/random/export?tableId=${row.tableId}&tableName=${row.tableName}&xmlId=${row.xmlId}`
      }
    },
    setDia(val) {
      this.diaTypes = val
    },
    openDialogTableVisible() {
      this.tabLoading = true
      this.myCol = { prop: 'idexes', label: '评价指标（100）', children: [] }
      this.tableData = []
      this.initData()
    },
    returnEvent() {
      this.dialogType = false
      // if (this.$route.query.datas === undefined) {
      //   this.$router.go(-1)
      // } else {
      //   this.$router.push({
      //     name: 'dataGovernance_samplingEvaluation_randomSampling',
      //     query: JSON.parse(this.$route.query.datas)
      //   })
      // }
    },
    saveFn() {
      this.tableData[0].totalScore = 0
      this.tableData[0].idexes.forEach(el => {
        this.tableData[0].totalScore += Number(el.samplingIndexScore.score)
      })
      let types = false
      this.tableData[0].idexes.forEach(el => {
        if (el.samplingIndexScore.score === '') {
          types = true
        }
      })
      if (this.tableData[0].totalScore > 100) {
        this.$message({
          type: 'warning',
          message: '总分不能大于100'
        })
      } else if (this.tableData[0].totalScore < 0) {
        this.$message({
          type: 'warning',
          message: '总分不能小于0'
        })
      } else if (types) {
        this.$message({
          type: 'warning',
          message: '评价指标不能为空'
        })
      } else {
        this.saveFnLoading = true
        save(this.tableData[0]).then(res => {
          if (res.code === 200) {
            this.saveFnLoading = false
            this.id = this.tableData[0].transactionReportId
            this.diaTypes = true
          } else {
            this.$message({
              type: 'warning',
              message: res.message,
              duration: 6000,
              showClose: true,
              onClose: function() {
                this.saveFnLoading = false
              }.bind(this)
            })
          }
          this.diaComOne = false
        }).catch(() => {
          this.saveFnLoading = false
        })
      }
    },
    scoreFn(index) {
      this.tableData[index].totalScore = 0
      this.tableData[index].idexes.map(item => {
        if (isNaN(Number(item.samplingIndexScore.score)) === false) {
          this.tableData[index].totalScore += Number(item.samplingIndexScore.score)
        }
      })
    },
    histroy() {
      this.id = this.tableData[0].transactionReportId
      this.diaTypes = true
    },
    tabDataMap(index, value) {
      console.log(value)
      const arr = []
      // let type = false
      this.tableData[index].idexes.map((item, ind) => {
        arr.push(item.samplingIndexScore.score)
        // if (this.newTableData[index].idexes[ind].samplingIndexScore.score !== item.samplingIndexScore.score) {
        //   arr.push(this.newTableData[index].idexes[ind].samplingIndexScore.score)
        // } else {
        // }
      })
      return arr
    },
    initData() {
      organizationList(this.ricd, this.xmlId).then(res => {
        if (res) {
          this.tabLoading = false
          if (res.code === 200) {
            if (res.data.length === undefined) {
              if (JSON.stringify(this.myObj) !== '{}') {
                res.data = Object.assign({}, res.data, this.myObj)
              }
              if (JSON.stringify(this.queryObj) !== '{}') {
                res.data.tableId = this.queryObj.tableId
                res.data.tableName = ''
                res.data.xmlId = this.queryObj.xmlId
              }
              this.tableData.push(res.data)
            } else {
              this.tableData = res.data
            }
            this.tableData.map(item => {
              item.idexes.map((v, i) => {
                this.myCol.children.push({
                  label: item.idexes[i].indexName + '(' + item.idexes[i].fullMarks + ')',
                  prop: 'idexes.' + i + '.samplingIndexScore.score'
                })
              })
            })
          } else {
            this.$message({
              type: 'warning',
              message: res.message,
              duration: 6000,
              showClose: true
            })
          }
        } else {
          this.tabLoading = false
        }
      })
    }
  }
}
</script>

<style>
</style>
