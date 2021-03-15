<template>
  <el-card class="box-card forewarningTask-index">
    <div slot="header" class="clearfix">
      <span>任务列表</span>
      <router-link :to="{name:'forewarningTask_add',params:{type:'add',auditorFlag:'0'}}" style="float: right;">
        <el-button type="text" icon="el-icon-plus"> 新建任务</el-button>
      </router-link>
    </div>
    <div class="content">
      <el-form :model="form" class="formBlock" ref="searchForm" :rules="rules" label-width="114PX">
        <template v-if="toggleSearch">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="预警任务" prop="wJName">
                <el-input v-model="form.wJName" maxlength="50" placeholder="最长50字符数"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="预警规则" prop="ruleName">
                <el-input v-model="form.ruleName" maxlength="50" placeholder="最长50字符数"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-button type="primary" @click="searchList">查询</el-button>
              <el-button type="default" @click="cleanUp">清空</el-button>
              <el-button type="text" icon="el-icon-arrow-down" @click="toggleSearch=false"> 展开</el-button>
            </el-col>
          </el-row>
        </template>
        <template v-else>
          
          <el-row :gutter="20" class="toggle">
            <el-col :span="8">
              <el-form-item label="预警任务" prop="wJName">
                <el-input v-model="form.wJName" maxlength="50" placeholder="最长50字符数"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="预警规则" prop="ruleName">
                <el-input v-model="form.ruleName" maxlength="50" placeholder="最长50字符数"></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="8">
              <el-form-item label="文件名称" prop="impName">
                <el-input v-model="form.impName" maxlength="50" placeholder="最长50字符数"></el-input>
              </el-form-item>
            </el-col> -->
            <el-col :span="8">
              <el-form-item label="主体名称" prop="subjectName">
                <el-input v-model="form.subjectName"  maxlength="50" placeholder="最长50字符数"></el-input>
                <!-- :onkeyup="this.form.subjectName=this.form.subjectName.replace(/^\s+|\s+$/g,'')" -->
              </el-form-item>
            </el-col>
          <!-- </el-row>

          <el-row  :gutter="20" class="toggle"> -->
            <el-col :span="8">
              <el-form-item label="主体证件号码" prop="subjectINum">
                <el-input v-model="form.subjectINum" maxlength="128" placeholder="最长128字符数"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="来源方向" prop="sourceDire">
                <el-select v-model="form.sourceDire" clearable placeholder="请选择" filterable>
                 <el-option v-for="(item,index) in sourceDireArr" :key="index" :label="item.codeName" :value="item.codeId"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="来源业务" prop="sourceBusiness">
                <el-select v-model="form.sourceBusiness" clearable placeholder="请选择" filterable>
                   <el-option v-for="(item,index) in sourceBusinessArr" :key="index" :label="item.codeName" :value="item.codeId"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          <!-- </el-row>

          <el-row  :gutter="20">  -->
            <el-col :span="8">
              <el-form-item label="名单来源编号" prop="listSourceDocNum">
                <el-input v-model="form.listSourceDocNum" maxlength="128" placeholder="最长128字符数"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
            <el-col :span="24">
              <!-- <preliminary-judgment :lableWidth="114" ref="judgment"></preliminary-judgment> -->
                <el-form-item label="涉罪类型：" prop="preliminaryJudgment" >
                      <el-select
                        filterable
                        clearable
                        v-model="form.preliminaryJudgment"
                        multiple
                        placeholder="请选择"
                        @change="replenish"
                      >
                        <el-option
                          v-for="(item,index) in dialogJudgmentData"
                          :key="index"
                          :label="item.codeName"
                          :value="item.codeId"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item
                      v-if="isReplenishOne"
                      prop="supplementOne"
                      :rules="[{required:true, validator: szisValidInput1, trigger: 'blur'}]"
                    >
                      <el-input
                        maxlength="100"
                        v-model="supplementOne"
                        placeholder="请填写关于司法机构或行政调查已介入的可疑交易行为的补充"
                      ></el-input>
                    </el-form-item>
                    <el-form-item
                      v-if="isReplenishTwo"
                      prop="supplementTwo"
                      :rules="[{required:true, validator: szisValidInput2, trigger: 'blur'}]"
                    >
                      <el-input
                        maxlength="100"
                        v-model="supplementTwo"
                        placeholder="请填写关于涉嫌其他犯罪的可疑交易行为的补充"
                      ></el-input>
                    </el-form-item>
            </el-col>

            <!-- <el-col :span="24">
              <el-form-item label="备注" prop="remark" :rules="[{validator: isValidInput, trigger: 'blur'}]">
                <el-input type="textarea" maxlength="1024" placeholder="最长1024字符数" v-model="form.remark"></el-input>
              </el-form-item>
            </el-col> -->
          <div style="text-align:right;margin-bottom:30px">
            <el-button type="primary" @click="searchList">查 询</el-button>
            <el-button @click="cleanUp">清 空</el-button>
            <el-button type="text" icon="el-icon-arrow-up" @click="toggleSearch = true">收起</el-button>
          </div>
        </template>
      </el-form>
      <el-table 
        style="width: 100%" 
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.1)" 
        :data="tableData">
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="wJName" label="预警任务" min-width="140" show-overflow-tooltip>
          <!-- <template slot-scope="scope">
            <el-button type="text" @click="showDetail(scope)">{{scope.row.wJName}}</el-button>
          </template> -->
        </el-table-column>
        <el-table-column label="预警名单" min-width="140">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" placement="top-start">
              <div slot="content" v-for="(item,index2) in scope.row.listWarnDOS" :key="index2" style="margin:4px">{{item.subjectName || item.countList}}</div>
              <span v-if="scope.row.listWarnDOS.length!==0">{{scope.row.listWarnDOS[0].subjectName || scope.row.listWarnDOS[0].countList}}</span>
            </el-tooltip>
            <span v-if="scope.row.listWarnDOS.length>1">...</span>
          </template>
        </el-table-column>
        <el-table-column label="预警规则" min-width="140">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" placement="top-start">
              <div slot="content" v-for="(item,index2) in scope.row.warnRuleDOList" :key="index2" style="margin:4px">{{item.ruleName}}</div>
                <span v-for="(item,index) in scope.row.warnRuleDOList" :key="index">
                  <span>{{item.ruleName}}</span>
                </span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="creDt" label="创建日期" min-width="140" show-overflow-tooltip></el-table-column>
        <el-table-column label="状态" min-width="100" show-overflow-tooltip>
          <template slot-scope="scope">
            <span class="mark-span" v-if="scope.row.status==1" style="background:#F56C6C"></span>
            <span class="mark-span" v-else style="background:#67C23A"></span>
            <span>{{scope.row.status==0?'启用':'禁用'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="审核状态" min-width="100" show-overflow-tooltip>
          <template slot-scope="scope">
            <span class="mark-span" v-if="scope.row.approveStatus==1" style="background:#67C23A"></span>
            <span class="mark-span" v-else style="background:#F56C6C"></span>
            <span>{{scope.row.approveStatus=='0'?'待审核': scope.row.approveStatus=='1'?'通过':scope.row.approveStatus=='2'?'未通过':'已保存'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="option" label="操作" width="140">
          <template slot-scope="scope">
            <div>
            <el-button type="text" @click="showDetail(scope)">查看</el-button>
            <el-button type="text" @click="startUse(scope)" v-if="scope.row.status==1 && scope.row.approveStatus=='1' && scope.row.isApprove === '0'" > 启用</el-button>
            <el-button type="text" @click="startUse(scope)" v-if="scope.row.status==0 && scope.row.isApprove === '0'">禁用</el-button>
            <el-button type="text" v-if="scope.row.status == 1 && scope.row.approveStatus !=='0' && scope.row.isApprove === '0' " @click="delTask(scope.row.wJId)">删除</el-button>            
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.pageNum" :page-size="pageInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total" background>
      </el-pagination>
    </div>
  </el-card>

</template>

<script>
import { dictionary } from '@/api/sys-monitoringAnalysis/roster-warning/common.js'
import { getsourceBusinessArr } from '@/api/sys-monitoringAnalysis/roster-warning/levelConfiguration.js'
import preliminaryJudgment from '@/views/sys-monitoringAnalysis/monitoringWarning/rosterWarning/components/preliminaryJudgment.vue'
import {
  getTable,
  delRule,
  deleteSingle,
  getPermission
} from '@/api/sys-monitoringAnalysis/roster-warning/warning-task.js'
import { commonPattern, ValidQueryInput } from '@/utils/formValidate'
export default {
  components: {
    preliminaryJudgment
  },

  data() {
    return {
      toggleSearch: true,
      isReplenishOne: false,
      isReplenishTwo: false,
      supplementOne: '',
      supplementTwo: '',
      dialogJudgmentData: [],
      form: {
        wJName: '',
        ruleName: '',
        impName: '',
        subjectName: '',
        subjectINum: '',
        sourceDire: '',
        sourceBusiness: '',
        listSourceDocNum: '',
        preliminaryJudgment: []
        // remark: ''
      },
      sourceDireArr: [], // 来源方向
      sourceBusinessArr: [], // 来源业务
      tableData: [],
      params: {},
      loading: false,
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      typeId: 'TOSC',
      optionsOne: [],
      auditorFlag: false,
      rules: {
        wJName: [{ validator: ValidQueryInput, trigger: 'blur' }],
        ruleName: [{ validator: ValidQueryInput, trigger: 'blur' }],
        impName: [{ validator: ValidQueryInput, trigger: 'blur' }],
        subjectName: [{ validator: this.delDataValidInput, trigger: 'blur' }],
        subjectINum: [{ validator: this.onlyNumberValidate, trigger: 'blur' }, { validator: ValidQueryInput, trigger: 'blur' }],
        listSourceDocNum: [{ validator: ValidQueryInput, trigger: 'blur' }]
      }
    }
  },
  computed: {
    searchParams() {
      const obj = Object.assign({}, this.form)
      delete obj.total
      delete obj.preliminaryJudgment
      if (this.form.preliminaryJudgment) {
        for (var i = 0; i < this.form.preliminaryJudgment.length; i++) {
          if (this.form.preliminaryJudgment[i].indexOf('1401') !== -1) {
            this.form.preliminaryJudgment[i] = '1401-' + this.supplementOne
          }
          if (this.form.preliminaryJudgment[i].indexOf('1402') !== -1) {
            this.form.preliminaryJudgment[i] = '1402-' + this.supplementTwo
          }
        }
        obj.preliminaryJudgment = this.form.preliminaryJudgment.join(',')
      }
      return obj
    }
  },
  methods: {
    delDataValidInput(rule, value, callback) {
      if (commonPattern.specialCharInQuery.test(value)) {
        callback(new Error('内容不能填写特殊字符'))
      } else if (commonPattern.headerAndFooter.test(value)) {
        callback(new Error('首尾不能有空格'))
      } else {
        callback()
      }
    },
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
      // getsourceBusinessArr().then(res => {
      //   if (res.code === 200) {
      //     this.sourceBusinessArr = res.data
      //   }
      // })
    },
    // 获取数据字典
    getDictionary(params) {
      dictionary(params).then(res => {
        if (res.code === 200) {
          switch (params) {
            // case 'SCDT':
            //   this.sourceDireArr = res.data
            //   break
            case 'TOSC':
              this.dialogJudgmentData = res.data
              break
            default:
              break
          }
        }
      })
    },
    searchList() {
      this.$refs.searchForm.validate(val => {
        if (val) {
          this.pageInfo.total = 0
          this.pageInfo.pageNum = 1
          this.params = Object.assign({}, this.searchParams, this.pageInfo)
          this.fetchData()
        }
      })
    },
    // 请求列表数据
    fetchData() {
      this.loading = true
      this.params = Object.assign({}, this.params, this.pageInfo)
      this.params.advancedWarnJob = '0'
      getTable(this.params)
        .then(res => {
          if (res.code === 200) {
            this.tableData = res.data.list
            for (var i = 0; i < this.tableData.length; i++) {
              if (this.tableData[i].listWarnJobRuleDos.length !== 0) {
                this.tableData[i].warnRuleDOList = this.tableData[i].listWarnJobRuleDos[0].warnRuleDOList
              }
              for (var j = 0; j < this.tableData[i].listWarnDOS.length; j++) {
                if (this.tableData[i].listWarnDOS[j].listAccountDOList.length !== 0) {
                  var arr = []
                  this.tableData[i].listWarnDOS[j].listAccountDOList.forEach(res => {
                    arr.push(res.accNum)
                  })
                  this.tableData[i].listWarnDOS[j].countList = arr.join(',')
                }
              }
            }
            console.log(this.tableData)
            this.pageInfo.total = res.data.total
            this.loading = false
          } else {
            this.loading = false
          }
        })
        .catch(err => {
          this.loading = false
          console.log(err)
        })
    },
    // 判断涉罪类型是否显示补充
    replenish() {
      if (this.form.preliminaryJudgment.indexOf('1402') !== -1) {
        this.isReplenishTwo = true
      } else {
        this.isReplenishTwo = false
      }
      if (this.form.preliminaryJudgment.indexOf('1401') !== -1) {
        this.isReplenishOne = true
      } else {
        this.isReplenishOne = false
      }
    },
    // 涉罪校验
    szisValidInput1(rule, value, callback) {
      if (!commonPattern.spaceBar.test(this.supplementOne)) {
        callback(new Error('内容不能含有空格'))
      } else if (commonPattern.specialCharInQuery.test(this.supplementOne)) {
        callback(new Error('内容不能填写特殊字符'))
      } else if (this.supplementOne === '') {
        callback(new Error('请输入内容'))
      } else {
        callback()
      }
    },
    szisValidInput2(rule, value, callback) {
      if (!commonPattern.spaceBar.test(this.supplementTwo)) {
        callback(new Error('内容不能含有空格'))
      } else if (commonPattern.specialCharInQuery.test(this.supplementTwo)) {
        callback(new Error('内容不能填写特殊字符'))
      } else {
        callback()
      }
    },
    // 切换分页条数
    handleSizeChange(size) {
      this.pageInfo.pageSize = size
      this.fetchData()
      // console.log(`每页 ${size} 条`)
    },
    // 点击切换分页
    handleCurrentChange(pageNum) {
      this.pageInfo.pageNum = pageNum
      this.fetchData()
      // console.log(`当前页: ${currentPage}`)
    },
    cleanUp() {
      this.$refs.searchForm.resetFields()
      this.form = {
        wJName: '',
        ruleName: '',
        impName: '',
        subjectName: '',
        subjectINum: '',
        sourceDire: '',
        sourceBusiness: '',
        listSourceDocNum: '',
        preliminaryJudgment: []
        // remark: ''
      }
      this.supplementTwo = ''
      this.supplementOne = ''
      this.isReplenishOne = false
      this.isReplenishTwo = false
    },

    // 是否启用
    startUse(scope) {
      const val = Number(scope.row.status) === 0 ? '禁用' : '启用'
      this.$confirm('是否' + val + '？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const id = scope.row.wJId
          const status = scope.row.status === 0 ? 1 : 0

          delRule(id, status).then(res => {
            if (res.code === 200) {
              this.fetchData()
            }
          })
        })
        .catch(() => {})
    },
    isValidInput(rule, value, callback) {
      if (!commonPattern.spaceBar.test(value)) {
        callback(new Error('内容不能含有空格'))
      } else if (commonPattern.specialChar.test(value) || commonPattern.specialEng.test(value)) {
        callback(new Error('内容不能填写特殊字符'))
      } else {
        callback()
      }
    },
    delTask(id) {
      this.$confirm('您确认要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteSingle(id).then(res => {
            if (res.code === 200) {
              this.$message({
                message: '删除成功！',
                type: 'success'
              })
              this.fetchData()
            }
          })
        })
        .catch(() => {})
    },
    getPermission() {
      getPermission().then(res => {
        if (res.code === 200) {
          if (res.data === 'Y') {
            this.auditorFlag = true
          } else {
            this.auditorFlag = false
          }
        }
      })
    },
    showDetail(scope) {
      const searchData = {
        pageName: this.$route.name,
        pageInfo: this.pageInfo,
        searchForm: this.form,
        params: this.params,
        spreadType: this.toggleSearch
      }
      sessionStorage.setItem('searchData', JSON.stringify(searchData))
      this.$router.push({ name: 'forewarningTask_add', params: { type: 'edit', id: scope.row.wJId, auditorFlag: scope.row.isApprove }})
    }
  },
  mounted() {
    if (sessionStorage.getItem('searchData')) {
      const searchData = JSON.parse(sessionStorage.getItem('searchData'))
      if (searchData.pageName === this.$route.name && searchData.isReview) {
        this.pageInfo = searchData.pageInfo
        this.form = searchData.searchForm
        this.params = searchData.params
        this.toggleSearch = searchData.spreadType
      }
    }
    sessionStorage.removeItem('searchData')
    this.fetchData()
    this.getDictionary('SCDT')
    this.getDictionary('TOSC')
    this.getsourceBusinessArr()
    this.getPermission()
  }
}
</script>

<style lang="scss">
.forewarningTask-index {
  .formBlock {
    .el-select {
      width: 100%;
    }
  }
  .el-col-8{
    display: inline;
  }
  .el-popover--plain{
    margin-left: -50px;
  }
  .mark-span {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    vertical-align: 1px;
  }
  .el-col-8 {
    height: 55px;
  }
  @media screen and(max-width: 1400px) {
    .toggle {
      .el-col-8 {
        width: 50%;
      }
    }
  }
}
</style>
