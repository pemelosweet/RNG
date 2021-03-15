<template>
  <div class="reportingManagement-detailed">
    <el-card>
      <el-form ref="form" :model="form" label-width="150px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="举报编号：" prop="reportNo" :rules="[{ validator: isValidInputBuZheng, trigger: ['blur', 'change'] }]">
              <el-input v-model="form.reportNo" label-width="40px"></el-input>
            </el-form-item>
            <el-form-item label="被举报人证件号码：">
              <el-input v-model="form.reportedCredNo" label-width="40px"></el-input>
            </el-form-item>
            <el-form-item label="举报事由：">
              <el-select v-model="form.reporterReason" placeholder="请选择" style="width:100%;" clearable>
                <el-option
                  v-for="(item, index) in options"
                  :key="index"
                  :label="item.codeName"
                  :value="item.codeId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否匿名举报：">
              <el-radio-group v-model="form.isDisabled">
                <el-radio label="0">匿名</el-radio>
                <el-radio label="1">实名</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        <el-col :span="8">
          <el-form-item label="被举报人名称：" prop="reportedName" :rules="[{ validator: isValidInputBuZheng, trigger: ['blur', 'change'] }]">
            <el-input v-model="form.reportedName" label-width="40px"></el-input>
          </el-form-item>
          <el-form-item label="账号：" prop="reportedAccountNo" :rules="[{ validator: isValidInputBuZheng, trigger: ['blur', 'change'] }]">
            <el-input v-model="form.reportedAccountNo" label-width="40px"></el-input>
          </el-form-item>
          <!-- <el-form-item label="举报事由（其他）：">
            <el-input v-model="form.reporterRemark" label-width="40px"></el-input>
          </el-form-item> -->
          <el-form-item label="举报人名称：" prop="reporterName" :rules="[{ validator: isValidInputBuZheng, trigger: ['blur', 'change'] }]">
            <el-input v-model="form.reporterName" label-width="40px"></el-input>
          </el-form-item>
          <!-- <el-form-item label="当前用户：">
            <el-input v-model="form.currUser" label-width="40px"></el-input>
          </el-form-item> -->
          <el-form-item label="标签：" prop="reporterMark" :rules="[{ validator: isValidInputBuZheng, trigger: ['blur', 'change'] }]">
            <el-input v-model="form.reporterMark" label-width="40px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="被举报人证件类型：">
            <el-select v-model="form.reportedCredType" style="width:100%;" clearable>
                <el-option label="居民身份证" value="1"></el-option>
                <el-option label="中国护照" value="3"></el-option>
                <el-option label="港澳居民来往内地通行证" value="2"></el-option>
                <el-option label="港澳居民居住证" value="4"></el-option>
                <el-option label="台湾居民来往大陆通行证" value="7"></el-option>
                <el-option label="台湾居民居住证" value="5"></el-option>
                <el-option label="外国护照" value="6"></el-option>
                <el-option label="外国人永久居留身份证" value="11"></el-option>
                <el-option label="外国人工作许可证（A类）" value="12"></el-option>
                <el-option label="外国人工作许可证（B类）" value="13"></el-option>
                <el-option label="外国人工作许可证（C类）" value="14"></el-option>
                <el-option label="其他个人证件" value="10"></el-option>
                <el-option label="组织机构代码" value="8"></el-option>
                <el-option label="企业信用代码" value="9"></el-option>
            </el-select>
          </el-form-item>
          <!-- <div class="start-end">
              <el-form-item class="start" label="受理时间：">
                <el-date-picker v-model="form.createSdate" value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="date" placeholder="开始日期" style="width: 80% !important;"></el-date-picker>
              </el-form-item>
              <span>-</span> 
              <el-form-item class="end" label-width="5px">
                <el-date-picker v-model="form.createEdate" value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="date" placeholder="结束日期" style="width: 80% !important;"></el-date-picker>
              </el-form-item>
            </div> -->
          <el-form-item label="受理时间：">
              <el-date-picker style="width:100% !important;" class="time-box" v-model="form.createSdate" type="daterange" value-format="yyyy-MM-dd" format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            
          </el-form-item>
          <el-form-item label="有无附件：">
            <el-radio-group v-model="form.isAttach">
                <el-radio label="1">有</el-radio>
                <el-radio label="0">无</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- <el-form-item label="当前部门：">
              <el-input v-model="form.currDept" label-width="40px"></el-input>
            </el-form-item> -->
          <!-- <el-form-item v-if="isReportDealer === 1" label="授权状态：">
            <el-radio-group v-model="form.isEmpower">
                <el-radio label="1">已授权</el-radio>
                <el-radio label="0">未授权</el-radio>
            </el-radio-group>
          </el-form-item> -->
          
            <el-form-item label="处理状态：">
              <el-select v-model="form.reportStatus" style="width:100%;" clearable>
                <el-option label="新入库" value="2"></el-option>
                <el-option label="转送" value="3"></el-option>
                <el-option label="调查" value="4"></el-option>
                <el-option label="分析" value="5"></el-option>
                <el-option label="移送" value="6"></el-option>
                <el-option label="移送且反馈" value="7"></el-option>
                <el-option label="重复（关联）" value="8"></el-option>
                <el-option label="关注" value="9"></el-option>
                <el-option label="无效" value="10"></el-option>
                <el-option label="处理中" value="12"></el-option>
                <el-option label="已完成" value="11"></el-option>
              </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="举报正文：" prop="reporterText" :rules="[{ validator: isValidInputBuZheng, trigger: ['blur', 'change'] }]">
            <el-input type="textarea" v-model="form.reporterText"></el-input>
          </el-form-item>
        </el-col>
        </el-row>
        <!-- <div class="batch_grant">
          <el-button v-if="isReportDealer === 1" type="primary" @click="batchGrantClick">批量授权</el-button>
        </div> -->
        <div style="float:right;margin-bottom:10px" >
          <el-button type="primary" @click="queryClick">查询</el-button>
          <el-button type="primary" plain @click="deleClick">清空</el-button>
        </div>
      </el-form>
      <el-table
      :data="tableData"
      style="width: 100%" @selection-change="handelSelects" v-loading="tableDataLoading" element-loading-text="拼命加载中..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
      <el-table-column type="selection" width="60" fixed="left">
      </el-table-column>
      <el-table-column
        type="index"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="reportNo"
        label="举报编号"
        width="130" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="被举报人名称"
        width="120" prop="reportedName" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="reportedCredNo"
        label="被举报人证件号码"
        width="200" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="reportedAccountNo"
        label="账号"
        width="150" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="举报事由"
        width="200" prop="reporterReasonName" show-overflow-tooltip>
      </el-table-column>
      <!-- <el-table-column
        prop="reporterRemark"
        label="举报事由（其他）"
        width="160">
      </el-table-column> -->
      <el-table-column
        prop="createDate"
        label="受理时间"
        width="200" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="举报正文"
        width="200" prop="reporterText" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="isAttachName"
        label="有无附件" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="isDisabledName"
        label="是否匿名举报"
        width="130" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="reporterName"
        label="举报人名称"
        width="120" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="reportStatusName"
        label="处理状态" show-overflow-tooltip>
      </el-table-column>
      <!-- <el-table-column
        prop="currDept"
        label="当前部门">
      </el-table-column> -->
      <!-- <el-table-column
        prop="currUser"
        label="当前用户">
      </el-table-column> -->
      <el-table-column
        label="标签" prop="reporterMark" show-overflow-tooltip>
      </el-table-column>
      <!-- <el-table-column
        label="授权状态">
        <template slot-scope="scope">
          {{scope.row.empowerDept === null || scope.row.empowerDept === '' ? '未授权' : '已授权'}}
        </template>
      </el-table-column> -->
      <!-- <el-table-column
        prop="reporterMark"
        label="举报事由（其他）">
      </el-table-column> -->
      <el-table-column label="操作" width="100" fixed="right">
          <template slot-scope="scope">
            <router-link :to="{name:'reportingManagement_query',query: {id: scope.row.reportId}}">
              <el-button type="text" style="margin-left:0;">查看</el-button>
            </router-link>
            <!-- <el-button v-if="isReportDealer === 1" type="text" style="margin-left:0;" @click="authorizationClick(scope.row.reportId, scope.row.empowerDept)">授权</el-button> -->
          </template>
        </el-table-column>
    </el-table>

     <div class="block">
      <el-pagination
         @size-change="handleSizeChange"
         @current-change="handleCurrentChange"
         :current-page="form.pageNum"
         :page-sizes="[10, 20, 30, 40]"
         :page-size="form.pageSize"
         layout="total, sizes, prev, pager, next, jumper"
         :total="tabLength">
      </el-pagination>
     </div>
    </el-card>

    <!-- Form -->
    <el-dialog title="举报查询授权" :visible.sync="dialogFormVisible">
      <el-form :model="forms" label-width="100px">
        <el-col :span="24">
          <el-form-item label="授权部门：">
           <el-checkbox-group v-model="forms.type">
             <el-checkbox class="check_is_box" v-for="(element, num) in authorizationArr" :key="num" :label="element.codeId" name="type">
               {{element.codeName}}
             </el-checkbox>
           </el-checkbox-group>
        </el-form-item>
        </el-col>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="grantSure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { warehousingIe1 } from '@/api/sys-monitoringAnalysis/reportingManagement/warehousingUrl'
import { queryApi, jurisdictionApi, empowerApi, identityApi } from '@/api/sys-monitoringAnalysis/reportingManagement/uploadAttachments'
import { isValidInputBuZheng } from '@/utils/formValidate.js'
export default {
  data() {
    return {
      isValidInputBuZheng: isValidInputBuZheng,
      tableDataLoading: false,
      form: {
        reportId: '',
        reportNo: '', // 编号
        isDisabled: '', // 匿名
        reporterName: '', // 举报人姓名
        reporterReason: '', // 举报事由
        reporterRemark: '', // 事由其他
        reporterText: '', // 正文
        reporterMark: '', // 标签
        reportStatus: '', // 处理状态
        isAttach: '', // 附件
        isSource: '', // aa
        currDept: '', // 当前部门
        currUser: '', // 当前用户
        pageNum: 1,
        pageSize: 10,
        reportedName: '', // 被 姓名
        reportedType: '', // 被 类别
        reportedCredType: '', // 被 证件类型
        reportedCredNo: '', // 被 证件号码
        reportedAccountNo: '', // 被 账号
        createSdate: '', // 创建
        createEdate: '',
        storageSdate: '', // 入库
        storageEdate: '',
        dutySdate: '', // 到岗
        dutyEdate: '',
        isBusiness: '', // 交易
        isConnection: '', // 关联
        isEmpower: ''
      },
      form1: {
        reportId: '',
        reportNo: '',
        isDisabled: '',
        reporterName: '',
        reporterReason: '',
        reporterRemark: '',
        reporterText: '',
        reporterMark: '',
        reportStatus: '',
        isAttach: '',
        isSource: '',
        currDept: '',
        currUser: '',
        pageNum: 1,
        pageSize: 10,
        reportedName: '',
        reportedType: '',
        reportedCredType: '',
        reportedCredNo: '',
        reportedAccountNo: '',
        createSdate: '',
        createEdate: '',
        storageSdate: '',
        storageEdate: '',
        dutySdate: '',
        dutyEdate: '',
        isBusiness: '',
        isConnection: '',
        isEmpower: ''
      },
      forms: {
        reId: '',
        type: []
      },
      options: [],
      paramster: 'JBSZ',
      tableData: [],
      tabLength: 1,
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      value6: '',
      typeId: 'JBBM',
      dialogFormVisible: false,
      formLabelWidth: '120px',
      authorizationArr: [],
      mList: [],
      multipleSelection: [],
      isReportDealer: '',
      formDataType: true
    }
  },
  mounted() {
    this.wareFn(this.form)
    this.queryApiFn()
    this.inden()
  },
  methods: {
    batchGrantClick() {
      if (this.multipleSelection.length !== 0) {
        this.jurisdictionApiFn()
        this.forms.type = []
        const newRid = []
        this.multipleSelection.forEach(ele => {
          newRid.push(ele.reportId)
        })
        this.forms.reId = newRid.join(',')
        console.log(this.forms.reId)
        this.dialogFormVisible = true
        // this.wareFn(this.form)
      } else {
        this.$message({
          message: '请选中',
          type: 'warning'
        })
      }
    },
    grantSure() {
      this.empowerApiFn()
      this.dialogFormVisible = false
    },
    empowerApiFn() {
      empowerApi({ reportIds: this.forms.reId, deptIds: this.forms.type.join(',') }).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '授权成功',
            type: 'success'
          })
          this.wareFn(this.form)
        }
      })
    },
    authorizationClick(rId, list) {
      this.forms.reId = rId
      this.mList = list
      if (this.mList === null) {
        this.forms.type = []
      } else {
        this.forms.type = this.mList.split(',')
      }
      this.jurisdictionApiFn()
      this.dialogFormVisible = true
      console.log(this.forms.type)
    },
    jurisdictionApiFn() {
      jurisdictionApi(this.typeId).then(res => {
        if (res.code === 200) {
          console.log(res)
          this.authorizationArr = res.data
        }
      })
    },
    queryApiFn() {
      queryApi(this.paramster).then(res => {
        if (res.code === 200) {
          this.options = res.data
        }
      })
    },
    inden() {
      identityApi().then(res => {
        if (res.code === 200) {
          this.isReportDealer = res.data.isReportDealer
        }
      })
    },
    getParamter(objs) {
      const obj = Object.assign({}, objs)
      const newObj = {
        reportId: obj.reportId,
        reportNo: obj.reportNo,
        isDisabled: obj.isDisabled,
        reporterName: obj.reporterName,
        reporterReason: obj.reporterReason,
        reporterRemark: obj.reporterRemark,
        reporterText: obj.reporterText,
        reporterMark: obj.reporterMark,
        reportStatus: obj.reportStatus,
        isAttach: obj.isAttach,
        isSource: obj.isSource,
        currDept: obj.currDept,
        currUser: obj.currUser,
        pageNum: obj.pageNum,
        pageSize: obj.pageSize,
        reportedName: obj.reportedName,
        reportedType: obj.reportedType,
        reportedCredType: obj.reportedCredType,
        reportedCredNo: obj.reportedCredNo,
        reportedAccountNo: obj.reportedAccountNo,
        createSdate: obj.createSdate === null ? '' : obj.createSdate[0],
        createEdate: obj.createSdate === null ? '' : obj.createSdate[1],
        storageSdate: obj.storageSdate,
        storageEdate: obj.storageEdate,
        dutySdate: obj.dutySdate,
        dutyEdate: obj.dutyEdate,
        isBusiness: obj.isBusiness,
        isConnection: obj.isConnection,
        isEmpower: obj.isEmpower
      }
      return newObj
    },
    wareFn(objs) {
      this.tableDataLoading = true
      warehousingIe1(this.getParamter(objs)).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.list
          this.tabLength = res.data.total
        }
        this.tableDataLoading = false
      }).catch(() => {
        this.tableDataLoading = false
      })
    },
    queryClick() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.formDataType = false
          this.form.pageNum = 1
          const newForm = this.form
          this.form1 = Object.assign({}, newForm)
          this.wareFn(this.form)
        } else {
          return false
        }
      })
    },
    deleClick() {
      this.formDataType = true
      this.form = {
        reportId: '',
        reportNo: '',
        isDisabled: '',
        reporterName: '',
        reporterReason: '',
        reporterRemark: '',
        reporterText: '',
        reporterMark: '',
        reportStatus: '',
        isAttach: '',
        isSource: '',
        currDept: '',
        currUser: '',
        pageNum: 1,
        pageSize: 10,
        reportedName: '',
        reportedType: '',
        reportedCredType: '',
        reportedCredNo: '',
        reportedAccountNo: '',
        createSdate: '',
        createEdate: '',
        storageSdate: '',
        storageEdate: '',
        dutySdate: '',
        dutyEdate: '',
        isBusiness: '',
        isConnection: '',
        isEmpower: ''
      }
      this.form1 = {
        reportId: '',
        reportNo: '',
        isDisabled: '',
        reporterName: '',
        reporterReason: '',
        reporterRemark: '',
        reporterText: '',
        reporterMark: '',
        reportStatus: '',
        isAttach: '',
        isSource: '',
        currDept: '',
        currUser: '',
        pageNum: 1,
        pageSize: 10,
        reportedName: '',
        reportedType: '',
        reportedCredType: '',
        reportedCredNo: '',
        reportedAccountNo: '',
        createSdate: '',
        createEdate: '',
        storageSdate: '',
        storageEdate: '',
        dutySdate: '',
        dutyEdate: '',
        isBusiness: '',
        isConnection: ''
      }
      // this.wareFn(this.form)
    },
    handleSizeChange(val) {
      this.form1.pageSize = val
      this.wareFn(this.form1)
    },
    handleCurrentChange(val) {
      this.form1.pageNum = val
      this.wareFn(this.form1)
    },
    handelSelects(row) {
      this.multipleSelection = []
      this.multipleSelection = row
      console.log(this.multipleSelection)
    }
  }
}
</script>
<style>
/* .reportingManagement-detailed {
 
} */
.cause-time {
  width: 100% !important;
}
.start-end{
  width: 100%;
  overflow: hidden;
}
.start {
  width: 350px;
  display: inline-block;
}
.end {
  display: inline-block;
  width: 100px;
}
.rep_tag {
  background: none;
  border:none;
  color: #606266;
}
.check_is_box {
  margin-left:0 !important;
  margin-right:60px !important;
}
.batch_grant {
  float:left;width:120px;text-align:right;
}
</style>

