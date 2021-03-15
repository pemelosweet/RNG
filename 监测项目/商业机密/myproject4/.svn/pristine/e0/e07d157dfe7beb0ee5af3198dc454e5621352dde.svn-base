<template>
  <el-card class="rosterManageBranch-depAdd">
    <div slot="header" class="clearfix">
      <span>新建配置</span>
    </div>
    <el-row :getter="20">
      <el-form :model="form" ref="formContainer" :rules="formRules" label-width="150px">
        <el-col :span="14">
          <el-form-item label="涉罪类型名称：">
            <el-input v-model="form.involvedVal"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="描述（选填）：">
            <el-input type="textarea" :rows="6" v-model="form.textareaVal"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="涉罪类型：">
            <el-button type="primary" @click="crimeBombBox = true">选 择</el-button>
          </el-form-item>
          <el-form-item label="已选：" v-if="checkList.length > 0">
            <span v-for="(el, index) in checkList" :key="index" style="margin-right:20px;color:#409EFF;">{{el}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="名单预警范围：">
            <el-button type="primary" @click="listWarningBombFn">选 择</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <div class="bottomDiv">
      <el-button type="primary" @click="preservationBtn">保存</el-button>
      <el-button type="primary" @click="cancelBtn">取消</el-button>
    </div>
    <!-- 涉罪类型弹框start -->
    <el-dialog title="选择涉罪类型" :visible.sync="crimeBombBox" class="dialogJudgment-dialog" width="60%" @selection-change="handleSelectionChange">
      <el-checkbox-group v-model="checkList">
        <el-checkbox v-for="item in tableData" :key="item.codeId" :label="item.codeName" :value="item.codeId"></el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="crimeBombBox = false">取 消</el-button>
        <el-button type="primary" @click="crimeBombBox = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 涉罪类型弹框end -->

    <!-- 名单预警范围弹框start -->
    <el-dialog title="预警范围" :visible.sync="listWarningBomb" width="40%">
      <el-tree :data="treeShapeData" ref="tree" show-checkbox node-key="id" :props="props"></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="listWarningBomb = false">取 消</el-button>
        <el-button type="primary" @click="listWarningBomb = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 名单预警范围弹框end -->
  </el-card>  
</template>

<script>
  import { getTree } from '@/api/sys-monitoringAnalysis/roster-warning/common.js'
  import { preservationApi } from '@/api/sys-monitoringAnalysis/roster-warning/roster-manage.js'
  import { crimeApi } from '@/api/sys-monitoringAnalysis/statisticForm/obligationSituation.js'
  export default {
    data() {
      return {
        checkList: [],
        multipleSelection: [],
        tableData: [],
        crimeBombBox: false,
        listWarningBomb: false,
        involvedData: [],
        form: {
          involvedVal: '',
          textareaVal: ''
        },
        formRules: {},
        treeShapeData: [],
        props: {
          label: 'text',
          children: 'children'
        },
        treeShapeList: ''
      }
    },
    mounted() {
      this.typesOfCrimeInvolved()
      getTree().then(res => {
        if (res.code === 200) {
          const resArr = res.data
          console.log(resArr)
          resArr.children.pop()
          resArr.children.pop()
          resArr.children.pop()
          this.treeShapeData.push(resArr)
        }
      })
    },
    methods: {
      listWarningBombFn() {
        this.listWarningBomb = true
      },
      preservationBtn() {
        var arr = this.$refs.tree.getCheckedKeys()
        var newArr = []
        console.log(this.treeShapeData[0].children[0].children)
        for (var i = 0; i < this.treeShapeData[0].children[0].children.length; i++) {
          for (var j = 0; j < arr.length; j++) {
            if (this.treeShapeData[0].children[0].children[i].id === arr[j]) {
              newArr.push(this.treeShapeData[0].children[0].children[i].text)
            }
          }
        }
        const listAnalyzeRelationDO = {
          pJName: this.form.involvedVal,
          describe: this.form.textareaVal,
          preliminaryJudgment: this.checkList.join(','),
          anOffice: newArr.join(',')
        }
        preservationApi(listAnalyzeRelationDO).then(res => {
          if (res.code === 200) {
            this.$message({
              message: '保存成功',
              type: 'success',
              duration: 6000
            })
            this.$router.go(-1)
          } else {
            this.$message({
              message: res.message,
              type: 'error',
              duration: 6000
            })
          }
        })
      },
      // 获取涉罪类型
      typesOfCrimeInvolved() {
        crimeApi('TOSC').then(res => {
          if (res.code === 200) {
            this.tableData = res.data
          }
        })
      },
      // 取消按钮
      cancelBtn() {
        this.$router.go(-1)
      },
      // 涉罪类型弹框列表选择的内容
      handleSelectionChange(val) {
        this.multipleSelection = val
      }
    }
  }
</script>

<style lang="scss">
.rosterManageBranch-depAdd {
  .bottomDiv {
    width: 100%;
    height: auto;
    text-align: center;
    padding-top: 50px;
  }
  .dialogJudgment-dialog {
    .el-dialog__body {
      max-height: 60vh;
      overflow: auto;
      .el-checkbox {
        display: block;
        margin-left: 12px;
      }
    }
  }
}
</style>