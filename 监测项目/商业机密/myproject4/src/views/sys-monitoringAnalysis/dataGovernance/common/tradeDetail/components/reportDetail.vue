<!--人工补正核对-->
<template>
  <div class="report-large-wrap">  
      <el-form :model="form" ref="form" label-width="200px" v-if="detailOptions.xmlIdList.length > 0">
        <!-- 第一行 --> 
        <el-row>
          <el-col :span="12"><div class="title">{{baseTitle}}</div></el-col>
          <!-- <el-col :span="12" style="text-align: right;"><el-button type="primary" @click="handleEvaluate">评价</el-button></el-col> -->
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

        <el-row v-if="cData !== null">
          <div class="title">{{clientTitle}}</div>
          <el-table :data="clientList">
            <el-table-column :label="date" v-for="(date, key) in clientHeader" :key="key" min-width="200" show-overflow-tooltip>
              <template slot-scope="scope">
                {{clientList[scope.$index][key]}}
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="clientPageInfo.pageNum" :page-sizes="[5, 10, 15, 20]" :page-size="clientPageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="clientTotal" background></el-pagination>
        </el-row>

        <el-row v-if="tData !== null">
          <div class="title">{{tradeTitle}}</div>
          <el-table :data="tradeList">
            <el-table-column :label="date" v-for="(date, key) in tradeHeader" :key="key" min-width="200" show-overflow-tooltip>
              <template slot-scope="scope">
                {{tradeList[scope.$index][key]}}
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @size-change="handleSizeTradeChange" @current-change="handleCurrentTradeChange" :current-page="tradePageInfo.pageNum" :page-sizes="[5, 10, 15, 20]" :page-size="tradePageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tradeTotal" background></el-pagination>
        </el-row>
      </el-form>
    <!-- </el-card> --> 
    <div v-else>无数据</div>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { getReortBaseList, getReportCustomerList, getReportTradeList } from '@/api/sys-monitoringAnalysis/dataQuery/dataType'

export default {
  props: {
    detailOptions: Object,
    backDialogLoading: Boolean
  },
  data() {
    return {
      loading: this.backDialogLoading,
      form: null,
      detailObj: null,
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
      cData: null,
      tData: null,
      downList: [],
      count: 0,
      token: getToken()
    }
  },
  mounted() {
    if (this.detailOptions.xmlIdList.length > 0) {
      this.getData()
    }
  },
  watch: {
    detailOptions: {
      handler: function(val, oldval) {
        if (val) {
          if (val.xmlIdList.length > 0) {
            this.getData()
          }
        }
      },
      deep: true
    }
  },
  methods: {
    getData() {
      this.detailObj = null
      this.cData = []
      this.tData = []
      this.count = 0
      this.detailLeft = null
      this.detailRight = null
      this.getReortBaseData()
      this.getReportCustomerData()
      this.getReportTradeData()
    },
    getReortBaseData() {
      const paramsObj = {
        id: this.detailOptions.xmlIdList[this.detailOptions.index - 1],
        tableId: this.detailOptions.tableId,
        newDate: this.detailOptions.newDate
      }
      getReortBaseList(paramsObj)
        .then(res => {
          if (res.code === 200) {
            this.detailObj = res.data ? res.data.data : {}
            console.log('this.detailObj', this.detailObj)
            if (this.detailObj !== {}) {
              const obj = {}
              const obj1 = {}
              let count = 0
              for (var key in this.detailObj) {
                if (count % 2 === 0) {
                  this.$set(obj, key, this.detailObj[key])
                } else {
                  this.$set(obj1, key, this.detailObj[key])
                }

                count = count + 1
              }
              this.detailLeft = obj
              this.detailRight = obj1
            }
            this.baseTitle = res.data ? res.data.title : ''
            this.count = this.count + 1
            if (this.count === 3) {
              this.loading = false
              this.$emit('setLoading', this.loading)
            }
          } else {
            this.loading = false
            this.$emit('setLoading', this.loading)
          }
        })
        .catch(() => {
          this.loading = false
          this.$emit('setLoading', this.loading)
        })
    },
    getReportCustomerData() {
      const paramsObj = {
        id: this.detailOptions.xmlIdList[this.detailOptions.index - 1],
        tableId: this.detailOptions.tableId,
        newDate: this.detailOptions.newDate
      }
      getReportCustomerList(paramsObj, this.clientPageInfo)
        .then(res => {
          if (res.code === 200) {
            this.cData = res.data
            console.log('this.cData', this.cData)
            this.clientTitle = res.data ? res.data.title : ''
            this.clientHeader = res.data ? res.data.show : {}
            this.clientList = res.data ? res.data.data.list : []
            this.clientTotal = res.data ? res.data.data.total : ''
            this.count = this.count + 1
            if (this.count === 3) {
              this.loading = false
              this.$emit('setLoading', this.loading)
            }
          } else {
            this.loading = false
            this.$emit('setLoading', this.loading)
          }
        })
        .catch(() => {
          this.loading = false
          this.$emit('setLoading', this.loading)
        })
    },
    getReportTradeData() {
      const paramsObj = {
        id: this.detailOptions.xmlIdList[this.detailOptions.index - 1],
        tableId: this.detailOptions.tableId,
        newDate: this.detailOptions.newDate
      }
      getReportTradeList(paramsObj, this.tradePageInfo)
        .then(res => {
          if (res.code === 200) {
            this.tData = res.data
            console.log('this.tData', this.tData)
            this.tradeTitle = res.data ? res.data.title : ''
            this.tradeHeader = res.data ? res.data.show : {}
            this.tradeList = res.data ? res.data.data.list : []
            this.tradeTotal = res.data ? res.data.data.total : ''
            this.count = this.count + 1
            if (this.count === 3) {
              this.loading = false
              this.$emit('setLoading', this.loading)
            }
          } else {
            this.loading = false
            this.$emit('setLoading', this.loading)
          }
        })
        .catch(() => {
          this.loading = false
          this.$emit('setLoading', this.loading)
        })
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
    }
  }
}
</script>

<style lang="scss">
.report-large-wrap {
  position: relative;
  .title {
    padding: 18px 0 10px 25px;
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
  .el-form-item__content {
    word-break: break-word;
  }
}
</style>
