<template>
  <div class="newSeniorlistWarningConfigur">
    <el-card>
      <div slot="header">
        <span>预警配置</span>
        <a @click="goBack" class="back" :style="backImg"></a>
      </div>
      <el-form :model="modelForm" :rules="rulesForm" label-width="120px" ref="refForm">
        <el-row :gutter="20">
          <el-col :span="18" :offset="1">
            <el-form-item label="预警配置描述" prop="describe">
              <el-input :disabled="disableFlag" maxlength="100"  v-model="modelForm.describe" :rows="2" type="textarea" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item label="涉罪类型" prop="preliminaryJudgment">
              <el-input  v-model="modelForm.preliminaryJudgment" :disabled="true" placeholder="请选择" style="width:89%"></el-input>
              <el-button :disabled="disableFlag" type="primary" @click="handleModelname">请选择</el-button>
            </el-form-item>
            <span style="color: red;height: 5px; position: absolute; margin-left: 40px; margin-top: 10px;">*</span>
            <el-form-item label="预警范围" class="mustStyle">
              <el-button :disabled="disableFlag" type="primary" @click="handleWarningRange">请选择</el-button>
            </el-form-item>

            <el-form-item label="">
              <el-tag :key="idx" v-for="(tag,idx) in dynamicTags" :closable="!disableFlag" :disable-transitions="false" @close="handleClose(tag)">
                {{tag.name?tag.name:tag.userId}}
              </el-tag>
            </el-form-item>

            <el-form-item label="生效时间" prop="eifTime">
              <el-date-picker :disabled="disableFlag" clearable value-format="yyyy-MM-dd" v-model="modelForm.eifTime" type="date" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
            </el-form-item>

            <el-form-item label="推送方式" prop="pushMode">
              <el-radio  :disabled="disableFlag"  v-model="modelForm.pushMode" label="0">处理事项</el-radio>
              <el-radio  :disabled="disableFlag"  v-model="modelForm.pushMode" label="1">消息提醒</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <div style="text-align:center;margin-bottom:6px;">
          <el-button v-if="this.$route.query.pageFlag !== 'view'" type="primary" @click="handleSubmi">保 存</el-button>
          <el-button @click="goBack">返 回</el-button>
        </div>
      </el-form>
    </el-card>
    <!-- dialog -->
    <el-dialog title="预警范围" :visible.sync="warningRangeDialogVisible" width="70%" @open="openWarningDialog" @close="closeWarningDialog">
      <el-card shadow="never">
        <el-row :gutter="20">
          <el-col :span="10">
            <el-tree :data="tableData" show-checkbox node-key="id" :props="defaultProps" ref="reftree" @check="changeTree">
            </el-tree>
          </el-col>
          <el-col :span="14">
            <el-transfer :titles="['全选 +', '全选 -']" ref="refTransfer" v-model="rightTransfer" @change="changeTransfer" :data="dataTransfer" :props="{key: 'userId',label: 'name'}"></el-transfer>
          </el-col>
        </el-row>
        <div style="text-align:center;margin-top:10px">
          <el-button type="primary" @click="handlesubmitWaring">确定</el-button>
        </div>
      </el-card>
    </el-dialog>

    <el-dialog title="选择涉罪类型" :visible.sync="modelNameDialogVisible" width="65%">
      <el-table :data="modelNameTableData"  ref="multipleTable" tooltip-effect="dark">
        <!-- <el-table-column  type="selection" width="55">
        </el-table-column> -->
             <el-table-column  width="30" fixed="left">
            <template slot-scope="scope">
              <!-- {{judgeArr.indexOf(scope.row.codeId)}} -->
             <el-radio :disabled="judgeArr.indexOf(scope.row.codeId)!==-1"  :label="scope.row.codeId" v-model="radioData" @change.native="handleSelectionChangeModel(scope.$index,scope.row)"></el-radio>
          </template>
        </el-table-column>
        <el-table-column label="涉罪类型" prop="codeDesc" min-width="120"></el-table-column>
        <el-table-column label="涉罪可疑交易行为" prop="codeName" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column label="涉罪可疑交易行为代码" prop="codeId" min-width="120"></el-table-column>
      </el-table>
      <div style="text-align:center;margin-top:10px">
        <el-button type="primary" @click="handlesubmitModel">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { noSpaceAndTs } from '@/utils/formValidate.js'
// import { getToken } from '@/utils/auth'
import { earlyWarning } from '@/api/sys-monitoringAnalysis/taskManagement/modelWarning/modelWarning.js'
import { sendListapi, getCrimapi, editListapi, lookListapi, getrangNameapi, getSeZui } from '@/api/sys-monitoringAnalysis/taskManagement/seniorwarning/newSeniorlistWarningConfigur.js'

export default {
  name: 'newSeniorlistWarningConfigur',

  data() {
    return {
      judgeArr: [],
      countFlag: 0,
      radioData: '',
      dynamicTags: [],
      rightTransfer: [], // 右侧穿梭框

      backImg: {
        backgroundImage: 'url(' + require('@/assets/back/back.png') + ')',
        backgroundRepeat: 'no-repeat'
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      modelForm: {
        describe: '',
        preliminaryJudgment: '',
        eifTime: '',
        pushMode: ''
      },
      rulesForm: {
        describe: [
          { validator: noSpaceAndTs, trigger: 'blur' },
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { max: 100, message: '最大长度不能超过100位', trigger: 'blur' }
        ],
        eifTime: [{ required: true, message: '内容不能为空', trigger: 'blur' }],
        preliminaryJudgment: [{ required: true, message: '内容不能为空', trigger: 'change' }]
      },
      modelNameDialogVisible: false,
      modelNameTableData: [],
      multipleSelection: [], // 选择类型
      warningRangeDialogVisible: false,
      defaultProps: {
        children: 'children',
        label: 'text'
      },
      dataTransfer: [],
      transferOrginData: [], // 原始穿梭框数据
      treeChecked: [], // 树选中的数据
      tableData: []
    }
  },
  computed: {
    disableFlag() {
      return this.$route.query.pageFlag === 'view'
    }
  },
  mounted() {
    this.getData()
  },
  methods: {

    //   查看信息
    getData() {
      getSeZui().then(res => {
        if (res.code === 200) {
          var dataArr = []
          res.data.forEach(el => {
            dataArr.push(el.preliminaryJudgment)
          })
          this.judgeArr = dataArr
        }
      })
      if (this.$route.query.pageFlag !== 'new') {
        lookListapi(this.$route.query.analyzeId).then(res => {
          if (res.code === 200) {
            this.modelForm = res.data
            this.dynamicTags = res.data.seniorNameListWarningRangeDoList
          }
        })
      }
    },

    // 打开 预警范围 - dialog
    openWarningDialog() {
      this.$refs.reftree.setCheckedNodes(this.treeChecked)
    },

    // 关闭 预警范围 - dialog
    closeWarningDialog() {
      this.dataTransfer = []
    },

    // 预警范围  关闭 tag
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },

    // 预警范围 - 确定
    handlesubmitWaring() {
      this.warningRangeDialogVisible = false
      //   const rightransferArr = this.dynamicTags
      //   this.dynamicTags = rightransferArr.concat(JSON.parse(JSON.stringify(this.rightTransfer)))
      //   this.dynamicTags = JSON.parse(JSON.stringify(this.$refs.refTransfer.targetData))
      this.peekId()
    },

    //   预警范围 - 树
    handleWarningRange() {
      this.tableData = []
      this.warningRangeDialogVisible = true
      earlyWarning().then(res => {
        if (res.code === 200) {
          this.tableData = []
          const totalDataList = res.data.data
          totalDataList[0].disabled = true
          this.tableData.push(totalDataList[0])
        } else {
          this.$message({
            type: 'error',
            message: '获取预警范围出错！',
            duration: 6000,
            showClose: true
          })
        }
      })
      // getWarnrangapi().then(res => {
      //   if (res.code === 200) {
      //     res.data.disabled = true
      //     this.tableData.push(res.data)
      //   }
      // })
    },

    // 预警范围 右侧穿梭狂
    changeTransfer(value, direction, movedKeys) {

    },

    // 获取 父子 id
    peekId() {
      const rightData = this.$refs.refTransfer.targetData // 右穿梭
      const objOrgin = this.transferOrginData // 原始数据对象
      this.treeChecked = this.$refs.reftree.getCheckedNodes() // 树选中的数据
      rightData.forEach((item, idx) => {
        for (var org in objOrgin) {
          for (let index = 0; index < objOrgin[org].length; index++) {
            const element = objOrgin[org][index]
            var flag = true
            if (item.userId === element.userId) {
              flag = false
            }
            if (!flag) {
              this.treeChecked.forEach(tree => {
                if (tree.id === org) {
                  item.departmentId = tree.id
                  item.departmentName = tree.text
                  this.dynamicTags.push(item)
                  return
                }
              })
            }
          }
        }
      })
    },

    //  预警范围 左 穿梭框
    changeTree() {
      // const obj = {
      //   token: getToken(),
      //   deptId: this.$refs.reftree.getCheckedKeys().join()
      // }
      const idsArr = this.$refs.reftree.getCheckedKeys().join()
      if (idsArr !== '') {
        getrangNameapi(idsArr).then(res => {
          if (res.code === 200) {
            this.dataTransfer = []
            this.rightTransfer = []
            this.transferOrginData = res.data
            const objTree = res.data
            this.dataTransfer = Object.values(objTree).reduce((a, b) => [...a, ...b], [])
          }
        })
      } else {
        this.dataTransfer = []
        this.rightTransfer = []
      }
    },

    // 涉罪类型 - 选择
    handleModelname() {
      this.modelNameDialogVisible = true
      getCrimapi().then(res => {
        if (res.code === 200) {
          this.modelNameTableData = res.data
        }
      })
    },

    // 涉罪类型 - 确定
    handlesubmitModel() {
      if (this.multipleSelection.length === 1) {
        this.modelNameDialogVisible = false
        const item = this.multipleSelection[0]
        this.modelForm.preliminaryJudgment = item.codeId + '-' + item.codeDesc + '-' + item.codeName
      } else {
        this.$message({
          message: '只能选择一项',
          type: 'warning'
        })
      }
    },
    // 涉罪类型 -  table selection
    handleSelectionChangeModel(index, row) {
      this.multipleSelection = []
      this.multipleSelection.push(row)
    },
    // 保存
    handleSubmi() {
      this.$refs.refForm.validate(valid => {
        if (valid) {
          if (this.dynamicTags.length !== 0) {
            this.countFlag++
          } else {
            this.$message({
              message: '预警范围不能为空',
              type: 'warning'
            })
          }
        }
      })
      if (this.countFlag === 1) {
        var myobj = Object.assign({}, this.modelForm)
        myobj.preliminaryJudgment = this.modelForm.preliminaryJudgment.substr(0, 4)
        const obj = JSON.parse(JSON.stringify(myobj))
        if (this.$route.query.pageFlag === 'new') {
          obj.seniorNameListWarningRangeDoList = this.dynamicTags
          sendListapi(obj).then(res => {
            if (res.code === 200) {
              this.$message({
                message: '保存成功',
                type: 'success'
              })
              this.$router.go(-1)
            }
          })
        } else {
          obj.analyzeId = this.$route.query.analyzeId
          editListapi(obj).then(res => {
            if (res.code === 200) {
              this.$message({
                message: '保存成功',
                type: 'success'
              })
              this.$router.go(-1)
            }
          })
        }
      }
    },
    // 返回
    goBack() {
      if (JSON.parse(sessionStorage.getItem('searchData'))) {
        const obj = JSON.parse(sessionStorage.getItem('searchData'))
        obj.isReview = true
        sessionStorage.setItem('searchData', JSON.stringify(obj))
      }
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss">
.newSeniorlistWarningConfigur {
  position: relative;
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

  .el-tag + .el-tag {
    margin-left: 10px;
  }

  // .mustStyle{
  // .el-form-item__label:before {
  //   content: '*';
  //   color: #f56c6c;
  //   margin-right: 4px;
  // }
  // }


  .el-transfer-panel__body {
    .el-checkbox-group {
      .el-checkbox {
        margin-right: 56px;
      }
    }
  }
}
</style>