<template>
  <div class="extractresult">
    <el-card>
      <div slot="header">
        <span>查看逐项比对结果</span>
        <el-button type="text" style="float:right;" @click="$router.go(-1)">返回</el-button>
      </div>
      <el-form ref="form" :model="form" label-width="90px" :inline="true">
        <el-col :span="8">
          <el-form-item label="交易ID：" prop="tradeId">
            <el-input v-model="form.tradeId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="对比结果：" prop="tradeId">
            <el-select v-model="form.comparisonRes" clearable >
              <el-option label="一致" value="一致"></el-option>
              <el-option label="不一致" value="不一致"></el-option>
              <el-option label="数据缺失" value="数据缺失"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否发送人工补正：" prop="tradeId">
            <el-select v-model="form.correctionSta" clearable >
              <el-option label="否" value="0"></el-option>
              <el-option label="是" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form>
      <div class="btnalign">
        <el-button type="primary" @click="handleQuery">查询</el-button>
        <el-button type="primary" plain @click="resetForm('form')">清空</el-button>
      </div>
      <!-- <div style=" marginBottom: 10px; marginTop: 10px;">
        <el-button type="primary" @click="handleCorrection" plain>人工补正</el-button>
      </div> -->
      <el-table :data="list" style="width:100%;" @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="tradeId" label="交易ID"></el-table-column>
        <el-table-column prop="comparisonRes" label="对比结果"></el-table-column>
        <el-table-column prop="correctionSta" label="是否发送人工补正">
          <template slot-scope="scope">
            {{scope.row.correctionSta === '0' ? '否' : scope.row.correctionSta === '1' ? '是' : ''}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120" v-if="this.$route.query.isShow">
          <template slot-scope="scope">
            <el-button type="text" @click="handleView(scope)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>

    <!-- 详情弹框 -->
    <el-dialog title="详情" :visible.sync="detailVisible" @open="dialogOpen">
      <div>
        <el-form :model="form2" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="比对结果：">
                <el-select v-model="form2.ecdComparisonRes" placeholder="请选择" class="box_width" clearable>
                  <el-option label="一致" value="一致"></el-option>
                  <el-option label="不一致" value="不一致"></el-option>
                  <el-option label="数据缺失" value="缺失"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12" style="text-align:right;">
              <el-button type="primary" @click="getDetailData(tradeId)">查询</el-button>
            </el-col>
          </el-row>
        </el-form>
        <div>交易ID:
          <span>{{jiaoyitradeId}}</span>
        </div>
        <el-table :data="dtableDate">
          <el-table-column prop="ecdElementItem" label="关键要素项"></el-table-column>
          <el-table-column prop="ecdCenterData" label="中心端数据项"></el-table-column>
          <el-table-column prop="ecdReportData" label="报送端数据项"></el-table-column>
          <el-table-column prop="ecdComparisonRes" label="比对结果"></el-table-column>
        </el-table>
        <el-pagination @size-change="handleDsizeChange" @current-change="handleDcurrentChange" :current-page="dPageInfo.pageNum" :page-sizes="[10, 20, 30, 40]"
            :page-size="dPageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="dTotal" background></el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailVisible = false">返回</el-button>
      </span>
    </el-dialog>

      <!-- 大额/信息更正通知弹框 -->
      <!--getLargeVisible-->
      <el-dialog title="大额信息更正通知" :visible.sync="dialogVisible">
        <large @setLargeVisible="closeDialog" :correctParams="correctParams"></large>
      </el-dialog>

      <monitor-workflow></monitor-workflow>
  </div>
</template>

<script>
import { getResultList, getResultListBao, detailData, detailDataBao } from '@/api/sys-monitoringAnalysis/dataGovernance/fixedPoint/index'
import Large from '@/views/sys-monitoringAnalysis/dataGovernance/common/correction/large'

export default {
  components: {
    Large
  },
  data() {
    return {
      disabled: false,
      detailVisible: false,
      dialogVisible: false,
      tradeId: '',
      form: {
        tradeId: '',
        comparisonRes: '',
        correctionSta: ''
      },
      value: '',
      multipleSelection: [],
      list: [],
      pageInfo: {
        pageNum: 1,
        pageSize: 10
      },
      total: 1,
      dtableDate: [],
      dTotal: 0,
      dPageInfo: {
        pageNum: 1,
        pageSize: 10
      },
      form2: {
        ecdComparisonRes: ''
      },
      jiaoyitradeId: '',
      correctParams: {} // 人工补正弹框传值
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    dialogOpen() {
      this.dtableDate = []
      this.dPageInfo = {
        pageNum: 1,
        pageSize: 10
      }
      this.getDetailData(this.tradeId)
    },
    getData() {
      const id = this.$route.query.id
      const obj = Object.assign({}, this.form)
      const newObj = {
        comparisonRes: obj.comparisonRes,
        tradeId: obj.tradeId,
        correctionSta: obj.correctionSta,
        pageNum: this.pageInfo.pageNum,
        pageSize: this.pageInfo.pageSize
      }
      if (this.$route.query.moduleFlag === '1') {
        getResultListBao(id, newObj).then(res => {
          if (res.code === 200) {
            this.list = res.data.list
            this.total = res.data.total
          }
        })
          .catch()
      } else {
        getResultList(id, newObj).then(res => {
          if (res.code === 200) {
            this.list = res.data.list
            this.total = res.data.total
          }
        })
          .catch()
      }
    },
    handleQuery() {
      this.pageInfo.pageNum = 1
      this.getData()
    },
    resetForm(formName) {
      // 重置清空操作
      this.form = {
        tradeId: '',
        comparisonRes: '',
        correctionSta: ''
      }
    },
    handleSizeChange(val) {
      this.pageInfo.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.pageInfo.pageNum = val
      this.getData()
    },
    handleDsizeChange(val) {
      this.dPageInfo.pageSize = val
      this.getDetailData(this.tradeId)
    },
    handleDcurrentChange(val) {
      this.dPageInfo.pageNum = val
      this.getDetailData(this.tradeId)
    },
    closeDialog(val) {
      // 人工补正组件接收子组件弹框dialogVisible传值
      this.dialogVisible = val
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      // this.title = '已选当前页' + this.multipleSelection.length + '项'
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
        this.getCorrectionData()
      } else {
        this.multipleSelection.map((e, i = 1) => {
          if (
            this.multipleSelection[i].ricd !== this.multipleSelection[i + 1].ricd
          ) {
            this.$confirm('属于不同机构的交易，不可一起发起人工补正', '提示', {
              showCancelButton: false,
              type: 'warning'
            })
              .then(() => {
                // 向请求服务端删除
              })
              .catch(() => {})
          } else {
            this.getCorrectionData()
          }
        })
      }
    },
    getCorrectionData() {
      const arr = []
      this.multipleSelection.map(item => {
        if (item) {
          arr.push(item.tradeId)
        }
      })

      this.correctParams = {
        tradeId: arr.toString(),
        correctType: '0',
        organ: '3'
      }
      this.largeUpdateVisible = true
    },
    handleView(scope) {
      // 查看详情
      this.jiaoyitradeId = scope.row.tradeId
      this.tradeId = scope.row.id
      // const id = scope.row.id
      // this.getDetailData(id)
      this.disabled = true
      this.detailVisible = true

      this.form2.ecdComparisonRes = ''
    },
    getDetailData(id) {
      const newDPageInfo = Object.assign({}, this.dPageInfo)
      newDPageInfo.ecdComparisonRes = this.form2.ecdComparisonRes
      if (this.$route.query.moduleFlag === '0') {
        detailData(id, newDPageInfo).then(res => {
          if (res.code === 200) {
            this.dtableDate = res.data.list
            this.dTotal = res.data.total
          }
        }).catch()
      } else {
        detailDataBao(id, newDPageInfo).then(res => {
          if (res.code === 200) {
            this.dtableDate = res.data.list
            this.dTotal = res.data.total
          }
        }).catch()
      }
    }
  }
}
</script>

<style lang="scss">
.extractresult {
  .btnalign {
    text-align: right;
  }
}
</style>
