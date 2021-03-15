<template>
  <div class="dataCycle_modify">
    <el-card>
      <div slot="header">
        <span>数据迁移</span>
      </div>
      <el-form  :model="myform" ref="forms" label-width="120px" :rules="rules">
          <div class="popup">
              <p>在线阶段：2009.1.1-今天</p>
              <p>近线阶段：2007.1.1-2008.12.31</p>
              <p>离线阶段：无</p>
              <p>临时区数据表：</p>
              <p>表名1：2018.1.1-2019.1.1</p>
              <p>表名2：2018.1.1-2019.1.1</p>
              <p>表名3：2018.1.1-2019.1.1</p>
          </div>
          <el-row>
              <el-col :span="12">
                   <el-form-item
              label="迁移申请时间："
              prop="value1"
            >
              <el-date-picker
                v-model="myform.value1"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </el-form-item>
              </el-col>
          </el-row>
          <el-row>
              <el-col :span="24">
                <el-form-item
              label="迁移方式："
              prop="value2"
            >
        <el-radio-group v-model="myform.value2">
            <el-radio :label="1">在线->近线</el-radio>
            <el-radio :label="2">近线->离线</el-radio>
            <el-radio :label="3">离线->临时区</el-radio>
        </el-radio-group>
            </el-form-item>
              </el-col>
          </el-row>
          <el-row>
                <el-form-item
              label="选择数据表："
              prop="value3"
            >
             <el-transfer v-model="myform.value3" :data="data"  :titles="['待选列表', '已选列表']"  :button-texts="['加入左侧', '加入右侧']"></el-transfer>
            </el-form-item>
          </el-row>
           <el-row style="padding-bottom:10px">
          <el-col
            :span="12"
            style="text-align:right;float:right"
          >
            <el-button
              type="primary"
              @click="transfer"
            >开始迁移</el-button>
          </el-col>
        </el-row>
      </el-form> 
        <el-alert title type="primary" :closable="false">
          <template>
            <span>
              <i class="el-icon-info" style="color:#1890ff"></i>
              已选择
            </span>
            <el-button type="text" style="margin-left:18px" >执行日志</el-button>
          </template>
        </el-alert>
         <el-table
        :data="tableData"
        tooltip-effect="dark"
        @selection-change="handleChange"
      >
       <el-table-column
      type="selection"
      width="55">
    </el-table-column>
        <el-table-column label="序号"
          type="index"
        ></el-table-column>
        <el-table-column label="申请单号" prop="value1"></el-table-column>
        <el-table-column label="迁移表名" prop="value2"></el-table-column>
        <el-table-column label="迁移方式" prop="value3"></el-table-column>
        <el-table-column label="执行状态" prop="value4">
              <template slot-scope="scope">
            <span v-if="scope.row.value4==='未开始'" class="mark-span" style="background:#CFCFCF"></span>
               <span v-if="scope.row.value4==='进行中'" class="mark-span" style="background:#436EEE"></span>
                <span v-if="scope.row.value4==='成 功'" class="mark-span" style="background:#00EE00"></span>
            <span>{{scope.row.value4}}</span>
          </template>
        </el-table-column>
        <el-table-column label="迁移开始时间" prop="value5"></el-table-column>
        <el-table-column label="迁移结束时间" prop="value6"></el-table-column>
        <el-table-column label="总耗时（秒）" prop="value7"></el-table-column>
        <el-table-column label="迁移笔数（条）" prop="value8"></el-table-column>
      </el-table>
            <el-row style="margin-top:10px;">
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
export default {
  data() {
    return {
      delArr: [],
      data: [
        { label: '银行大额交易表', key: 1 },
        { label: '银行可疑交易表1', key: 2 },
        { label: '银行可疑交易表2', key: 3 }
      ],
      myform: {
        value1: '',
        value2: '',
        value3: []
      },
      rules: {
        value1: [{ trigger: 'blur', required: true, message: '请选择迁移申请时间' }],
        value2: [{ trigger: 'change', required: true, message: '请选择迁移方式' }],
        value3: [{ trigger: 'change', required: true, message: '请选择数据表' }]
      },
      tableData: [
        {
          index: 1,
          value1: '20180826001',
          value2: 'A',
          value3: '近线->离线',
          value4: '未开始',
          value5: '2018.07.26 15:00:02',
          value6: '2019-01-22 8:00:0',
          value7: '19',
          value8: '2321321'
        },
        {
          index: 2,
          value1: '20180826002',
          value2: 'B',
          value3: '近线->离线',
          value4: '进行中',
          value5: '2018.07.26 15:00:02',
          value6: '2019-01-23 12:00:00',
          value7: '22',
          value8: '2321321'
        },
        {
          index: 3,
          value1: '20180826003',
          value2: 'C',
          value3: '近线->离线',
          value4: '成 功',
          value5: '2018.07.26 15:00:02',
          value6: '2019-01-23 12:00:00',
          value7: '34',
          value8: '12222'
        },
        {
          index: 4,
          value1: '20180826003',
          value2: 'D',
          value3: '近线->离线',
          value4: '未开始',
          value5: '2018.07.26 15:00:02',
          value6: '2019-01-23 12:00:00',
          value7: '31',
          value8: '34566'
        }

      ],
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      }
    }
  },

  mounted() {},
  methods: {
    // 选择要删的数据
    handleChange(val) {
      this.delArr = val
    },
    transfer() {
      this.$refs.forms.validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 切换分页条数
    handleSizeChange(size) {
      this.pageInfo.pageSize = size
    },
    // 点击切换分页
    handleCurrentChange(pageNum) {
      this.pageInfo.pageNum = pageNum
    }
  }
}
</script>

<style lang="scss">
.dataCycle_modify {
    position: relative;
  .el-date-editor--daterange {
    min-width: 100%;
  }
  .el-select {
    width: 100%;
  }
  .mark-span{
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    vertical-align: 1px;
  }
  .popup{
      width: 300px;
      border: 1px solid #292929;
      position: absolute;
      top:100px;
      right:100px;
  }
}
</style>