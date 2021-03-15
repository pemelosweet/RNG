<template>
  <el-card class="taskManagement_index">
    <div slot="header" class="clearfix">
      <span>高级预警结果分发</span>
    </div>
    <el-row :gutter="20">
      <el-form ref="form" :model="form" label-width="160px">
        <el-col :span="12">
          <el-form-item label="主体（账号）名称：">
            <el-input v-model="form.subjectName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="分析处室：">
            <el-select v-model="form.analysisRoom" clearable placeholder="请选择活动区域" style="width:100%;">
              <el-option label="分析一处" value="1"></el-option>
              <el-option label="分析二处" value="2"></el-option>
              <el-option label="分析三处" value="3"></el-option>
              <el-option label="分析四处" value="4"></el-option>
              <el-option label="协查一处" value="5"></el-option>
              <el-option label="协查二处" value="6"></el-option>
              <el-option label="国际交流处" value="7"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否分配分析处室：">
            <el-select v-model="form.analysisRoomYN" clearable placeholder="请选择活动区域" style="width:100%;">
              <el-option label="已分配" value="1"></el-option>
              <el-option label="未分配" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="" style="text-align: right;">
            <el-button type="primary" @click="query">查询</el-button>
            <el-button type="primary" @click="empty">清空</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="24" style="text-align:right;margin-top:50px;margin-bottom:50px;">
          <el-button type="primary" @click="dialogTableVisible = true">分配分析处室</el-button>
        </el-col>
      </el-form>
    </el-row>
    <el-table style="width:100%;" :data="tabData">
      <el-table-column type="selection" min-width="100"></el-table-column>
      <el-table-column type="index" label="序号" min-width="100"></el-table-column>
      <el-table-column prop="subjectName" label="主体（账号）名称" min-width="100"></el-table-column>
      <el-table-column prop="" label="身份证件号码" min-width="100"></el-table-column>
      <el-table-column prop="" label="涉罪类型" min-width="100"></el-table-column>
      <el-table-column prop="analystOffice" label="分析处室" min-width="100"></el-table-column>
      <el-table-column prop="" label="预警结果" min-width="100"></el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="form.pageNum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="form.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!-- 分配分析处室弹框start -->
    <el-dialog title="分配分析处室" :visible.sync="dialogTableVisible">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="checkedCities">
        <el-checkbox style="margin: 0 30px 15px 0;" v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配分析处室弹框end -->
  </el-card>
</template>

<script>
import { seniorResultDistribution } from '@/api/sys-monitoringAnalysis/taskManagement/administration.js'
export default {
  data() {
    return {
      total: 0,
      dialogTableVisible: false,
      form: {
        subjectName: '',
        analysisRoom: '',
        analysisRoomYN: '',
        pageNum: 1,
        pageSize: 10
      },
      tabData: [],
      checkAll: false,
      checkedCities: ['分析一处', '分析四处'],
      cities: ['分析一处', '分析二处', '分析三处', '分析四处', '协查一处', '协查二处', '国际交流处'],
      isIndeterminate: true
    }
  },
  mounted() {
    this.queryData()
  },
  methods: {
    query() {
      this.queryData()
    },
    empty() {
      this.form.subjectName = ''
      this.form.analysisRoom = ''
      this.form.analysisRoomYN = ''
    },
    queryData() {
      const obj = Object.assign({}, this.form)
      const newObj = {
        subjectName: obj.subjectName,
        analystOffice: obj.analysisRoom,
        whetherOffice: obj.analysisRoomYN,
        pageNum: obj.pageNum,
        pageSize: obj.pageSize
      }
      seniorResultDistribution(newObj).then(res => {
        if (res.code === 200) {
          this.tabData = res.data.list
          this.total = res.data.total
        }
      })
    },
    handleSizeChange(val) {
      this.form.pageSize = val
      this.queryData()
    },
    handleCurrentChange(val) {
      this.form.pageNum = val
      this.queryData()
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.cities : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    }
  }
}
</script>

<style lang="scss">

</style>