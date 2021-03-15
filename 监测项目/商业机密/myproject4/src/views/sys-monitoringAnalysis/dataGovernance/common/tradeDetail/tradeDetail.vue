<template>
  <div class="type-large-wrap">
    <el-card>
      <a @click="routerBack" class="back" :style="backImg"></a>
      <div slot="header">
        <span>交易详情</span>
        <el-button type="primary" @click="handleMark">标注</el-button>
      </div>
      <el-form :model="form" ref="form" label-width="264px">
        <!-- 第一行 -->
        <!-- <div v-for="(val, key) in detailOptions" :key="key">
          <el-row>
            <el-form-item :label="key" v-if="(typeof val) !== 'object'">
              <span>{{val}}</span>
            </el-form-item>
            <div v-if="(typeof val)=== 'object'">
              <div class="title">{{key}}</div>
              <div style="border: 1px solid #eee;">
                <div v-for="(cVal, cKey) in val" :key="cKey">
                  <el-form-item :label="cKey">
                    <span>{{cVal}}</span>
                  </el-form-item>
                </div>
              </div>
            </div>
          </el-row>
        </div> -->
        <el-row :gutter="20">
          <el-col :span="24">
            <div v-for="(val, key) in detailOptions" :key="key">
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
                        <el-col :span="12" v-for="(tVal, tKey) in oVal" :key="tKey">
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
      </el-form>
      <div style="text-align: right; margin-top: 10px;"><el-button type="primary" plain @click="routerBack">返 回</el-button></div>
    </el-card>

    <!-- 标注 -->
    <el-dialog title="标注问题" :visible.sync="markdialogVisible">
      <markproblem @setMarkVisible="getMarkVisible" :tradeId="tradeId" :markdialogVisible="markdialogVisible"></markproblem>
    </el-dialog>
  </div>
</template>

<script>
import Markproblem from '@/views/sys-monitoringAnalysis/dataGovernance/common/tradeDetail/components/markProblem.vue'
import { getTradeDetail } from '@/api/sys-monitoringAnalysis/dataGovernance/common/tradeDetailLarge'

export default {
  components: {
    Markproblem
  },
  data() {
    return {
      backImg: {
        backgroundImage: 'url(' + require('@/assets/back/back.png') + ')',
        backgroundRepeat: 'no-repeat'
      },
      form: {},
      detailOptions: null,
      markdialogVisible: false
    }
  },
  computed: {
    tradeId() {
      return this.$route.query.tradeId
    },
    type() {
      return this.$route.query.type
    },
    source() {
      return this.$route.query.source
    }
  },
  watch: {
    tradeId(val) {
      if (val) {
        this.getData()
      }
    },
    type(val) {
      if (val) {
        this.getData()
      }
    }
  },
  mounted() {
    if (this.tradeId && this.type) {
      this.getData()
    }
  },
  methods: {
    getData() {
      getTradeDetail(this.tradeId, this.type)
        .then(res => {
          if (res.code === 200) {
            this.detailOptions = res.data !== null ? res.data.trade : '无'
          }
        })
        .catch()
    },
    routerBack() {
      if (this.source === 1) { // 扫描问题
        const obj = JSON.parse(sessionStorage.getItem('scaningSearchData'))
        if (obj) {
          obj.ifScaningTradeFlag = true
          sessionStorage.setItem('scaningSearchData', JSON.stringify(obj))
        }
      } else if (this.source === 2) {
        const obj = JSON.parse(sessionStorage.getItem('scanningTaskSearchData'))
        if (obj) {
          obj.ifScaningtaskTradeFlag = true
          sessionStorage.setItem('scanningTaskSearchData', JSON.stringify(obj))
        }
      }

      this.$router.go(-1)
    },
    getMarkVisible(vis) {
      // 补正markVisible传值
      this.markdialogVisible = vis
    },
    handleMark() {
      this.markdialogVisible = true
      this.tradeId = this.$route.query.tradeId
    }
  }
}
</script>

<style lang="scss"> 
.type-large-wrap { 
  position: relative;
  .title {
    padding: 5px 0 10px 25px;
  }
   .active-border {
    border: 1px solid #eee; 
    padding: 5px 10px 10px;
    margin-top: 10px;
  }
  .el-form-item__content {
    word-break: break-word;
  }
}
</style>
