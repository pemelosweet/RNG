<template>
  <div class="correct-approval">
    <el-form :model="form" ref="form" :rules="largeRules" label-width="160px">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="title">人工补正要求通知</div>
          <div class="noticeMain">
            <el-row>
              <el-form-item label="报告机构：">{{ form.reportBody }}</el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="更正完成时限：" prop="correctLimitTime">
                <el-date-picker v-model="form.correctLimitTime" value-format="yyyyMMdd" format="yyyy-MM-dd" type="date" placeholder="选择更正完成时限" :picker-options="updataPickerOptions" :disabled="isUpdate" >
                </el-date-picker>
              </el-form-item>
            </el-row>
            <el-row>
              <!-- <el-form-item label="更正填报要求：">{{ form.correctAsk }}</el-form-item> -->
              <el-form-item label="更正填报要求：" prop="correctAsk">
                <el-input type="textarea" v-model="form.correctAsk" :disabled="isUpdate" placeholder="最大长度为1000位" maxlength="1000" show-word-limit rows="5"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="待更正大额交易总数：">{{ form.askNum }}</el-form-item>
            </el-row>
            <div>
              <el-table :data="form.list">
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column label="原客户号" prop="ocnm" min-width="120"></el-table-column>
                <el-table-column label="原大额交易发生日期" prop="otdt" width="200">
                  <template slot-scope="scope">
                    <el-date-picker v-model="scope.row.otdt" type="date" value-format="yyyyMMdd" format="yyyy-MM-dd" placeholder="选择日期" disabled>
                    </el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column label="原大额交易特征代码" prop="otcd" width="110">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.otcd" disabled>
                      <el-option v-for="(item,index) in largeOptions" :label="item.codeId" :value="item.codeId" :key="index"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column label="原业务标识号" prop="otic" min-width="160"></el-table-column>
                <el-table-column label="待更正字段" prop="item" min-width="300">
                  <template slot-scope="scope">
                    <el-form-item :prop="'list.'+scope.$index+'.item'" :rules="largeRules.item" class="change_length">
                      <el-select multiple placeholder="请选择" v-model="scope.row.item" :disabled="isUpdate" style="width: 100%;" clearable>
                        <el-option v-for="(sItem, index) in filedOptions" :key="index" :label="sItem.name" :value="sItem.code">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="title">原交易详情</div>
          <div class="noticeMain">
            <TradeDetail :detailOptions="detailOptions"></TradeDetail>
          </div>

          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { updateForm, addWork } from '@/api/sys-monitoringAnalysis/dataGovernance/artificialCorrection/launch.js'
import TradeDetail from '@/views/sys-monitoringAnalysis/dataGovernance/common/tradeDetail/components/tradeDetail'
import { getFiled, getInfo } from '@/api/sys-monitoringAnalysis/dataGovernance/artificialCorrection/launch'
import { dataTask } from '@/api/sys-monitoringAnalysis/dataGovernance/crossbodyAlignment/index'
import { isValidInput, isValidBlank, onlyNumberValidate } from '@/utils/formValidate.js'
export default {
  components: {
    TradeDetail
  },
  data() {
    return {
      updataPickerOptions: { // 更正时间 选中今天及以后
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      form: {
        reportBody: '',
        reportCode: '',
        correctLimitTime: '',
        correctAsk: '',
        list: []
      },
      isUpdate: true,
      largeRules: {
        rinm: [{ required: true, message: '内容不能为空', trigger: 'blur' }],
        // ricd: [{ required: true, message: '内容不能为空', trigger: 'blur' }],
        correctLimitTime: [{ required: true, message: '内容不能为空', trigger: 'change' }],
        correctAsk: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: isValidBlank, trigger: 'blur' },
          { max: 1000, message: '最大长度为1000位', trigger: 'blur' }
        ],
        askNum: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: onlyNumberValidate, trigger: 'blur' }
        ],
        ocnm: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: isValidInput, trigger: 'blur' },
          { max: 32, message: '最大长度为32位', trigger: 'blur' }
        ],
        otdt: [{ required: true, message: '内容不能为空', trigger: 'change' }],
        otcd: [{ required: true, message: '内容不能为空', trigger: 'change' }],
        otic: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: isValidInput, trigger: 'blur' },
          { max: 256, message: '最大长度为256位', trigger: 'blur' }
        ],
        item: [{ required: true, message: '内容不能为空', trigger: 'change' }]
      },
      detailOptions: null,
      correctId: '',
      disabled: true,
      filedOptions: [],
      largeOptions: [],
      pageNum: 1,
      pageSize: 1,
      total: null,
      contentList: null
    }
  },
  computed: {
    ...mapGetters(['businessFlag', 'workFlow2business', 'formContent'])
  },
  watch: {
    businessFlag(val) {
      if (val) this.updateForm()
      this.$store.dispatch('changeFlag', false)
    },
    formContent: {
      handler(newVal, oldVal) {
        const obj = {
          tradeId: newVal.report.tradeId,
          industry: newVal.report.industry,
          correctType: '0'
        }
        getInfo(obj, 1, 10).then(res1 => {
          if (res1.code === 200 && res1.data.list !== null) {
            const paramsObj = {
              ricd: newVal.report.reportCode,
              tradeType: '0',
              dataSrc: res1.data.list[0].dataSrc
            }
            getFiled(paramsObj)
              .then(res => {
                // 获取字段列表
                if (res.code === 200) {
                  this.filedOptions = res.data
                }
              })
              .catch(() => {})
          }
        })
        // const paramsObj = {
        //   ricd: newVal.report.reportCode,
        //   tradeType: '0',
        //   dataSrc: '1'
        // }
        // getFiled(paramsObj)
        //   .then(res => {
        //   // 获取字段列表
        //     if (res.code === 200) {
        //       this.filedOptions = res.data
        //     }
        //   })
        //   .catch(() => {})

        const typeId = 'CRCD'
        dataTask(typeId)
          .then(res => {
            if (res.code === 200) {
              this.largeOptions = res.data
            }
          })
          .catch()

        this.form = newVal.report
        if (newVal.list.length > 0) {
          newVal.list.forEach(element => {
            // this.tradeId.push(JSON.parse(element))
            // console.log(JSON.parse(element), '1010101011010110101')
          })
          this.contentList = newVal.list
          const obj = JSON.parse(newVal.list[0])
          this.detailOptions = obj.trade
          this.total = newVal.list.length
        } else {
          this.detailOptions = '无数据'
        }
        this.correctId = newVal.workflow.pkId
        if (newVal.workflow.nodeAttributes !== null && newVal.workflow.nodeAttributes[0].extendValue === 'Y') {
          this.isUpdate = false
        }
        // if (newVal.workflow.nodeAttributes[0].extendValue === 'Y') {
        //   this.isUpdate = false
        // }
      },
      deep: true
    }
  },
  methods: {
    updateForm() {
      if (this.isUpdate === false) {
        this.$refs.form.validate(validate => {
          if (validate) {
            const paramsObj = {
              correctType: '0',
              tradeId: this.form.tradeId,
              correctId: this.form.correctId,
              problemSource: '5',
              industry: this.form.industry,
              reportCode: this.form.reportCode,
              correctLimitTime: this.form.correctLimitTime,
              correctAsk: this.form.correctAsk,
              reportBody: this.form.reportBody,
              askNum: this.form.askNum,
              highTrades: this.form.list,
              workflow: this.workFlow2business
            }
            addWork(paramsObj).then(res => {
              if (res.code === 200) {
              // this.$emit('dialogState', this.largeVisible)
              // this.resetForm('form')
                updateForm(this.workFlow2business, this.correctId).then(res1 => {
                  if (res1.code === 200) {
                    this.$message({
                      message: '提交成功',
                      type: 'success'
                    })
                    setTimeout(() => {
                      this.$router.push({ name: 'home' })
                    }, 1000)
                  }
                }).catch(() => {
                  this.$message.error('提交失败！')
                })
              }
            }).catch(() => {
              this.$message.error('提交失败！')
            })
          }
        })
      } else {
        updateForm(this.workFlow2business, this.correctId).then(res1 => {
          if (res1.code === 200) {
            this.$message({
              message: '提交成功',
              type: 'success'
            })
            setTimeout(() => {
              this.$router.push({ name: 'home' })
            }, 1000)
          }
        }).catch(() => {
          this.$message.error('提交失败！')
        })
      }
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getPagInfo(val)
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.getPagInfo(val)
    },
    getPagInfo(val) {
      if (this.contentList[parseInt(val) - 1]) {
        this.detailOptions = JSON.parse(this.contentList[parseInt(val) - 1]).trade
      }
    }
  }
}
</script>

<style lang="scss">
.correct-approval {
  .el-table__header-wrapper .cell::before {
    content: '*';
    color: #f00;
    margin-right: 4px;
  }
  .noticeMain {
    // width: 100%;
    height: 300px;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 15px; 
    margin: 15px;
    border: 1px solid #eeeeee;
    font-size: 14px;
  }
  .title {
    margin: 10px 0 0 15px;
  }
  .el-form-item__content {
    word-wrap:break-word;
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
