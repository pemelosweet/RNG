<template>
  <div class="receiveresult">
    <el-card>
      <a @click="routerBack" class="back" :style="backImg"></a>
      <div slot="header">
        <span>查看逐项比对结果</span>
      </div>
      <el-form ref="form" :model="form" label-width="90px" :rules="dialogRule">
        <el-col :span="8">
          <el-form-item label="交易ID：" prop="tradeId">
            <el-input v-model="form.tradeId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态：" prop="status">
            <el-select v-model="form.status" style="width:100%;">
              <el-option label="待处理" value="0"></el-option>
              <el-option label="已处理" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="对比结果：" prop="comparisonRes">
            <el-select v-model="form.comparisonRes" style="width:100%;">
              <el-option label="一致" value="一致"></el-option>
              <el-option label="不一致" value="不一致"></el-option>
              <el-option label="数据缺失" value="数据缺失"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form>
      <div class="btnalign">
        <el-button type="primary" @click="handleQuery">查询</el-button>
        <el-button type="primary" plain @click="clearForm">清空</el-button>
      </div>
      <div>
        <el-button type="primary" plain @click="handleAllContrast" :disabled="list.length > 0 && list[0].dealStatus === '1'" :loading="allContrastLoading">对比</el-button>
        <el-button type="primary" @click="handleCorrection" plain :loading="correctionLoading">人工补正</el-button>
        <el-button type="primary" @click="feedbackFn" plain>反馈</el-button>
      </div>
      <el-table :data="list" style="width:100%;" @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="tradeId" label="交易ID"></el-table-column>
        <el-table-column prop="dealStatus" label="状态">
          <template slot-scope="scope">
            {{scope.row.dealStatus === '0'? '待处理': scope.row.dealStatus === '1' ? '已处理' : ''}}
          </template>
        </el-table-column>
        <el-table-column prop="comparisonRes" label="对比结果"></el-table-column>
        <el-table-column prop="correctionSta" label="是否发送人工补正">
          <template slot-scope="scope">
            {{scope.row.correctionSta === '0' ? '否' : scope.row.correctionSta === '1' ? '是' : ''}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="text" @click="handleView($event, scope)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background :current-page="pageInfo.pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
      <!-- <div style="text-align: center;">
        <el-button type="primary" @click="callWorkFlow">提交审批</el-button>
        <el-button type="primary" plain @click="routerBack">返回</el-button>
      </div> -->
    </el-card>

    <!-- 详情弹框 -->
    <el-dialog title="详情" :visible.sync="detailVisible" @close="detaOpen">
      <div>
        <el-form :model="form2" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="比对结果：">
                <el-select v-model="form2.ecdComparisonRes" placeholder="请选择" class="box_width" clearable>
                  <el-option label="一致" value="一致"></el-option>
                  <el-option label="不一致" value="不一致"></el-option>
                  <el-option label="数据缺失" value="数据缺失"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12" style="text-align:right;">
              <el-button type="primary" @click="getViewDetailData">查询</el-button>
            </el-col>
          </el-row>
        </el-form>
        <div>交易ID:
          <span>{{tradeId}}</span>
        </div>
        <el-table :data="dialogList">
          <el-table-column prop="ecdElementItem" label="关键要素项"></el-table-column>
          <el-table-column prop="ecdCenterData" label="中心端数据项"></el-table-column>
          <el-table-column prop="ecdReportData" label="报送端数据项"></el-table-column>
          <el-table-column prop="ecdComparisonRes" label="比对结果"></el-table-column>
        </el-table>
        <el-pagination background @size-change="handleSizeChange"
      @current-change="handleCurrentChange" :current-page="dialogPageInfo.pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="dialogPageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="dTotal">
        </el-pagination>
        <el-form v-if="isShow">
          <el-form-item label="说明：">
            <el-input type="textarea"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailVisible = false">返回</el-button>
        <el-button type="primary" v-if="isShow">确定</el-button>
      </span>
    </el-dialog>

    <!-- 人工补正弹框 -->
    <el-dialog title="大额信息更正通知" :visible.sync="dialogVisible" width="90%">
      <large  @dialogState="closeDialog" :correctParams="correctParams"></large>
    </el-dialog>

    <monitor-workflow></monitor-workflow>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getRinmList } from '@/api/sys-monitoringAnalysis/statisticForm/large.js'
import {
  getResultList,
  viewData,
  contrastData,
  approvalStaus,
  feedback
} from '@/api/sys-monitoringAnalysis/dataGovernance/fixedPoint/receive'
import { correctCheck } from '@/api/sys-monitoringAnalysis/dataGovernance/artificialCorrection/launch.js'
import Large from '@/views/sys-monitoringAnalysis/dataGovernance/common/correction/large'
// import SuspiciousSingle from '@/views/sys-monitoringAnalysis/dataGovernance/common/correction/suspiciousSingle'
import { getUUIDTo } from '@/utils/index.js'
export default {
  components: {
    Large
  },
  data() {
    return {
      allContrastLoading: false,
      correctionLoading: false,
      backImg: {
        backgroundImage: 'url(' + require('@/assets/back/back.png') + ')',
        backgroundRepeat: 'no-repeat'
      },
      UUID: '',
      isShow: false,
      dialogVisible: false,
      detailVisible: false,
      form: {
        tradeId: '',
        status: '',
        comparisonRes: ''
      },
      dialogRule: {
        tradeId: [{ max: 50, message: '最大长度为50位', trigger: 'blur' }]
      },
      tradeId: '',
      multipleSelection: [],
      list: [],
      total: 0,
      pageInfo: {
        pageNum: 1,
        pageSize: 10
      },
      dialogList: [],
      dTotal: 0,
      dialogPageInfo: {
        pageNum: 1,
        pageSize: 10
      },
      form2: {
        ecdComparisonRes: ''
      },
      correctParams: {}, // 人工补正弹框传值
      resultId: this.$route.query.id,
      feedbackId: '',
      tempFicp: ''
    }
  },
  computed: {
    ...mapGetters(['roles', 'businessFlag', 'workFlow2business']),
    ricd() {
      return this.$route.query.ricd
    }
  },
  watch: {
    businessFlag(val) {
      if (val) this.nextStep()
    },
    resultId(val) {
      if (val) this.getData()
    }
  },
  mounted() {
    if (this.resultId) {
      this.getData()
      this.UUID = getUUIDTo()
    }
  },
  methods: {
    clearForm() {
      this.form = {
        tradeId: '',
        status: '',
        comparisonRes: ''
      }
    },
    detaOpen() {
      this.dialogPageInfo.pageNum = 1
      this.dialogPageInfo.pageSize = 10
    },
    handleSizeChange(val) {
      this.dialogPageInfo.pageNum = 1
      this.dialogPageInfo.pageSize = val
      this.getViewDetailData()
    },
    handleCurrentChange(val) {
      this.dialogPageInfo.pageNum = val
      this.getViewDetailData()
    },
    feedbackFn() {
      let statuTypes = true
      this.list.map(item => {
        if (item.dealStatus === '0') {
          statuTypes = false
        }
      })
      if (statuTypes) {
        feedback(this.$route.query.id).then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '反馈成功'
            })
            this.getData()
          }
        })
      } else {
        this.$message({
          type: 'warning',
          message: '未处理不能反馈'
        })
      }
    },
    callWorkFlow() {
      setTimeout(() => {
        this.$store.dispatch('workFlow', { configCode: 'receiver' })
        this.$store.dispatch('openWorkFlow', true)
      }, 500)
    },
    getData() {
      const obj = {
        tradeId: this.form.tradeId,
        dealStatus: this.form.status,
        comparisonRes: this.form.comparisonRes
      }
      getResultList(this.resultId, obj)
        .then(res => {
          if (res.code === 200) {
            this.list = res.data.list
            this.total = res.data.total
          }
        })
        .catch()
    },
    handleQuery() {
      this.getData()
    },
    nextStep() {
      approvalStaus(this.resultId, this.workFlow2business)
        .then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '提交成功！'
            })
            this.$store.dispatch('changeFlag', false)
            this.$router.push({ name: 'dataGovernance_fixedPoint_receive' })
          } else {
            this.$message.error('提交失败！')
          }
        })
        .catch()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      // this.title = '已选当前页' + this.multipleSelection.length + '项'
    },
    closeDialog(val) {
      // 人工补正组件接收子组件弹框dialogVisible传值
      this.dialogVisible = val
    },
    handleCorrection() {
      // 人工补正
      const length = this.multipleSelection.length
      if (length === 0) {
        this.$confirm('请至少选择一条数据', '提示', { showCancelButton: false, type: 'warning' })
          .then(() => {
            // 向请求服务端删除
          })
          .catch(() => {})
      } else if (length === 1) {
        if (this.multipleSelection[0].tradeId !== '' && this.multipleSelection[0].tradeId !== null) {
          this.correctionLoading = true
          this.getCorrectionData()
        } else {
          this.$message({
            type: 'warning',
            message: '交易ID不能为空'
          })
        }
      } else {
        const ricdType = false
        let tradeIdType = false
        const arr = []
        this.multipleSelection.map((item, i) => {
          arr.push(item.tradeId)
          if (item.tradeId === '' || item.tradeId === null) {
            tradeIdType = true
          }
        })
        if (ricdType) {
          this.$confirm('属于不同机构的交易，不可一起发起人工补正', '提示', {
            showCancelButton: false,
            type: 'warning'
          })
        } else if (tradeIdType) {
          this.$message({
            type: 'warning',
            message: '交易ID不能为空'
          })
        } else {
          this.correctionLoading = true
          this.getCorrectionData()
        }
      }
    },
    getCorrectionData() {
      this.tempFicp = ''
      const paramsObj = {
        region: 'all',
        ricd: this.ricd
      }
      getRinmList(paramsObj).then(res => {
        if (res.code === 200) {
          this.tempFicp = res.data[0].ficp
          const tempTradeIdArr = []
          this.multipleSelection.map(item => {
            if (item) {
              tempTradeIdArr.push(item.tradeId)
            }
          })
          const obj = {
            tradeId: tempTradeIdArr.toString(),
            industry: this.tempFicp
          }
          // artificialCorrection(tempTradeIdArr.toString(), this.tempFicp).then(res => {
          correctCheck(obj, this.UUID).then(res => {
            this.correctionLoading = false
            if (res.code === 200) {
              const arr = []
              this.multipleSelection.map(item => {
                if (item) {
                  arr.push(item.tradeId)
                }
              })

              this.correctParams = {
                tradeId: arr.toString(),
                correctType: '0',
                organ: '3',
                industry: this.tempFicp
              }
              this.dialogVisible = true
            }
          }).catch(() => {
            this.correctionLoading = false
          })
        }
      })
    },
    handleView(e, scope) {
      this.tradeId = scope.row.tradeId
      this.detailVisible = true
      this.form2.ecdComparisonRes = ''
      const txt = e.target.innerText
      if (txt === '查看') {
        this.isShow = false
        this.feedbackId = scope.row.id
        this.getViewDetailData()
      } else {
        this.isShow = true
        this.feedbackId = scope.row.id
        this.getContrastDetailData()
      }
    },
    getViewDetailData() {
      const mewDialogPageInfo = Object.assign({}, this.dialogPageInfo)
      mewDialogPageInfo.ecdComparisonRes = this.form2.ecdComparisonRes
      viewData(this.feedbackId, mewDialogPageInfo)
        .then(res => {
          if (res.code === 200) {
            this.dialogList = res.data.list
            this.dTotal = res.data.total
          }
        })
        .catch()
    },
    getContrastDetailData(ids) {
      contrastData(ids)
        .then(res => {
          this.allContrastLoading = false
          if (res.code === 200) {
            this.dialogList = res.data.list
            this.dTotal = res.data.total
            this.$message({
              type: 'success',
              message: '对比成功'
            })
            this.getData()
          }
        })
        .catch(() => {
          this.allContrastLoading = false
        })
    },
    handleAllContrast() {
      // 批量对比
      this.allContrastLoading = true
      const arr = []
      this.list
        .map(function(item) {
          arr.push(item.id)
        })
        .toString()
      const ids = arr.join('&ids=')
      console.log('ids', ids)
      this.getContrastDetailData(ids)
      // const length = this.multipleSelection.length
      // if (length === 0) {
      //   this.$confirm('请至少选择一条数据', '提示', { showCancelButton: false, type: 'warning' })
      //     .then(() => {})
      //     .catch(() => {})
      // } else {
      //   const arr = []
      //   this.list
      //     .map(function(item) {
      //       arr.push(item.id)
      //     })
      //     .toString()
      //   const ids = arr.join('&ids=')
      //   console.log('ids', ids)
      //   this.getContrastDetailData(ids)
      // }
    },
    routerBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">
.receiveresult {
  position: relative;
  .btnalign {
    text-align: right;
  }
}
</style>
