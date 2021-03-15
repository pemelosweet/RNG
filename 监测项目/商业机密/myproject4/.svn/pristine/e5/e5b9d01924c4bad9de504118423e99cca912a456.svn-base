<!--人工补正应答用，不许前端调交易详情接口，后台在上一步操作直接返回-->
<template>
  <div class="td-wrap">
    <el-form :model="form" ref="form" label-width="140px" v-if="detailOptions !== '未应答'">
      <!-- 第一行 -->
       <el-row :gutter="20"> 
          <el-col :span="24">
            <div v-for="(val, key, index) in detailOptions" :key="index">
              <el-col :span="24">
                <el-form-item :label="key + '：'" v-if="Object.prototype.toString.call(val) == '[object String]' || Object.prototype.toString.call(val) == '[object Null]' || Object.prototype.toString.call(val) == '[object Number]'">
                  <span class="label-item">{{val}}</span>
                </el-form-item>
                <div v-if="Object.prototype.toString.call(val) == '[object Object]' || Object.prototype.toString.call(val) == '[object Array]'">
                  <div class="title" style="padding-bottom: 0px; padding-top: 0px;">{{key}}</div> <!--哪张表title-->
                  <div>
                    <div v-for="(oVal, oKey, oIndex) in val" :key="oIndex">
                      <el-form-item :label="oKey + '：'" v-if="Object.prototype.toString.call(oVal) == '[object String]' || Object.prototype.toString.call(oVal) == '[object Null]' || Object.prototype.toString.call(oVal) == '[object Number]'">
                        <span class="label-item">{{oVal}}</span>
                      </el-form-item>
                      <div>
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
      <div v-if="detailOptions === '未应答'" style="color: #999;">{{detailOptions}}</div>
    </el-form>

    <!-- 标注 -->
    <el-dialog title="标注问题" :visible.sync="markdialogVisible">
      <markproblem @setMarkVisible="getMarkVisible" :tradeId="tradeId"></markproblem>
    </el-dialog>

  </div>
</template>

<script>
import Markproblem from '@/views/sys-monitoringAnalysis/dataGovernance/common/tradeDetail/components/markProblem.vue'
export default {
  props: {
    detailOptions: Object
  },
  components: {
    Markproblem
  },
  data() {
    return {
      form: {},
      markdialogVisible: false,
      tradeId: '',
      filedOptions: []
    }
  },
  mounted() {
    console.log('this.detailOptions', this.props.detailOptions)
  },
  methods: {
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
    padding: 18px 0 10px 25px;
  }
   .active-border {
    border: 1px solid #eee; 
    padding: 5px 10px 10px;
    margin-top: 10px;
  }
  .el-form-item__content {
    word-break: break-word!important;
  }
}
</style>
