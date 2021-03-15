<template>
  <div class="newModelWarnConfigur">
    <el-card>
      <div slot="header">
        <span>{{this.$route.query.type}}模型预警配置</span>
        <a @click="goBack" class="back" :style="backImg"></a>
      </div>
      <el-form :model="modelForm" :rules="rulesForm" label-width="120px" ref="refForm">
        <el-row :gutter="20">
          <el-col :span="18" :offset="1">
            <el-form-item label="预警配置描述" prop="configMessage">
              <el-input :disabled="this.$route.query.type === '查看'"  v-model="modelForm.configMessage" :rows="2" type="textarea" placeholder="内容长度不能超过100" maxlength="100"></el-input>
            </el-form-item>
            <span style="color: #F56C6C; font-size: 0.8em; height: 5px; position: absolute; margin-left: 43px; margin-top: 10px;">*</span>
            <el-form-item label="模型名称" >
              <el-button type="primary"  v-if="this.$route.query.type === '新建'" @click="handleModelname">请选择</el-button>
              <div class="modelNames" v-if="this.warningData.length>0">
                  <span v-for="(el, index) in checkList" :key="index" style="margin-right:20px;color:#606266;">{{el.modelName}}</span>
              </div>
            </el-form-item>

            <el-form-item label="疑似涉罪类型"  v-if="this.checkList.length>0 || this.$route.query.type !== '新建'">
              <div class="modelNames" :disabled="this.$route.query.type === '查看'">
                  <span v-for="(el, index) in checkList" :key="index" style="margin-right:20px;color:#606266;">{{el.suspectOffenceType}}</span>
              </div>
            </el-form-item>
            <span style="color: #F56C6C; font-size: 0.8em; height: 5px; position: absolute; margin-left: 40px; margin-top: 10px;" v-if="this.checkList.length>0 ||this.$route.query.type !== '新建'">*</span>
            <el-form-item label="预警范围" prop="warningData" v-if="this.checkList.length>0 ||this.$route.query.type !== '新建'">
              <el-button type="primary" v-if="!(this.$route.query.type === '查看')" @click="handleWarningRange">编辑</el-button>
               <div class="modelNames" :disabled="this.$route.query.type === '查看'">
                  <el-tag v-for="(itme,index) in warningData"  :key="index"  style="margin:5px">
                {{itme}}
                </el-tag>
              </div>
            </el-form-item>

            <el-form-item label="生效时间" prop="failureTime">
              <el-date-picker :disabled="this.$route.query.type === '查看'" :picker-options="pickerOptions" clearable v-model="modelForm.failureTime" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date"></el-date-picker>
            </el-form-item>
            <el-form-item label="推送方式" prop="push">
              <el-radio :disabled="this.$route.query.type === '查看'" @click.native.prevent="clickitemModel('处理事项', 1)" v-model="modelForm.push" label="处理事项">处理事项</el-radio>
              <el-radio :disabled="this.$route.query.type === '查看'" @click.native.prevent="clickitemModel('消息提醒', 1)" v-model="modelForm.push" label="消息提醒">消息提醒</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <div style="text-align:center;margin-bottom:6px;">
          <el-button type="primary" :disabled="!preventClicks" v-if="!(this.$route.query.type === '查看')"  @click="handleSubmi">保 存</el-button>
          <el-button type="primary" v-if="this.$route.query.type === '查看'" @click="goBack">返回</el-button>
        </div>
      </el-form>
    </el-card>
    <!-- 弹层 -->
    <el-dialog title="预警范围"  :visible.sync="warningRangeDialogVisible" width="80%">
      <el-card shadow="never">
        <el-row :gutter="20">
          <el-col :span="10">
            <el-tree :data="tableData" ref="tree"  @check="handleNodeClick"  show-checkbox node-key="id" :props="defaultProps">
            </el-tree>
          </el-col>
          <el-col :span="14">
            <!-- :titles="['全选 +', '全选 -']" -->
            <el-transfer class="modelFrame"  v-model="transferDataRange" :data="transferOptions" :props="{key: 'userId',label: 'name'}"></el-transfer>
          </el-col>
        </el-row>
        <div style="text-align:center;margin-top:10px">
          <el-button type="primary" @click="distriButionSure">确定</el-button>
          <el-button @click="distriButionConsole">取消</el-button>
        </div>

      </el-card>
    </el-dialog>

    <el-dialog title="模型名称" :before-close="handleModelClose" :visible.sync="modelNameDialogVisible" width="65%">
      <el-table :data="modelNameTableData">
        <el-table-column  width="30">
            <template slot-scope="scope">
             <el-radio class="wbDan" :label="scope.row.modelOnlyId" v-model="radio" :disabled="scope.row.status !== null" @change.native="getTemplateRow(scope.$index,scope.row)"></el-radio>
          </template>
        </el-table-column>
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column label="模型名称" min-width="200" prop="modelAId" show-overflow-tooltip></el-table-column>
        <el-table-column label="模型标识" min-width="250" prop="modelKey" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.modelKey }}</p>
              <div slot="reference" class="name-wrapper">
                <p style="white-space:nowrap;text-overflow:ellipsis;overflow:hidden;">{{ scope.row.modelKey }}</p>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="疑似犯罪类型" min-width="150" prop="suspectOffenceType" show-overflow-tooltip></el-table-column>
        <el-table-column label="预警范围" min-width="250" prop="warningRang" show-overflow-tooltip></el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" background>
      </el-pagination>
      <div style="text-align:center;margin-top:10px">
        <el-button type="primary" @click="handlesubmitModel">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import { noSpaceAndTs } from '@/utils/formValidate.js'
// import { getToken } from '@/utils/auth'
import {
  getModelName,
  earlyWarning,
  saveWarning,
  eitaSaveWarning,
  lookInfoData,
  doubletainCentratSets
} from '@/api/sys-monitoringAnalysis/taskManagement/modelWarning/modelWarning.js'
// import {
//   obtainCentratSets
// } from '@/api/sys-monitoringAnalysis/modelInfoData/submitExperiments'
export default {
  name: 'newModelWarnConfigur',

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
      backImg: {
        backgroundImage: 'url(' + require('@/assets/back/back.png') + ')',
        backgroundRepeat: 'no-repeat'
      },
      modelForm: {
        configMessage: '',
        failureTime: '',
        // push: '处理事项'
        push: ''
      },
      preventClicks: true,
      rulesForm: {
        configMessage: [
          { max: 100, message: '最大长度不能超过100位', trigger: 'blur' }],
        failureTime: [
          { required: true, message: '生效日期不能为空', trigger: 'blur' }]
        // warningData: [
        //   { required: true, message: '', trigger: 'change' }
        // ]
      },
      modelNameDialogVisible: false,
      modelNameTableData: [],
      warningRangeDialogVisible: false,
      defaultProps: {
        children: 'children',
        label: 'text'
      },
      tableData: [],
      total: null,
      pageInfo: {
        pageSize: 10,
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
      // 二次编辑预警范围回显
      doubleWaringData: [],
      contNumber: 0,
      zhongJuary: ''
    }
  },
  computed: {
  },
  mounted() {
    this.requestWaringData()
    if (this.$route.query.type === '查看' || this.$route.query.type === '编辑') {
      lookInfoData(this.$route.query.mcid).then(res => {
        if (res.code === 200) {
          this.carryData = res.data
          this.getIndexData()
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
      this.modelForm.configMessage = this.carryData.configMessage
      this.modelForm.failureTime = this.carryData.failureTime
      this.modelForm.push = this.carryData.push
      var modelNameObj = {
        modelName: this.carryData.modelName,
        suspectOffenceType: this.carryData.typeSuspectedCrime
      }
      this.checkList.push(modelNameObj)
      this.warningData = []
      for (let i = 0; i < this.carryData.warningRanges.length; i++) {
        this.warningData.push(this.carryData.warningRanges[i].wusername)
      }
    },
    // 页面加载编辑部门回显方法
    editEchoData() {
      for (let k = 0; k < this.carryData.warningRanges.length; k++) {
        this.arrUpdata.push(this.carryData.warningRanges[k].wuserid)
        this.arrDepartment.push(this.carryData.warningRanges[k].wparentid)
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
    //  模型名称列表
    getModelData() {
      getModelName(this.pageInfo).then(res => {
        if (res.code === 200) {
          this.modelNameTableData = res.data.list
          this.total = res.data.total
        }
      })
    },
    // 模型名称 - 选择
    handleModelname() {
      this.modelNameDialogVisible = true
      this.getModelData()
    },

    // 模型名称 - 确定
    handlesubmitModel() {
      this.modelNameDialogVisible = false
      this.checkList = []
      this.warningData = []
      if (this.zhongJuary !== '') {
        this.checkList.push(this.zhongJuary)
        this.warningData.push(this.checkList[0].warningRang)
      } else {
        return
      }
      // 页面加载完加载数据
      this.$nextTick(function() {
        this.transferOptions = []
        this.transferData = []
        var strData = this.checkList[0].warningRangUser.split(',')
        this.transferDataRange = strData
        this.returnWaringRange = this.checkList[0].warningRangProduct
        this.getClassIdInfo(this.returnWaringRange)
      })
    },

    // 模型名称 -  table selection
    handleSelectionChangeModel(val) {
      this.checkList = val
    },
    getTemplateRow(index, row) { // 获取选中数据
      this.zhongJuary = ''
      this.zhongJuary = row
    },
    clickitemModel(e, type) {
      switch (type) {
        case 1:
          e === this.modelForm.push ? this.modelForm.push = '' : this.modelForm.push = e
          break
        case 2:
          e === this.modelForm.mpushNumber ? this.modelForm.mpushNumber = '' : this.modelForm.mpushNumber = e
          break
        case 3:
          e === this.modelForm.pushMode ? this.modelForm.pushMode = '' : this.modelForm.pushMode = e
          break
        case 4:
          e === this.radioData ? this.radioData = '' : this.radioData = e
          break
      }
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
        this.contNumber++
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
          if (this.contNumber <= 1) {
            var strData = this.checkList[0].warningRangUser.split(',')
            this.transferDataRange = strData
            this.returnWaringRange = this.checkList[0].warningRangProduct
            var strArr = this.returnWaringRange.split(',')
            this.$refs.tree.setCheckedKeys(strArr)
          } else {
            this.transferDataRange = this.arrUpdata
            this.returnWaringRange = this.arrDepartment
            this.$refs.tree.setCheckedKeys(this.doubleWaringData)
          }
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
      if (this.warningData.length === 0) {
        this.radio = ''
        this.checkList = []
      }
    },
    // 预警范围 拆分组装数据
    makeData() {
      this.departmentalData = []
      for (var im = 0; im < this.transferDataRange.length; im++) {
        for (const i in this.selectedRange) {
          for (let j = 0; j < this.selectedRange[i].length; j++) {
            if (this.selectedRange[i][j].userId === this.transferDataRange[im]) {
              const obj = {
                wparentid: i,
                wuserid: this.selectedRange[i][j].userId,
                wusername: this.selectedRange[i][j].name
              }
              this.departmentalData.push(obj)
            }
          }
        }
      }
      var arr = []
      for (let k = 0; k < this.departmentalData.length; k++) {
        arr.push(this.departmentalData[k].wusername)
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
    // handleClose(item, index) {
    //   if (this.$route.query.type === '查看') {
    //     return false
    //   }
    //   this.warningData.splice(index, 1)
    //   this.$refs.tree.source.data[index].diabled = false
    //   this.$refs.tree.source.checked.splice(index, 1)
    //   this.$refs.tree.target.data.splice(index, 1)
    // },
    // 模型名称分页
    handleSizeChange(val) {
      this.pageInfo.pageSize = val
      this.getModelData()
    },
    handleCurrentChange(val) {
      this.pageInfo.pageNum = val
      this.getModelData()
    },
    // 保存
    handleSubmi() {
      this.preventClicks = false
      if (this.checkList.length > 0) {
        if (this.modelForm.failureTime !== '') {
          const paramsObject = {
            configMessage: this.modelForm.configMessage,
            mcid: this.$route.query.type === '编辑' ? this.carryData.mcid : null,
            failureTime: this.modelForm.failureTime,
            modelName: this.checkList[0].modelAId,
            push: this.modelForm.push,
            typeSuspectedCrime: this.checkList[0].suspectOffenceType,
            warningRanges: this.departmentalData,
            modelKey: this.zhongJuary.modelKey
          }
          if (this.departmentalData.length > 0) {
            this.$refs.refForm.validate(valid => {
              if (valid) {
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
              }
            })
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
          this.$message({
            message: '请选择生效时间!',
            type: 'warning',
            duration: 6000,
            showClose: true
          })
        }
      } else {
        this.preventClicks = true
        this.$message({
          message: '请选择模型名称!',
          type: 'warning',
          duration: 6000,
          showClose: true
        })
      }
    },

    // 返回
    goBack() {
      if (JSON.parse(sessionStorage.getItem('searchDataModeRul'))) {
        const obj = JSON.parse(sessionStorage.getItem('searchDataModeRul'))
        obj.ifReviewModeRul = true
        sessionStorage.setItem('searchDataModeRul', JSON.stringify(obj))
      }
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss">
.newModelWarnConfigur {
  position: relative;
  .modelFrame{
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
  .el-transfer-panel__body {
    .el-checkbox-group {
      .el-checkbox {
        margin-right: 56px;
      }
    }
  }
  .el-card{
    .el-card__body{
      .el-form{
        .el-row{
          .el-col-18{
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

  .el-dialog__wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 54px;
    overflow: auto;
    margin: 0;
  }
  .wbDan{
    .el-radio__label{
      color: white;
    }
  }
}
</style>
