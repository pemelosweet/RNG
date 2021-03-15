<template>
  <div class="thindetail">
    <el-card>
      <div slot="header">
        <span>任务详情</span>
          <el-button type="text" style="float:right;" @click="returnBtn">返回</el-button>
      </div>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-row v-if="myReturnReason">
          <el-col :span="12">
            <el-form-item label="评价任务名称：">
              <span>{{myEvaluationTaskName}}</span>
            </el-form-item>
            
          </el-col>
          <el-col :span="12">
            <el-form-item label="评价时间：">
              <span>{{myEvaluationDate}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="退回原因：">
              <span>{{myReturnReason}}</span>
            </el-form-item>
          </el-col>
      </el-row>
      
      <el-row v-else>
          <el-col :span="12">
            <el-form-item label="评价任务名称：">
              <span>{{myEvaluationTaskName}}</span>
            </el-form-item>
            <!-- <el-form-item label="评价任务名称：" prop="name" :rules="[{required: true, message: '急急急', trigger: 'blur'}]">
              <el-input v-model="form.name"></el-input>
            </el-form-item> -->
          </el-col>
          <el-col :span="12">
            <el-form-item label="评价时间：">
              <span>{{myEvaluationDate}}</span>
            </el-form-item>
          </el-col>
      </el-row>
      </el-form>
      <div style="margin-top: 10px;">
        <span>评价指标列表：</span>
      </div>
      <el-table :data="tableData">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-table :data="scope.row.secondarIndicators">
              <el-table-column type="index" label="指标级别" width="100" show-overflow-tooltip></el-table-column>
              <el-table-column prop="targetType" label="指标类型" show-overflow-tooltip></el-table-column>
              <el-table-column prop="targetName" label="指标名称" show-overflow-tooltip></el-table-column>
              <el-table-column prop="giftWeight" label="权重" show-overflow-tooltip></el-table-column>
              <el-table-column prop="grading" label="得分" show-overflow-tooltip></el-table-column>
              <!-- <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="text" @click="refinementDel(scope.row.secondaryIndicatorId)">删除</el-button>
                </template>
              </el-table-column> -->
            </el-table>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="firstTargetName" label="一级指标名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="weight" label="权重（占整个评价体系）" show-overflow-tooltip></el-table-column>
        <el-table-column prop="evaluationRange" label="指定评价机构" show-overflow-tooltip></el-table-column>
        <el-table-column prop="levelDown" label="可向下细化层级" show-overflow-tooltip></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.firstRefineStatus === '0'">待细化</span>
            <span v-if="scope.row.firstRefineStatus === '1'">已完成</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="refinementIndexFn(scope.row.firstTargetName, scope.row.targetId,scope.row.firstRefineStatus)" v-if="scope.row.firstRefineStatus === '0'">细化指标</el-button>
            <el-button type="text" @click="refinementIndexFn(scope.row.firstTargetName, scope.row.targetId,scope.row.firstRefineStatus)" v-if="scope.row.firstRefineStatus === '1'">修改指标</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background :current-page="pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="myTotal" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
      <!-- <div>
        <el-button type="primary" @click=" dialogVisible = true">细化指标</el-button>
        <el-button type="primary">完成</el-button>
      </div> -->

      <el-dialog :title="'一级指标：' + titleName" :visible.sync="dialogVisible" width="80%">
        <!-- inner内嵌设置得分弹框 -->
        <el-dialog width="60%" title="评价标准" :visible.sync="innerVisible" append-to-body @close="innerCancel">
          <el-form :model="innerNewForm" ref="innerNewForm">
          <el-table :data="innerNewForm.innerData" v-if="typeTarget === '定量(占比类)'">
            <el-table-column type="index" label="序号" width="150"></el-table-column>
            <el-table-column label="指标结果">
              <template slot-scope="scope">
                <el-row>
                  <el-col :span="12">
                    <el-form-item :prop="`innerData.${scope.$index}.startNum`" :rules="[{required: true, message: '请输入', trigger: 'blur'}, {validator: validateNumber, trigger: 'blur'}]">
                      <el-input style="width: 70%;" v-model="scope.row.startNum" maxlength="3"></el-input>% ~ 
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :prop="`innerData.${scope.$index}.endNum`" :rules="[{required: true, message: '请输入', trigger: 'blur'}, {validator: validateNumber, trigger: 'blur'}]">
                      <el-input style="width: 70%;" v-model="scope.row.endNum" maxlength="3"></el-input>%
                    </el-form-item>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column prop="score" label="得分">
              <template slot-scope="scope">
                <el-form-item :prop="`innerData.${scope.$index}.score`" :rules="[{required: true, message: '请输入', trigger: 'blur'}, {validator: validateNumber, trigger: 'blur'}]">
                  <el-input v-model="scope.row.score" maxlength="3"></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button type="text" @click="innerDeleRow( scope, innerNewForm.innerData )">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-table :data="innerNewForm.innerData" v-if="typeTarget === '定量(绝对值类)'">
            <el-table-column type="index" label="序号" width="150"></el-table-column>
            <el-table-column label="指标结果">
              <template slot-scope="scope">
                <el-row>
                  <el-col :span="12">
                    <el-form-item :prop="`innerData.${scope.$index}.startNum`" :rules="[{required: true, message: '请输入', trigger: 'blur'}, {validator: validateNumbers, trigger: 'blur'}]">
                      <el-input style="width: 70%;" v-model="scope.row.startNum" maxlength="5"></el-input> ~
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :prop="`innerData.${scope.$index}.endNum`" :rules="[{required: true, message: '请输入', trigger: 'blur'}, {validator: validateNumbers, trigger: 'blur'}]">
                      <el-input style="width: 70%;" v-model="scope.row.endNum" maxlength="5"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column prop="score" label="得分">
              <template slot-scope="scope">
                <el-form-item :prop="`innerData.${scope.$index}.score`" :rules="[{required: true, message: '请输入', trigger: 'blur'}, {validator: validateNumber, trigger: 'blur'}]">
                  <el-input v-model="scope.row.score" maxlength="3"></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button type="text" @click="innerDeleRow( scope, innerNewForm.innerData )">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-table :data="innerNewForm.innerData" v-if="typeTarget === '定量(布尔类)'">
            <el-table-column type="index" label="序号" width="150"></el-table-column>
            <el-table-column label="指标结果">
              <template slot-scope="scope">
                <el-form-item :prop="`innerData.${scope.$index}.startNum`" :rules="[{required: true, message: '请选择', trigger: 'change'}]">
                  <el-select v-model="scope.row.startNum">
                    <el-option label="Y" value="Y"></el-option>
                    <el-option label="N" value="N"></el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="score" label="得分">
              <template slot-scope="scope">
                <el-form-item :prop="`innerData.${scope.$index}.score`" :rules="[{required: true, message: '请输入', trigger: 'blur'}, {validator: validateNumber, trigger: 'blur'}]">
                  <el-input v-model="scope.row.score" maxlength="3"></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button type="text" @click="innerDeleRow( scope, innerNewForm.innerData )">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-table :data="innerNewForm.innerData" v-if="typeTarget === '定性'">
            <el-table-column type="index" label="序号" width="150"></el-table-column>
            <el-table-column label="指标结果">
              <template slot-scope="scope">
                <el-row>
                  <el-col :span="24">
                    <el-form-item :prop="`innerData.${scope.$index}.score`" :rules="[{required: true, message: '请输入', trigger: 'blur'}, {validator: characterSpaceChecking, trigger: 'blur'}]">
                      <el-input style="width: 100%;" v-model="scope.row.score" maxlength="50" placeholder="请输入，最多输入50位"></el-input>
                    </el-form-item>
                  </el-col>
                  <!-- <el-col :span="12">
                    <el-form-item :prop="`innerData.${scope.$index}.endNum`" :rules="[{required: true, message: '请输入', trigger: 'blur'}, {validator: validateNumber, trigger: 'blur'}]">
                      <el-input style="width: 70%;" v-model="scope.row.endNum" maxlength="3"></el-input>
                    </el-form-item>
                  </el-col> -->
                </el-row>
              </template>
            </el-table-column>
            <el-table-column prop="startNum" label="得分">
              <template slot-scope="scope">
                <el-form-item :prop="`innerData.${scope.$index}.startNum`" :rules="[{required: true, message: '请输入', trigger: 'blur'}, {validator: validateNumber, trigger: 'blur'}]">
                  <el-input v-model="scope.row.startNum" maxlength="3" placeholder="请输入"></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button type="text" @click="innerDeleRow( scope, innerNewForm.innerData )">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          </el-form>
          <el-button type="text" icon="el-icon-plus" :loading="handleAddIndLoading" @click="handleAddInd">添加</el-button>
          <span slot="footer" class="dialog-footer">
            <el-button @click="innerVisible = false">取消</el-button>
            <el-button type="primary" :loading="innerSureLoading" @click="innerSure">保存</el-button>
          </span>
        </el-dialog>
        <!-- outer弹框内容 -->
        <div>
          <el-form :model="diaForm" ref="diaForm">
          <div class="dialogtitle">设定二级指标：</div>
          <!-- {{this.recordTargetType[this.indexNum]}}<br/>
          {{this.diaForm.dialogTabledata[this.indexNum].targetType}} -->
          <el-table :data="diaForm.dialogTabledata">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="targetType" label="指标类型">
              <template slot-scope="scope">
                <el-form-item :prop="'dialogTabledata.' + scope.$index + '.targetType'" :rules="[{ required: true, message: '请选择指标类型', trigger: 'change' }]">
                  <el-select v-model="scope.row.targetType" clearable style="width:100% !important;" @change="clearOther(scope.row)">
                    <el-option v-for="item in indexTypeData" :label="item.label" :value="item.value" :key="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="targetName" label="指标名称 ">
              <template slot-scope="scope">
                <el-form-item v-if="scope.row.targetType === '定性'" :prop="'dialogTabledata.' + scope.$index + '.targetName'" :rules="[{ required: true, message: '请输入指标名称', trigger: 'blur' }, {validator: characterSpaceChecking, trigger: 'blur'}]">
                  <el-input v-model="scope.row.targetName" placeholder="请输入，最多输入50位" maxlength="50"></el-input>
                </el-form-item>
                <el-form-item v-else :prop="'dialogTabledata.' + scope.$index + '.targetName'" :rules="[{ required: true, message: '请选择指标名称', trigger: 'change' }]">
                  <el-select v-model="scope.row.targetName" clearable style="width:100% !important;">
                    <el-option label="大额交易报告及时率" value="0"></el-option>
                    <el-option label="人工补正及时率" value="1"></el-option>
                    <el-option label="可疑交易报告补正及时率" value="2"></el-option>
                    <el-option label="大额交易报告一次性通过率" value="3"></el-option>
                    <el-option label="大额交易报告补正完成率" value="4"></el-option>
                    <el-option label="可疑交易报告一次性通过率" value="5"></el-option>
                    <el-option label="可疑交易报告补正完成率" value="6"></el-option>
                    <el-option label="大额交易报告数据包错误率" value="7"></el-option>
                    <el-option label="大额交易报告格式错误率" value="8"></el-option>
                    <el-option label="大额交易报告交易信息错误率" value="9"></el-option>
                    <el-option label="可疑交易报告数据包错误率" value="10"></el-option>
                    <el-option label="可疑交易报告格式错误率" value="11"></el-option>
                    <el-option label="可疑交易报告交易信息错误率" value="12"></el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="giftWeight" label="赋予权重（占一级指标）">
              <template slot-scope="scope">
                <el-form-item :prop="'dialogTabledata.' + scope.$index + '.giftWeight'" :rules="[{ required: true, message: '请输入权重', trigger: 'blur' }, {validator: validateNumber, trigger: 'blur'}]">
                  <el-input style="float: left; width: 90%" v-model="scope.row.giftWeight" maxlength="3"></el-input>%
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="grading" label="评价标准">
              <template slot-scope="scope">
                <el-input type="textarea" disabled v-model="scope.row.grading"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200">
              <template slot-scope="scope">
                <el-button type="text" :loading="evaluatingIndicatorLoading" @click="evaluatingIndicator(scope.$index, scope.row.scoreNormals)">评价标准</el-button>
                <el-button :disabled="diaForm.dialogTabledata.length===1 && firstRefineStatus === '1'" type="text" @click="deleRow( scope, diaForm.dialogTabledata )">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- <div class="divider divider-dashed"></div> -->
          <el-button type="primary" icon="el-icon-plus" :loading="handleAddDiaLoading" @click="handleAddDia">添加</el-button>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="diaSuce" :loading="diaSuceLoading">保存</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { taskDetail, deleteRefinementIndicator, indicatorReturn, saveRefinementIndicator, checkAbsolute } from '@/api/sys-monitoringAnalysis/evaluate/receiveTaskController.js'
export default {
  data() {
    return {
      firstRefineStatus: '',
      diaSuceLoading: false,
      handleAddDiaLoading: false,
      evaluatingIndicatorLoading: false,
      handleAddIndLoading: false,
      innerSureLoading: false,
      diaForm: {
        name: '',
        dialogTabledata: []
      },
      rules: {},
      typeTarget: '',
      indexNum: '',
      titleName: '',
      totleId: '',
      myReturnReason: '',
      myEvaluationTaskName: '',
      myEvaluationDate: '',
      myEvaluationTaskId: '',
      pageNum: 1,
      pageSize: 10,
      myTotal: 0,
      dialogVisible: false,
      innerVisible: false,
      currentPage: 1,
      first: [],
      form: {
        name: '',
        dateValue: '',
        state: 'all'
      },
      recordTargetType: [],
      deleteSecondId: [],
      deleteScoreNormal: [],
      delInnerArr: [],
      closeType: false,
      innerCancelDelData: [],
      tableData: [],
      newInnerData: [],
      innerNewForm: {
        innerData: []
      },
      expandData: [
        {
          type: '定量',
          name: '大额一次性通过率',
          weight: '5%',
          grade: '0~30%得30分，30%~60%得50分，60%~90%得80分，90%~100%得100分',
          fullmarks: '25'
        }
      ],
      indexTypeData: [
        { label: '定量(占比类)', value: '定量(占比类)' },
        // { label: '定量(绝对值类)', value: '定量(绝对值类)' },
        // { label: '定量(布尔类)', value: '定量(布尔类)' },
        { label: '定性', value: '定性' }
      ],
      chinaNull: /[\u4e00-\u9fa5]/, // 校验中文
      specialEnglish: /[`~!@#$%^&*()_+=<>?:"{},.\/;'[\]]/im, // 校验英文特殊符号
      sprcialChina: /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im, // 校验中文特殊符号
      englishNull: /[abcdefghijklmnopqrstuvwxyz]/im, // 校验英文
      numberNull: /[1234567890]/im, // 校验数字
      blankSpace: /[ ]/im // 校验空格
    }
  },
  mounted() {
    this.myEvaluationTaskId = this.$route.query.id
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
    clearOther(row) {
      row.targetName = ''
      row.giftWeight = ''
      row.grading = ''
      row.isClear = '0'
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
    // 校验只能输入数字 （绝对值）
    validateNumbers(rule, value, callback) {
      if (this.specialEnglish.test(value) || this.sprcialChina.test(value)) {
        callback(new Error('禁止输入特殊字符'))
      } else if (this.blankSpace.test(value)) {
        callback(new Error('禁止输入空格'))
      } else if (this.chinaNull.test(value)) {
        callback(new Error('禁止输入中文'))
      } else if (this.englishNull.test(value)) {
        callback(new Error('禁止输入英文'))
      } else if (Number(value) < 0 || value.length > 1 && value[0] === '0') {
        callback(new Error('请输入 >= 0的数字'))
      } else {
        callback()
      }
    },
    // 校验只能输入数字
    validateNumber(rule, value, callback) {
      if (this.specialEnglish.test(value) || this.sprcialChina.test(value)) {
        callback(new Error('禁止输入特殊字符'))
      } else if (this.blankSpace.test(value)) {
        callback(new Error('禁止输入空格'))
      } else if (this.chinaNull.test(value)) {
        callback(new Error('禁止输入中文'))
      } else if (this.englishNull.test(value)) {
        callback(new Error('禁止输入英文'))
      } else if (Number(value) > 100 || Number(value) < 0 || value.length > 1 && value[0] === '0') {
        callback(new Error('请输入0~100之间的数字'))
      } else {
        callback()
      }
    },
    // 保存细化指标
    diaSuce() {
      if (this.diaForm.dialogTabledata.length > 0) {
        this.$refs.diaForm.validate((valid) => {
          if (valid) {
            this.diaSuceLoading = true
            const obj = JSON.parse(JSON.stringify(this.diaForm.dialogTabledata))
            obj.forEach(el => {
              if (el.targetType === '定量(占比类)') {
                if (el.giftWeight.indexOf('%') === -1) {
                  el.giftWeight = el.giftWeight + '%'
                }
              }
            })
            saveRefinementIndicator(obj, this.deleteSecondId.join()).then(res => {
              if (res.code === 200) {
                this.$message({
                  message: '保存成功',
                  type: 'success'
                })
                this.dialogVisible = false
                this.diaSuceLoading = false
                this.initData()
              } else {
                this.$message({
                  type: 'warning',
                  message: res.message,
                  duration: 6000,
                  showClose: true,
                  onClose: function() {
                    this.diaSuceLoading = false
                  }.bind(this)
                })
              }
            })
          } else {
            return false
          }
        })
      } else {
        this.$message({
          type: 'warning',
          message: '请至少添加一项细化指标',
          duration: 6000,
          showClose: true
        })
      }
    },
    // 关闭评价标准弹框
    innerCancel() {
      if (this.closeType) {
        this.closeType = false
        this.delInnerArr = []
        this.innerVisible = false
        console.log(this.newInnerData[this.indexNum].children, 1)
      } else {
        this.delInnerArr = []
        if (this.innerCancelDelData.length > 0) {
          this.newInnerData[this.indexNum].children = this.innerCancelDelData
        }
        this.innerVisible = false
        console.log(this.newInnerData[this.indexNum].children, 2)
      }
      this.$refs.innerNewForm.clearValidate()
    },
    // 评价标准弹框确定
    innerSure() {
      this.$refs.innerNewForm.validate((valid) => {
        if (valid) {
          let type = false
          // const numType = false
          const arrData = []
          // const arrNum = []
          // for (var i = 0; i <= 100; i++) {
          //   arrNum.push('0')
          // }
          this.innerNewForm.innerData.map((item, index) => {
            if (Number(item.startNum) > Number(item.endNum)) {
              type = true
            }
            arrData.push({
              minScore: item.startNum,
              maxScore: item.endNum
            })
            // if (arrNum[Number(item.startNum)] === '0' && arrNum[Number(item.endNum)] === '0') {
            //   for (var a = Number(item.startNum); a <= item.endNum; a++) {
            //     arrNum[a] = '1'
            //   }
            // } else {
            //   numType = true
            // }
          })
          if (type && this.diaForm.dialogTabledata[this.indexNum].targetType !== '定量(布尔类)' && this.diaForm.dialogTabledata[this.indexNum].targetType !== '定性') {
            this.innerSureLoading = true
            this.$message({
              type: 'warning',
              message: '指标结果开始范围必须小于结束范围',
              duration: 6000,
              showClose: true,
              onClose: function() {
                this.innerSureLoading = false
              }.bind(this)
            })
          } else {
            this.innerSureLoading = true
            checkAbsolute(arrData).then(res => {
              if (res.code === 200) {
                this.innerSureLoading = false
                this.closeType = true
                this.recordTargetType[this.indexNum] = this.diaForm.dialogTabledata[this.indexNum].targetType
                this.newInnerData[this.indexNum].children = JSON.parse(JSON.stringify(this.innerNewForm.innerData))
                if (this.delInnerArr.length > 0) {
                  this.delInnerArr.forEach(el => {
                    this.deleteScoreNormal.push(el)
                  })
                  this.delInnerArr = []
                  this.diaForm.dialogTabledata[this.indexNum].deleteScoreNormal = this.deleteScoreNormal
                  this.diaForm.dialogTabledata[this.indexNum].deleteScoreNormal
                }
                this.diaForm.dialogTabledata[this.indexNum].grading = ''
                this.newInnerData[this.indexNum].children.forEach(ele => {
                  if (this.diaForm.dialogTabledata[this.indexNum].targetType !== '') {
                    if (this.diaForm.dialogTabledata[this.indexNum].targetType === '定量(占比类)') {
                      this.diaForm.dialogTabledata[this.indexNum].grading += ele.startNum + '%' + '-' + ele.endNum + '%' + ' 得' + ele.score + '分' + '\n'
                    } else if (this.diaForm.dialogTabledata[this.indexNum].targetType === '定量(绝对值类)') {
                      this.diaForm.dialogTabledata[this.indexNum].grading += ele.startNum + '-' + ele.endNum + ' 得' + ele.score + '分' + '\n'
                    } else if (this.diaForm.dialogTabledata[this.indexNum].targetType === '定量(布尔类)') {
                      this.diaForm.dialogTabledata[this.indexNum].grading += ele.startNum + ' 得' + ele.score + '分' + '\n'
                    } else if (this.diaForm.dialogTabledata[this.indexNum].targetType === '定性') {
                      this.diaForm.dialogTabledata[this.indexNum].grading += ele.score + ' 得' + ele.startNum + '分' + '\n'
                    }
                  }
                })
                this.diaForm.dialogTabledata[this.indexNum].scoreNormals = JSON.parse(JSON.stringify(this.newInnerData[this.indexNum].children))
                this.innerVisible = false
              } else {
                this.$message({
                  type: 'warning',
                  message: '指标结果范围不能重复',
                  duration: 6000,
                  showClose: true,
                  onClose: function() {
                    this.innerSureLoading = false
                  }.bind(this)
                })
              }
            }).catch(() => {
              this.innerSureLoading = false
            })
          }
        } else {
          return false
        }
      })
    },
    // 添加评价标准
    handleAddInd() {
      if (this.innerNewForm.innerData.length > 49) {
        this.handleAddIndLoading = true
        this.$message({
          type: 'warning',
          message: '最多可添加50条评价标准',
          duration: 6000,
          showClose: true,
          onClose: function() {
            this.handleAddIndLoading = false
          }.bind(this)
        })
      } else {
        this.innerNewForm.innerData.push({
          startNum: '',
          endNum: '',
          score: '',
          scoreNormalId: ''
        })
      }
    },
    // 打开评价标准 反显数据
    evaluatingIndicator(index, val) {
      this.indexNum = index
      this.typeTarget = this.diaForm.dialogTabledata[this.indexNum].targetType
      if (this.diaForm.dialogTabledata[this.indexNum].targetType !== '') {
        if (this.recordTargetType[this.indexNum] !== this.diaForm.dialogTabledata[this.indexNum].targetType) {
          this.diaForm.dialogTabledata[this.indexNum].grading = ''
          this.innerNewForm.innerData.forEach(el => {
            if (el.scoreNormalId !== '') {
              this.diaForm.dialogTabledata[this.indexNum].deleteScoreNormal.push(el.scoreNormalId)
            }
          })
          this.newInnerData[index].children = [
            {
              startNum: '',
              endNum: '',
              score: '',
              scoreNormalId: ''
            }
          ]
          this.innerCancelDelData = JSON.parse(JSON.stringify(this.newInnerData[index].children))
          this.innerNewForm.innerData = JSON.parse(JSON.stringify(this.newInnerData[index].children))
          this.innerVisible = true
        } else {
          this.innerCancelDelData = JSON.parse(JSON.stringify(this.newInnerData[index].children))
          this.innerNewForm.innerData = JSON.parse(JSON.stringify(this.newInnerData[index].children))
          this.innerVisible = true
        }
        setTimeout(() => {
          this.$refs.innerNewForm.clearValidate()
        }, 0)
      } else {
        this.evaluatingIndicatorLoading = true
        this.$message({
          type: 'warning',
          message: '请选择指标类型',
          duration: 6000,
          showClose: true,
          onClose: function() {
            this.evaluatingIndicatorLoading = false
          }.bind(this)
        })
      }
    },
    // 添加一行细化指标
    handleAddDia() {
      if (this.diaForm.dialogTabledata.length > 49) {
        this.handleAddDiaLoading = true
        this.$message({
          type: 'warning',
          message: '最多可添加50条二级指标',
          duration: 6000,
          showClose: true,
          onClose: function() {
            this.handleAddDiaLoading = false
          }.bind(this)
        })
      } else {
        this.diaForm.dialogTabledata.push({
          targetType: '',
          targetName: '',
          giftWeight: '',
          grading: '',
          isClear: '',
          scoreNormals: [], // { endNum: '', score: '', scoreNormalId: '', startNum: '' }
          secondaryIndicatorId: '',
          deleteScoreNormal: [],
          targetIdPk: this.titleId,
          firstTargetName: this.titleName
        })
        this.newInnerData.push({
          children: [{ endNum: '', score: '', scoreNormalId: '', startNum: '' }]
        })
      }
    },
    // 打开细化指标弹框 反显细化指标
    refinementIndexFn(title, id, firstRefineStatus) {
      this.firstRefineStatus = firstRefineStatus
      this.titleId = id
      this.titleName = title
      this.deleteScoreNormal = []
      this.deleteSecondId = []
      this.recordTargetType = []
      this.diaForm.dialogTabledata = []
      this.newInnerData = []
      indicatorReturn(id).then(res => {
        if (res.code === 200) {
          res.data.forEach(el => {
            var flag = false
            el.scoreNormals.forEach(res => {
              if (res.endNum) {
                flag = true
              }
              if (!flag) {
                res.endNum = ''
              }
            })
            this.recordTargetType.push(el.targetType)
            this.diaForm.dialogTabledata.push({
              targetType: el.targetType,
              targetName: el.targetName,
              giftWeight: el.giftWeight,
              isClear: el.isClear,
              grading: el.grading,
              scoreNormals: el.scoreNormals,
              secondaryIndicatorId: el.secondaryIndicatorId,
              deleteScoreNormal: [],
              targetIdPk: this.titleId,
              firstTargetName: this.titleName
            })
            this.newInnerData.push({
              children: el.scoreNormals
            })
          })
        }
      })
      this.dialogVisible = true
    },
    // 删除细化指标
    refinementDel(valId) {
      this.$confirm('确定要删除该评价任务吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteRefinementIndicator(valId).then(res => {
            if (res.code === 200) {
              this.initData()
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            }
          })
        })
        .catch(() => {})
    },
    // modificationIndex() {
    //   saveRefinementIndicator().then(res => {
    //     if (res.code === 200) {
    //       this.innerData = res.data
    //       this.dialogVisible = true
    //     }
    //   })
    // },
    getParamter() {
      const map = {
        evaluationTaskId: this.myEvaluationTaskId,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      return map
    },
    initData() {
      taskDetail(this.getParamter()).then(res => {
        if (res.code === 200) {
          console.log(res)
          this.myTotal = res.data.lists.total
          this.myEvaluationTaskName = res.data.evaluationTaskName
          this.myEvaluationDate = res.data.evaluationDate
          this.myReturnReason = res.data.returnReason
          this.tableData = res.data.lists.list
        }
      })
    },
    // 删除评价标准
    innerDeleRow(scope, data) {
      const index = scope.$index
      this.$confirm('确定要删除该评价标准吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          if (data[index].scoreNormalId) {
            this.delInnerArr.push(data[index].scoreNormalId)
          }
          data.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {})
    },
    deleRow(scope, data) {
      const index = scope.$index
      this.$confirm('确定要删除该指标吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          if (data[index].secondaryIndicatorId) {
            this.deleteSecondId.push(data[index].secondaryIndicatorId)
          }
          data.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {})
    },
    handleAdd(data) {
      data.push({ 操作: '' })
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val
      this.initData()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.initData()
    }
  }
}
</script>

<style lang="scss">
.thindetail {
  .btnalign {
    text-align: right;
  }
}
</style>
