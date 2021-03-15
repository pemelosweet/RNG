<template>
  <div class="forewarningRule_add">
    <el-card>
      <div slot="header">
        <span>{{detailType}}规则</span>
      </div>
      <div class="searchBlock">
        <el-form :model="searchBlock" ref='addForm' label-width="114px" :rules='formRules'>
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item label="规则名称" prop='ruleName'>
                <el-input maxlength="50" v-model="searchBlock.ruleName" placeholder="最长50字符数"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="预警程度" prop='wornLevel'>
                <el-select v-model="searchBlock.wornLevel" clearable placeholder="请选择">
                  <el-option v-for="item in wornLevelArr" :key="item.codeId" :label="item.codeName" :value="item.codeId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="预警周期" prop='wornCycle'>
                <el-select v-model="searchBlock.wornCycle" clearable placeholder="请选择">
                  <el-option v-for="item in wornCycleArr" :key="item.codeId" :label="item.codeName" :value="item.codeId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item label="监测周期" prop='monitorCycle'>
                <el-date-picker value-format="yyyy-MM-dd" v-model="searchBlock.monitorCycle" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
                </el-date-picker>
              </el-form-item>
            </el-col>
            </el-row>
          <el-row>
            <el-col :span="5">
              <organization-tree v-on:showParentComp="getTemArr" :userArr="userArr" type='rule' :lableWidth="114" ref="tree"></organization-tree>
            </el-col>
            <el-col :span="19">
              <el-tag v-for="(itme,index) in userArr" closable @close="handleClose(itme,index)" :key="index"  style="marginLeft:15px;marginBottom:15px;marginTop:5px">
                {{itme.name}}
              </el-tag>             
            </el-col>
          </el-row>
        </el-form>

        <div class="AddBlock" style="marginBottom:30px">
          <el-form :model="AddBlock" ref='item'>
            <div style="marginBottom:10px">
              <span>设置预警条件</span>
              <el-button type="primary" plain style="marginLeft:20px;" @click="dialogVisible=true">选择条件</el-button>
            </div>
            <div style="paddingLeft:2%" v-for="(rule,index) in AddBlock" :key="index">
              <el-row :gutter="20" v-for="(item,itemIndex) in rule" :key="itemIndex">
                <!-- <el-col :span="2">
                  <span>{{item.wornValue}}</span>
                </el-col> -->
                <el-col :span="10">
                  <el-form-item v-if="item.desc" :label="item.wornValue" label-width="120px" :prop="index +'.'+itemIndex+'.selectValue'" :rules="[{required: item.fillOrNot, message: '此项不能为空', trigger: 'change' },{validator: isValidInput, trigger: 'blur'}]">
                    <el-select v-model="item.selectValue" clearable placeholder="请选择">
                      <el-option v-for="opt in item.basicRuleDO" :key="opt.value" :label="opt.brName" :value="opt.brId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="item.desc?'':item.wornValue" v-if="item.dicCode && item.wornValue.indexOf('交易发生地') == -1" :label-width="item.desc?'0px':'120px'" :prop="index +'.'+itemIndex+'.value'" :rules="[{required: item.fillOrNot, message: '此项不能为空', trigger: 'change' }]">
                    <el-select v-model="item.value" clearable placeholder="请选择" @focus="getItemSelect(item,item.dicCode,itemIndex)">
                      <el-option v-for="(item2,index2) in item.dictionaryArr" :key="index2" :value="item2.codeId" :label="item2.codeName"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item :label="item.desc?'':item.wornValue" v-if="item.dicCode && item.wornValue.indexOf('交易发生地') !== -1" :label-width="item.desc?'0px':'120px'" :prop="index +'.'+itemIndex+'.value'" :rules="[{required: item.fillOrNot, message: '此项不能为空', trigger: 'change' }]">
                    <el-select v-model="item.value" clearable filterable placeholder="请选择" @focus="getItemSelect(item,item.dicCode,itemIndex)">
                      <el-option v-for="(item2,index2) in item.dictionaryArr" :key="index2" :value="item2.codeId" :label="item2.codeName"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item :label="item.desc||item.dicCode?'':item.wornValue" v-if="item.paraType==='time'" :label-width="item.desc||item.dicCode?'0px':'120px'" :prop="index +'.'+itemIndex+'.date'" :rules="[{required: item.fillOrNot, message: '此项不能为空', trigger: 'blur'}]">
                    <el-date-picker v-model="item.date" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" unlink-panels>
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="item.desc||item.dicCode||item.paraType==='time'?'':item.wornValue" v-if="item.paraType==='text' && item.wornValue.indexOf('金额') == -1 && item.wornValue.indexOf('IP地址') == -1" :label-width="item.desc||item.dicCode||item.paraType==='time'?'0px':'120px'" :prop=" index +'.'+itemIndex+'.value'" :rules="[{required: item.fillOrNot, message: '此项不能为空', trigger: 'blur'},{validator: isValidInput, trigger: 'blur'}]">
                    <el-input maxlength="50" placeholder="最长50字符数" style="width:100%" v-model="item.value"></el-input>
                  </el-form-item>
                  <el-form-item :label="item.desc||item.dicCode||item.paraType==='time'?'':item.wornValue" v-if="item.paraType==='text' && item.wornValue.indexOf('金额') !== -1" :label-width="item.desc||item.dicCode||item.paraType==='time'?'0px':'120px'" :prop=" index +'.'+itemIndex+'.value'" :rules="[{required: item.fillOrNot, message: '此项不能为空', trigger: 'blur'},{validator: isValidMoney, trigger: 'blur'}]">
                    <el-input maxlength="50" placeholder="最长50字符数" style="width:100%" v-model="item.value"></el-input>
                  </el-form-item>
                   <el-form-item :label="item.desc||item.dicCode||item.paraType==='time'?'':item.wornValue" v-if="item.paraType==='text' && item.wornValue.indexOf('IP地址') !== -1" :label-width="item.desc||item.dicCode||item.paraType==='time'?'0px':'120px'" :prop=" index +'.'+itemIndex+'.value'" :rules="[{required: item.fillOrNot, message: '此项不能为空', trigger: 'blur'},{validator: isIpAddress, trigger: 'blur'}]">
                    <el-input maxlength="50" placeholder="最长50字符数" style="width:100%" v-model="item.value"></el-input>
                  </el-form-item>
                </el-col>
                <el-button v-if="itemIndex===rule.length-1" type="" icon="el-icon-plus" @click="addSingleRule(rule.docId,rule,item,itemIndex)"></el-button>
                <el-button v-if="itemIndex!==0||itemIndex!==rule.length-1" type="" icon="el-icon-minus" @click="delSingleRule(rule,item,itemIndex)"></el-button>

              </el-row>

            </div>
          </el-form>
        </div>
        <div class="btnBottom" style="textAlign:center">
          <el-button type="primary" @click="addRule('item')" :loading="loading">保 存</el-button>
          <el-button @click="goBack">返 回</el-button>
        </div>
      </div>
    </el-card>

    <!-- 弹窗 -->
    <el-dialog title="预警条件" :visible.sync="dialogVisible" class="warning-ele-dialog">
      <el-checkbox-group v-model="selectRule">
        <el-checkbox v-for="(item,index) in ruleArr" :key="index" :label="item.dicId">{{item.wornValue}}</el-checkbox>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false;closeDialog()">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </div>

    </el-dialog>

  </div>
</template>

<script>
import organizationTree from '@/views/sys-monitoringAnalysis/monitoringWarning/rosterWarning/components/organizationTree.vue'
import {
  checkElement,
  newRule,
  queryRule,
  updateRule
} from '@/api/sys-monitoringAnalysis/roster-warning/warning-rule.js'
import { dictionary } from '@/api/sys-monitoringAnalysis/roster-warning/common.js'
import { commonPattern } from '@/utils/formValidate'

export default {
  components: {
    organizationTree
  },
  data() {
    const isValidInput = (rule, value, callback) => {
      if (!commonPattern.spaceBar.test(value)) {
        callback(new Error('内容不能含有空格'))
      } else if (commonPattern.specialChar.test(value) || commonPattern.specialEng.test(value)) {
        callback(new Error('内容不能填写特殊字符'))
      } else {
        callback()
      }
    }

    return {
      searchBlock: {
        ruleName: '',
        wornLevel: '',
        wornCycle: '',
        monitorCycle: [],
        listWarnRangeDO: ''
      },
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      detailType: '新增',
      wornLevelArr: [], // 预警成度
      wornCycleArr: [], // 预警周期
      ruleArr: [], // 获取预警要素数据  后台
      renderRule: [], // 渲染要素
      selectRule: [], // 选择的要素
      AddBlock: {},
      dialogVisible: false,
      userArr: [],
      loading: false,
      formRules: {
        ruleName: [
          { required: true, message: '请输入规则名称', trigger: 'blur' },
          { validator: isValidInput, trigger: 'blur' }],
        wornLevel: [{ required: true, message: '请选择预警程度', trigger: 'blur' }],
        wornCycle: [{ required: true, message: '请选择预警周期', trigger: 'blur' }],
        monitorCycle: [{ required: true, message: '请选择监测周期', trigger: 'blur' }],
        listWarnRangeDO: [{ required: true, message: '请选择预警范围', trigger: 'blur' }]
        // num: [{ required: true, message: '请输入显示记录条数' }, { validator: numJudgement, message: '只能输入数字' }],
      }
    }
  },
  computed: {},
  watch: {
    selectRule(val) {
      // 把数组中的每项放到对象中
      val.forEach((item, index) => {
        this.ruleArr.forEach((rule, ruleIndex) => {
          if (rule.dicId === item) {
            if (!this.AddBlock[item]) {
              this.$set(this.AddBlock, item, [])
              // this.AddBlock[item] = []
              // this.AddBlock[item].push(rule)
              this.$set(this.AddBlock[item], 0, rule)
              // this.$set(this.AddBlock[item][0], 'dictionaryArr', [])
            }
          }
        })
      })
      // for in 遍历对象删除数组中没有的
      if (JSON.stringify(this.AddBlock) === '{}') {
        return
      } else {
        for (var key in this.AddBlock) {
          // console.log(this.params_ruleArr, 555555555555555)
          if (val.indexOf(key) === -1) {
            this.AddBlock[key].forEach(res => {
              res.value = ''
              res.selectValue = ''
              if (res.date) {
                res.date = []
              }
            })
            delete this.AddBlock[key]
          }
        }
      }
    }
  },
  methods: {
    // 获取字典
    getDictionary(params) {
      dictionary(params).then(res => {
        if (res.code === 200) {
          switch (params) {
            case 'WARNDEGREE':
              this.wornLevelArr = res.data
              break
            case 'WARNCYCLE':
              this.wornCycleArr = res.data
              break

            default:
              break
          }
        }
      })
    },
    // 获取预警要素
    getRule() {
      checkElement().then(res => {
        if (res.code === 200) {
          this.ruleArr = res.data
        }
      })
    },
    // 获取预警要素中的数据字典
    getItemSelect(item, params, index) {
      dictionary(params).then(res => {
        if (res.code === 200) {
          this.$set(this.AddBlock[item.dicId][index], 'dictionaryArr', res.data)
        }
      })
    },
    // 添加一条预警要素
    addSingleRule(id, rule, item, index) {
      if (index < 9) {
        const obj = JSON.parse(JSON.stringify(item))
        if (obj.selectValue) obj.selectValue = ''
        if (obj.date) obj.date = ''
        if (obj.value) obj.value = ''
        rule.push(obj)
      } else {
        this.$message({
          message: '单项预警条件不能超过十条！',
          type: 'error',
          duration: 6000
        })
      }
      // this.$set(this.AddBlock[item.dicId], index + 1, obj)
    },
    // 删除一条预警要素
    delSingleRule(rule, item, index) {
      rule.splice(index, 1)
    },
    isValidInput(rule, value, callback) {
      if (!commonPattern.spaceBar.test(value)) {
        callback(new Error('内容不能含有空格'))
      } else if (commonPattern.specialChar.test(value) || commonPattern.specialEng.test(value)) {
        callback(new Error('内容不能填写特殊字符'))
      } else {
        callback()
      }
    },
    // 新增规则
    addRule(formName) {
      if (this.$refs.tree) {
        this.searchBlock.listWarnRangeDO = this.$refs.tree.listWarnRangeDO
        if (this.$refs.tree.listWarnRangeDO.length === 0 && this.userArr.length > 0) {
          this.searchBlock.listWarnRangeDO = this.userArr
        }
      }
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$refs[formName].validate(validTwo => {
            if (validTwo) {
              const obj = Object.assign({}, this.searchBlock)
              delete obj.monitorCycle
              obj.mCycleStart = this.searchBlock.monitorCycle[0]
              obj.mCycleEnd = this.searchBlock.monitorCycle[1]
              const ruleBasicJson = {
                ruleDicNameDate: []
              }
              for (var key in this.AddBlock) {
                if (this.AddBlock[key]) {
                  this.AddBlock[key].forEach(item => {
                    const obj = JSON.parse(JSON.stringify(item))
                    delete obj.dictionaryArr
                    ruleBasicJson.ruleDicNameDate.push(obj)
                  })
                }
              }
              obj.ruleBasicJson = JSON.stringify(ruleBasicJson)
              obj.advancedWarning = '0'
              // if (this.$refs.tree) {
              //   obj.listWarnRangeDO = this.$refs.tree.listWarnRangeDO
              // }
              this.loading = true
              if (this.$route.query.id) {
                obj.ruleId = this.$route.query.id
                updateRule(obj).then(res => {
                  if (res.code === 200) {
                    this.loading = false
                    this.$message({
                      duration: 6000,
                      message: '修改成功！',
                      type: 'success'
                    })
                    this.$router.push({ name: 'forewarningRule' })
                  } else {
                    this.loading = false
                  }
                }).catch(() => {
                  this.loading = false
                })
              } else {
                newRule(obj).then(res => {
                  if (res.code === 200) {
                    this.loading = false
                    this.$message({
                      duration: 6000,
                      message: '保存成功！',
                      type: 'success'
                    })
                    this.$router.push({ name: 'forewarningRule' })
                  } else {
                    this.loading = false
                  }
                }).catch(() => {
                  this.loading = false
                })
              }
            } else {
              return false
            }
          })
        }
      })
    },
    getTemArr(data) {
      this.userArr = data
    },
    handleClose(item, index) {
      this.userArr.splice(index, 1)
      this.$refs.tree.source.data.forEach(res => {
        if (res.name === item.name) {
          res.diabled = false
        }
      })
      this.$refs.tree.listWarnRangeDO.splice(index, 1)
      this.$refs.tree.source.checked.splice(index, 1)
      this.$refs.tree.target.data.splice(index, 1)
    },
    // 金额校验
    isValidMoney(rule, value, callback) {
      var money = /(^[1-9]([0-9]+)?(\.[0-9]{1,3})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
      if (value == null) {
        callback(new Error('内容不能为空'))
      } else if (!money.test(value)) {
        callback(new Error('请输入正确的数字，最多保留三位小数!'))
      } else {
        callback()
      }
    },
    // ip校验
    isIpAddress(rule, value, callback) {
      if (value !== null) {
        if (value === '') {
          callback()
        } else {
          if (!commonPattern.ipAddress.test(value)) {
            callback(new Error('内容格式不符，如：127.0.0.1'))
          } else {
            callback()
          }
        }
      } else {
        callback()
      }
    },
    closeDialog() {
      this.selectRule = []
      this.AddBlock = {}
    },
    goBack() {
      this.$router.go(-1)
    },
    getDetail(id) {
      queryRule({ ruleId: id }).then(res => {
        if (res.code === 200) {
          if (res.data.selectRule.listWarnRangeDO.length !== 0) {
            this.userArr = res.data.selectRule.listWarnRangeDO
            this.searchBlock.listWarnRangeDO = res.data.selectRule.listWarnRangeDO
            this.userArr.forEach(res => {
              res.name = res.rangeName
              res.userId = res.id
            })
          }
          this.searchBlock.ruleName = res.data.selectRule.ruleName
          this.searchBlock.wornLevel = res.data.selectRule.wornLevel
          this.searchBlock.wornCycle = res.data.selectRule.wornCycle
          this.$set(this.searchBlock.monitorCycle, 0, res.data.selectRule.mCycleStart)
          this.$set(this.searchBlock.monitorCycle, 1, res.data.selectRule.mCycleEnd)
          const singleRuleData = res.data.selectByRuleId
          const AddBlock = {}
          const selectRule = []
          for (var item in singleRuleData) {
            selectRule.push(singleRuleData[item]['dic_id'])
          }
          // 去重selectRule
          this.selectRule = selectRule.filter(function(item, index) {
            return selectRule.indexOf(item, 0) === index
          })
          // 将相同dicId的条件放进同一数组 并加入大对象中
          this.selectRule.forEach(res => {
            for (var j = 0; j < singleRuleData.length; j++) {
              if (res === singleRuleData[j].dic_id) {
                if (AddBlock[res]) {
                  AddBlock[res].push(singleRuleData[j])
                }
                if (!AddBlock[res]) {
                  AddBlock[res] = []
                  AddBlock[res].push(singleRuleData[j])
                }
              }
            }
          })
          for (var itemx in AddBlock) {
            for (var x = 0; x < AddBlock[itemx].length; x++) {
              if (AddBlock[itemx][x].dic_code) {
                this.getItemSelect(AddBlock[itemx][x], AddBlock[itemx][x].dic_code, x)
              }
            }
          }
          for (var items in AddBlock) {
            this.ruleArr.forEach(res => {
              if (items === res.dicId) {
                for (var i = 0; i < AddBlock[items].length; i++) {
                  console.log(AddBlock[items][i])
                  AddBlock[items][i].basicRuleDO = res.basicRuleDO
                  AddBlock[items][i].desc = res.desc
                  AddBlock[items][i].dicCode = res.dicCode
                  AddBlock[items][i].dicId = res.dicId
                  AddBlock[items][i].enableState = res.enableState
                  AddBlock[items][i].fillOrNot = res.fillOrNot
                  AddBlock[items][i].nameCode = res.nameCode
                  AddBlock[items][i].paraType = res.paraType
                  AddBlock[items][i].wornValue = res.wornValue
                  if (AddBlock[items][i].basc_rule_id) {
                    AddBlock[items][i].selectValue = AddBlock[items][i].basc_rule_id
                    delete AddBlock[items][i].basc_rule_id
                  }
                  if (AddBlock[items][i].dic_code) {
                    delete AddBlock[items][i].dic_code
                  }
                  if (AddBlock[items][i].dic_id) {
                    delete AddBlock[items][i].dic_id
                  }
                  if (AddBlock[items][i].para_type) {
                    delete AddBlock[items][i].para_type
                  }
                  if (AddBlock[items][i].worn_value) {
                    delete AddBlock[items][i].worn_value
                  }
                  if (AddBlock[items][i].param_value) {
                    AddBlock[items][i].value = AddBlock[items][i].param_value
                    delete AddBlock[items][i].param_value
                  }
                  if (AddBlock[items][i].paraType === 'time') {
                    const arr = AddBlock[items][i].value.split('|')
                    if (arr.length !== 0) {
                      AddBlock[items][i].date = [arr[0], arr[1]]
                      delete AddBlock[items][i].value
                    }
                  }
                }
              }
            })
          }
          // setTimeout(() => {
          this.AddBlock = AddBlock
          // }, 1000)
        }
      })
    }
  },
  mounted() {
    this.getDictionary('WARNDEGREE')
    this.getDictionary('WARNCYCLE')
    this.getRule()
    if (this.$route.query.id) {
      this.getDetail(this.$route.query.id)
      this.detailType = '编辑'
    }
  }
}
</script>

<style lang="scss">
.forewarningRule_add {
  .searchBlock {
    .AddBlock {
      .el-select {
        width: 100%;
      }
      .el-range-editor {
        min-width: 100%;
      }
    }
  }
  .warning-ele-dialog {
    .el-checkbox {
      margin-left: 30px;
    }
  }
  .rang-dialog {
    .list {
      height: 350px;
      border: 1px solid #ebeef5;
      border-radius: 4px;
      overflow: hidden;
      background: #fff;
      display: inline-block;
      vertical-align: middle;
      width: 200px;
      max-height: 100%;
      box-sizing: border-box;
      position: relative;
      .title {
        position: relative;
        height: 40px;
        line-height: 40px;
        background: #f5f7fa;
        margin: 0;
        padding-left: 15px;
        border-bottom: 1px solid #ebeef5;
        box-sizing: border-box;
        color: #000;
        .title-num {
          position: absolute;
          right: 15px;
          color: #909399;
          font-size: 12px;
          font-weight: 400;
        }
      }
      .user {
        margin: 0;
        padding: 6px 0;
        list-style: none;
        height: 294px;
        overflow: auto;
        box-sizing: border-box;
        .el-checkbox {
          height: 30px;
          line-height: 30px;
          padding-left: 15px;
          display: block;
          margin-left: 0;
          &:hover {
            color: #409eff;
          }
        }
      }
    }
  }
}
</style>
