<template>
  <div class="resultsummary">
    <el-card>
      <div slot="header" class="clearfix">
        <span>{{titleName}}得分汇总表</span>
      </div>
      <el-table :data="tableData" border>
        <el-table-column type="index" label="序号" width="55"></el-table-column>
        <el-table-column v-for="item in listTitle" :key="item.name" :label="item.name" :prop="item.prop" :sortable="item.name === '总分'" show-overflow-tooltip>
          <!-- <template slot-scope="scope">
            {{item}}{{'--'}}
            <el-button type="text" @click="goDetail(scope)">{{scope.row[item['prop']]}}</el-button>
          </template> -->
          <template slot-scope="scope">
            <el-button v-if="item.prop==='organization'" @click="goDetail(scope)" type="text">{{scope.row[item['prop']]}}</el-button>
            <span v-else>
              {{scope.row[item['prop']]}}
            </span>
          </template>
        </el-table-column>
      </el-table>

      <div style="margin-top: 10px;">
        <el-button type="primary" @click="subsectionStandard">自定义分类评级分段评级标准</el-button>
        <router-link :to="{ name: 'dataGovernance_qualityEvaluation_result_ratingForm', query: {evaluationTaskName: titleName}}">
          <el-button type="primary">查看质量评价表</el-button>
          </router-link>
        <el-button type="primary" @click="onLoade">下载</el-button>
        <el-button type="primary" plain @click="returnBtn">返回</el-button>
      </div>
      <!-- 自定义分类评级分段评级标准 -->
      <el-dialog title="配置分类评级标准：" :visible.sync="dialogVisible" width="30%">
        <el-dialog title="分段评分标准：" :visible.sync="innerVisible" append-to-body>
          <el-form :model="innerForm" ref="innerForm">
          <el-table :data="innerForm.innerData" style="width: 100%;">
            <el-table-column v-for="(item, index) in newListTitle" :key="index" :prop="item.prop" :label="item.name" :show-overflow-tooltip="item.prop === '评分项目' || item.prop === '总分值' ? true : false">
              <template slot-scope="scope">
                <el-row v-if="item.prop === '评分项目' || item.prop === '总分值'">
                  <!-- <el-col :span="24"></el-col> -->
                  {{obtainObj(scope.row, item.prop)}}
                </el-row>
                <el-row v-else>
                  <el-col :span="11">
                    <!-- {{`innerForm.${scope.$index}[${item.prop}].minScore`}} -->
                    <!-- <el-form-item :rules="[{required: true, message: '请输入', trigger: 'blur'}]"> -->
                    <el-input v-model="obtainObj(scope.row, item.prop).minScore" maxlength="3"></el-input>
                    <!-- </el-form-item> -->
                  </el-col>
                  <el-col :span="2">
                    --
                  </el-col>
                  <el-col :span="11">
                    <el-form-item :rules="[{required: true, message: '请输入', trigger: 'blur'}]">
                      <el-input v-model="obtainObj(scope.row, item.prop).maxScore" maxlength="3"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
            <!-- <el-table-column label="操作" fixed="right">
              <template slot-scope="scope">
                <el-button type="text" @click="deleRow( scope, innerForm.innerData)" v-if="scope.$index !== 0 && scope.$index !== 1">删除</el-button>
              </template>
            </el-table-column> -->
          </el-table>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="innerVisible = false">返回</el-button>
            <!-- <router-link :to="{ name: 'dataGovernance_qualityEvaluation_result_ratingForm'}"> -->
              <el-button type="primary" @click="generate" :loading="generateLoading">生成</el-button>
              <!-- </router-link> -->
          </span>
        </el-dialog>
        <div>
          <el-form :model="configForm" ref="configForm">
            <el-table :data="configForm.configData">
              <el-table-column type="index" label="序号"></el-table-column>
              <el-table-column prop="name" label="分类评级标准字段">
                <template slot-scope="scope">
                  <span v-if="scope.$index === 0 || scope.$index === 1">{{scope.row.name}}</span>
                  <el-form-item v-else :prop="`configData.${scope.$index}.name`" :rules="[{required: true, message: '请输入分类评级标准字段', trigger: 'blur'}, {validator: characterSpaceChecking, trigger: 'blur'}]">
                    <el-input v-model="scope.row.name" maxlength="10"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="text" v-if="scope.$index !== 0 && scope.$index !== 1" @click="deleRow(scope, configForm.configData)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
          <el-button type="primary" icon="el-icon-plus" :loading="handleAddLoading" @click="handleAdd">添加</el-button>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">返回</el-button>
          <el-button type="primary" @click="dialogSure" :loading="dialogSureLoading">确定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { viewSummary, customRating, checkScoringStandardCount, scoringStandard, sectionalGradingSave, checkSectionalGrading } from '@/api/sys-monitoringAnalysis/evaluate/queryEvaluationResult.js'
export default {
  data() {
    return {
      dialogSureLoading: false,
      generateLoading: false,
      handleAddLoading: false,
      configForm: {
        configData: []
      },
      innerForm: {
        innerData: []
      },
      newListTitle: [],
      titleName: '',
      dialogVisible: false,
      innerVisible: false,
      tableData: [],
      listTitle: [],
      chinaNull: /[\u4e00-\u9fa5]/, // 校验中文
      specialEnglish: /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im, // 校验英文特殊符号
      sprcialChina: /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im, // 校验中文特殊符号
      englishNull: /[abcdefghijklmnopqrstuvwxyz]/im, // 校验英文
      numberNull: /[1234567890]/im, // 校验数字
      blankSpace: /[ ]/im // 校验空格
    }
  },
  mounted() {
    this.initData()
  },
  destroyed() {
    if (this.$route.name !== 'dataGovernance_qualityEvaluation_result') {
      if (sessionStorage.getItem('returnMemoryJyl')) {
        sessionStorage.removeItem('returnMemoryJyl')
      }
    }
  },
  methods: {
    goDetail(scope) {
      this.$router.push({
        name: 'dataGovernance_qualityEvaluation_result_detail',
        query: {
          organization: scope.row.organization,
          titleName: this.titleName
        }
      })
    },
    returnBtn() {
      if (sessionStorage.getItem('returnMemoryJyl')) {
        const obj = JSON.parse(sessionStorage.getItem('returnMemoryJyl'))
        obj.returnBtn = 'Y'
        sessionStorage.setItem('returnMemoryJyl', JSON.stringify(obj))
      }
      this.$router.go(-1)
    },
    // 校验空格特殊字符
    characterSpaceChecking(rule, value, callback) {
      if (this.blankSpace.test(value)) {
        callback(new Error('禁止输入空格'))
      } else if (this.specialEnglish.test(value) || this.sprcialChina.test(value)) {
        callback(new Error('禁止输入特殊字符'))
      } else {
        callback()
      }
    },
    obtainObj(a, b) {
      return a[b]
    },
    generate() {
      this.innerForm.innerData.forEach((el, index) => {
        this.innerForm.innerData[index].evaluationTaskName = this.titleName
      })
      checkSectionalGrading(this.innerForm.innerData).then(response => {
        if (response.code === 200) {
          sectionalGradingSave(this.innerForm.innerData).then(res => {
            if (res.code === 200) {
              this.innerVisible = false
              this.dialogVisible = false
              this.$router.push({
                name: 'dataGovernance_qualityEvaluation_result_ratingForm',
                query: {
                  evaluationTaskName: this.titleName
                }
              })
            }
          })
        } else {
          this.generateLoading = true
          this.$message({
            type: 'warning',
            message: response.message,
            duration: 6000,
            showClose: true,
            onClose: function() {
              this.generateLoading = false
            }.bind(this)
          })
        }
      })
    },
    dialogSure() {
      this.$refs.configForm.validate((valid) => {
        if (valid) {
          const map = {
            evaluationTaskName: this.titleName,
            list: this.configForm.configData
          }
          checkScoringStandardCount(map).then(response => {
            if (response.code === 200) {
              scoringStandard(map).then(res => {
                if (res.code === 200) {
                  this.innerForm.innerData = res.data.listData
                  this.newListTitle = res.data.listTitle
                  this.innerVisible = true
                }
              })
            } else {
              this.dialogSureLoading = true
              this.$message({
                type: 'warning',
                message: response.message,
                duration: 6000,
                showClose: true,
                onClose: function() {
                  this.dialogSureLoading = false
                }.bind(this)
              })
            }
          })
        } else {
          return false
        }
      })
    },
    subsectionStandard() {
      customRating({ evaluationTaskName: this.titleName }).then(res => {
        if (res.code === 200) {
          this.configForm.configData = res.data.list
          this.dialogVisible = true
        }
      })
    },
    onLoade() {
      location.href = 'monitor/viewEvaluation/downSummary/' + this.titleName
    },
    initData() {
      viewSummary(this.$route.query.name).then(res => {
        if (res.code === 200) {
          this.listTitle = res.data.listTitle
          this.tableData = res.data.data
          this.titleName = res.data.name
        }
      })
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0 && rowIndex <= 3) {
          console.log('111')
          return {
            rowspan: 2,
            colspan: 1
          }
        } else if (rowIndex % 1 === 0 && rowIndex > 3 && rowIndex <= 6) {
          console.log('222')
          return {
            rowspan: 3,
            colspan: 1
          }
        } else {
          console.log('333')
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    handleAdd() {
      if (this.configForm.configData.length > 49) {
        this.handleAddLoading = true
        this.$message({
          type: 'warning',
          message: '最多可添加50条分类评级标准',
          duration: 6000,
          showClose: true,
          onClose: function() {
            this.handleAddLoading = false
          }.bind(this)
        })
      } else {
        this.configForm.configData.push({ name: '' })
      }
    },
    deleRow(scope, data) {
      const index = scope.$index
      this.$confirm('确定要删除分类评级标准吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          data.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss">
.resultsummary {
  .btnalign {
    text-align: right;
  }
}
</style>
