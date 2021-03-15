<template>
  <div class="systemManage--ruel-configer">
    <el-card>
      <div slot="header" class="clearfix">
        <span>预警规则配置</span>
        <el-button type="text" style="float:right" @click="addRuleFn">新增</el-button>
      </div>
      <el-table :data="tableData">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="预警要素名称" prop="wornValue"></el-table-column>
        <el-table-column label="展示形式" prop="fillOrNot" min-width="350" align="left">
          <template slot-scope="scope">
            <el-select v-if="scope.row.desc" v-model="taleItemSelect" placeholder="" disabled style="width:120px">
            </el-select>
            <el-select v-if="scope.row.dicCode" v-model="taleItemSelect" placeholder="" disabled style="width:120px">
            </el-select>
            <el-date-picker v-if="scope.row.paraType==='time'" v-model="tableItemDate" disabled type="daterange" range-separator="至" placeholder="" style="width:260px"></el-date-picker>
            <el-input v-if="scope.row.paraType==='text'" v-model="tableItemInp" style="width:240px" disabled placeholder=""></el-input>
          </template>
        </el-table-column>
        <el-table-column label="是否必填" prop="fillOrNot">
          <template slot-scope="scope">
            <span>{{scope.row.fillOrNot?'是':'否'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="fillOrNot">
          <template slot-scope="scope">
            <span>{{scope.row.enableState==0?'启用':'停用'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-button type="text" @click="killRuleFn(scope)" v-if="scope.row.enableState==1">启用</el-button>
            <el-button type="text" v-else @click="killRuleFn(scope)" >停用</el-button>
            <el-button type="text" @click="modifyRule(scope)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="规则" :visible.sync='dialogVisible' @close="closeDialog">
      <el-form :model="form" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="预警要素名称" prop="eleName" :rules="{ required: true, message: '请选择要素名称', trigger: 'blur' }">
              <el-select v-model="form.eleName" placeholder="请选择要素名称">
                <el-option v-for="(item,index) in form.elementArr" :value="item.codeName+','+item.codeId" :label="item.codeName" :key="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否必填">
              <el-radio-group v-model="form.isRequired">
                <el-radio :label='true'>是</el-radio>
                <el-radio :label="false">否</el-radio>

              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="逻辑类型">
          <el-radio-group v-model="form.basicRule">
            <!-- <el-radio label="是/否">是/否</el-radio> -->
             <el-radio label="" >取消</el-radio>
            <el-radio label="isContain" >包含/不包含</el-radio>
            <el-radio label="isCompare" >算数比较</el-radio>
           
          </el-radio-group>
        </el-form-item>
        <el-form-item label="规则类型">
          <el-radio-group v-model="form.ruleType">
            <el-radio label="">取消</el-radio>
            <el-radio label="数据字典">数据字典</el-radio>
            <el-radio label="时间范围">时间范围</el-radio>
            <el-radio label="文本">文本</el-radio>
          </el-radio-group>

        </el-form-item>
        <el-form-item :label="labelTitle" :class="{arithmetic:form.ruleType==='算数比较'}">
          <el-input v-if="form.ruleType==='数据字典'" v-model="form.dicCode" placeholder="请手动输入字典值"></el-input>
          <el-date-picker disabled v-else-if="form.ruleType=='时间范围'" v-model="form.dateRange" type="daterange" range-separator="至" placeholder=""></el-date-picker>
          <template v-else-if="form.ruleType==='算数比较'">
            <el-select placeholder="">
              <!-- <el-option value="大于">大于</el-option> -->
            </el-select>
            <el-input placeholder=""></el-input>
          </template>
          <el-input v-else-if="form.ruleType==='文本'" disabled placeholder=""></el-input>

        </el-form-item>

      </el-form>

      <div slot="footer">
        <el-button type="primary" @click="addFn">保存</el-button>
        <el-button @click="dialogVisible=false">取消</el-button>

      </div>
    </el-dialog>

  </div>
</template>
<script>
import {
  getElement,
  addRule,
  getTableRule,
  killRule
} from '@/api/sys-monitoringAnalysis/roster-warning/rule-config.js'
export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      dialogType: '',
      form: {
        eleName: '',
        elementArr: [],
        isRequired: true,
        basicRule: '',
        noContain: '',
        ruleType: '',
        dicCode: '',
        dateRange: '',
        arithmetic: '',
        arithmeticValue: '',
        text: ''
      },
      paraType: '',
      taleItemSelect: '',
      tableItemDate: '',
      tableItemInp: '',
      dicId: '',
      ruleMethod: 'post'
    }
  },

  computed: {
    changeType() {
      return this.form.ruleType
    },

    labelTitle() {
      if (this.form.ruleType === '数据字典') {
        return '字典值'
      } else {
        this.form.dicCode = ''
        return ''
      }
    },
    params() {
      const temArr = this.form.eleName.split(',')
      return {
        wornValue: temArr[0],
        paraType: this.paraType,
        nameCode: temArr[1],
        fillOrNot: this.form.isRequired,
        dicCode: this.form.dicCode,
        desc: this.form.basicRule,
        dicId: this.dicId
      }
    }
  },

  methods: {
    getTable() {
      getTableRule()
        .then((res) => {
          if (res.code === 200) {
            this.tableData = res.data
          }
        })
    },
    // 获取字典
    elemnt() {
      getElement('ELEMENT').then(res => {
        if (res.code === 200) {
          this.form.elementArr = res.data
        }
      })
    },
    // 修改和添加方法
    addFn() {
      if (this.form.basicRule === '' && this.form.ruleType === '') {
        this.$message({
          message: '逻辑类型和规则类型不能同时取消',
          type: 'error'
        })
      } else {
        addRule(this.params, this.ruleMethod)
          .then(res => {
            if (res.code === 200) {
              if (this.dialogType === 'add') {
                this.$message({
                  message: '添加成功',
                  type: 'success'
                })
              } else {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
              }
            }
          })
          .then(() => {
            this.dialogVisible = false
            this.getTable()
          })
      }
    },
    // 关闭弹窗
    closeDialog() {
      this.form.eleName = ''
      this.form.ruleType = ''
      this.form.isRequired = true
      this.form.basicRule = ''
      this.dicId = ''
    },
    // 启用禁用预警条件
    killRuleFn(scope) {
      const params = {
        state: scope.row.enableState ? 0 : 1,
        dicId: scope.row.dicId
      }
      this.$confirm(`是否${scope.row.enableState ? '启用' : '停用'}？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        killRule(params)
          .then(res => {
            if (res.code === 200) {
              this.$message({
                message: '状态修改成功',
                type: 'success'
              })
              this.getTable()
            }
          })
      }).catch(() => {})
    },
    // 点击新增按钮
    addRuleFn() {
      this.dialogType = 'add'
      this.dialogVisible = true
      this.ruleMethod = 'post'
    },
    // 修改预警条件
    modifyRule(scope) {
      this.dialogType = 'update'
      this.ruleMethod = 'put'
      this.form.eleName = scope.row.wornValue + ',' + scope.row.nameCode
      this.form.ruleType = scope.row.dicCode ? '数据字典' : (scope.row.paraType === 'time' ? '时间范围' : '文本')
      this.form.isRequired = scope.row.fillOrNot
      this.form.basicRule = scope.row.desc ? scope.row.desc : ''
      this.form.dicCode = scope.row.dicCode ? scope.row.dicCode : ''
      this.dicId = scope.row.dicId
      this.dialogVisible = true
      console.log(this.params, 111111111)
    }
  },
  created() {
    this.getTable()
    this.elemnt()
  },
  updated() {
    console.log(this.params)
  },
  watch: {
    changeType: function(val) {
      if (val === '时间范围') {
        this.paraType = 'time'
      } else if (val === '文本') {
        this.paraType = 'text'
      } else {
        this.paraType = ''
      }
    }
  }
}
</script>
<style  lang="scss">
.systemManage--ruel-configer {
  .arithmetic {
    .el-select {
      width: 30%;
      .el-input {
        width: 100%;
      }
    }
    .el-input {
      width: 60%;
    }
  }
}
</style>

