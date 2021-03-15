<template>
  <div class="report-large-wrap" v-loading="loading" element-loading-text="正在加载中"
    element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
      <el-form :model="form" ref="form" label-width="200px">
        <!-- 第一行 --> 
        <div>
        <el-row>
          <el-col :span="12"><div class="title">{{baseTitle}}</div></el-col>
          <el-col :span="12" style="text-align: right;" v-if="!isBranch"><el-button type="primary" @click="handleEvaluate">评价</el-button></el-col>
        </el-row>          
        <el-row :gutter="20">
          <el-col :span="12">
            <div v-for="(val, key) in detailLeft" :key="key">
              <el-col :span="24" style="border-right: 1px solid #eee;">
                <el-form-item :label="key + '：'" v-if="Object.prototype.toString.call(val) == '[object String]' || Object.prototype.toString.call(val) == '[object Null]' || Object.prototype.toString.call(val) == '[object Number]'">
                  <span class="label-item">{{val}}</span>
                </el-form-item>
                <!-- <div v-if="index % 2 ==0"> -->
                  <div v-if="Object.prototype.toString.call(val) == '[object Object]' || Object.prototype.toString.call(val) == '[object Array]'">
                    <div class="title">{{key}}</div>
                    <div class="active-border">
                      <div v-for="(oVal, oKey) in val" :key="oKey">
                        <el-form-item :label="oKey + '：'" v-if="Object.prototype.toString.call(oVal) == '[object String]' || Object.prototype.toString.call(oVal) == '[object Null]' || Object.prototype.toString.call(oVal) == '[object Number]'">
                          <span class="label-item">{{oVal}}</span>
                        </el-form-item>
                        <div v-if="Object.prototype.toString.call(oVal) == '[object Object]' || Object.prototype.toString.call(oVal) == '[object Array]'">
                          <div class="title">{{oKey}}</div>
                          <div>
                            <div v-for="(tVal, tKey) in oVal" :key="tKey">
                              <el-form-item :label="tKey + '：'" v-if="Object.prototype.toString.call(tVal) == '[object String]' || Object.prototype.toString.call(tVal) == '[object Null]' || Object.prototype.toString.call(tVal) == '[object Number]'">
                                <span class="label-item">{{tVal}}</span>
                              </el-form-item>
                              <div v-if="Object.prototype.toString.call(tVal) == '[object Object]' || Object.prototype.toString.call(tVal) == '[object Array]'">
                                <!-- <div class="title">{{tKey}}</div> -->
                                <div>
                                  <div v-for="(thVal, thKey) in tVal" :key="thKey">
                                    <el-form-item :label="thKey + '：'" v-if="Object.prototype.toString.call(thVal) == '[object String]' || Object.prototype.toString.call(thVal) == '[object Null]' || Object.prototype.toString.call(thVal) == '[object Number]'">
                                      <span class="label-item">{{thVal}}</span>
                                    </el-form-item>
                                    <div v-if="Object.prototype.toString.call(thVal) == '[object Object]' || Object.prototype.toString.call(thVal) == '[object Array]'">
                                      <div class="title">{{thKey}}</div>
                                      <div>
                                        <div v-for="(fVal, fKey) in thVal" :key="fKey">
                                          <el-form-item :label="fKey + '：'" v-if="Object.prototype.toString.call(fVal) == '[object String]' || Object.prototype.toString.call(fVal) == '[object Null]' || Object.prototype.toString.call(fVal) == '[object Number]'">
                                            <span class="label-item">{{fVal}}</span>
                                          </el-form-item>
                                          <div v-if="Object.prototype.toString.call(fVal) == '[object Object]' || Object.prototype.toString.call(fVal) == '[object Array]'">
                                            <div class="title">{{fKey}}</div>
                                            <div>
                                              <div v-for="(fiVal, fiKey) in fVal" :key="fiKey">
                                                <el-form-item :label="fiKey + '：'" v-if="Object.prototype.toString.call(fiVal) == '[object String]' || Object.prototype.toString.call(fiVal) == '[object Null]'">
                                                  <span class="label-item">{{fiVal}}</span>
                                                </el-form-item>
                                                <!-- <el-form-item :label="fiKey">
                                                  <span>{{fiVal}}</span>
                                                </el-form-item> -->
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                <!-- </div> -->
              </el-col>
            </div>
          </el-col>
          <el-col :span="12">
            <div v-for="(val, key) in detailRight" :key="key">
              <el-col :span="24">
                <el-form-item :label="key + '：'" v-if="Object.prototype.toString.call(val) == '[object String]' || Object.prototype.toString.call(val) == '[object Null]' || Object.prototype.toString.call(val) == '[object Number]'">
                  <span class="label-item">{{val}}</span>
                </el-form-item>
                <div v-if="Object.prototype.toString.call(val) == '[object Object]' || Object.prototype.toString.call(val) == '[object Array]'">
                  <div class="title">{{key}}</div>
                  <div class="active-border">
                    <div v-for="(oVal, oKey) in val" :key="oKey">
                      <el-form-item :label="oKey + '：'" v-if="Object.prototype.toString.call(oVal) == '[object String]' || Object.prototype.toString.call(oVal) == '[object Null]' || Object.prototype.toString.call(oVal) == '[object Number]'">
                        <span class="label-item">{{oVal}}</span>
                      </el-form-item>
                      <div v-if="Object.prototype.toString.call(oVal) == '[object Object]' || Object.prototype.toString.call(oVal) == '[object Array]'">
                        <div class="title">{{oKey}}</div>
                        <div>
                          <div v-for="(tVal, tKey) in oVal" :key="tKey">
                            <el-form-item :label="tKey + '：'" v-if="Object.prototype.toString.call(tVal) == '[object String]' || Object.prototype.toString.call(tVal) == '[object Null]' || Object.prototype.toString.call(tVal) == '[object Number]'">
                              <span class="label-item">{{tVal}}</span>
                            </el-form-item>
                            <div v-if="Object.prototype.toString.call(tVal) == '[object Object]' || Object.prototype.toString.call(tVal) == '[object Array]'">
                              <!-- <div class="title">{{tKey}}</div> -->
                              <div>
                                <div v-for="(thVal, thKey) in tVal" :key="thKey">
                                  <el-form-item :label="thKey + '：'" v-if="Object.prototype.toString.call(thVal) == '[object String]' || Object.prototype.toString.call(thVal) == '[object Null]' || Object.prototype.toString.call(thVal) == '[object Number]'">
                                    <span class="label-item">{{thVal}}</span>
                                  </el-form-item>
                                  <div v-if="Object.prototype.toString.call(thVal) == '[object Object]' || Object.prototype.toString.call(thVal) == '[object Array]'">
                                    <div class="title">{{thKey}}</div>
                                    <div>
                                      <div v-for="(fVal, fKey) in thVal" :key="fKey">
                                        <el-form-item :label="fKey + '：'" v-if="Object.prototype.toString.call(fVal) == '[object String]' || Object.prototype.toString.call(fVal) == '[object Null]' || Object.prototype.toString.call(fVal) == '[object Number]'">
                                          <span class="label-item">{{fVal}}</span>
                                        </el-form-item>
                                        <div v-if="Object.prototype.toString.call(fVal) == '[object Object]' || Object.prototype.toString.call(fVal) == '[object Array]'">
                                          <div class="title">{{fKey}}</div>
                                          <div>
                                            <div v-for="(fiVal, fiKey) in fVal" :key="fiKey">
                                              <el-form-item :label="fiKey + '：'" v-if="Object.prototype.toString.call(fiVal) == '[object String]' || Object.prototype.toString.call(fiVal) == '[object Null]'">
                                                <span class="label-item">{{fiVal}}</span>
                                              </el-form-item>
                                              <!-- <el-form-item :label="fiKey">
                                                <span>{{fiVal}}</span>
                                              </el-form-item> -->
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-col>
            </div>
          </el-col>
        </el-row>
        </div>
        <el-row v-if="cData">
          <div class="title">{{clientTitle}}</div>
          <el-table :data="clientList" v-loading="cLoading" element-loading-text="正在加载中"
    element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
            <el-table-column :label="date" v-for="(date, key) in clientHeader" :key="key" min-width="200" show-overflow-tooltip>
              <template slot-scope="scope">
                {{clientList[scope.$index][key]}}
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @size-change="handleSizeChange"  @current-change="handleCurrentChange" :current-page="clientPageInfo.pageNum" :page-sizes="[5, 10, 15, 20]" :page-size="clientPageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="clientTotal" background></el-pagination>
        </el-row>

        <el-row v-if="tData">
          <div class="title">{{tradeTitle}}</div>
          <el-table :data="tradeList" v-loading="tLoading" element-loading-text="正在加载中"
    element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
            <el-table-column :label="date" v-for="(date, key) in tradeHeader" :key="key" min-width="200" show-overflow-tooltip>
              <template slot-scope="scope">
                {{tradeList[scope.$index][key]}}
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @size-change="handleSizeTradeChange" @current-change="handleCurrentTradeChange" :current-page="tradePageInfo.pageNum" :page-sizes="[5, 10, 15, 20]" :page-size="tradePageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tradeTotal" background></el-pagination>
        </el-row> 
        <el-row v-if="fData">
          <div class="title">相关附件</div>
          <el-table :data="downList" v-loading="fLoading" element-loading-text="正在加载中"
    element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
            <el-table-column type="index" label="序号" min-width="100"></el-table-column>
            <el-table-column prop="file" label="文件名称" min-width="200"></el-table-column>
            <el-table-column label="操作" min-width="100">
              <template slot-scope="scope">
                <el-button type="text" @click="handleDown(scope)">下载</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onCancel">取消</el-button>
      </div>
      <sampling :dialogType="dialogType" :queryObj="queryObj" :ricd="myricd" :xmlId="myxmlId" @dialogSwitch="dialogSwith"></sampling>
    <!-- </el-card> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
// import Markproblem from '@/views/sys-monitoringAnalysis/dataQuery/dataType/markProblem'
import { getReortBaseList, getReportCustomerList, getReportTradeList, getAttachmentList } from '@/api/sys-monitoringAnalysis/dataQuery/dataType'
import sampling from '@/views/sys-monitoringAnalysis/dataGovernance/samplingEvaluation/randomSampling/sampling.vue'
export default {
  props: {
    tradeDetailInfo: Object,
    tradeDetailVisible: Boolean
  },
  data() {
    return {
      queryObj: {},
      loading: false,
      loadingState: false,
      myricd: '',
      myxmlId: '',
      dialogType: false,
      dialogVisible: this.tradeDetailVisible,
      form: {},
      detailOptions: null,
      detailLeft: {},
      detailRight: {},
      clientList: [],
      clientHeader: {},
      clientPageInfo: {
        pageSize: 5,
        pageNum: 1
      },
      clientTotal: 0,
      tradeList: [],
      tradeHeader: {},
      tradePageInfo: {
        pageSize: 5,
        pageNum: 1
      },
      tradeTotal: 0,
      baseTitle: '',
      clientTitle: '',
      tradeTitle: '',
      markdialogVisible: false,
      cLoading: false,
      tLoading: false,
      fLoading: false,
      cData: false,
      tData: false,
      fData: false,
      downList: [],
      token: getToken()
    }
  },
  mounted() {
    this.getData()
  },
  computed: {
    ...mapGetters(['institution']),
    isBranch() {
      return this.institution === this.GLOBAL.INSTITUTION_BRANCH
    }
  },
  watch: {
    tradeDetailVisible(val) {
      if (val) this.getData()
    }
  },
  components: {
    sampling
  },
  methods: {
    dialogSwith(val) {
      this.dialogType = val
    },
    initData() {
      this.loading = false
      this.cLoading = false
      this.tLoading = false
      this.fLoading = false
      this.cData = false
      this.tData = false
      this.fData = false
      this.loadingState = false
      // 交易
      this.tradePageInfo.pageNum = 1
      this.tradeTitle = ''
      this.tradeHeader = null
      this.tradeList = []
      this.tradeTotal = 0
      // 客户
      this.clientPageInfo.pageNum = 1
      this.clientTitle = ''
      this.clientHeader = null
      this.clientList = []
      this.clientTotal = 0
    },
    getData() {
      this.initData()
      this.getReortBaseData()
    },
    getReortBaseData() {
      this.loading = true
      this.detailOptions = null
      this.detailLeft = null
      this.detailRight = null
      this.baseTitle = ''
      getReortBaseList(this.tradeDetailInfo)
        .then(res => {
          if (res.code === 200) {
            this.loading = false
            this.loadingState = true
            this.detailOptions = res.data ? res.data.data : {}
            if (this.detailOptions !== {}) {
              const obj = {}
              const obj1 = {}
              let count = 0
              for (var key in this.detailOptions) {
                if (count % 2 === 0) {
                  this.$set(obj, key, this.detailOptions[key])
                } else {
                  this.$set(obj1, key, this.detailOptions[key])
                }

                count = count + 1
              }
              this.detailLeft = obj
              this.detailRight = obj1
            }
            this.baseTitle = res.data ? res.data.title : ''

            this.getReportCustomerData()
            this.getReportTradeData()
            this.getDownList() // 附件列表接口
          } else {
            this.loadingState = true
            this.loading = false

            this.getReportCustomerData()
            this.getReportTradeData()
            this.getDownList() // 附件列表接口
          }
        })
        .catch(() => {
          this.loadingState = true
          this.loading = false

          this.getReportCustomerData()
          this.getReportTradeData()
          this.getDownList() // 附件列表接口
        })
    },
    getReportCustomerData() {
      if (this.tradeDetailInfo.tableId === 'w_160' || this.tradeDetailInfo.tableId === 'w_170' || this.tradeDetailInfo.tableId === 'w_200' || this.tradeDetailInfo.tableId === 'w_210') { // 银联和资金清算
        this.cData = false
      } else {
        if (this.loadingState) {
          this.cLoading = true
          this.cData = true
          getReportCustomerList(this.tradeDetailInfo, this.clientPageInfo)
            .then(res => {
              if (res.code === 200) {
                this.cLoading = false
                this.clientTitle = res.data ? res.data.title : ''
                this.clientHeader = res.data ? res.data.show : {}
                this.clientList = res.data ? res.data.data.list : []
                this.clientTotal = res.data ? res.data.data.total : ''
              } else {
                this.cLoading = false
              }
            })
            .catch(() => {
              this.cLoading = false
            })
        }
      }
    },
    getReportTradeData() {
      if (this.tradeDetailInfo.tableId === 'w_220') { // 通用
        this.tData = false
      } else {
        if (this.loadingState) {
          this.tLoading = true
          this.tData = true
          getReportTradeList(this.tradeDetailInfo, this.tradePageInfo)
            .then(res => {
              if (res.code === 200) {
                this.tLoading = false
                this.tradeTitle = res.data ? res.data.title : ''
                this.tradeHeader = res.data ? res.data.show : {}
                this.tradeList = res.data ? res.data.data.list : []
                this.tradeTotal = res.data ? res.data.data.total : ''
              } else {
                this.tLoading = false
              }
            })
            .catch(() => {
              this.tLoading = false
            })
        }
      }
    },
    getDownList() {
      const obj = {
        id: this.tradeDetailInfo.id,
        tableId: this.tradeDetailInfo.tableId,
        newDate: this.tradeDetailInfo.newDate
      }
      this.downList = []
      if (this.loadingState) {
        this.fData = true
        this.fLoading = true
        getAttachmentList(obj).then(res => {
          if (res.code === 200) {
            this.fLoading = false
            if (res.data) {
              const obj = Object.assign({}, res.data)
              obj.file = obj.file === null || obj.file === '' ? '附件.ZIP' : obj.file
              this.downList.push(obj)
            } else {
              this.fLoading = false
              this.downList = []
            }
          }
        }).catch(() => {
          this.fLoading = false
          this.downList = []
        })
      }
    },
    handleDown(scope) { // 下载附件
      if (scope.row) {
        const rk = scope.row.rk
        // const fileName = scope.row.file
        location.href = 'caml-hbase/hbase?rk=' + rk + '&sameDay=' + this.tradeDetailInfo.newDate + '&token=' +
          this.token
      } else {
        this.$confirm('附件下载失败！', '提示', {
          showCancelButton: false,
          type: 'error'
        }).then()
          .catch()
      }
    },
    onCancel() {
      this.dialogVisible = false
      this.$emit('setTradeDetailVisible', this.dialogVisible)
    },
    handleSizeChange(val) {
      this.clientPageInfo.pageSize = val
      this.getReportCustomerData()
    },
    handleCurrentChange(val) {
      this.clientPageInfo.pageNum = val
      this.getReportCustomerData()
    },
    handleSizeTradeChange(val) {
      this.tradePageInfo.pageSize = val
      this.getReportTradeData()
    },
    handleCurrentTradeChange(val) {
      this.tradePageInfo.pageNum = val
      this.getReportTradeData()
    },
    handleEvaluate() {
      if (this.detailOptions !== {}) {
        let ricdCode = ''
        for (var key in this.detailOptions) {
          if (key === '报告机构编码') {
            ricdCode = this.detailOptions[key]
          }
        }
        this.myricd = ricdCode
        this.myxmlId = this.tradeDetailInfo.id
        this.dialogType = true
        this.queryObj.tableId = this.tradeDetailInfo.tableId
        this.queryObj.xmlId = this.tradeDetailInfo.id
        // this.$router.push({
        //   name: 'dataGovernance_samplingEvaluation_randomSampling_sampling',
        //   query: {
        //     xmlId: this.tradeDetailInfo.id,
        //     ricd: ricdCode
        //   }
        // })
      }
    }
  }
}
</script>

<style lang="scss">
.report-large-wrap {
  position: relative;
  .title {
    padding: 8px 0 10px 25px;
    // border-bottom: 1px solid #eee; 
    font-weight: 700;
  }
  .dialog-footer{
    margin-top: 10px;
    text-align: right;
  }
  .active-border {
    border: 1px solid #eee; 
    padding: 10px;
  }
  .active-noBorder {
    border-bottom: 1px solid #eee; 
    padding: 10px;
  }
  .label-item {
    word-break:break-all; 
    word-wrap:break-word;
  }
}
</style>
