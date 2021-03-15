<template>
  <div class="analysisSpecial-index"
  v-loading="loading"
  element-loading-text="查询中，请稍等......"
  element-loading-spinner="el-icon-loading"
  element-loading-background="rgba(0, 0, 0, 0.3)">
    <el-card>
      <div
        slot="header"
        class="clearfix"
      >
        <span>查询</span>
        <router-link
          v-if="isShow"
          :to="{name:'analysisSpecial_clueSave2'}"
          style="float:right"
        >
          <el-button type="text">新建申请</el-button>
        </router-link>
      </div>

      <el-form
        :model="form"
        label-width="100px"
        :rules="rules"
        ref="searchForm"
      >
        <template v-if="toggleSearch">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item
                label="线索名称："
                prop="clueName"
              >
                <el-input
                  v-model="form.clueName"
                  placeholder="请输入线索名称，最多输入50位"
                  maxlength="50"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="线索来源："
                prop="clueSource"
              >
                <el-input v-model="form.clueSource" maxlength="50" placeholder="请输入线索来源，最多输入50位"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-button
                type="primary"
                @click="onSubmit()"
              >查 询</el-button>
              <el-button
              type="primary"
              plain
                @click="cleanUp"
              >清 空</el-button>
              <el-button
                type="text"
                icon="el-icon-arrow-down"
                @click="toggleSearch=false"
              >展开</el-button>
            </el-col>
          </el-row>
        </template>
        <template v-else>
          <el-row class="toggle" :gutter="20">
            <el-col :span="8">
              <el-form-item
                label="线索名称："
                prop="clueName"
              >
                <el-input
                  v-model="form.clueName"
                  placeholder="请输入线索名称，最多输入50位"
                  maxlength="50"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="线索来源："
                prop="clueSource"
              >
                <el-input v-model="form.clueSource" maxlength="50" placeholder="请输入线索来源，最多输入50位"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="状态："
                prop="clueState"
              >
                <el-select
                  clearable
                  v-model="form.clueState"
                  placeholder="请选择状态"
                >
                  <el-option
                  v-if="this.isBranch"
                    value="1"
                    label="已保存"
                  ></el-option>
                  <el-option
                    value="2"
                    label="已提交"
                  ></el-option>
                  <el-option
                    value="3"
                    label="已分发"
                  ></el-option>
                  <el-option
                    value="4"
                    label="已分配"
                  ></el-option>
                  <el-option
                    value="5"
                    label="退回"
                  ></el-option>
                  <el-option
                    value="6"
                    label="已分析"
                  ></el-option>
                  <el-option
                    value="7"
                    label="审核未通过"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item
                label="主体名称："
                prop="name"
              >
                <el-input
                  v-model="form.name"
                   placeholder="请输入主体名称，最多输入50位"
                  maxlength="50"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="账号："
                prop="accountNum"
              >
                <el-input
                  v-model="form.accountNum"
                  placeholder="请输入账号名称，最多输入30位"
                  maxlength="30"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="证件类型："
                prop="certificateType"
              >
                <el-select
                  clearable
                  v-model="form.certificateType"
                  placeholder="请选择证件类型"
                >
                  <el-option
                    v-for="(item,index) in sort"
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
              <el-form-item
                label="证件号码："
                prop="certificateNum"
              >
                <el-input
                  v-model="form.certificateNum"
                  placeholder="请输入证件号码，最多输入30位"
                  maxlength="30"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item
                label="开户行："
                prop="openBank"
              >
                <el-input
                  v-model="form.openBank"
                  placeholder="请输入开户行，最多输入50位"
                  maxlength="50"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="日期： "
                prop="date" :rules="[{ required:false, trigger: 'change'}]"
              >
                <el-date-picker
                value-format="yyyy-MM-dd"
                  v-model="form.date"
                  type="daterange"
                  range-separator="至"
               
                  unlink-panels
                  placeholder
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
          <!-- <el-col :span="8">
              <el-form-item
                label="专项类别："
                prop="applyType" :rules="[{ required:false, trigger: 'change'}]"
              >
                <el-select
                  clearable
                  v-model="form.applyType"
                  placeholder="请选择专项类别"
                  @change="getValue"
                >
                  <el-option
                    v-for="(item,index) in typeId"
                    :key="index"
                    :label="item.codeName"
                    :value="item.codeId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col> -->
             <el-col
              :span="8"
            >
            <!-- <el-col
              :span="8"
              v-if="textInp"
            > -->
              <el-form-item   label="专项类别：" >
                <el-input
                @input="changeInput"
                  v-model="form.text"
                  placeholder="请输入内容，最多输入50位"
                  maxlength="50"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div style="text-align:right; margin-bottom: 10px">
            <el-button
              type="primary"
              @click="onSubmit()"
            >查 询</el-button>
            <el-button
              type
              @click="cleanUp"
            >清 空</el-button>
            <el-button
              type="text"
              icon="el-icon-arrow-up"
              @click="toggleSearch=true"
            >收起</el-button>
          </div>
        </template>
      </el-form>

      <el-table :data="tableData">
        <!-- <el-table-column type="selection"></el-table-column> -->
        <el-table-column
          label="序号"
          type="index"
        ></el-table-column>
        <el-table-column label="线索名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <router-link :to="{name:'analysisSpecial_clueSave2',query: { id: scope.row.applyId, type: scope.row.clueState}}">
              <el-button type="text">{{scope.row.clueName}}</el-button>
            </router-link>
            <!-- <el-button v-else type="text">{{scope.row.clueName}}</el-button> -->
          </template>
        </el-table-column>
        <el-table-column
          label="分支机构"
          prop="createUser"
        ></el-table-column>
        <el-table-column
          label="状态"
          prop="clueState"
        ></el-table-column>
        <el-table-column label="操作" v-if="!disabled">
          <template slot-scope="scope">
            <!-- <router-link :to="{name:'analysisSpecial_clueSave2',query: { id: scope.row.applyId}}"> -->
              <el-button :disabled="disabled" @click="deleteTable(scope)" type="text">删除</el-button>
            <!-- </router-link> -->
            <!-- <el-button v-else type="text">{{scope.row.clueName}}</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <!-- <el-col :span="8">
          <el-button type="primary" plain style="margin-top:10px">提交分发</el-button>
        </el-col>-->
        
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageInfo.pageNum"
            :page-size="pageInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageInfo.total"
            background
          ></el-pagination>
        
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { commonPattern, ValidQueryInput, spaceBarAndSpecial } from '@/utils/formValidate'
import { branch, research, deleteItem } from '@/api/sys-monitoringAnalysis/analysisSpecial/index2.js'
import { newBranch } from '@/api/sys-monitoringAnalysis/conjointAnalysis/index.js'
export default {
  data() {
    return {
      chinaNull: /[\u4e00-\u9fa5]/, // 校验中文
      specialEnglish: /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im, // 校验英文特殊符号
      sprcialChina: /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im, // 校验中文特殊符号
      englishNull: /[abcdefghijklmnopqrstuvwxyz]/im, // 校验英文
      numberNull: /[1234567890]/im, // 校验数字
      blankSpace: /[ ]/im, // 校验空格
      loading: false,
      toggleSearch: true,
      disabled: false,
      form: {
        clueName: '',
        clueSource: '',
        applyType: '',
        clueState: '',
        name: '',
        accountNum: '',
        certificateNum: '',
        certificateType: '',
        openBank: '',
        date: [],
        text: ''
      },
      isShow: false,
      applyId: '',
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      textInp: false,
      typeId: [],
      sort: [],
      tableData: [],
      rules: {
        clueName: [{ validator: ValidQueryInput, trigger: 'blur' }],
        clueSource: [{ validator: ValidQueryInput, trigger: 'blur' }],
        name: [{ validator: spaceBarAndSpecial, trigger: 'blur' }],
        certificateNum: [{ validator: ValidQueryInput, trigger: 'blur' }],
        accountNum: [{ validator: ValidQueryInput, trigger: 'blur' }],
        text: [{ validator: ValidQueryInput, trigger: 'blur' }]
      }
    }
  },
  // 列表查询参数
  computed: {
    searchParams() {
      const obj = Object.assign({}, this.form, this.pageInfo)
      delete obj.date
      delete obj.total
      if (this.form.date) {
        obj.startTime = this.form.date[0]
        obj.endTime = this.form.date[1]
      }
      return obj
    },
    ...mapGetters(['institution']),
    isCenter() {
      return this.institution === this.GLOBAL.INSTITUTION_CENTER
    },
    isBranch() {
      return this.institution === this.GLOBAL.INSTITUTION_BRANCH
    }
  },
  created() {
    if (sessionStorage.getItem('analysisSpecial')) {
      const analysisSpecial = JSON.parse(sessionStorage.getItem('analysisSpecial'))
      if (analysisSpecial.pageName === this.$route.name && analysisSpecial.ifReview) {
        this.pageInfo = analysisSpecial.pageInfo
        this.form = analysisSpecial.searchForm
        this.toggleSearch = analysisSpecial.toggleSearch
      }
    }
  },
  methods: {
    // 删除所选数据
    deleteTable(params) {
      this.$confirm('确定要删除选中的数据 ?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteItem(params.row.applyId).then(res => {
            if (res.code === 200) {
              this.tableData.splice(params.index, 1)
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.initList(this.searchParams)
            }
          })
        })
        .catch(() => {})
    },
    onlyNumberValidate(rule, value, callback) {
      if (value !== '' && value !== null) {
        if (this.form.certificateType === '110003') {
          if (value.length !== 15 && value.length !== 18) {
            callback(new Error('身份证件格式标准为15及18位'))
          } else if (!commonPattern.spaceBar.test(value)) {
            callback(new Error('内容不能含有空格'))
          } else if (commonPattern.specialChar.test(value) || commonPattern.specialEng.test(value)) {
            callback(new Error('内容不能填写特殊字符'))
          } else {
            callback()
          }
        } else {
          if (value.length <= 5 || value.length >= 129) {
            callback(new Error('内容应在6-128位之间'))
          } else if (commonPattern.headerAndFooter.test(value)) {
            callback(new Error('首尾不能有空格'))
          } else {
            callback()
          }
        }
      } else {
        callback()
      }

      // if (value !== '') {
      //   if (this.form.certificateType === '110003') {
      //     if (value.length !== 15 && value.length !== 18) {
      //       callback(new Error('请输入正确的身份证号码,15或18位'))
      //     }
      //   }
      //   if (this.blankSpace.test(value)) {
      //     callback(new Error('内容不能含有空格'))
      //   } else if (this.specialEnglish.test(value) || this.sprcialChina.test(value)) {
      //     callback(new Error('内容不能填写特殊字符'))
      //   } else {
      //     callback()
      //   }
      // } else {
      //   callback()
      // }
    },
    validateAgentName(rule, value, callback) {
      if (this.blankSpace.test(value)) {
        callback(new Error('禁止输入空格'))
      } else if (this.specialEnglish.test(value) || this.sprcialChina.test(value)) {
        callback(new Error('禁止输入特殊字符'))
      } else {
        callback()
      }
    },
    delDataValidInput(rule, value, callback) {
      if (commonPattern.specialDataName.test(value) || commonPattern.specialEngDataName.test(value)) {
        callback(new Error('内容不能填写特殊字符'))
      } else if (commonPattern.headerAndFooter.test(value)) {
        callback(new Error('首尾不能有空格'))
      } else {
        callback()
      }
    },
    // 判断是中心用户还是分支机构用户
    judge() {
      if (this.isBranch) {
        this.isShow = true
      } else {
        this.disabled = true
      }
    },
    // 清空搜索
    cleanUp() {
      this.form = {
        clueName: '',
        clueSource: '',
        applyType: '',
        clueState: '',
        name: '',
        accountNum: '',
        certificateNum: '',
        certificateType: '',
        openBank: '',
        date: [],
        text: ''
      }
      this.$refs.searchForm.resetFields()
    },
    changeInput(val) {
      val ? this.form.applyType = '6' : this.form.applyType = ''
    },
    // 获取数字字典：专项类别
    getTypeId() {
      newBranch('ZXLB').then(res => {
        if (res.code === 200) {
          this.typeId = res.data
        }
      })
    },
    // 获取证件类型
    getSort() {
      branch({ typeId: 'SFZJ' }).then(res => {
        if (res.code === 200) {
          this.sort = res.data.list
        }
      })
    },
    // 下拉框选中触发
    getValue(value) {
      this.form.text = ''
      if (this.form.applyType.indexOf('6') === 0) {
        this.textInp = true
      } else {
        this.textInp = false
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
    },
    // 线索查询
    initList(params, cx) {
      this.loading = true
      if (cx) {
        params.pageNum = 1
        this.pageInfo.pageNum = 1
      }
      research(params).then(res => {
        if (res.code === 200) {
          this.loading = false
          this.pageInfo.total = res.data.total
          // const arry = res.data.list // 获取的数据
          // const arr = []
          // arry.forEach(el => {
          //   const obj = {} // 新对象存我想要的四个字段
          //   obj.clueName = el.clueName // 联合分析名称
          //   obj.applyId = el.applyId // 状态
          //   obj.createUser = el.createUser // 分支机构
          //   obj.clueState = el.clueState // 状态
          //   arr.push(obj)
          // })
          // this.tableData = arr
          this.tableData = res.data.list
          const analysisSpecial = {
            pageName: this.$route.name,
            pageInfo: this.pageInfo,
            searchForm: this.form,
            toggleSearch: this.toggleSearch
          }
          sessionStorage.setItem('analysisSpecial', JSON.stringify(analysisSpecial))
        } else {
          this.loading = false
        }
      }).catch(() => {
        this.loading = false
      })
    },
    // 点击查询
    onSubmit() {
      this.$refs.searchForm.validate((valid) => {
        if (valid) {
          this.initList(this.searchParams, 'cx')
        } else {
          return false
        }
      })
    }
  },
  mounted() {
    this.getSort()
    this.getTypeId()
    this.initList(this.searchParams)
    this.judge()
  }
}
</script>
<style  lang="scss">
.analysisSpecial-index {
  .el-select {
    width: 100%;
  }
  .el-date-editor--daterange {
    min-width: 100%;
  }
  @media screen and (max-width: 1400px) {
    .toggle {
      .el-col-8 {
        width: 50%;
      }
    }
  }
}
</style>


