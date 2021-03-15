<template>
  <div class="judgedClues_subsequentHistory">
    <el-card>
      <div slot="header">后续办理情况更改历史</div>

      <el-form label-width="160px">
        <el-collapse v-model="collapse">
          <el-collapse-item
            v-for="(item, index) in formData"
            :name="index"
            :title="item.commitTime"
            :key="index"
          >
            <div class="block" >
              <div class="itemBlock">
                <el-row :gutter="20">
                  <el-col>
                    <el-button type="text" @click="update(item, index)" class="upDate">修改</el-button>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="24">
                    <el-form-item label="涉罪类型：">
                      <span>{{ item.crimeTypeContent }}</span>
                    </el-form-item>
                  </el-col>
                  <!-- <el-col :span="16">
                    <el-form-item label="涉罪类型其他输入项：">
                      <span>{{ item.crimeOther }}</span>
                    </el-form-item>
                  </el-col> -->
                </el-row>

                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="立案名目：">
                      <span>{{ item.register }}</span>
                      <!-- <el-input v-model="item.register" placeholder=""></el-input> -->
                    </el-form-item>
                  </el-col>
                  <el-col :span="16">
                    <el-form-item label="专项行动及专案名称：">
                      <span> {{ item.caseName }}</span>
                      <!-- <el-input  v-model="item.caseName" placeholder=""></el-input> -->
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="线索状态：">
                      <span> {{ item.withState }} </span>
                      <!--
                        <el-select  v-model="item.withState" placeholder="请选择">
                            <el-option label="仅报告" value="1"></el-option>
                            <el-option label="立案" value="2"></el-option>
                            <el-option label="破案" value="3"></el-option>
                            <el-option label="撤案" value="4"></el-option>
                            <el-option label="不予立案" value="5"></el-option>

                        </el-select>
                      -->
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="接收处室：">
                      <span>{{ item.reviceDep }}</span>
                      <!-- <el-input  v-model="item.reviceDep" placeholder=""></el-input> -->
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="涉案金额：">
                      <span>{{ item.cart }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="报告时间：">
                      <span>{{ item.reportDate }}</span>
                      <!--
                        <el-date-picker

                         :picker-options="pickerOptions2"
                          v-model="item.reportDate"
                          placeholder="选择日期"
                          type="date"
                        ></el-date-picker>
                      -->
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="立案时间：">
                      <span>{{ item.registerTime }}</span>
                      <!--
                        <el-date-picker

                        :picker-options="pickerOptions2"
                          v-model="item.reportDate"
                          placeholder="选择日期"
                          type="date"
                        ></el-date-picker>
                      -->
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="结案时间：">
                      <span>{{ item.endTime }}</span>
                      <!--
                        <el-date-picker

                         :picker-options="pickerOptions2"
                            v-model="item.reportDate"
                            placeholder="选择日期"
                            type="date"
                        ></el-date-picker>
                      -->
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-form-item
                  label="领导批示及有关线索的评 ："
                  class="searchBlock_special_formIten"
                >
                  <span>{{ item.evaluation }}</span>
                  <!--
                    <el-input  v-model="item.evaluation" type="textarea" placeholder=""></el-input>
                  -->
                </el-form-item>

                <el-form-item label="案件总结：">
                  <span>{{ item.experience }}</span>
                  <!--
                    <el-input  v-model="item.experience" type="textarea" placeholder=""></el-input>
                  -->
                </el-form-item>

                <el-form-item label="交办方向：">
                  <span>{{ item.handDirection }}</span>
                  <!-- <el-input v-model="item.handDirection" placeholder=""></el-input> -->
                </el-form-item>

                <!--
                  <el-form-item label="附件： ">
                    <span>{{item.zhangkai}}</span>
                  </el-form-item>
                -->

                <el-form-item label="附件： ">
                  <el-upload
                    disabled
                    :action="formUrl7"
                    class="upload-btn"
                    :file-list="item.fileList7"
                    :on-preview="downFile"
                  ></el-upload>
                </el-form-item>

                <el-row>
                  <el-col :span="6">
                    <el-form-item label="填报人（联系人）：">
                      <span>{{ item.createUser }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="电话：">
                      <span>{{ item.createUserTel }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="审核人：">
                      <span>{{ item.auditingUser }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="电话：">
                      <span>{{ item.auditingUserTel }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-form>
      <div v-if="areaVisible">
        <el-dialog title="修改" :visible.sync="areaVisible" width="80%" destroy-on-close=true>
            <clup @backbtn='backbtn'  @getDetail="getDetail" ref="tableForm" :tableForm ='tableForm' :tabindex='tabindex'></clup>
        </el-dialog>
      </div>
      
      <div v-if="this.$route.query.sbID === '0'" style="paddingTop:30px; textAlign:center">
        <el-button type="primary" @click="closeT">返 回</el-button>
      </div>
      <div style="textAlign:center; paddingTop:40px">
        <template v-if="isCenter">
          <router-link :to="{ name: 'judgedClues_manage' }">
            <el-button type="primary">返 回</el-button>
          </router-link>
        </template>
        <template v-if="isBranch">
          <router-link :to="{ name: 'judgedClues_index' }">
            <el-button type="primary">返 回</el-button>
          </router-link>
        </template>
        <!-- <el-button type="primary" plain>导出线索</el-button> -->
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { dictionary } from '@/api/sys-monitoringAnalysis/roster-warning/common.js'
import clup from '@/views/sys-monitoringAnalysis/judgedClues/subsequentUpdate'
import { getFollowList } from '@/api/sys-monitoringAnalysis/judgedClues/add.js'
export default {
  data() {
    return {
      pickerOptions2: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6
        }
      },
      tabindex: '',
      tableForm: {},
      areaVisible: false,
      collapse: '',
      person: {},
      formData: []
    }
  },
  components: {
    clup
  },
  mounted() {
    this.collapse = 0
    this.getDetail()
    this.getDictionary('TOSC')
    // this.formData.map((item, index) => {
    //   this.collapse.push(index)
    // })
  },
  computed: {
    ...mapGetters(['userInfo', 'institution', 'name']),
    isCenter() {
      return this.institution === this.GLOBAL.INSTITUTION_CENTER
    },
    isBranch() {
      return this.institution === this.GLOBAL.INSTITUTION_BRANCH
    },
    formUrl7() {
      return `/monitor/reportLeads/upAttachs?token=${this.token}&id=${this.hxId}&type=06`
    }
  },
  methods: {
    update(item, index) {
      this.tableForm = item
      this.tabindex = index
      this.areaVisible = true
      console.log(this.tableForm, this.tabindex, '212121')
      this.$forceUpdate()
    },

    backbtn(val) {
      this.areaVisible = val
    },
    getDictionary(params) {
      dictionary(params).then(res => {
        if (res.code === 200) {
          switch (params) {
            case 'TOSC':
              this.dialogJudgmentData = res.data
              break
            default:
              break
          }
        }
      })
    },
    downFile(file) {
      console.log(file, 888)
      location.href = '/file-service/upload/download/' + file.attachId
    },
    getDetail() {
      const clueId = this.$route.query.id
      this.person = this.$route.query.person
      console.log(clueId, this.$route.query, this.person, 31312)
      getFollowList({ clueId }).then(res => {
        if (res.code === 200) {
          const arr = res.data
          // const arr = res.data.slice(0, res.data.length - 1)
          // console.log(arr, 666)
          this.formData = arr
          this.formData.forEach(el => {
            switch (el.withState) {
              case '1':
                el.withState = '仅报告'
                break
              case '2':
                el.withState = '立案'
                break
              case '3':
                el.withState = '结案'
                break
              case '4':
                el.withState = '撤案'
                break
              case '5':
                el.withState = '不予立案'
                break
            }
            el.crimeTypeContent = this.formatType(this.formData[0].crimeType)
            el.auditingUser = this.person.auditingUser
            el.auditingUserTel = this.person.auditingUserTel
            el.createUser = this.person.createUser
            el.createUserTel = this.person.createUserTel
            if (el.attachDoList06) {
              const arrs7 = []
              el.attachDoList06.forEach(el => {
                const obj = {}
                obj.name = el.attachName
                obj.url = el.attachPath
                obj.attachId = el.attachId
                arrs7.push(obj)
              })
              el.fileList7 = arrs7
            }
          })
        }
      })
    },
    formatType(crimeType) {
      var arr = []
      var arg = crimeType.split(',')
      for (let i = 0; i < arg.length; i++) {
        const els = arg[i]
        this.dialogJudgmentData.forEach(es => {
          if (els === es.codeId) {
            arr.push(es.codeName)
          }
          if (els.indexOf('1402') !== -1 || els.indexOf('1401') !== -1) {
            if (els.split('-')[0] === es.codeId) {
              arr.push(es.codeName + ' - ' + els.split('-')[1])
            }
          }
        })
      }

      return arr.join(',')
    },
    // 关 闭
    closeT() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">
.judgedClues_subsequentHistory {
  .el-collapse {
    border: 1px solid #d9d9d9;
    .el-collapse-item__header {
      border-bottom: 1px solid #d9d9d9;

      background: #fafafa;
      .el-collapse-item__arrow {
        float: left;
        margin-left: 20px;
        line-height: 48px;
      }
    }
    .el-collapse-item__content {
      padding: 20px 10px;
    }
    .el-form-item__label {
      color: #99a9bf;
    }
  }
  .itemBlock {
    margin-left: 5%;
  }
  .upDate {
    float: right;
    margin-right: 20px;
  }
}
</style>
