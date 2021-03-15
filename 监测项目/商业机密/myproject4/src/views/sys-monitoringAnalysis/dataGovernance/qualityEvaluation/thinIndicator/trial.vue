<template>
  <div class="thintrial">
    <el-card>
      <div slot="header" class="clearfix">
        <span>打分</span>
      </div>
      <el-row>
        <el-form ref="form" :model="form" label-width="120px">
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item label="评价任务名称：">
                <span>{{evaluationTaskName}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="评价时间：">
                <span>{{evaluationDate}}</span>
              </el-form-item>
            </el-col>
          </el-col>
        </el-form>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-button type="primary" @click="intelligentEvaluationAll" :loading="intelligentEvaluationAllLoading">一键智能评价</el-button>
          <el-button type="primary" @click="allIntelligentEvaluation" :loading="allIntelligentEvaluationLoading">全部智能评价</el-button>
            <el-button type="primary" @click="submitSure" :loading="submitSureLoading">确认提交细化指标</el-button>
        </el-col>
        <el-col :span="12" class="btnalign">
          <!-- <el-button type="primary" @click="download">下载</el-button> -->
          <el-button type="primary" plain @click="returnBtn">返回</el-button>
        </el-col>
      </el-row>
      <el-table :data="tableData" :span-method="objectSpanMethod" border v-loading="tableDataLoading" element-loading-text="拼命加载中..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
        <el-table-column type="selection" fixed></el-table-column>
        <el-table-column prop="assignationOrganization" label="评价机构名称" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="firstTargetName" label="一级指标" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="targetName" label="二级指标" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="targetType" label="指标类型" show-overflow-tooltip></el-table-column>
        <el-table-column label="权重" width="150">
          <template slot-scope="scope">
            <el-input style="width: 80%;" v-model="scope.row.giftWeight" maxlength="3" @blur="giftWeightBlur(scope, scope.$index)"></el-input>%
          </template>
        </el-table-column>
        <el-table-column label="评价结果" prop="evaluationResult" width="200" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-select v-if="scope.row.targetType === '定性'" v-model="scope.row.evaluationResult" placeholder="请选择" style="width: 100%" clearable @change="qualitativeChange(scope, scope.$index)">
              <el-option v-for="(item, index) in scope.row.qualitative" :key="index" :label="item.text" :value="item.value"></el-option>
            </el-select>
            <span v-else>
              {{scope.row.evaluationResult}}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="得分" prop="score" show-overflow-tooltip></el-table-column>
        <el-table-column label="加权平均分" prop="weightAverage" min-width="100" show-overflow-tooltip></el-table-column>
        <el-table-column label="总分" prop="sumScore" min-width="120" sortable="true" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" :disabled="scope.row.targetType === '定性'" @click="intelligentEvaluation(scope.row, scope.$index)">智能评价</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-button type="primary" @click="topFn" :disabled="typeTop">上一页</el-button>
      <el-button type="primary" @click="bottomFn">下一页</el-button> -->
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="endNum"
        background
        layout="prev, pager, next"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { trialCalculation, evaluation, createExcel, evaluationAll, submit, getScore, insertTemp, allEvaluation } from '@/api/sys-monitoringAnalysis/evaluate/receiveTaskController.js'
export default {
  data() {
    return {
      tableDataLoading: false,
      allIntelligentEvaluationLoading: false,
      submitSureLoading: false,
      oldNum: 1,
      intelligentEvaluationAllLoading: false,
      sunSocreNum: '',
      total: 0,
      typeTop: true,
      form: {},
      evaluationDate: '',
      evaluationTaskName: '',
      currentPage: 1,
      tableData: [],
      spanArr: [],
      pos: '',
      startNum: 0,
      endNum: 1,
      tabDataAll: []
    }
  },
  mounted() {
    this.initData()
  },
  destroyed() {
    if (this.$route.name !== 'dataGovernance_qualityEvaluation_thinIndicator') {
      if (sessionStorage.getItem('returnMemoryJyl')) {
        sessionStorage.removeItem('returnMemoryJyl')
      }
    }
  },
  methods: {
    returnBtn() {
      if (sessionStorage.getItem('returnMemoryJyl')) {
        const obj = JSON.parse(sessionStorage.getItem('returnMemoryJyl'))
        obj.returnBtn = 'Y'
        sessionStorage.setItem('returnMemoryJyl', JSON.stringify(obj))
      }
      this.$router.go(-1)
    },
    // 权重更改
    giftWeightBlur(scope, index) {
      if (scope.row.giftWeight > 100) {
        this.$message({
          duration: 6000,
          showClose: true,
          type: 'warning',
          message: '权重最多100%'
        })
      } else {
        this.intelligentEvaluation(scope.row, index)
      }
    },
    // 全部智能评价
    allIntelligentEvaluation() {
      this.allIntelligentEvaluationLoading = true
      let tabNum = 0
      this.tableData.forEach(el => {
        tabNum += Number(el.giftWeight)
      })
      if (tabNum > 100) {
        this.$message({
          type: 'warning',
          message: '权重总和必须为100%',
          duration: 6000,
          showClose: true,
          onClose: function() {
            this.allIntelligentEvaluationLoading = false
          }.bind(this)
        })
      } else {
        this.tableDataLoading = true
        allEvaluation(this.$route.query.evaluationTaskId, this.evaluationTaskName, this.endNum).then(res => {
          if (res.code === 200) {
            this.allIntelligentEvaluationLoading = false
            this.tabDataAll = []
            res.data.totalmap.forEach(el => {
              this.tabDataAll.push(el.slice(0, el.length - 1))
            })
            const arr = []
            arr.push(res.data.onemap.list[res.data.onemap.list.length - 1])
            this.evaluationTaskName = arr[0].evaluationTaskName
            this.evaluationDate = arr[0].evaluationDate
            this.tableData = res.data.onemap.list.splice(0, res.data.onemap.list.length - 1)
            this.total = res.data.onemap.total * 10
            this.spanArr = []
            this.pos = ''
            this.getSpanArr()
          } else {
            this.$message({
              type: 'warning',
              message: res.message,
              duration: 6000,
              showClose: true,
              onClose: function() {
                this.allIntelligentEvaluationLoading = false
              }.bind(this)
            })
          }
          this.tableDataLoading = false
        }).catch(() => {
          this.allIntelligentEvaluationLoading = false
          this.tableDataLoading = false
        })
      }
    },
    qualitativeChange(scope, index) {
      const obj = Object.assign({}, scope.row)
      delete obj.qualitative
      if (scope.row.evaluationResult !== '') {
        this.tableDataLoading = true
        getScore(obj).then(res => {
          if (res.code === 200) {
            this.tableData.splice(index, 1, res.data)
            let strNum = 0
            this.tableData.map(v => {
              if (v.weightAverage !== undefined && v.weightAverage !== '') {
                strNum += Number(v.weightAverage)
              }
            })
            this.tableData.map(a => {
              if ((strNum + '').indexOf('.') !== -1) {
                if ((strNum + '').slice((strNum + '').indexOf('.')).length > 4) {
                  a.sumScore = strNum.toFixed(3)
                } else {
                  a.sumScore = strNum
                }
              } else {
                a.sumScore = strNum
              }
            })
          }
          this.tableDataLoading = false
        }).catch(() => {
          this.tableDataLoading = false
        })
      }
    },
    submitSure() {
      this.submitSureLoading = true
      let tabNum = 0
      this.tableData.forEach(el => {
        tabNum += Number(el.giftWeight)
      })
      if (this.tableData.length > 0) {
        if (tabNum > 100) {
          this.$message({
            type: 'warning',
            message: '权重总和必须为100%',
            duration: 6000,
            showClose: true,
            onClose: function() {
              this.submitSureLoading = false
            }.bind(this)
          })
        } else {
          this.tabDataAll[this.startNum] = this.tableData
          this.tabDataAll[this.startNum].forEach(v => {
            v.evaluationTaskName = this.evaluationTaskName
          })
          submit(this.tabDataAll).then(res => {
            if (res.code === 200) {
              this.submitSureLoading = false
              this.$message.success('提交成功')
              this.$router.push({
                name: 'dataGovernance_qualityEvaluation_thinIndicator'
              })
            } else {
              this.$message({
                type: 'warning',
                message: res.message,
                duration: 6000,
                showClose: true,
                onClose: function() {
                  this.submitSureLoading = false
                }.bind(this)
              })
            }
          })
        }
      } else {
        this.$message({
          type: 'warning',
          message: '暂无数据',
          duration: 6000,
          showClose: true,
          onClose: function() {
            this.submitSureLoading = false
          }.bind(this)
        })
      }
    },
    handleCurrentChange(val) {
      this.tableDataLoading = true
      this.sunSocreNum = ''
      this.endNum = val
      this.startNum = val - 1
      const list = []
      this.tableData.forEach(el => {
        list.push({
          evaluationTaskName: this.evaluationTaskName,
          targetType: el.targetType,
          seconddaryIndicatorPk: el.targetId,
          evaluationDate: this.evaluationDate,
          secondTargetName: el.targetName,
          firstTargetId: el.firstTargetId,
          assignationOrganization: el.assignationOrganization,
          firstTargetName: el.firstTargetName,
          giftWeight: el.giftWeight,
          evaluationResult: el.evaluationResult,
          score: el.score,
          weightAverage: el.weightAverage,
          num: this.oldNum,
          sumScore: el.sumScore
        })
      })
      insertTemp(list).then(res => {
        if (res.code === 200) {
          this.oldNum = JSON.parse(JSON.stringify(val))
          this.initData()
        } else {
          this.tableDataLoading = false
        }
      }).catch(() => {
        this.tableDataLoading = false
      })
    },
    // topFn() {
    //   this.startNum--
    //   this.endNum--
    //   this.initData()
    // },
    // bottomFn() {
    //   this.startNum++
    //   this.endNum++
    //   this.initData()
    // },
    // 定义保存以及下载参数
    getParamter() {
      const arr = [] // 存放勾选数据或所有数据
      let newArr = [] // 记录索引位置
      let returnList = [] // 修改后的数据结构
      var flag = true
      this.tableData.forEach((el, index) => {
        arr.push(el)
      })
      for (var i = 0; i < arr.length; i++) {
        if (arr[i + 1] === undefined) {
          newArr[0] = i
          newArr[1] = i // 记录终止位置
          const oArr = arr.slice(newArr[0], newArr[1] + 1)
          const list = []
          oArr.forEach(el => {
            list.push({
              secondarIndicator: el.targetName,
              targetType: el.targetType,
              weight: el.giftWeight,
              evaluationResult: el.evaluationResult,
              getScore: el.score,
              weightAverage: el.weightAverage
            })
          })
          returnList = returnList.concat(list)
          newArr = [] // 重置缓存
          flag = true
        } else {
          if (arr[i].firstTargetId === arr[i + 1].firstTargetId && flag) {
            newArr[0] = i // 记录起始位置
            flag = false
          } else if (arr[i].firstTargetId !== arr[i + 1].firstTargetId && !flag) {
            if (newArr.length === 0) {
              newArr[0] = i
            }
            newArr[1] = i // 记录终止位置
            const oArr = arr.slice(newArr[0], newArr[1] + 1)
            const list = []
            oArr.forEach(el => {
              list.push({
                secondarIndicator: el.targetName,
                targetType: el.targetType,
                weight: el.giftWeight,
                evaluationResult: el.evaluationResult,
                getScore: el.score,
                weightAverage: el.weightAverage
              })
            })
            returnList = returnList.concat(list)
            newArr = [] // 重置缓存
            flag = true
          } else if (arr[i].firstTargetId !== arr[i + 1].firstTargetId && flag) {
            newArr[0] = i
            newArr[1] = i // 记录终止位置
            const oArr = arr.slice(newArr[0], newArr[1] + 1)
            const list = []
            oArr.forEach(el => {
              list.push({
                secondarIndicator: el.targetName,
                targetType: el.targetType,
                weight: el.giftWeight,
                evaluationResult: el.evaluationResult,
                getScore: el.score,
                weightAverage: el.weightAverage
              })
            })
            returnList = returnList.concat(list)
            newArr = [] // 重置缓存
            flag = true
          }
          if (i === arr.length - 2 && arr[i].firstTargetId === arr[i + 1].firstTargetId && !flag) {
            newArr[1] = i + 1 // 注意是i + 1
            const nArr = arr.slice(newArr[0], newArr[1] + 1)
            const _list = []
            nArr.forEach(el => {
              _list.push({
                secondarIndicator: el.targetName,
                targetType: el.targetType,
                weight: el.giftWeight,
                evaluationResult: el.evaluationResult,
                getScore: el.score,
                weightAverage: el.weightAverage
              })
            })
            returnList = returnList.concat(_list)
            break
          }
        }
      }
      return returnList
    },
    // 下载按钮
    download() {
      // console.log(this.getParamter())
      // this.tableData[0].sumScore
      createExcel(this.tableData[0].assignationOrganization, this.tableData[0].firstTargetName, '324', this.getParamter()).then(res => {
        if (res.code === 200) {
          console.log(res)
        }
      })
    },
    // 智能评价按钮
    intelligentEvaluation(val, index) {
      const map = {
        organizationRicd: val.organizationRicd,
        evaluationTaskId: val.evaluationTaskId,
        evaluationTaskName: this.evaluationTaskName,
        id: index,
        targetType: val.targetType,
        seconddaryIndicatorPk: val.targetId,
        evaluationDate: this.evaluationDate,
        secondTargetName: val.targetName,
        firstTargetId: val.firstTargetId,
        assignationOrganization: val.assignationOrganization,
        firstTargetName: val.firstTargetName,
        giftWeight: val.giftWeight
      }
      evaluation(map).then(res => {
        if (res.code === 200) {
          this.tableData.splice(index, 1, res.data)
          let strNum = 0
          this.tableData.map(v => {
            if (v.weightAverage !== undefined && v.weightAverage !== '') {
              strNum += Number(v.weightAverage)
            }
          })
          this.tableData.map(a => {
            if ((strNum + '').indexOf('.') !== -1) {
              if ((strNum + '').slice((strNum + '').indexOf('.')).length > 4) {
                a.sumScore = strNum.toFixed(3)
              } else {
                a.sumScore = strNum
              }
            } else {
              a.sumScore = strNum
            }
          })
        }
      })
    },
    // 一键智能评价
    intelligentEvaluationAll() {
      this.intelligentEvaluationAllLoading = true
      let tabNum = 0
      this.tableData.forEach(el => {
        tabNum += Number(el.giftWeight)
      })
      if (this.tableData.length > 0) {
        if (tabNum > 100) {
          this.$message({
            type: 'warning',
            message: '权重总和必须为100%',
            duration: 6000,
            showClose: true,
            onClose: function() {
              this.intelligentEvaluationAllLoading = false
            }.bind(this)
          })
        } else {
          const list = []
          this.tableData.forEach(el => {
            if (el.targetType === '定性') {
              list.push({
                organizationRicd: el.organizationRicd,
                evaluationTaskId: el.evaluationTaskId,
                evaluationTaskName: this.evaluationTaskName,
                targetType: el.targetType,
                seconddaryIndicatorPk: el.targetId,
                evaluationDate: this.evaluationDate,
                secondTargetName: el.targetName,
                firstTargetId: el.firstTargetId,
                assignationOrganization: el.assignationOrganization,
                firstTargetName: el.firstTargetName,
                giftWeight: el.giftWeight,
                evaluationResult: el.evaluationResult,
                score: el.score,
                weightAverage: el.weightAverage
              })
            } else {
              list.push({
                organizationRicd: el.organizationRicd,
                evaluationTaskId: el.evaluationTaskId,
                evaluationTaskName: this.evaluationTaskName,
                targetType: el.targetType,
                seconddaryIndicatorPk: el.targetId,
                evaluationDate: this.evaluationDate,
                secondTargetName: el.targetName,
                firstTargetId: el.firstTargetId,
                assignationOrganization: el.assignationOrganization,
                firstTargetName: el.firstTargetName,
                giftWeight: el.giftWeight
              })
            }
          })
          evaluationAll(list).then(res => {
            if (res) {
              this.intelligentEvaluationAllLoading = false
              if (res.code === 200) {
                this.tableData = res.data
                let num = 0
                this.tableData.map(item => {
                  num += Number(item.weightAverage)
                })
                this.tableData.map(item => {
                  if ((num + '').indexOf('.') !== -1) {
                    if ((num + '').slice((num + '').indexOf('.')).length > 4) {
                      item.sumScore = num.toFixed(3)
                    } else {
                      item.sumScore = num
                    }
                  } else {
                    item.sumScore = num
                  }
                })
                // this.tableData.pop()
                // this.tableData.forEach(el => {
                //   el.sumScore = this.sunSocreNum
                // })
              }
            } else {
              this.intelligentEvaluationAllLoading = false
            }
          }).catch(() => {
            this.intelligentEvaluationAllLoading = false
          })
        }
      } else {
        this.$message({
          type: 'warning',
          message: '暂无数据',
          duration: 6000,
          showClose: true,
          onClose: function() {
            this.intelligentEvaluationAllLoading = false
          }.bind(this)
        })
      }
    },
    // 初始化展示数据
    initData() {
      const map = {
        evaluationTaskId: this.$route.query.evaluationTaskId,
        receiveTaskStatus: this.$route.query.receiveTaskStatus,
        evaluationTaskName: this.$route.query.evaluationTaskName,
        startNum: this.startNum,
        endNum: this.endNum
      }
      this.tableDataLoading = true
      trialCalculation(map).then(res => {
        this.tabDataAll = res.data.totalmap
        const arr = []
        arr.push(res.data.onemap.list[res.data.onemap.list.length - 1])
        this.evaluationTaskName = arr[0].evaluationTaskName
        this.evaluationDate = arr[0].evaluationDate
        this.tableData = res.data.onemap.list.splice(0, res.data.onemap.list.length - 1)
        this.total = res.data.onemap.total * 10
        this.spanArr = []
        this.pos = ''
        this.getSpanArr()
        this.tableDataLoading = false
      }).catch(() => {
        this.tableDataLoading = false
      })
    },
    getSpanArr() {
      for (var i = 0; i < this.tableData.length; i++) {
        if (i === 0) {
          this.spanArr.push(1)
          this.pos = 0
        } else {
          // 判断当前元素与上一个元素是否相同
          if (this.tableData[i].firstTargetId === this.tableData[i - 1].firstTargetId) {
            this.spanArr[this.pos] += 1
            this.spanArr.push(0)
          } else {
            this.spanArr.push(1)
            this.pos = i
          }
        }
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2 || columnIndex === 9) {
        const _row = this.spanArr[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    }
  },
  watch: {
    startNum(val) {
      if (val === 0) {
        this.typeTop = true
      } else {
        this.typeTop = false
      }
    }
  }
}
</script>

<style lang="scss">
.thintrial {
  .btnalign {
    text-align: right;
  }
}
</style>
