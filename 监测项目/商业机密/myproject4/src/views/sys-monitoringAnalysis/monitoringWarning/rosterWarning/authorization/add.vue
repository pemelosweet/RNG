<template>
  <div class="authorization-add">
    <el-card>
      <div slot="header" class="clearfix">
        <span>新建授权</span>
        <div style="float: right; padding: 3px 0">
          <span type="text">新建时间：{{myDate}}</span>
          <span style="margin-left:20px">创建人： {{name}}</span>
        </div>
      </div>

      <div class="tableList">
        <el-row class="tableTitle">
          <el-col :span="12" class="tableTitleLabel">名单列表</el-col>
          <el-col :span="12" style="textAlign:right">
            <el-button type="primary" plain @click="openDialogRoster">添加名单</el-button>
          </el-col>
        </el-row>
        <el-table 
          :data="listData" 
          v-loading="loadingB"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.1)" 
          tooltip-effect="dark"
        >
          <!-- <el-table-column type="selection" min-width="80" fixed></el-table-column> -->
          <el-table-column label="序号" type="index" min-width="60" fixed></el-table-column>
          <el-table-column prop="subjectType" label="主体类型" min-width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="subjectName" label="主体名称" min-width="140" show-overflow-tooltip></el-table-column>
          <el-table-column prop="subjectIType" label="证件类型" min-width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="subjectINum" label="证件号码" min-width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="listSourceDocNum" label="名单来源文档编号" min-width="140" show-overflow-tooltip></el-table-column>
           <el-table-column label="初步判断" min-width="180" show-overflow-tooltip>
                <template slot-scope="scope">
                 {{preliminaryJudgmeFiler(scope.row)}}
                </template>
            </el-table-column>
          <el-table-column prop="sourceDire" label="来源方向" min-width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="sourceBusiness" label="来源业务" min-width="120" show-overflow-tooltip></el-table-column>
        </el-table>
        <el-pagination v-if="addType === 'check'" @size-change="handleSizeChangeUp2" @current-change="handleCurrentChangeUp2" :current-page="dialogPageInfoUp.pageNum" :page-size="dialogPageInfoUp.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="dialogPageInfoUp.total" background/>
        <el-pagination v-if="addType === 'all'" @size-change="handleSizeChangeUp" @current-change="handleCurrentChangeUp" :current-page="dialogPageInfoUp.pageNum" :page-size="dialogPageInfoUp.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="dialogPageInfoUp.total" background/>        
      </div>
      <el-form>
        <organization-tree :lableWidth="68" :itemLabel="'授权机构'" v-on:showParentComp="showParentComp" ref="tree"></organization-tree>
         <el-form-item label="授权机构：">
          <!-- <el-tag style="margin-left:10px" v-for="(item,index) in powerDOS " :key="index" type="info">{{item.name}}</el-tag> -->
          <el-tag
          style="margin-left: 10px"
          v-for="(item,index) in powerDOS"
          :key="index"
          closable
          @close="handleClose(item)"
          >
          {{item.name}}
          </el-tag>
        </el-form-item>
      </el-form>

      <div class="chioceBranch">
        <span>授权结果 ：</span>
        <el-select v-model="powResult" placeholder="请选择" filterable clearable >
          <el-option v-for="item in powResultArr" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div style="font-size: 12px;color: red;">
        <p>提示：批量授权时间较长，建议一个小时后查询授权结果，如果授权未结束，请继续等待。</p>
      </div>
      <div class="bottomBtn">

        <el-button type="primary" @click="saveAuthorization" style="margin:0 20px" :loading="loading">保存</el-button>

        <el-button @click="leavePage">返回</el-button>

      </div>
      <!-- {{authorizedAgency}} -->
      <!-- 弹层 -->
      <el-dialog :visible.sync="dialogVisible" title="新增名单"  width="80%" top="20px" class="rosterDialog" >

        <el-form :model="dialogForm" label-width="140px" ref="dialogForm" :rules="rules">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="名单来源文档编号" prop="listSourceDocNum">
                <el-input v-model="dialogForm.listSourceDocNum" placeholder="最长128字符数" maxlength="128"  ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="来源方向" prop="sourceDire">
                <el-select v-model="dialogForm.sourceDire" filterable placeholder="请选择" clearable>
                  <el-option v-for="(item,index) in sourceDireArr" :key="index" :label="item.codeName" :value="item.codeId"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="来源业务" prop="sourceBusiness">
                <el-select v-model="dialogForm.sourceBusiness" placeholder="请选择" filterable clearable>
                  <el-option v-for="(item,index) in sourceBusinessArr" :key="index" :label="item.codeName" :value="item.codeId"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            </el-row>
            <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="主体类型" prop="subjectType">
                <el-select v-model="dialogForm.subjectType" placeholder="请选择" filterable clearable>
                  <el-option v-for="(item,index) in subjectTypeArr" :key="index" :value="item.codeId" :label="item.codeName"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="主体名称" prop="subjectName">
                <el-input v-model="dialogForm.subjectName" placeholder="最长512字符数" maxlength="512" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证件号码" prop="subjectINum">
                <el-input v-model="dialogForm.subjectINum" placeholder="最长128字符数" maxlength="128" ></el-input>
              </el-form-item>
            </el-col>
           </el-row>
            <el-row :gutter="20">
            <el-col :span="24">
                <!-- <preliminary-judgment :lableWidth="100" :inner="true" ref="judgment" :propVal="'initJudge'"  @judgment="getJudgment" :echoJudgment="reportCluePreJudgment" @judgmentOther="getJudgmentOther">
                </preliminary-judgment> -->
              <!-- <preliminary-judgment :lableWidth="114" :inner="true" @judgmentOther="judgmentOther"></preliminary-judgment> -->
               <el-form-item label="初步判断：" prop="preliminaryJudgment">
                <el-select
                  filterable
                  v-model="dialogForm.preliminaryJudgment"
                  multiple
                  placeholder="请选择">
                  <el-option
                    v-for="(item,index) in dialogJudgmentData"
                    :key="index"
                    :label="item.codeName"
                    :value="item.codeId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <div style="textAlign:right" class="searchBtn">
            <el-button :loading="loadingA" type="primary" @click="dialog_searchData('cx')">查询</el-button>
            <el-button type="primary" plain @click="clear">清空</el-button>
          </div>

          <div>
            <el-table 
            v-loading="loadingA"
            @selection-change="handelSelect"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.1)"
            :data="tableData"
              ref="poupTable">
              <el-table-column type="selection" min-width="80" fixed></el-table-column>
              <el-table-column label="序号" type="index" min-width="60" fixed></el-table-column>
              <el-table-column prop="subjectType" label="主体类型" min-width="120" show-overflow-tooltip></el-table-column>
              <el-table-column prop="subjectName" label="主体名称" min-width="140" show-overflow-tooltip></el-table-column>
              <el-table-column prop="subjectIType" label="证件类型" min-width="100" show-overflow-tooltip></el-table-column>
              <el-table-column prop="subjectINum" label="证件号码" min-width="120" show-overflow-tooltip></el-table-column>
              <el-table-column prop="listSourceDocNum" label="名单来源文档编号" min-width="140" show-overflow-tooltip></el-table-column>
              <el-table-column label="初步判断" min-width="180" show-overflow-tooltip>
                <template slot-scope="scope">
                 {{preliminaryJudgmeFiler(scope.row)}}
                </template>
              </el-table-column>
              <el-table-column prop="sourceDire" label="来源方向" min-width="120" show-overflow-tooltip></el-table-column>
              <el-table-column prop="sourceBusiness" label="来源业务" min-width="120" show-overflow-tooltip></el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="dialogPageInfo.pageNum" :page-size="dialogPageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="dialogPageInfo.total" background>
            </el-pagination>
          </div>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="check">选中添加</el-button>
          <el-button type="primary" @click="checkAll">全部添加</el-button>
          <el-button @click="clearSelect">返 回</el-button>
        </span>
      </el-dialog>

    </el-card>
  </div>
</template>

<script>
import {
  centerRoster,
  Addauthorization,
  Addauthorization2
} from '@/api/sys-monitoringAnalysis/roster-warning/authorization.js'
import { mapGetters } from 'vuex'
import { ValidQueryInput, commonPattern, spaceBarAndSpecial } from '@/utils/formValidate'
import { dictionary } from '@/api/sys-monitoringAnalysis/roster-warning/common.js'
import { getsourceBusinessArr } from '@/api/sys-monitoringAnalysis/roster-warning/levelConfiguration.js'
import organizationTree from '@/views/sys-monitoringAnalysis/monitoringWarning/rosterWarning/components/organizationTree.vue'
import preliminaryJudgment from '@/views/sys-monitoringAnalysis/monitoringWarning/rosterWarning/components/preliminaryJudgment.vue'
export default {
  components: {
    organizationTree,
    preliminaryJudgment
  },
  data() {
    return {
      currentPage: 1,
      myDate: '',
      listData: [],
      tableData: [],
      selectArr: [],
      checkData: [],
      pageEnd: 0,
      pageStart: 0,
      addType: 'check',
      list: [],
      powerDOS: [], // 授权机构
      loading: false,
      loadingA: true,
      loadingB: false,
      powResultArr: [
        {
          value: 1,
          label: '初步查询结果'
        },
        {
          value: 2,
          label: '扩展及初步查询结果'
        }
      ],
      authorizedAgency: [],
      dialogJudgmentData: [],
      reportCluePreJudgment: [], // 回显的数据
      dialogVisible: false,
      innerVisible: false,
      dialogForm: {
        initJudge: [],
        listSourceDocNum: '',
        sourceDire: '',
        sourceBusiness: '',
        subjectName: '',
        subjectINum: '',
        subjectType: '',
        preliminaryJudgment: [],
        preliminaryJudgmentInp1: '', // 初步判断--1401 input框---- 校验
        preliminaryJudgmentInp2: '' // 初步判断--1402 input框 ---校验
      },
      sourceDireArr: [], // 来源方向
      sourceBusinessArr: [], // 来源业务
      subjectTypeArr: [], // 主体类型
      dialogPageInfo: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      dialogPageInfoUp: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      rules: {
        // 非必填
        listSourceDocNum: [{ validator: ValidQueryInput, trigger: 'blur' }],
        subjectName: [{ validator: spaceBarAndSpecial, trigger: 'blur' }],
        subjectINum: [{ validator: this.onlyNumberValidate, trigger: 'blur' }, { validator: ValidQueryInput, trigger: 'blur' }]
      },
      powResult: ''
    }
  },
  computed: {
    // 列表查询参数
    searchParams() {
      const obj = Object.assign({}, this.dialogForm, this.dialogPageInfo)
      delete obj.initJudge
      delete obj.total
      delete obj.preliminaryJudgmentInp1
      delete obj.preliminaryJudgmentInp2
      obj.listSourceDocNum = encodeURI(this.dialogForm.listSourceDocNum)
      return obj
    },
    ...mapGetters(['name', 'user_name'])
  },
  watch: {

  },
  methods: {
    onlyNumberValidate(rule, value, callback) {
      if (value !== null && value !== '' && value !== undefined) {
        if (value.length <= 5 || value.length >= 129) {
          callback(new Error('内容应在6-128位之间'))
        } else if (commonPattern.headerAndFooter.test(value)) {
          callback(new Error('首尾不能有空格'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    },
    preliminaryJudgmeFiler(val) {
      const arr = []
      val.charosterPreliminaryJudgmentDOList.map(x => {
        arr.push(x.preliminaryJudgme)
      })
      return arr.join(',')
    },
    handleClose(tag) {
      this.powerDOS.splice(this.powerDOS.indexOf(tag), 1)
      this.$refs.tree.clear(tag)
    },
    showParentComp(data) {
      this.powerDOS = data
      // console.log(data, 3333)
    },
    // 获取字典
    getDictionary(params) {
      dictionary(params).then(res => {
        if (res.code === 200) {
          switch (params) {
            // case 'SCDT':
            //   this.sourceDireArr = res.data
            //   break
            case 'SUBTYPE':
              this.subjectTypeArr = res.data
              break
            case 'TOSC':
              this.dialogJudgmentData = res.data
              break
            default:
              break
          }
        }
      })
    },
    // 获取来源业务
    getsourceBusinessArr() {
      var paramsObj = {
        pageNum: 1,
        pageSize: 9999
      }
      getsourceBusinessArr(paramsObj, '0').then(res => {
        if (res.code === 200) {
          this.sourceBusinessArr = res.data.list
        }
      })
      getsourceBusinessArr(paramsObj, '1').then(res => {
        if (res.code === 200) {
          this.sourceDireArr = res.data.list
        }
      })
      // getsourceBusinessArr('SCDS').then(res => {
      //   if (res.code === 200) {
      //     this.sourceBusinessArr = res.data
      //   }
      // })
    },
    // 获取当前时间
    getDate() {
      var myDate = new Date()
      this.myDate = myDate.toLocaleDateString()
    },
    // 打开---名单弹窗----------------------------添加名单
    // 初步判断为1401 1402 的时候  返回的数据
    // judgmentOther(inp1, inp2) {
    //   this.dialogForm.preliminaryJudgmentInp1 = inp1
    //   this.dialogForm.preliminaryJudgmentInp2 = inp2
    // },
    // 获取初步判断其它
    getJudgmentOther(val1, val2) {
      this.form.preliminaryJudgmentInp1 = val1
      this.form.preliminaryJudgmentInp2 = val2
    },
    clear() {
      // this.$refs.judgment.clear()
      this.$refs.dialogForm.resetFields()
    },
    // 获取子组件发射的信息  --- 初步判断
    getJudgment(val) {
      this.dialogForm.initJudge = val
    },
    openDialogRoster() {
      this.reportCluePreJudgment = []
      this.dialogForm.listSourceDocNum = ''
      this.dialogForm.sourceDire = ''
      this.dialogForm.preliminaryJudgment = []
      this.dialogForm.sourceBusiness = ''
      this.dialogForm.subjectName = ''
      this.dialogForm.subjectINum = ''
      this.dialogForm.subjectType = ''
      this.dialogVisible = true
      this.getDictionary('TOSC')
      this.getsourceBusinessArr()
      this.getDictionary('SCDT')
      this.getDictionary('SUBTYPE')
      this.fetchData()
    },

    // 添加名单弹窗 -- 点击查询
    dialog_searchData(obj) {
      this.fetchData(obj)
    },
    // 切换分页条数
    handleSizeChange(size) {
      this.dialogPageInfo.pageSize = size
      this.fetchData()
    },
    // 点击切换分页
    handleCurrentChange(pageNum) {
      this.dialogPageInfo.pageNum = pageNum
      this.fetchData()
    },
    // 切换分页条数
    handleSizeChangeUp(size) {
      this.dialogPageInfoUp.pageSize = size
      this.fetchData2()
    },
    handleCurrentChangeUp(pageNum) {
      this.dialogPageInfoUp.pageNum = pageNum
      this.fetchData2()
    },
    handleSizeChangeUp2(size) {
      this.dialogPageInfoUp.pageSize = size
      this.pageChange(this.dialogPageInfoUp.pageNum, size)
    },
    handleCurrentChangeUp2(pageNum) {
      this.dialogPageInfoUp.pageNum = pageNum
      this.pageChange(pageNum, this.dialogPageInfoUp.pageSize)
    },
    // 弹窗列表--请求数据方法
    fetchData(obj) {
      if (obj === 'cx') {
        this.dialogPageInfo.pageNum = 1
      }
      this.params = JSON.parse(JSON.stringify(this.searchParams))
      this.params.preliminaryJudgment = this.params.preliminaryJudgment ? this.params.preliminaryJudgment.join(',') : ''
      if (this.$refs.dialogForm) {
        this.$refs.dialogForm.validate(val => {
          if (val) {
            this.loadingA = true
            centerRoster(this.params).then(res => {
              this.loadingA = false
              this.tableData = res.data.list
              this.dialogPageInfo.total = res.data.total
            }).catch(() => {
              this.loadingA = false
            })
          }
        })
      } else {
        this.loadingA = true
        centerRoster(this.params).then(res => {
          this.loadingA = false
          this.tableData = res.data.list
          this.dialogPageInfo.total = res.data.total
        }).catch(() => {
          this.loadingA = false
        })
      }
    },
    fetchData2() {
      this.loadingB = true
      this.params2 = Object.assign({}, this.params2, this.dialogPageInfoUp)
      centerRoster(this.params2).then(res => {
        this.loadingB = false
        this.listData = res.data.list
        this.dialogPageInfoUp.total = res.data.total
      }).catch(() => {
        this.loadingB = false
      })
    },
    handelSelect(rows) {
      this.selectArr = rows
    },
    check() {
      this.addType = 'check'
      if (this.selectArr.length > 0) {
        var arr1 = this.checkData
        var arr2 = this.selectArr
        var arr3 = arr2.filter(function(v) {
          var result = true
          arr1.forEach(res => {
            if (res.lcnId && res.lcnId === v.lcnId) {
              console.log(res.lcnId)
              result = false
            }
            if (res.laId && res.laId === v.laId) {
              result = false
              console.log(res.lcnId)
            }
          })
          return result
        })
        this.checkData.push(...arr3)
        this.dialogPageInfoUp.total = this.checkData.length
        this.pageChange(this.dialogPageInfoUp.pageNum, this.dialogPageInfoUp.pageSize)
      } else {
        this.dialogVisible = false
      }
    },
    pageChange(pageNum, pageSize) {
      if (pageNum !== 1) {
        this.pageStart = (pageSize * (pageNum - 1))
      } else {
        this.pageStart = 0
      }
      if (this.dialogPageInfoUp.total % pageSize !== 0 && pageNum !== 1) {
        if (pageNum * pageSize < this.dialogPageInfoUp.total) {
          this.pageEnd = pageNum * pageSize
        } else {
          this.pageEnd = this.dialogPageInfoUp.total % pageSize + (pageNum * pageSize)
        }
      } else {
        this.pageEnd = pageSize * pageNum
      }
      this.listData = this.checkData.slice(this.pageStart, this.pageEnd)
      this.dialogVisible = false
    },
    checkAll() {
      this.addType = 'all'
      this.params2 = JSON.parse(JSON.stringify(this.params))
      this.listData = JSON.parse(JSON.stringify(this.tableData))
      this.dialogPageInfoUp = JSON.parse(JSON.stringify(this.dialogPageInfo))
      this.dialogVisible = false
    },
    // 选择名单
    selectChange(row) {
      this.listData = row
      this.dialogPageInfoUp.total = this.listData.length
    },
    // 关闭弹窗 清除选中
    clearSelect() {
      this.dialogVisible = false
      this.$refs.poupTable.clearSelection()
    },
    // 获取保存授权接口参数
    getParams() {
      // 树形机构参数
      const powerUsers = []
      const mechanismIds = []
      if (this.$refs.tree) {
        this.powerDOS.forEach(item => {
          const obj = {}
          obj.userId = item.userId
          obj.name = item.name
          obj.code = item.code
          obj.nub = item.nub
          obj.text = item.text
          powerUsers.push(obj)
        })
        this.$refs.tree.depParams.forEach(item => {
          mechanismIds.push(item.id)
        })
      }
      const arr = powerUsers
      const map = {}
      const dest = []
      for (var i = 0; i < arr.length; i++) {
        var ai = arr[i]
        if (!map[ai.code]) {
          dest.push({
            code: ai.code,
            nub: ai.nub,
            text: ai.text,
            data: [ai]
          })
          map[ai.code] = ai
        } else {
          for (var j = 0; j < dest.length; j++) {
            var dj = dest[j]
            if (dj.code === ai.code) {
              dj.data.push(ai)
              break
            }
          }
        }
      }
      const www = []
      dest.forEach(el => {
        el.data.forEach(item => {
          const obj = {}
          obj.userId = item.userId
          obj.userName = item.name
          obj.mechanismId = item.code
          obj.mechanismName = item.text
          if (el.nub !== el.data.length) {
            obj.status = 1
          } else {
            obj.status = 0
          }
          www.push(obj)
        })
      })
      if (this.addType === 'check') {
        const lcnIds = this.listData.map(item => {
          return item.lcnId
        })
        const obj = {
          lcnIds: lcnIds,
          addFlag: '0',
          powerUsers: www,
          powResult: this.powResult
        }
        return obj
      } else {
        const obj = {
          powerUsers: www,
          addFlag: '1',
          powResult: this.powResult
        }
        return obj
      }
    },
    // 保存授权
    saveAuthorization() {
      if (this.listData.length !== 0) {
        if (this.addType === 'check') {
          this.loading = true
          Addauthorization2(this.getParams()).then(res => {
            if (res.code === 200) {
              this.$router.push({ name: 'rosterManage_authorization' })
            } else {
              this.loading = false
            }
          }).catch(() => {
            this.loading = false
          })
        } else {
          var submitPath = 'monitor/listwarn/authorization?'
          for (var item in this.params2) {
            if (item !== 'pageNum' && item !== 'pageSize' && item !== 'total') {
              submitPath += item + '=' + this.params2[item] + '&'
            }
          }
          submitPath = submitPath.substring(0, submitPath.lastIndexOf('&'))
          this.loading = true
          Addauthorization(this.getParams(), submitPath).then(res => {
            if (res.code === 200) {
              this.$router.push({ name: 'rosterManage_authorization' })
            } else {
              this.loading = false
            }
          }).catch(() => {
            this.loading = false
          })
        }
      } else {
        this.$message({
          type: 'warning',
          message: '请添加名单',
          duration: 6000
        })
      }
    },

    // 离开页面
    leavePage() {
      this.$router.push({ name: 'rosterManage_authorization' })
    }
  },

  created() {},
  mounted() {
    this.getDate()
  }
}
</script>

<style lang="scss">
.authorization-add {
  .tableTitle {
    margin-bottom: 4px;
    .tableTitleLabel {
      line-height: 32px;
    }
  }
  .tableList {
    margin-bottom: 30px;
  }
  .chioceBranch {
    padding: 18px 0;
    .el-select {
      width: 30%;
    }
  }
  .bottomBtn {
    text-align: center;
  }
  .searchBtn {
    margin-bottom: 10px;
  }
  // .el-col {
  //   height: 51px;
  // }
  .dialogBranch {
    .el-checkbox-group {
      .el-checkbox {
        margin-left: 10px;
      }
    }
  }
  .rosterDialog {
    .el-select {
      width: 100%;
    }
    .el-checkbox {
      margin-left: 10px;
    }
    .marginBottom24 {
      margin-bottom: 24px;
    }
    .check-box--input {
      position: absolute;
      width: 90%;
    }
  }
  .show-panel {
    border: 1px solid #ebeef5;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    display: inline-block;
    vertical-align: middle;
    max-height: 100%;
    box-sizing: border-box;
    position: relative;
    width: 200px;

    .title {
      height: 40px;
      line-height: 40px;
      background: #f5f7fa;
      margin: 0;
      padding-left: 15px;
      border-bottom: 1px solid #ebeef5;
      box-sizing: border-box;
      color: #000;
    }
    .show-Contet {
      margin: 0;
      padding: 6px 0;
      list-style: none;
      height: 246px;
      overflow: auto;
      box-sizing: border-box;
      .item {
        display: block;
        margin: 0 10px;
      }
    }
  }
}
</style>
