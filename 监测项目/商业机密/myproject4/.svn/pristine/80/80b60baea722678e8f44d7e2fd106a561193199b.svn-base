<template>
  <div class="newSeniorlistWarningConfigur">
    <el-card>
      <div slot="header">
        <span>{{this.$route.query.type}}排名规则预警配置</span>
        <a @click="goBack" class="back" :style="backImg"></a>
      </div>
      <el-form :model="modelForm" :rules="rulesForm" label-width="120px" ref="refForm">
        <el-row :gutter="20">
          <el-col :span="18" :offset="1">
            <el-form-item label="预警配置描述" prop="mconfigMessage">
              <el-input  maxlength="100" v-model="modelForm.mconfigMessage" :disabled="this.$route.query.type === '查看'" :rows="2" type="textarea" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item label="规则类别" prop="InsCategories">
                <el-radio-group :disabled="this.$route.query.type !== '新建'" v-model="modelForm.InsCategories" @change="InsChangeEvent()">
                  <el-radio label="PER" >个人</el-radio>
                  <el-radio label="ORG" >机构</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="规则名称" prop="mrcRuleName" v-if="this.modelForm.InsCategories !== ''">
              <el-select v-model="modelForm.mrcRuleName" :disabled="this.$route.query.type !== '新建'" @change="selectOne">
                <el-option
                  v-for="item in selectOptions"
                  :key="item.rulesId"
                  :label="item.clientType"
                  :value="item.ruleKey"
                  :disabled="item.disabled">
                </el-option>
              </el-select>
            </el-form-item>
            <span style="color: #F56C6C; font-size: 0.8em; height: 5px; position: absolute; margin-left: 40px; margin-top: 10px;">*</span>
            <el-form-item label="预警范围" prop="warningData">
              <el-button type="primary" v-if="!(this.$route.query.type === '查看')" @click="handleWarningRange">请选择</el-button>
              <div class="modelNames" v-if="this.warningData.length >0" :disabled="this.$route.query.type === '查看'">
                  <el-tag v-for="(itme,index) in warningData"  :key="index"  style="margin:5px">
                {{itme}}
                </el-tag>
              </div>
            </el-form-item>

            <el-form-item label="生效时间" prop="mfailureTime">
              <el-date-picker clearable value-format="yyyy-MM-dd" :picker-options="pickerOptions" format="yyyy 年 MM 月 dd 日" :disabled="this.$route.query.type === '查看'" v-model="modelForm.mfailureTime" type="date"></el-date-picker>
            </el-form-item>

            <el-form-item label="推送方式" prop="mpush">
              <el-radio v-model="modelForm.mpush" :disabled="this.$route.query.type === '查看'"  @click.native.prevent="clickitemRule('处理事项', 1)" label="处理事项">处理事项</el-radio>
              <el-radio v-model="modelForm.mpush" :disabled="this.$route.query.type === '查看'"  @click.native.prevent="clickitemRule('消息提醒', 1)" label="消息提醒">消息提醒</el-radio>
            </el-form-item>

            <el-form-item label="推送数量" class="pushNum" prop="" v-if="this.modelForm.mpush">
              <el-radio v-model="modelForm.mpushNumber" label="1"  :disabled="this.$route.query.type === '查看'">
                <!-- @click.native.prevent="clickitemRule('1', 2)" -->
              推送
              <el-input-number v-model="modelForm.mpushNum.num" style="width:130px" :disabled="this.$route.query.type === '查看'" controls-position="right" @change="handleChange" :min="1" :max="99999999"></el-input-number>
              条结果记录
              </el-radio>
              <el-radio v-model="modelForm.mpushNumber"  label="2" :disabled="this.$route.query.type === '查看'">
              推送
              <el-input-number style="width:130px" v-model="modelForm.mpushNum.num1" :disabled="this.$route.query.type === '查看'" controls-position="right" @change="handleChange" :min="1" :max="99999998"></el-input-number>
              条至
              <el-input-number style="width:130px" v-model="modelForm.mpushNum.num2" :disabled="this.$route.query.type === '查看'" controls-position="right" @change="handleChange" :min="2" :max="99999999"></el-input-number>
              条结果记录
              </el-radio>
              <el-radio v-model="modelForm.mpushNumber" label="3" :disabled="this.$route.query.type === '查看'">推送全部结果</el-radio>
            </el-form-item>

          </el-col>
        </el-row>
        <div style="text-align:center;margin-bottom:6px;">
          <el-button type="primary" :disabled="!preventClicks" v-if="!(this.$route.query.type === '查看')"  @click="handleSubmi">保 存</el-button>
          <el-button type="primary" v-if="this.$route.query.type === '查看'" @click="goBack">返回</el-button>
        </div>
      </el-form>
    </el-card>

    <el-dialog title="预警范围" :visible.sync="warningRangeDialogVisible" width="70%">
      <el-card shadow="never">
        <el-row :gutter="20">
          <el-col :span="10">
            <el-tree :data="tableData" show-checkbox ref="tree"  @check="handleNodeClick"  node-key="id" :props="defaultProps">
            </el-tree>
          </el-col>
          <el-col :span="14">
            <el-transfer :titles="['全选 +', '全选 -']" class="shuttleFrame"  v-model="transferDataRange" :data="transferOptions" :props="{key: 'userId',label: 'name'}"></el-transfer>
          </el-col>
        </el-row>
        <div style="text-align:center;margin-top:10px">
          <el-button type="primary" @click="distriButionSure">确定</el-button>
          <el-button @click="distriButionConsole">取消</el-button>
        </div>

      </el-card>
    </el-dialog>

  </div>
</template>
<script>
// import { noSpaceAndTs } from '@/utils/formValidate.js'
import {
  earlyWarning,
  saveWarning,
  eitaSaveWarning,
  lookInfoData,
  doubletainCentratSets,
  selectInfo,
  getSelectDisable
} from '@/api/sys-monitoringAnalysis/taskManagement/rulesWarning/rulesWarning.js'
export default {
  name: 'newSeniorlistWarningConfigur',

  data() {
    const generateData = _ => {
      const data = []
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`,
          disabled: i % 4 === 0
        })
      }
      return data
    }

    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      data: generateData(),
      value: [1, 4],
      preventClicks: true,
      backImg: {
        backgroundImage: 'url(' + require('@/assets/back/back.png') + ')',
        backgroundRepeat: 'no-repeat'
      },
      modelForm: {
        mconfigMessage: '',
        InsCategories: '',
        mrcRuleName: '',
        // mpushNumber: '',
        // mpushNum: {
        //   num: '',
        //   num1: '',
        //   num2: ''
        // },
        // mfailureTime: '',
        // mpush: ''
        mpushNumber: '1',
        mpushNum: {
          num: '1',
          num1: '1',
          num2: '10'
        },
        mfailureTime: '',
        mpush: '处理事项'
      },
      selectDisable: {},
      rulesForm: {
        mconfigMessage: [
          // { validator: noSpaceAndTs, trigger: 'blur' },
          { max: 100, message: '最大长度不能超过100位', trigger: 'blur' }],
        mrcRuleName: [
          { required: true, message: '内容不能为空', trigger: 'change' }],
        mfailureTime: [
          { required: true, message: '内容不能为空', trigger: 'change' }],
        InsCategories: [
          { required: true, message: '内容不能为空', trigger: 'change' }]
      },

      warningRangeDialogVisible: false,
      tableData: [],
      defaultProps: {
        children: 'children',
        label: 'text'
      },
      total: null,
      pageInfo: {
        pageSize: 5,
        pageNum: 1
      },
      checkList: [],
      transferOptions: [],
      transferDataRange: [],
      warningData: [],
      carryData: {},
      radio: '',
      returnWaringRange: [],
      // 组装预警范围所需数据
      departmentalData: [],
      selectedRange: [],
      // 编辑存储数据
      arrUpdata: [],
      arrDepartment: [],
      sectionNameData: '',
      sectionData: [],
      // 二次编辑预警范围回显
      doubleWaringData: [],
      selectOptions: [],
      objSelect: {},
      InsChangeBloar: 0
    }
  },
  computed: {
    // ...mapGetters(['name', 'user_riid'])
  },
  created() {
    this.getSelectDisableMath()
  },
  mounted() {
    this.requestWaringData()
    if (this.$route.query.type === '查看' || this.$route.query.type === '编辑') {
      lookInfoData(this.$route.query.mcid).then(res => {
        if (res.code === 200) {
          this.carryData = res.data
          this.modelForm.InsCategories = this.carryData.mwarningNumber
          this.InsChangeEvent()
          this.InsChangeBloar++
          // this.getIndexData()
          this.$nextTick(function() {
            this.getIndexData()
          })
          if (this.$route.query.type === '编辑') {
            this.editEchoData()
          }
        } else {
          this.$message({
            type: 'error',
            message: '请求数据失败！',
            duration: 6000,
            showClose: true
          })
        }
      })
    } else {
      console.log('新建')
    }
  },
  methods: {
    // 页面加载回显数据方法
    getIndexData() {
      this.modelForm.mconfigMessage = this.carryData.mconfigMessage
      this.modelForm.mrcRuleName = this.carryData.mrcRuleName
      this.modelForm.mfailureTime = this.carryData.mfailureTime
      this.modelForm.mpush = this.carryData.mpush
      if (this.carryData.mpushNumber !== '') {
        if (this.carryData.mpushNumber === 'all') {
          this.modelForm.mpushNumber = '3'
        } else {
          var strMpush = this.carryData.mpushNumber.split(',')
          if (strMpush[0] !== '0') {
            this.modelForm.mpushNumber = '2'
            this.modelForm.mpushNum.num1 = strMpush[0]
            this.modelForm.mpushNum.num2 = strMpush[1]
          } else if (strMpush[0] === '0') {
            this.modelForm.mpushNumber = '1'
            this.modelForm.mpushNum.num = strMpush[1]
          }
        }
      }
      // this.modelForm.mpush = this.carryData.mpush
      // var modelNameObj = {
      //   modelName: this.carryData.modelName,
      //   suspectOffenceType: this.carryData.typeSuspectedCrime
      // }
      // this.checkList.push(modelNameObj)
      this.warningData = []
      for (let i = 0; i < this.carryData.warningRanges.length; i++) {
        this.warningData.push(this.carryData.warningRanges[i].wrwrUsername)
      }
    },
    clickitemRule(e, type) {
      switch (type) {
        case 1:
          e === this.modelForm.mpush ? this.modelForm.mpush = '' : this.modelForm.mpush = e
          break
        case 2:
          e === this.modelForm.mpushNumber ? this.modelForm.mpushNumber = '' : this.modelForm.mpushNumber = e
          break
      }
    },
    // 下拉框禁用
    getSelectDisableMath() {
      getSelectDisable().then(res => {
        if (res.code === 200) {
          if (this.$route.query.type !== '查看') {
            // if (this.modelForm.InsCategories === 'PER') {
            this.selectDisable = res.data
            // } else if (this.modelForm.InsCategories === 'ORG') {
            // this.selectDisable = res.data.ORG
            // }
          }
        }
      })
    },

    // 报告机构类别
    InsChangeEvent() {
      selectInfo(this.modelForm.InsCategories).then(res => {
        if (res.code === 200) {
          if (this.InsChangeBloar !== 1) {
            this.modelForm.mrcRuleName = ''
          }
          this.selectOptions = res.data
          if (this.modelForm.InsCategories === 'PER') {
            for (let i = 0; i < this.selectDisable.PER.length; i++) {
              for (let j = 0; j < this.selectOptions.length; j++) {
                if (this.selectDisable.PER[i].warningNumber === this.selectOptions[j].clientType) {
                  this.selectOptions[j].disabled = true
                }
              }
            }
          } else if (this.modelForm.InsCategories === 'ORG') {
            for (let i = 0; i < this.selectDisable.ORG.length; i++) {
              for (let j = 0; j < this.selectOptions.length; j++) {
                if (this.selectDisable.ORG[i].warningNumber === this.selectOptions[j].clientType) {
                  this.selectOptions[j].disabled = true
                }
              }
            }
          }
        } else {
          this.$message({
            type: 'error',
            message: '请求规则名称失败！',
            duration: 6000,
            showClose: true
          })
        }
      })
    },
    selectOne(val) {
      this.objSelect = {}
      this.objSelect = this.selectOptions.find(item => {
        return item.ruleKey === val
      })
    },
    // 页面加载编辑部门回显方法
    editEchoData() {
      for (let k = 0; k < this.carryData.warningRanges.length; k++) {
        this.arrUpdata.push(this.carryData.warningRanges[k].mrwrUserid)
        this.arrDepartment.push(this.carryData.warningRanges[k].wrwrParentid)
      }
      this.transferDataRange = this.arrUpdata
      this.$nextTick(function() {
        this.transferOptions = []
        this.transferData = []
        var strData = this.arrUpdata
        this.transferDataRange = strData
        this.returnWaringRange = this.arrDepartment
        this.getClassIdInfo(this.returnWaringRange)
      })
    },
    // 页面加载封装 通过部门Id 获取部门下的信息
    getClassIdInfo(arrId) {
      // var str = getToken()
      // str,
      doubletainCentratSets(arrId).then(res => {
        if (res.code === 200) {
          this.selectedRange = res.data
          const data = res.data
          const arr = []
          for (var item in data) {
            for (let i = 0; i < data[item].length; i++) {
              arr.push(data[item][i])
            }
          }
          this.transferOptions = arr
          this.makeData()
        } else {
          this.$message({
            message: res.message,
            type: 'warning',
            duration: 6000,
            showClose: true
          })
        }
      })
    },
    // 请求 预警范围数据
    requestWaringData() {
      this.tableData = []
      earlyWarning().then(res => {
        if (res.code === 200) {
          this.tableData = []
          const totalData = res.data.data
          totalData[0].disabled = true
          this.tableData.push(totalData[0])
        } else {
          console.log('获取预警范围出错！！')
        }
      })
    },
    //   预警范围 -编辑
    handleWarningRange() {
      this.warningRangeDialogVisible = true
      this.$nextTick(function() {
        this.transferOptions = []
        this.transferData = []
        this.$refs.tree.setCheckedKeys([])
        if (this.$route.query.type === '编辑') {
          if (this.doubleWaringData.length > 0) {
            this.$refs.tree.setCheckedKeys(this.doubleWaringData)
          } else {
            this.transferDataRange = this.arrUpdata
            this.returnWaringRange = this.arrDepartment
            this.$refs.tree.setCheckedKeys(this.returnWaringRange)
          }
        } else {
          var strData = this.checkList[0].warningRangUser.split(',')
          this.transferDataRange = strData
          this.returnWaringRange = this.checkList[0].warningRangProduct
          var strArr = this.returnWaringRange.split(',')
          this.$refs.tree.setCheckedKeys(strArr)
        }
        this.certerData()
      })
    },
    // 回显中间数据方法
    certerData() {
      // var str = getToken()
      if (this.$refs.tree.getCheckedKeys().length) {
        var arrString = this.$refs.tree.getCheckedKeys().join()
        // str,
        doubletainCentratSets(arrString).then(res => {
          if (res.code === 200) {
            this.selectedRange = res.data
            const data = res.data
            const arr = []
            for (var item in data) {
              for (let i = 0; i < data[item].length; i++) {
                arr.push(data[item][i])
              }
            }
            this.transferOptions = arr
          } else {
            this.$message({
              message: res.message,
              type: 'warning',
              duration: 6000,
              showClose: true
            })
          }
        })
      } else {
        this.transferOptions = []
        this.transferData = []
      }
    },
    // tree 的勾选触发事件
    handleNodeClick(data, checked, indeterminate) {
      this.transferOptions = []
      this.transferData = []
      this.certerData()
    },
    // 关闭对话框
    handleModelClose() {
      this.modelNameDialogVisible = false
    },
    // 预警范围 拆分组装数据
    makeData() {
      this.departmentalData = []
      for (var im = 0; im < this.transferDataRange.length; im++) {
        for (const i in this.selectedRange) {
          for (let j = 0; j < this.selectedRange[i].length; j++) {
            if (this.selectedRange[i][j].userId === this.transferDataRange[im]) {
              const obj = {
                wrwrParentid: i,
                mrwrUserid: this.selectedRange[i][j].userId,
                wrwrUsername: this.selectedRange[i][j].name
              }
              this.departmentalData.push(obj)
            }
          }
        }
      }
      var arr = []
      for (let k = 0; k < this.departmentalData.length; k++) {
        arr.push(this.departmentalData[k].wrwrUsername)
      }
      this.warningData = arr
    },
    // 预警范围 - 确定
    distriButionSure() {
      if (this.transferDataRange.length < 1) {
        this.$message({
          message: '请选择预警范围',
          type: 'warning',
          duration: 6000,
          showClose: true
        })
        return
      }
      this.doubleWaringData = this.$refs.tree.getCheckedKeys()
      this.warningRangeDialogVisible = false
      this.arrUpdata = this.transferDataRange
      this.arrDepartment = this.returnWaringRange
      this.makeData()
    },
    // 预警范围 - 取消
    distriButionConsole() {
      this.warningRangeDialogVisible = false
      this.transferOptions = []
      this.transferData = []
      this.$refs.tree.setCheckedKeys([])
    },
    // 保存
    handleSubmi() {
      this.preventClicks = false

      if (this.modelForm.mpushNumber === '1' && this.modelForm.mpush) {
        this.sectionData = []
        this.sectionData.push('0')
        this.sectionData.push(this.modelForm.mpushNum.num)
      } else if (this.modelForm.mpushNumber === '2' && this.modelForm.mpush) {
        this.sectionData = []
        this.sectionData.push(this.modelForm.mpushNum.num1)
        this.sectionData.push(this.modelForm.mpushNum.num2)
      } else if (this.modelForm.mpushNumber === '3' && this.modelForm.mpush) {
        this.sectionData = ['all']
      } else {
        this.sectionData = []
      }

      const paramsObject = {
        mconfigMessage: this.modelForm.mconfigMessage,
        mrcId: this.$route.query.type === '编辑' ? this.carryData.mrcId : null,
        mrcRuleName: this.modelForm.mrcRuleName,
        mpushNumber: this.sectionData.join(),
        mpush: this.modelForm.mpush,
        mfailureTime: this.modelForm.mfailureTime,
        warningRanges: this.departmentalData,
        chrnRuleName: this.objSelect.clientType,
        cclientType: this.objSelect.cclientType,
        mwarningNumber: this.modelForm.InsCategories
      }
      this.$refs.refForm.validate(valid => {
        if (valid) {
          if (this.departmentalData.length > 0) {
            if (this.$route.query.type === '新建') {
              saveWarning(paramsObject).then(res => {
                if (res.code === 200) {
                  this.$message({
                    message: res.data,
                    type: 'success',
                    duration: 6000,
                    showClose: true
                  })
                  this.preventClicks = true
                  this.$router.go(-1)
                } else {
                  this.preventClicks = true
                  this.$message({
                    message: res.data,
                    type: 'error',
                    duration: 6000,
                    showClose: true
                  })
                }
              })
                .catch(() => {
                  this.preventClicks = true
                })
            } else {
              // 编辑
              eitaSaveWarning(paramsObject).then(res => {
                if (res.code === 200) {
                  this.$message({
                    message: res.data,
                    type: 'success',
                    duration: 6000,
                    showClose: true
                  })
                  this.preventClicks = true
                  this.$router.go(-1)
                } else {
                  this.preventClicks = true
                  this.$message({
                    message: res.data,
                    type: 'error',
                    duration: 6000,
                    showClose: true
                  })
                }
              })
                .catch(() => {
                  this.preventClicks = true
                })
            }
          } else {
            this.preventClicks = true
            this.$message({
              message: '请选择预警范围！',
              type: 'warning',
              duration: 6000,
              showClose: true
            })
          }
        } else {
          this.preventClicks = true
        }
      })
    },

    // 推送方式
    handleChange() {

    },
    // 返回
    goBack() {
      if (JSON.parse(sessionStorage.getItem('searchRankingSxpForm'))) {
        const obj = JSON.parse(sessionStorage.getItem('searchRankingSxpForm'))
        obj.ifReviewRankingSxpForm = true
        sessionStorage.setItem('searchRankingSxpForm', JSON.stringify(obj))
      }
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss">
.newSeniorlistWarningConfigur {
  position: relative;
  .shuttleFrame{
    .el-transfer-panel{
      .el-transfer-panel__body{
        .el-transfer-panel__list{
          .el-transfer-panel__item{
            width:100% !important;
          }
        }
      }
    }
  }
    .el-card{
    .el-card__body{
      .el-form{
        .el-row{
          .el-col-18{
            .pushNum{
              .el-form-item__content{
                width: 100%;
                .el-radio{
                  .el-input-number{
                    width: 90px;
                  }
                }
              }
            }
            .el-form-item{
              .el-form-item__content{
                width: 100%;
                .modelNames{
                  width:100%;
                  margin-top: 5px;
                  display:inline-block;
                  padding:2px 4px;
                  border-radius:5px;
                  border:1px solid #ccc;
                  min-height: 32px
                }
              }
            }
          }
        }
      }
    }
  }
  .back {
    position: absolute;
    top: 0px;
    right: 0px;
  }
  .el-date-editor--daterange {
    width: 100% !important;
  }
  .el-date-editor {
    width: 100%;
  }
  .el-select {
    width: 100%;
  }
  .el-transfer-panel__body {
    .el-checkbox-group {
      .el-checkbox {
        margin-right: 56px;
      }
    }
  }

  .el-dialog__wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 54px;
    overflow: auto;
    margin: 0;
  }
}
</style>
