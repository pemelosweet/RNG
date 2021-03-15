<template>
  <div class="createadd" ref="evaluationorgan">
    <el-card>
      <div slot="header">
        <span>新建评价任务</span>
      </div>
      <el-form :model="form" ref="form" :rules="rules" label-width="120px">
        <el-row>
          <el-form-item label="评价任务名称：" prop="name">
            <el-input style="width: 100%;" v-model="form.name" maxlength="50" placeholder="最多可输入50位"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="指标体系：" prop="indicator">
              <el-select v-model="form.indicator" style="width:100% !important;" placeholder="请选择评价指标模板 " @change="systemChange" clearable>
                <el-option
                  v-for="(item, index) in systemOption"
                  :key="index"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="评价范围：" prop="fileds">
              <el-select v-model="form.fileds" style="width:100% !important;" placeholder="请选择评价范围 " @change="rangesChange" clearable>
                <el-option
                  v-for="(item, index) in rangesOption"
                  :key="index"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="评价时间：" prop="dateValue">
              <el-date-picker
                v-model="form.dateValue"
                type="daterange"
                style="width:100% !important;"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      
      <el-table :data="form.tableData">
        <!-- <el-table-column type="selection"></el-table-column> -->
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="name" label="一级指标名称">
          <template slot-scope="scope">
            <el-form-item label-width="0" :prop="'tableData.' + scope.$index + '.name'" :rules="[{ required: false, validator: characterSpaceChecking, tigger: 'blur'}]">
              <el-input v-model="scope.row.name" maxlength="50" placeholder="最多可输入50位"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="weight" label="权重">
          <template slot-scope="scope">
            <el-form-item label-width="0" :prop="'tableData.' + scope.$index + '.weight'" :rules="[{ required: false, validator: validateNumber, tigger: 'blur'}]">
              <el-input v-model="scope.row.weight" style="width: 80% !important;" maxlength="3" placeholder="最多可输入3位"></el-input>%
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="organ" label="分配处室及指定机构" min-width="240px">
          <template slot-scope="scope">
            <el-form-item label-width="0">
              <el-input v-model="scope.row.organ" disabled :rows="5" type="textarea" style="width: 50%;"></el-input>
              <el-button type="primary" :disabled="form.fileds === ''" plain @click="getTreeFn(scope.$index)">指定评价机构</el-button>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="level" label="可向下细化层级">
          <template slot-scope="scope">
            <el-form-item label-width="0">
              <el-select v-model="levels" disabled>
                <el-option value="1" label="一级"></el-option>
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80">
          <template slot-scope="scope">
            <el-button type="text" @click="deleRow(scope)" :disabled="$route.query.state === true || $route.query.state === 'true'">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" icon="el-icon-plus" :loading="handleAddLoading" @click="handleAdd" :disabled="$route.query.state === true || $route.query.state === 'true'">添加</el-button>
      <div style="text-align: center; margin-top: 10px;">
        <!-- <router-link :to="{ name: 'dataGovernance_qualityEvaluation_task'}">
        </router-link> -->
        <el-button type="primary" @click="saveExit('form')" :loading="saveExitLoading" :disabled="$route.query.state === true || $route.query.state === 'true'">保存</el-button>
        <el-button type="primary" plain @click="returnBtn">返回</el-button>
      </div>
      </el-form>
      <el-dialog title="提示" :visible.sync="dialogVisible" @close="cancelFn" width="90%">
        <div>
          <el-form :model="dialogForm" ref="dialogForm" :rules="dialogFormRules">
          <el-table :data="dialogForm.dialogTabledata">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="name" label="处室名称">
              <template slot-scope="scope">
                <el-form-item :prop="'dialogTabledata.' + scope.$index + '.name'" :rules="[{ required: true, message: '请选择处室名称', trigger: 'change'}]">
                  <el-select v-model="scope.row.name" placeholder="请选择" style="width: 100%;" clearable @change="clearNameRen(scope.row)">
                    <el-option v-for="(item, index) in nameOptions" :key="index" :label="item.text" :value="item.text">
                    </el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="nameRen" label="处室人员">
              <template slot-scope="scope">
                <el-form-item :prop="'dialogTabledata.' + scope.$index + '.nameRen'" :rules="[{ required: true, message: '请选择处室人员', trigger: 'change'}]">
                  <el-select v-model="scope.row.nameRen" placeholder="请选择" style="width: 100%;" clearable @focus="nameRenFocus(scope.row)" :loading="loading" @change="getUserId(scope.row.nameRen, scope.row)">
                    <el-option v-for="(item, index) in nameRenOptions" :key="index" :label="item.name" :value="item.name">
                    </el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="organ" label="指定评价机构">
              <template slot-scope="scope">
                <!-- <el-form-item :prop="'dialogTabledata.' + scope.$index + '.organ'" :rules="[{ required: false, trigger: 'change'}]">
                  <el-select v-model="scope.row.organ" multiple placeholder="请选择" style="width: 100%;" @focus="organFocus" @change="organAll">
                    <el-option v-for="(item, index) in rangesData" :key="index" :label="item" :value="item">
                    </el-option>
                  </el-select>
                </el-form-item> -->
                <el-form-item label-width="0" class="change_length">
                    <el-select clearable v-model="scope.row.organizationRicd" multiple filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="remoteMethod" :loading="optionLoading" @visible-change="setTagTitle" @change="changeData(scope.$index)" style="width:100% !important;">
                    <el-option
                      v-for="(item, index) in rangesData"
                      :key="index"
                      :label="item.text"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="delDtd(scope.$index, scope.row)" :disabled="$route.query.state === true || $route.query.state === 'true'">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          </el-form>
        </div>
        <el-button type="primary" icon="el-icon-plus" :loading="addDtdLoading" @click="addDtd" :disabled="$route.query.state === true || $route.query.state === 'true'">添加一行</el-button>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" :loading="determineLoading" @click="determine" :disabled="$route.query.state === true || $route.query.state === 'true'">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="提示" :visible.sync="newDialogVisible">
        <div>
          <h3 style="text-align: center;margin-bottom: 50px;">您已改变原有指标模板，如要保存现有指标请录入新的模板名称</h3>
          <el-form :model="newDialogForm" ref="newDialogForm" :rules="newDialogFormRules" label-width="180px">
            <el-form-item prop="name" label="新指标模板名称：" :rules="[{ required: true, message: '请输入新的模板名称', trigger: 'blur'}, { validator: characterSpaceChecking, trigger: 'blur'}]">
              <el-input v-model="newDialogForm.name" placeholder="请输入，最多输入50位" maxlength="50"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="newClear">取 消</el-button>
          <el-button type="primary" :loading="newDetermineloding" @click="newDetermine">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import TreeSelect from '@/components/TreeSelect'
import { systems, ranges, queryFirstTargetName, queryTask, judge, checkTaskUpdate, checkTargetTemplate, queryOrganizationByKeyWord } from '@/api/sys-monitoringAnalysis/evaluate/evaluationTask.js'
import { getTree, deptUser } from '@/api/sys-monitoringAnalysis/roster-warning/common.js'
export default {
  components: {
    TreeSelect
  },
  data() {
    return {
      delIdAll: [],
      optionLoading: false,
      optionAll: [],
      saveExitLoading: false,
      addDtdLoading: false,
      handleAddLoading: false,
      determineLoading: false,
      newDetermineloding: false,
      newtargetTemplateName: '', // 新指标模板名称
      newDialogVisible: false,
      chinaNull: /[\u4e00-\u9fa5]/, // 校验中文
      specialEnglish: /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im, // 校验英文特殊符号
      sprcialChina: /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im, // 校验中文特殊符号
      englishNull: /[abcdefghijklmnopqrstuvwxyz]/im, // 校验英文
      numberNull: /[1234567890]/im, // 校验数字
      blankSpace: /[ ]/im, // 校验空格
      routeId: '',
      loading: false,
      levels: '1',
      diaTitleType: false,
      oldData: [],
      indexType: 0,
      newDeleteData: [],
      newDeleteDataArr: [],
      tabData: [
        {
          children: [{ name: '', nameRen: '', organ: [], officeId: '' }]
        }
      ],
      deleteData: [],
      tabDeleteData: [],
      rangesData: [],
      newRangesData: [],
      codeOption: [],
      nameOptions: [],
      nameRenOptions: [],
      nameValue: '',
      nameRenValue: [],
      dialogVisible: false,
      form: {
        name: '',
        indicator: '',
        dateValue: [],
        fileds: '',
        tableData: [
          {
            name: '',
            weight: '',
            organ: '',
            level: '',
            offices: [],
            removePrimaryId: []
          }
        ]
      },
      dialogForm: {
        dialogTabledata: [
          {
            name: '',
            nameRen: '',
            organ: [],
            officeId: '',
            organizationRicd: [],
            officeStaffId: ''
          }
        ]
      },
      newDialogForm: {
        name: ''
      },
      newDialogFormRules: {},
      dialogFormRules: {},
      rules: {
        name: [
          { required: true, message: '评价任务名称不为空', trigger: 'blur' },
          { validator: this.characterSpaceChecking, trigger: 'blur' }
        ],
        indicator: [
          { required: true, message: '请选择指标体系', trigger: 'change' }
        ],
        fileds: [
          { required: true, message: '请选择评价范围', trigger: 'change' }
        ],
        dateValue: [
          { required: true, message: '请选择评价时间', trigger: 'change' }
        ]
      },
      options: [
        {
          // 弹框
          value: '1',
          label: '中国工商银行'
        },
        {
          value: '2',
          label: '中国农业银行'
        },
        {
          value: '3',
          label: '中国银行'
        },
        {
          value: '4',
          label: '中国建设银行'
        },
        {
          value: '5',
          label: '中国交通银行'
        }
      ],
      organValue: [],
      systemOption: [],
      evaluationTaskId: '',
      status: '',
      myflag: '',
      rangesOption: []
    }
  },
  mounted() {
    this.initData()
    if (this.$route.query.id) {
      this.routeId = this.$route.query.id
      this.evaluationTaskId = this.$route.query.id
      this.status = this.$route.query.myStatus
    }
    this.initEcho()
  },
  destroyed() {
    if (this.$route.name !== 'dataGovernance_qualityEvaluation_task') {
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
    getUserId(val, row) {
      this.nameRenOptions.forEach(el => {
        if (el.name === val) {
          row.officeStaffId = el.userId
        }
      })
    },
    setTagTitle() {
      var tagTextList = this.$refs.evaluationorgan.querySelectorAll('.el-select__tags-text')
      tagTextList.forEach((item) => {
        item.setAttribute('title', item.innerText)
      })
    },
    changeData(index) {
      this.dialogForm.dialogTabledata[index].organ = []
      // this.dialogForm.dialogTabledata[index].rangesData
      this.rangesData.forEach(el => {
        if (this.dialogForm.dialogTabledata[index].organizationRicd.indexOf(el.value) !== -1) {
          this.dialogForm.dialogTabledata[index].organ.push(el.text)
        }
      })
    },
    remoteMethod(query) {
      if (this.form.fileds !== '') {
        if (query !== '') {
          this.rangesData = []
          this.optionLoading = true
          queryOrganizationByKeyWord(this.form.fileds, query)
            .then(res => {
              if (res.code === 200) {
                this.optionLoading = false
                this.rangesData = res.data.filter(item => {
                  return item.text.toLowerCase()
                    .indexOf(query.toLowerCase()) > -1
                })
              }
            })
            .catch()
        } else {
          this.rangesData = []
        }
      }
    },
    newClear() {
      this.newDialogVisible = false
    },
    newDetermine() {
      this.$refs.newDialogForm.validate((valid) => {
        if (valid) {
          this.newtargetTemplateName = this.newDialogForm.name
          checkTargetTemplate(this.saveParameters()).then(res => {
            if (res.code === 200) {
              if (res.message === '评价指标模板名称已经存在') {
                this.newDetermineloding = true
                this.$message({
                  type: 'warning',
                  message: res.message,
                  duration: 6000,
                  showClose: true,
                  onClose: function() {
                    this.newDetermineloding = false
                  }.bind(this)
                })
              } else {
                this.$message({
                  type: 'success',
                  message: '新增成功',
                  duration: 6000,
                  showClose: true
                })
                this.$router.go(-1)
              }
            } else {
              this.newDetermineloding = true
              this.$message({
                type: 'warning',
                message: res.message,
                duration: 6000,
                showClose: true,
                onClose: function() {
                  this.newDetermineloding = false
                }.bind(this)
              })
            }
          })
        } else {
          return false
        }
      })
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
      } else if (value > 100 || value < 0) {
        callback(new Error('请输入0~100的数值'))
      } else {
        callback()
      }
    },
    // 从任务详情进来之后反显数据
    initEcho() {
      if (this.routeId !== '') {
        this.form.tableData = []
        this.tabData = []
        let newarr = []
        queryTask(this.routeId).then(res => {
          if (res.code === 200) {
            this.form.indicator = res.data.targetSystem
            this.delIndicatorAll = JSON.parse(JSON.stringify(res.data.targetSystem))
            this.form.fileds = res.data.evaluationRange
            // queryOrganization(this.form.fileds).then(res => {
            //   if (res.code === 200) {
            //     this.newRangesData = res.data.split(',')
            //     this.rangesData = res.data.split(',')
            //   }
            // })
            this.form.name = res.data.evaluationTaskName
            this.form.dateValue.push(res.data.startDate)
            this.form.dateValue.push(res.data.endDate)
            res.data.primaryIndicators.forEach((el) => {
              this.form.tableData.push({
                name: el.firstTargetName,
                weight: el.weight,
                organ: el.officeOrganization,
                level: '一级',
                offices: [],
                evaluationTaskId: el.targetId
              })
              this.delIdAll.push(el.targetId)
              const arr = []
              el.allocationOffices.forEach((element, index) => {
                arr.push({
                  name: element.officeName,
                  nameRen: element.officeStaff,
                  officeStaffId: element.officeStaffId,
                  organ: element.checkAll === '0' ? [] : element.assignationOrganization.split(','),
                  officeId: element.officeId,
                  organizationRicd: element.checkAll === '0' ? [] : element.organizationRicd.split(',')
                })
                if (element.checkAll !== '0') {
                  element.assignationOrganization.split(',').map((item, num) => {
                    this.rangesData.push({
                      text: item,
                      value: element.organizationRicd.split(',')[num]
                    })
                  })
                }
                newarr = arr
              })
              this.tabData.push({
                children: newarr
              })
            })
          }
          for (var i = 0; i < this.rangesData.length; i++) {
            for (var j = i + 1; j < this.rangesData.length;) {
              if (this.rangesData[i].value === this.rangesData[j].value) { // 通过value属性进行匹配；
                this.rangesData.splice(j, 1) // 去除重复的对象；
              } else {
                j++
              }
            }
          }
        })
      }
    },
    // 定义保存参数
    saveParameters() {
      const tabArr = []
      let tabDelData = []
      if (this.routeId !== '') {
        tabDelData = this.tabDeleteData
      } else {
        tabDelData = []
      }
      this.form.tableData.forEach((el, index) => {
        const tabChildren = []
        this.tabData[index].children.forEach((ol, index) => {
          tabChildren.push({
            officeName: ol.name,
            officeStaff: ol.nameRen,
            officeStaffId: ol.officeStaffId,
            assignationOrganization: ol.organ.join(','),
            officeId: ol.officeId,
            organizationRicd: ol.organizationRicd === undefined ? '' : ol.organizationRicd.join()
          })
        })
        tabArr.push({
          firstTargetName: el.name,
          weight: el.weight + '%',
          officeOrganization: el.organ,
          levelDown: '一级',
          allocationOffices: tabChildren,
          offices: el.offices,
          targetId: el.evaluationTaskId ? el.evaluationTaskId : ''
        })
      })
      const evaluationTask = {
        evaluationTaskName: this.form.name,
        targetSystem: this.form.indicator,
        evaluationRange: this.form.fileds,
        evaluationDate: this.form.dateValue[0] + '-' + this.form.dateValue[1],
        primaryIndicators: tabArr,
        evaluationTaskId: this.evaluationTaskId,
        status: this.status,
        removePrimaryId: this.delIndicatorAll !== this.form.indicator ? this.delIdAll : tabDelData,
        targetTemplateName: this.newtargetTemplateName
      }
      return evaluationTask
    },
    // 当处室名称变化后清空选中的处室人员
    clearNameRen(val) {
      val.nameRen = ''
      val.officeStaffId = ''
    },
    // 当弹窗关闭
    cancelFn() {
      this.$refs.dialogForm.clearValidate()
      if (this.diaTitleType) { // 点了确定按钮之后
        this.dialogVisible = false
        this.diaTitleType = false
      } else { // 点了取消按钮之后 数据不可改变
        this.dialogVisible = false
        this.tabData[this.indexType].children = this.oldData
      }
    },
    // 保存指定评价机构
    determine() {
      this.$refs.dialogForm.validate((valid) => {
        if (valid) {
          let nameType = false
          for (var i = 0; i < this.dialogForm.dialogTabledata.length; i++) {
            for (var k = 0; k < this.dialogForm.dialogTabledata.length; k++) {
              if (this.dialogForm.dialogTabledata[k].nameRen === this.dialogForm.dialogTabledata[i].nameRen && k !== i) {
                nameType = true
              }
            }
          }
          if (!nameType) {
            if (this.routeId !== '') {
              if (this.newDeleteData.length > 0) {
                this.form.tableData[this.indexType].offices.push(this.newDeleteData[0])
              }
              this.newDeleteData = []
            }
            this.tabData[this.indexType].children = this.dialogForm.dialogTabledata
            const newName = []
            const newNameRen = []
            const newOrgan = []
            let all = ''
            this.tabData[this.indexType].children.forEach((el, index) => {
              newName.push(el.name)
              newNameRen.push(el.nameRen)
              newOrgan.push(el.organ)
              all += newName[index] + ' ' + newNameRen[index] + ' ' + newOrgan[index].join() + '\n'
            })
            this.form.tableData[this.indexType].organ = all
            this.$message({
              type: 'success',
              message: '保存成功',
              duration: 6000,
              showClose: true
            })
            this.$refs.dialogForm.clearValidate()
            this.dialogVisible = false
          } else {
            this.determineLoading = true
            this.$message({
              type: 'warning',
              message: '处室人员不以重复选择',
              duration: 6000,
              showClose: true,
              onClose: function() {
                this.determineLoading = false
              }.bind(this)
            })
          }
        } else {
          return false
        }
      })
    },
    organAll() {
      this.dialogForm.dialogTabledata.forEach(el => {
        for (var i = 0; i < el.organ.length; i++) {
          if (el.organ.indexOf('所有选项') !== -1) {
            el.organ = this.rangesData
            el.organ.splice(0, 1)
          }
        }
      })
    },
    organFocus() {
      this.rangesData = JSON.parse(JSON.stringify(this.newRangesData))
      if (this.dialogForm.dialogTabledata.length === 1 && this.dialogForm.dialogTabledata[0].organ.length === 0) {
        this.rangesData.unshift('所有选项')
      }
      const arrData = []
      this.dialogForm.dialogTabledata.forEach(el => {
        for (var i = 0; i < el.organ.length; i++) {
          if (arrData.indexOf(el.organ[i]) === -1) {
            arrData.push(el.organ[i])
          }
        }
      })
      for (let k = 0; k < this.rangesData.length; k++) {
        for (let j = 0; j < arrData.length; j++) {
          if (arrData[j] === this.rangesData[k]) {
            if (arrData.length > 0) {
              this.rangesData.splice(k, 1)
              k--
            }
          }
        }
      }
    },
    // 当点击处室人员下拉时获取当前行处室名称对应的处室人员
    nameRenFocus(val) {
      this.nameRenOptions = []
      if (val.name !== '') {
        this.loading = true
        this.nameOptions.forEach(el => {
          if (val.name === el.text) {
            deptUser({ deptId: el.id }).then(res => {
              if (res.code === 200) {
                this.loading = false
                this.nameRenOptions = res.data
              } else {
                this.loading = false
              }
            }).catch(() => {
              this.loading = false
            })
          }
        })
      } else {
        this.nameRenOptions = []
      }
    },
    // 指定评价机构button 获取处室名称
    getTreeFn(index) {
      this.diaTitleType = true
      this.indexType = index
      // 保存一下当前数据 取消的时候还原
      this.dialogForm.dialogTabledata = JSON.parse(JSON.stringify(this.tabData[this.indexType].children))
      this.dialogVisible = true
      getTree().then(res => {
        if (res.code === 200) {
          this.$refs.dialogForm.clearValidate()
          const aData = []
          res.data.children.forEach(v => {
            if (v.text === '反洗钱中心') {
              v.children.forEach(el => {
                aData.push(el)
                // if (el.text === '收集处') {
                //   aData.push(el)
                // } else if (el.text === '分析一处') {
                //   aData.push(el)
                // } else if (el.text === '分析二处') {
                //   aData.push(el)
                // } else if (el.text === '分析三处') {
                //   aData.push(el)
                // } else if (el.text === '分析四处') {
                //   aData.push(el)
                // }
              })
            }
          })
          res.data.children[2].children
          this.nameOptions = aData
        }
      })
      this.$refs.dialogForm.clearValidate()
    },
    // 指标体系改变之后获取数据
    systemChange() {
      if (this.form.indicator !== '') {
        queryFirstTargetName(this.form.indicator).then(res => {
          if (res.code === 200) {
            this.form.tableData = []
            this.tabData = []
            if (res.data.indexOf(',') === -1) {
              this.form.tableData.push({ name: res.data, weight: '', organ: '', level: '', offices: [], removePrimaryId: [] })
              this.tabData.push({
                children: [{ name: '', nameRen: '', organ: [], officeId: '' }]
              })
            } else {
              const arr = res.data.split(',')
              arr.forEach(el => {
                this.form.tableData.push({ name: el, weight: '', organ: '', level: '', offices: [], removePrimaryId: [] })
                this.tabData.push({
                  children: [{ name: '', nameRen: '', organ: [], officeId: '' }]
                })
              })
            }
          }
        })
      } else {
        this.form.tableData = []
      }
    },
    // 评价范围改变后获取对应数据
    rangesChange() {
      if (this.form.fileds !== '') {
        // queryOrganization(this.form.fileds).then(res => {
        //   if (res.code === 200) {
        //     this.newRangesData = res.data.split(',')
        //     this.rangesData = res.data.split(',')
        //   }
        // })
      }
    },
    // 初始化获取 下拉
    initData() {
      systems().then(res => {
        if (res.code === 200) {
          this.systemOption = res.data
        }
      })
      ranges().then(res => {
        this.rangesOption = res.data
      })
    },
    //
    judgeFn() {
      judge(this.saveParameters()).then(res => {
        if (res.code === 200) {
          console.log(res)
          if (res.message === '请录入指标模板名称') {
            this.newDialogVisible = true
          } else {
            this.$router.go(-1)
          }
        }
      })
    },
    addPromptBox() {
      checkTaskUpdate(this.saveParameters()).then(res => {
        if (res.code === 200) {
          this.saveExitLoading = false
          if (res.message === '请录入指标模板名称') {
            this.newDialogVisible = true
            this.newDialogForm.name = ''
            setTimeout(() => {
              this.$refs.newDialogForm.clearValidate()
            }, 0)
          } else {
            this.$message({
              type: 'success',
              message: '保存成功',
              duration: 6000,
              showClose: true
            })
            this.$router.go(-1)
          }
        } else {
          this.saveExitLoading = true
          this.$message({
            type: 'warning',
            message: res.message,
            duration: 6000,
            showClose: true,
            onClose: function() {
              this.saveExitLoading = false
            }.bind(this)
          })
        }
      }).catch(() => {
        this.saveExitLoading = false
      })
    },
    // 保存
    saveExit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saveExitLoading = true
          this.addPromptBox()
        } else {
          return false
        }
      })
    },
    handleAdd() {
      if (this.form.tableData.length > 49) {
        this.handleAddLoading = true
        this.$message({
          type: 'warning',
          message: '最多可添加50条评价任务',
          duration: 6000,
          showClose: true,
          onClose: function() {
            this.handleAddLoading = false
          }.bind(this)
        })
      } else {
        this.form.tableData.push({
          name: '',
          weight: '',
          organ: '',
          level: '',
          offices: [],
          removePrimaryId: []
        })
        this.tabData.push({
          children: [{ name: '', nameRen: '', organ: [], officeId: '' }]
        })
      }
    },
    addDtd() {
      if (this.dialogForm.dialogTabledata.length > 49) {
        this.addDtdLoading = true
        this.$message({
          type: 'warning',
          message: '最多可添加50条',
          duration: 6000,
          showClose: true,
          onClose: function() {
            this.addDtdLoading = false
          }.bind(this)
        })
      } else {
        this.dialogForm.dialogTabledata.push({
          name: '',
          nameRen: '',
          organ: [],
          officeId: '',
          organizationRicd: []
        })
      }
    },
    delDtd(index, val) {
      this.$confirm('确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          if (this.routeId !== '') {
            this.newDeleteData = []
            this.newDeleteData.push(val.officeId)
          }
          this.dialogForm.dialogTabledata.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功',
            duration: 6000,
            showClose: true
          })
        })
        .catch(() => {})
    },
    deleRow(scope) {
      const index = scope.$index
      this.$confirm('确定要删除当前任务吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          if (this.routeId !== '') {
            this.tabDeleteData.push(scope.row.evaluationTaskId)
          }
          this.form.tableData.splice(index, 1)
          this.tabData.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功',
            duration: 6000,
            showClose: true
          })
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss">
.createadd {
  .createtitle {
    padding: 10px 0;
  }
  .vue-treeselect__menu {
    z-index: 100 !important;
  }
  .change_length {
    .el-select__tags >span {
      display: block!important;
      width: 100%;
    }
    .el-form-item__content {
      margin-left: 0!important;
    } 
   }
}
</style>
