<template>
  <div class="type-large-wrap" v-loading="loading" element-loading-text="正在加载中"
    element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
      <el-form :model="form" ref="form" label-width="auto">
        <!-- 第一行 -->
        <!-- <div class="title">{{title}}</div> -->
        <el-row :gutter="20">
          <el-col :span="24">
            <div v-for="(val, key) in detailLeft" :key="key">
              <el-col :span="24">
                <el-form-item :label="key + '：'" v-if="Object.prototype.toString.call(val) == '[object String]' || Object.prototype.toString.call(val) == '[object Null]' || Object.prototype.toString.call(val) == '[object Number]'">
                  <span class="label-item">{{val}}</span>
                </el-form-item>
                <div v-if="Object.prototype.toString.call(val) == '[object Object]' || Object.prototype.toString.call(val) == '[object Array]'">
                  <div class="title" style="padding-bottom: 0px; padding-top: 0px;">{{key}}</div>
                  <div>
                    <div v-for="(oVal, oKey) in val" :key="oKey">
                      <el-form-item :label="oKey + '：'" v-if="Object.prototype.toString.call(oVal) == '[object String]' || Object.prototype.toString.call(oVal) == '[object Null]' || Object.prototype.toString.call(oVal) == '[object Number]'">
                        <span class="label-item">{{oVal}}</span>
                      </el-form-item>
                      <el-row v-if="Object.prototype.toString.call(oVal) == '[object Object]' || Object.prototype.toString.call(oVal) == '[object Array]'" class="active-border">
                        <div class="title">{{oKey}}</div>
                        <el-col :span="tKey === '资金用途' || tKey === '交易目的' || tKey === '资金来源与用途' || tKey === '资金来源和用途' || tKey === '交易信息备注_1' || tKey === '交易信息备注_2' ? 24 : 12" v-for="(tVal, tKey) in oVal" :key="tKey">
                          <!-- <div v-for="(tVal, tKey) in oVal" :key="tKey"> -->
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
                          <!-- </div> -->
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </div>
              </el-col>
            </div>
          </el-col>
          <!-- <el-col :span="8">
            <div v-for="(val, key) in detailCenter" :key="key">
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
          </el-col> -->
          <!-- <el-col :span="12">
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
          </el-col> -->
        </el-row>
        
        <el-row v-if="TradeType === 'IS'">
          <div class="title">被保险人身份信息</div>
          <div class="active-border">
            <el-table style="width: 100%" :data="rosterData" tooltip-effect="dark">
              <el-table-column type="index" label="序号" width="60" fixed="left"></el-table-column>
              <el-table-column prop="iabiid" label="被保险人ID" width="150"></el-table-column>
              <el-table-column prop="tradeid" label="保险可疑交易ID" width="150"></el-table-column>
              <el-table-column prop="iabiseqno" label="被保险人编号" width="150"></el-table-column>
              <el-table-column prop="istn" label="被保险人姓名" width="150"></el-table-column>
              <el-table-column prop="iitp" label="被保险人身份证件类型" width="170"></el-table-column>
              <el-table-column prop="oitp" label="被保险人其他身份证件类型" width="200"></el-table-column>
              <el-table-column prop="isid" label="被保险人身份证件号码" width="170"></el-table-column>
              <el-table-column prop="rltp" label="投保人和被保险人关系" width="170"></el-table-column>
              <el-table-column prop="bntn" label="受益人总数" width="150"></el-table-column>
              <el-table-column prop="iitp" label="受益人" width="120" fixed="right">
                <template slot-scope="scope">
                  <el-popover placement="left" width="400" trigger="click">
                    <el-table :data="scope.row.bnifs">
                      <el-table-column width="110" property="bnifid" label="受益人ID"></el-table-column>
                      <el-table-column width="110" property="bnifseqno" label="受益人编号"></el-table-column>
                      <el-table-column width="110" property="bnnm" label="受益人姓名"></el-table-column>
                      <el-table-column width="190" property="bitp" label="受益人身份证件类型"></el-table-column>
                      <el-table-column width="190" property="oitp" label="受益人其他身份证件类型"></el-table-column>
                      <el-table-column width="190" property="bnid" label="受益人身份证件号码"></el-table-column>
                    </el-table>
                    <el-button slot="reference" type="text" size="small">查看受益人信息</el-button>
                  </el-popover>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">     
        <el-button @click="onCancel" type="primary" plain>取消</el-button>
      </div>
    <!-- </el-card> -->

    <!-- 标注 -->
    <el-dialog title="标注问题" :visible.sync="markdialogVisible">
      <markproblem @setLargeVisible="getLargeVisible"></markproblem>
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import Markproblem from '@/views/sys-monitoringAnalysis/dataQuery/dataType/markProblem'
import { getTradeData, getNotTradeData } from '@/api/sys-monitoringAnalysis/dataQuery/dataType'

export default {
  props: {
    tradeDetailInfo: Object,
    tradeDetailVisible: Boolean,
    disabled: Boolean
  },
  components: {
    Markproblem
  },
  data() {
    return {
      loading: false,
      // title: '',
      rosterData: [],
      dialogVisible: this.tradeDetailVisible,
      form: {},
      detailOptions: null,
      detailLeft: {},
      // detailCenter: {}, // 3列可用
      detailRight: {},
      markdialogVisible: false,
      TradeType: '', // 获取行业类型
      token: getToken()
    }
  },
  mounted() {
    this.getData()
  },
  watch: {
    'tradeDetailInfo.id': {
      handler: function(val) {
        console.log('val', val)
        this.getData()
      },
      deep: true
    }
  },
  methods: {
    getData() {
      this.rosterData = []
      this.TradeType = ''
      this.detailOptions = {}
      this.detailLeft = {}
      // this.detailCenter = {}
      this.detailRight = {}
      this.loading = true
      console.log('loading', this.loading)
      if (this.disabled) {
        getTradeData(this.tradeDetailInfo)
          .then(res => {
            if (res.code === 200) {
              this.loading = false
              this.detailOptions = res.data ? res.data.trade : {}
              if (this.detailOptions !== {}) {
                // const obj = {}
                // // const obj1 = {}
                // const obj2 = {}
                // const count = 1
                var name = []
                var value = []
                for (var i in this.detailOptions) {
                  name.push(i)
                  value.push(this.detailOptions[i])
                }
                // this.title = name[0]
                // for (var key in value[0]) { // 分3列
                //   if (count % 3 === 1) {
                //     this.$set(obj, key, value[0][key])
                //   } else if (count % 3 === 0) {
                //     this.$set(obj2, key, value[0][key])
                //   } else {
                //     this.$set(obj1, key, value[0][key])
                //   }

                //   count = count + 1
                // }
                // for (var key in value[0]) { // 分两列
                //   if (count % 2 === 1) {
                //     this.$set(obj, key, value[0][key])
                //   } else if (count % 2 === 0) {
                //     this.$set(obj2, key, value[0][key])
                //   }

                //   count = count + 1
                // }
                this.detailLeft = this.detailOptions
                // this.detailCenter = obj1
                // this.detailRight = obj2
              }
              this.rosterData = res.data.isifs
              this.TradeType = res.data.type
            } else {
              this.loading = false
            }
          })
          .catch(() => {
            this.loading = false
          })
      } else {
        getNotTradeData(this.tradeDetailInfo)
          .then(res => {
            if (res.code === 200) {
              this.loading = false
              this.detailOptions = res.data ? res.data.trade : {}

              if (this.detailOptions !== {}) {
                // const obj = {}
                // // const obj1 = {}
                // const obj2 = {}
                // const count = 1
                var name = []
                var value = []
                for (var i in this.detailOptions) {
                  name.push(i)
                  value.push(this.detailOptions[i])
                }
                // this.title = name[0]
                // for (var key in value[0]) {
                //   if (count % 3 === 1) {
                //     this.$set(obj, key, value[0][key])
                //   } else if (count % 3 === 0) {
                //     this.$set(obj2, key, value[0][key])
                //   } else {
                //     this.$set(obj1, key, value[0][key])
                //   }

                //   count = count + 1
                // }
                // for (var key in value[0]) { // 分两列
                //   if (count % 2 === 1) {
                //     this.$set(obj, key, value[0][key])
                //   } else if (count % 2 === 0) {
                //     this.$set(obj2, key, value[0][key])
                //   }

                //   count = count + 1
                // }
                this.detailLeft = this.detailOptions
                // this.detailCenter = obj1
                // this.detailRight = obj2
              }
              this.rosterData = res.data.isifs
              this.TradeType = res.data.type
            } else {
              this.loading = false
            }
          })
          .catch(() => {
            this.loading = false
          })
      }
    },
    onCancel() {
      this.dialogVisible = false
      this.$emit('setTradeDetailVisible', this.dialogVisible)
    },
    getLargeVisible(vis) {
      // 人工补正组件接收子组件弹框largeUpdateVisible传值
      this.markdialogVisible = vis
    },
    handleDown(scope) { // 下载
      const filePath = scope.row.filePath
      const tableName = 'attach_file'
      const rk = scope.row.rk
      if (filePath) {
        if (this.disabled) { // 当日
          location.href = `/monitor/query/template/download/${filePath}?token=${this.token}`
        } else {
          location.href = `/caml-hbase/hbase/${tableName}/${rk}/${filePath}?token=${this.token}`
        }
      } else {
        this.$confirm('附件下载失败！', '提示', {
          showCancelButton: false,
          type: 'error'
        }).then()
          .catch()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.type-large-wrap {
  position: relative;
  .title {
    padding: 8px 0 10px 25px; 
  }
  .dialog-footer{
    margin-top: 10px;
    text-align: right;
  }
  .active-border {
    border: 1px solid #eee; 
    padding: 5px 10px 10px;
    margin-top: 10px;
  }
  .active-noBorder {
    border-bottom: 1px solid #eee; 
    padding: 10px;
  }
  .label-item {
    word-break:break-all; 
    word-wrap:break-word;
  }
  .el-form-item__label, .el-form-item__content {
    font-size: 13px;
  }
  .el-form-item--small.el-form-item {
    margin-bottom: 0;
  }
  .el-form-item--small .el-form-item__content, .el-form-item--small .el-form-item__label {
    line-height: 20px;
  }
}
</style>
