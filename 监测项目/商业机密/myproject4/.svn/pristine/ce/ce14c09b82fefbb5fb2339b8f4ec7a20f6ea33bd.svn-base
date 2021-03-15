<template>
  <div class="advancedList_senior">
    <el-card>
      <div slot="header">
        <span>高级名单预警任务查询</span>
      </div>
      <el-form label-width="130px" :model="form" :rules="searchRules" ref="form">
        <template v-if="toggleSearch">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item
                label="主体名称 ："
                prop="ctnm"
              >
                <el-input
                  placeholder="请输入主体名称,最长50字符" 
                  clearable
                  maxlength="50"
                  v-model="form.ctnm"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="证件号码 ："
                prop="ctid"
              >
                <el-input
                  placeholder="请输入证件号码,最长50字符"
                  clearable
                  maxlength="50"
                  v-model="form.ctid"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-button type="primary" @click="onSubmit">查 询</el-button>
              <el-button @click="cleanUp">清 空</el-button>
              <el-button type="text" icon="el-icon-arrow-down" @click="toggleSearch=false">展开</el-button>
            </el-col>
          </el-row>
        </template>
        <template v-else>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item
                label="  主体名称 ："
                prop="ctnm"
              >
                <el-input
                  placeholder="请输入主体名称,最长50字符"
                  clearable
                  maxlength="50"
                  v-model="form.ctnm"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="证件号码 ："
                prop="ctid"
              >
                <el-input
                  placeholder="请输入证件号码,最长50字符"
                  clearable
                  maxlength="50"
                  v-model="form.ctid"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label=" 来源方向 ：" prop="sourceDire">
                <el-select placeholder="请选择" v-model="form.sourceDire" clearable>
                  <el-option
                    v-for="(item,index) in sourceDireArr"
                    :key="index"
                    :label="item.codeName"
                    :value="item.codeId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>        
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label=" 来源业务 ：" prop="sourceBusiness">
                <el-select placeholder="请选择" v-model="form.sourceBusiness" clearable>
                  <el-option
                    v-for="(item,index) in sourceBusinessArr"
                    :key="index"
                    :label="item.codeName"
                    :value="item.codeId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label=" 是否管理员分配：" prop="whetherDistribution">
                <el-select placeholder="请选择" v-model="form.whetherDistribution" clearable>
                  <el-option label="是" value="0"></el-option>
                  <el-option label="否" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            
            <el-col :span="8">
              <el-form-item
                label=" 预警编号 ："
                prop="code"
              >
                <el-input placeholder="请输入预警编号,最长50字符" clearable maxlength="50" v-model="form.code"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item
                label="  文档来源编码 ："
                prop="listSourceDocNum"
              >
                <el-input
                  placeholder="请输入文档来源编码,最长50字符"
                  clearable
                  maxlength="50"
                  v-model="form.listSourceDocNum"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label=" 操作员 ："
                prop="operator"
              >
                <el-input
                  placeholder="请输入操作员,最长50字符"
                  clearable
                  maxlength="50"
                  v-model="form.operator"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label=" 状态 ：" prop="workstatus">
                <el-select placeholder="请选择" v-model="form.workstatus" clearable>
                  <el-option label="未分配" value="1"></el-option>
                  <el-option label="待处理" value="2"></el-option>
                  <el-option label="处理中" value="3"></el-option>
                  <el-option label="已处理" value="4"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label=" 预警日期 ：" prop="earlywarningtime">
                <el-date-picker
                    value-format="yyyy-MM-dd"
                  v-model="form.earlywarningtime"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="toggle">
            <el-col>
              <div>
                <el-form-item label="涉罪类型：" prop="preliminaryJudgme">
                  <el-select
                    filterable
                    v-model="form.preliminaryJudgme"
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
              </div>
            </el-col>
          </el-row>
          <div style="text-align:right; margin-bottom:10px">
            <el-button type="primary" @click="onSubmit">查 询</el-button>
            <el-button type @click="cleanUp">清 空</el-button>
            <el-button type="text" icon="el-icon-arrow-up" @click="toggleSearch=true">收起</el-button>
          </div>
        </template>
      </el-form>
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.1)"
        :data="listData"
        tooltip-effect="dark"
        @selection-change="handleChange"
      >
        <el-table-column label="序号" type="index" fixed="left"></el-table-column>
        <el-table-column prop="code" label="预警编号 " min-width="180" show-overflow-tooltip>
          <template slot-scope="scope">
             <el-button type="text" @click="Initiate(scope)">{{scope.row.code}}
             </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="ctnm" label="主体名称" min-width="160" show-overflow-tooltip>
          <!-- <template slot-scope="scope">
             <el-button type="text" @click="Initiate(scope)">{{scope.row.ctnm}}
             </el-button>
          </template> -->
        </el-table-column>
        <el-table-column prop="ctid" label="证件号码 " min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="ctac" label="账号 " min-width="150" show-overflow-tooltip></el-table-column> 
        <el-table-column prop="listSourceDocNum" label="名单来源文档编号 " min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="sourceDire" label="来源方向 " min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="sourceBusiness" label="来源业务 " min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column label="涉罪类型 " min-width="120">
          <!-- <template slot-scope="scope">
            <span v-for="(item,index) in scope.row.charosterPreliminaryJudgmentDOList" :key="index">{{item.id}}</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column label="预警范围" min-width="140" show-overflow-tooltip> -->
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
                <div slot="content" v-for="(item,index2) in scope.row.charosterPreliminaryJudgmentDOList" :key="index2" style="margin:4px">{{item.id}}</div>
                <span v-if="scope.row.charosterPreliminaryJudgmentDOList.length!==0">{{scope.row.charosterPreliminaryJudgmentDOList[0].id}}</span>
              </el-tooltip>
              <span v-if="scope.row.charosterPreliminaryJudgmentDOList.length>1">...</span>
            </template>
          </el-table-column>
        <el-table-column prop="earlywarningtime" label="预警时间" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="whetherDistribution" label="是否管理员分配 " min-width="120" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.whetherDistribution ==='0'?'是':'否'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="workstatus" label="状态 " min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="operator" label="操作员 " min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="updatetime" label="更新时间 " min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" min-width="145" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" :disabled="scope.row.workstatus !== '未分配'" @click="handleWarningRange(scope)">分配</el-button>
            <!-- <el-button type="text">收回</el-button> -->
            <el-button type="text" @click="Initiate(scope)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row style="margin-top:10px;">
        <!-- <el-col :span="8">
          <el-button type="primary" plain @click="exportData">导 出</el-button>
        </el-col>-->
        <!-- <el-col :span="16"> -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfo.pageNum"
          :page-size="pageInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo.total"
          background
        ></el-pagination>
        <!-- </el-col> -->
      </el-row>
    </el-card>
    <el-dialog title="预警范围" :visible.sync="warningRangeDialogVisible" width="70%" @open="openWarningDialog" @close="closeWarningDialog">
      <el-form>
        <organization-tree v-on:showParentComp="handlesubmitWaring" type='rule' :lableWidth="114" ref="tree"></organization-tree>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import organizationTree from '@/views/sys-monitoringAnalysis/taskManagement/seniorwarning/components/organizationTree.vue'
import { earlyWarning } from '@/api/sys-monitoringAnalysis/taskManagement/modelWarning/modelWarning.js'
import { getrangNameapi } from '@/api/sys-monitoringAnalysis/taskManagement/seniorwarning/newSeniorlistWarningConfigur.js'
import { commonPattern, ValidQueryInput } from '@/utils/formValidate'
import { getsourceBusinessArr } from '@/api/sys-monitoringAnalysis/roster-warning/levelConfiguration.js'
import { dictionary } from '@/api/sys-monitoringAnalysis/roster-warning/common.js'
import { getList, distributionList } from '@/api/sys-monitoringAnalysis/taskManagement/seniorwarning/new.js'
export default {
  components: {
    organizationTree
  },
  data() {
    return {
      ztname: '',
      workstatus: '',
      taskId: '',
      dynamicTags: [],
      rightTransfer: [], // 右侧穿梭框
      warningRangeDialogVisible: false,
      listData: [],
      delArr: [],
      sourceDireArr: [],
      dialogJudgmentData: [],
      sourceBusinessArr: [],
      toggleSearch: true,
      isReplenishOne: false,
      isReplenishTwo: false,
      supplementOne: '',
      supplementTwo: '',
      loading: false,
      load: false,
      userArr: [],
      dataTransfer: [],
      transferOrginData: [], // 原始穿梭框数据
      treeChecked: [], // 树选中的数据
      treeDataList: [],
      defaultProps: {
        children: 'children',
        label: 'text'
      },
      form: {
        ctnm: '',
        sourceDire: '',
        sourceBusiness: '',
        whetherDistribution: '',
        ctid: '',
        operator: '',
        code: '',
        listSourceDocNum: '',
        workstatus: '',
        preliminaryJudgme: '',
        earlywarningtime: ''
      },
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      searchRules: {
        ctnm: [{ validator: this.delDataValidInput, trigger: 'blur' }],
        ctid: [{ validator: this.onlyNumberValidate1, trigger: 'blur' }, { validator: ValidQueryInput, trigger: 'blur' }],
        code: [{ validator: this.onlyNumberValidate, trigger: 'blur' }],
        listSourceDocNum: [{ validator: ValidQueryInput, trigger: 'blur' }],
        operator: [{ validator: ValidQueryInput, trigger: 'blur' }]
      }
    }
  },
  computed: {
    searchParams() {
      if (sessionStorage.getItem('searchData')) {
        const searchData = JSON.parse(sessionStorage.getItem('searchData'))
        if (searchData.pageName === this.$route.name && searchData.isReview) {
          this.pageInfo = searchData.pageInfo
          this.toggleSearch = searchData.toggleSearch
          this.form = searchData.searchFrom
        }
      }
      const obj = Object.assign({}, this.form, this.pageInfo)
      delete obj.preliminaryJudgme
      if (obj.earlywarningtime) {
        obj.earlywarningtimeStartDate = obj.earlywarningtime[0]
        obj.earlywarningtimeEndDate = obj.earlywarningtime[1]
      }
      if (this.form.preliminaryJudgme.indexOf('1401') !== -1) {
        const i = this.form.preliminaryJudgme.indexOf('1401')
        this.form.preliminaryJudgme[i] = '1401-' + this.supplementOne
      }
      if (this.form.preliminaryJudgme.indexOf('1402') !== -1) {
        const n = this.form.preliminaryJudgme.indexOf('1402')
        this.form.preliminaryJudgme[n] = '1402-' + this.supplementTwo
      }
      if (this.form.preliminaryJudgme) {
        obj.preliminaryJudgme = this.form.preliminaryJudgme.join(',')
      }
      console.log(obj, '3232')
      delete obj.earlywarningtime
      return obj
    }
  },
  methods: {
    getTemArr(data) {
      this.warningRangeDialogVisible = false
      this.userArr = data
      console.log(data)
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
    // 获取列表数据方法
    initList(params) {
      this.loading = true
      getList(params).then(res => {
        if (res.code === 200) {
          this.loading = false
          const arr = res.data.list
          this.pageInfo.total = res.data.total
          arr.forEach(el => {
            switch (el.workstatus) {
              case '1':
                el.workstatus = '未分配'
                break
              case '2':
                el.workstatus = '待处理'
                break
              case '3':
                el.workstatus = '处理中'
                break
              case '4':
                el.workstatus = '已处理'
                break
            }
            if (el.updatetime) {
              el.updatetime = el.updatetime.substr(0, 10)
            }
            if (el.earlywarningtime) {
              el.earlywarningtime = el.earlywarningtime.substr(0, 10)
            }
          })
          const searchData = {
            pageName: this.$route.name,
            pageInfo: this.pageInfo,
            toggleSearch: this.toggleSearch,
            searchFrom: this.form
          }
          sessionStorage.setItem('searchData', JSON.stringify(searchData))
          this.listData = arr
          this.listData.forEach(res => {
            for (var item in res) {
              if (res[item] === '@N' || res[item] === 'null' || res[item] === '-') {
                res[item] = ''
              }
            }
          })
        } else {
          this.loading = false
        }
      }).catch(() => {
        this.loading = false
      })
      // this.listData = [
      //   {
      //     ctnm: '阿卡丽',
      //     sourceDire: '来源于XXX国家',
      //     sourceBusiness: '协查',
      //     whetherDistribution: '是',
      //     ctid: '522400197501159392',
      //     operator: '李四',
      //     code: '10002928911',
      //     listSourceDocNum: 'S00001',
      //     workstatus: '未分配',
      //     preliminaryJudgme: '涉嫌欺骗罪',
      //     updateTime: '2009-11-18 08:00:30',
      //     earlywarningtime: '2019-01-18 08:00:30'
      //   },
      //   {
      //     ctnm: '猴子',
      //     sourceDire: '来源于XXX国家',
      //     sourceBusiness: '协查',
      //     whetherDistribution: '是',
      //     ctid: '522400197501159392',
      //     operator: '李四',
      //     code: '10002928911',
      //     listSourceDocNum: 'S00001',
      //     workstatus: '处理完成',
      //     preliminaryJudgme: '涉嫌欺骗罪',
      //     updateTime: '2009-11-18 08:00:30',
      //     earlywarningtime: '2019-01-18 08:00:30'
      //   }
      // ]
    },
    // 查询
    onSubmit() {
      console.log(this.searchParams)
      this.initList(this.searchParams)
    },
    // 判断涉罪类型是否显示补充
    replenish() {
      if (this.form.preliminaryJudgme.indexOf('1402') !== -1) {
        this.isReplenishTwo = true
      } else {
        this.isReplenishTwo = false
      }
      if (this.form.preliminaryJudgme.indexOf('1401') !== -1) {
        this.isReplenishOne = true
      } else {
        this.isReplenishOne = false
      }
    },
    // 获取字典
    getDictionary(params) {
      dictionary(params).then(res => {
        if (res.code === 200) {
          switch (params) {
            // case 'SCDT':
            //   this.sourceDireArr = res.data
            // break
            case 'TOSC':
              this.dialogJudgmentData = res.data
              break
            default:
              break
          }
        }
      })
    },
    //  预警范围 左 穿梭框
    handleNodeClick() {
      // const obj = {
      //   token: getToken(),
      //   deptId: this.$refs.reftree.getCheckedKeys().join()
      // }
      const idsArr = this.$refs.reftree.getCheckedKeys().join()
      if (idsArr !== '') {
        getrangNameapi(idsArr).then(res => {
          if (res.code === 200) {
            this.dataTransfer = []
            // this.rightTransfer = []
            this.transferOrginData = res.data
            const objTree = res.data
            this.dataTransfer = Object.values(objTree).reduce((a, b) => [...a, ...b], [])
          }
        })
      } else {
        this.dataTransfer = []
        this.rightTransfer = []
      }
    },
    // 预警范围 - 确定
    handlesubmitWaring(data) {
      if (data.length !== 0) {
        this.load = true
        this.loading = true
        this.dynamicTags = data
        this.warningRangeDialogVisible = false
        this.peekId()
      } else {
        this.warningRangeDialogVisible = false
      }
    },
    // 获取 父子 id
    peekId() {
      // const rightData = this.$refs.refTransfer.targetData // 右穿梭
      // const objOrgin = this.transferOrginData // 原始数据对象
      // this.treeChecked = this.$refs.reftree.getCheckedNodes() // 树选中的数据
      // rightData.forEach((item, idx) => {
      //   for (var org in objOrgin) {
      //     for (let index = 0; index < objOrgin[org].length; index++) {
      //       const element = objOrgin[org][index]
      //       var flag = true
      //       if (item.userId === element.userId) {
      //         flag = false
      //       }
      //       if (!flag) {
      //         this.treeChecked.forEach(tree => {
      //           if (tree.id === org) {
      //             item.departmentId = tree.id
      //             item.departmentName = tree.text
      //             this.dynamicTags.push(item)
      //             return
      //           }
      //         })
      //       }
      //     }
      //   }
      // })
      const obj = {}
      obj.taskId = this.taskId
      obj.ctnm = this.ztname
      obj.code = this.code
      obj.workstatus = this.workstatus
      obj.seniorNamelistRanges = this.dynamicTags
      distributionList(obj).then(res => {
        if (res.code === 200) {
          this.load = false
          this.loading = false
          this.$message({
            message: '分配成功',
            type: 'success',
            duration: 6000
          })
          this.initList(this.searchParams)
        } else {
          this.load = false
          this.loading = false
        }
      }).catch(() => {
        this.load = false
        this.loading = false
      })
    },
    //   预警范围 - 树
    handleWarningRange(scope) {
      this.taskId = scope.row.taskId
      this.ztname = scope.row.ctnm
      this.code = scope.row.code
      this.workstatus = scope.row.workstatus
      switch (scope.row.workstatus) {
        case '未分配':
          this.workstatus = '1'
          break
        case '待处理':
          this.workstatus = '2'
          break
        case '处理中':
          this.workstatus = '3'
          break
        case '已处理':
          this.workstatus = '4'
          break
      }
      // this.treeDataList = []
      this.treeChecked = []
      this.warningRangeDialogVisible = true
      // getWarnrangapi().then(res => {
      //   if (res.code === 200) {
      //     res.data.disabled = true
      //     this.treeDataList.push(res.data)
      //   }
      // })
    },
    // 打开 预警范围 - dialog
    openWarningDialog() {
      this.$refs.reftree.setCheckedNodes(this.treeChecked)
    },

    // 关闭 预警范围 - dialog
    closeWarningDialog() {
      this.dataTransfer = []
      this.taskId = ''
      this.code = ''
      this.ztname = ''
      this.workstatus = ''
    },
    // 涉罪校验
    szisValidInput1(rule, value, callback) {
      if (!commonPattern.spaceBar.test(this.supplementOne)) {
        callback(new Error('内容不能含有空格'))
      } else if (commonPattern.spaceBar.test(this.supplementOne)) {
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
      } else if (commonPattern.spaceBar.test(this.supplementTwo)) {
        callback(new Error('内容不能填写特殊字符'))
      } else if (this.supplementTwo === '') {
        callback(new Error('请输入内容'))
      } else {
        callback()
      }
    },
    // 请求 分配范围数据
    requestWaringData() {
      this.treeDataList = []
      earlyWarning().then(res => {
        if (res.code === 200) {
          this.treeDataList = []
          const totalDataList = res.data.data
          totalDataList[0].disabled = true
          this.treeDataList.push(totalDataList[0])
        } else {
          this.$message({
            type: 'error',
            message: '获取预警范围出错！',
            duration: 6000,
            showClose: true
          })
        }
      })
    },
    // 清空
    cleanUp() {
      this.$refs.form.resetFields()
      this.supplementOne = ''
      this.supplementTwo = ''
      this.isReplenishOne = false
      this.isReplenishTwo = false
      this.form.ctnm = ''
      this.form.sourceDire = ''
      this.form.sourceBusiness = ''
      this.form.whetherDistribution = ''
      this.form.ctid = ''
      this.form.operator = ''
      this.form.code = ''
      this.form.listSourceDocNum = ''
      this.form.workstatus = ''
      this.form.preliminaryJudgme = ''
      this.form.earlywarningtime = ''
    },
    // 选择的数据
    handleChange(val) {
      this.delArr = val
    },
    // 查看
    Initiate(scope) {
      this.$router.push(
        {
          name: 'forewarningEnd_detail',
          query: {
            // status: 'see',
            // id: scope.row.code,
            // data: scope.row,
            code: scope.row.code,
            taskId: scope.row.taskId,
            batchdt: scope.row.batchdt,
            ctnm: scope.row.ctnm,
            ctid: scope.row.ctid,
            ctac: scope.row.ctac,
            type: 'single'
          }
        }
      )
    },
    delDataValidInput(rule, value, callback) {
      if (commonPattern.specialCharInQuery.test(value)) {
        callback(new Error('内容不能填写特殊字符'))
      } else if (commonPattern.headerAndFooter.test(value)) {
        callback(new Error('首尾不能有空格'))
      } else {
        callback()
      }
    },
    // 数字检查
    onlyNumberValidate(rule, value, callback) {
      if (value !== '') {
        if (!commonPattern.spaceBar.test(value)) {
          callback(new Error('内容不能含有空格'))
        } else if (commonPattern.specialCharInQuery.test(value)) {
          callback(new Error('内容不能填写特殊字符'))
        } else if (!commonPattern.number.test(value) && value !== '') {
          callback(new Error('必须输入数值'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    },
    onlyNumberValidate1(rule, value, callback) {
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
    // 切换分页条数
    handleSizeChange(size) {
      this.pageInfo.pageSize = size
      this.initList(this.searchParams)
    },
    // 点击切换分页
    handleCurrentChange(pageNum) {
      this.pageInfo.pageNum = pageNum
      this.initList(this.searchParams)
    }
  },
  mounted() {
    this.requestWaringData()
    this.initList(this.searchParams)
    this.getDictionary('TOSC')
    this.getDictionary('SCDT')
    this.getsourceBusinessArr()
  }
}
</script>
<style lang="scss">
.advancedList_senior {
  .el-date-editor--daterange {
    min-width: 100%;
    max-width: 100%;
  }
  .el-date-editor--daterange {
    width: 100%;
  }
  .el-select {
    width: 100%;
  }
  .el-transfer-panel__list{
    padding-right: 30px;
  }
}
</style>