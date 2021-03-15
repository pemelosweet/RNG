<template>
  <div class="suspicious">
   <el-form :model="form" ref="form" label-width="180px">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="title">人工补正要求通知</div>
          <div class="noticeMain" >
            <el-col :span="24" style="font-weight:bold; font-size:16px; margin:0 0 15px 22px;">基本信息</el-col>
            <el-row>
              <el-form-item label="报告机构：">{{ form.reportBody }}</el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="更正完成时限：">
                <el-date-picker v-model="form.correctLimitTime" value-format="yyyyMMdd" format="yyyy-MM-dd" type="date" placeholder="选择更正完成时限" :picker-options="updataPickerOptions" disabled>
                </el-date-picker>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="更正填报要求：">{{ form.correctAsk }}</el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="原可疑交易报告报文名：">{{ form.ornm }}</el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="待更正可疑交易总数：">{{ form.askNum }}</el-form-item>
            </el-row>
            <div>
              <el-col :span="24" style="font-weight:bold; font-size:16px; margin:0 0 15px 22px;">交易信息</el-col>
              <el-table :data="form.list">
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column label="可疑交易在原可疑交易报告中的序号" prop="tsno" min-width="100"></el-table-column>
                <el-table-column label="待更正可疑交易发生日期"  prop="stdt" min-width="200">
                  <template slot-scope="scope">
                    <el-date-picker v-model="scope.row.stdt" type="datetime" value-format="yyyyMMddHHmmss" format="yyyy年MM月dd日 HH时mm分ss秒" placeholder="选择日期" disabled style="width: 100%;">
                    </el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column label="待更正字段"  prop="item" min-width="300">
                  <template slot-scope="scope">
                    <el-form-item :prop="'list.'+scope.$index+'.item'" class="change_length">
                      <el-select multiple placeholder="请选择待更正字段" v-model="scope.row.item" disabled clearable>
                        <el-option v-for="(item, index) in filedOptions" :key="index" :label="item.name" :value="item.code">
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
      <div class="dialog-footer">
        <el-button @click="onCancel">返 回</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import TradeDetail from '@/views/sys-monitoringAnalysis/dataGovernance/common/tradeDetail/components/tradeDetail'
import { getInfo, getFiled } from '@/api/sys-monitoringAnalysis/dataGovernance/artificialCorrection/launch'
import { getViewInfo } from '@/api/sys-monitoringAnalysis/dataGovernance/artificialCorrection/notice'

export default {
  props: {
    dialogVisible: {
      type: Boolean
    },
    correctParams: {
      type: Object
    }
  },
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
        correctAsk: '',
        ornm: '',
        correctLimitTime: '',
        list: [],
        askNum: ''
      },
      cNoticeHtml: '',
      filedOptions: [],
      detailOptions: null,
      correctId: '',
      pageNum: 1,
      pageSize: 1,
      total: null,
      contentList: null,
      suspVisible: this.dialogVisible
    }
  },
  watch: {
    dialogVisible(val) {
      if (val) this.getData()
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      if (this.$refs.form) {
        this.$refs.form.resetFields()
      }
      getViewInfo(this.correctParams.correctId).then(res => {
        if (res.code === 200) {
          this.form = res.data.report
          console.log('this.form.list')
          if (this.form.reportCode) {
            getInfo(this.correctParams, 1, 10).then(res1 => {
              if (res1.code === 200 && res1.data.list !== null) {
                this.getFiledInfo(this.form.reportCode, res1.data.list[0].dataSrc)
              }
            })
          }

          if (res.data.list.length > 0) {
            this.contentList = res.data.list
            const obj = JSON.parse(res.data.list[0])
            this.detailOptions = obj.trade
            this.total = res.data.list.length
          } else {
            this.detailOptions = '无数据'
          }
          this.form.askNum = this.form.list.length
        }
      }).catch()
    },
    getFiledInfo(ricd, dataSrc) {
      const paramsObj = {
        ricd: ricd,
        tradeType: '1',
        dataSrc: dataSrc
      }
      getFiled(paramsObj)
        .then(res => {
          // 获取字段列表
          if (res.code === 200) {
            this.filedOptions = res.data
          }
        })
        .catch(() => {})
    },
    onCancel() {
      this.suspVisible = false
      this.$emit('dialogState', this.suspVisible)
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
.suspicious {
  .el-table__header-wrapper .cell::before {
    content: '*';
    color: #f00;
    margin-right: 4px;
  }
  .el-date-editor--datetime {
    width: 250px !important;
  }
  .title {
    padding-bottom: 15px;
    padding-left: 15px;
    font-weight: 500;
    font-size: 16px;
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
  .el-table .el-table__row td {
    .cell {
      height: 100%;
      .el-form-item {
        margin-bottom: 0;
        .el-form-item__content {
          margin-left: 0px !important;
        }
      }
    }
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
