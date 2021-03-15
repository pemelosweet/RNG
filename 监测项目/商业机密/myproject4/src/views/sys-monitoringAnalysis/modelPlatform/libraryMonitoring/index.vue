<template>
  <div class="establishDataInfo">
      <div slot="header" class="titlefix">
        <span style="lineHeight:32px">查询可疑交易特征</span>
      </div>
    <el-form ref="form" :model="form" label-width="180px">
      <el-row>
        <el-col :span="10">
          <el-form-item label="上报机构名称：">
            <el-select v-model="form.modelName" placeholder="请选择上报机构名称：">
              <el-option label="主体属性特征表" value="1"></el-option>
              <el-option label="账户属性特征表" value="2"></el-option>
              <el-option label="主体特征_反恐表" value="3"></el-option>
              <el-option label="主体特征_涉毒表" value="4"></el-option>
              <el-option label="银行可疑交易数据" value="5"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
         <el-col :span="10">
          <el-form-item label="特征上报时间：">
            <el-col :span="11">
              <el-input></el-input>
            </el-col>
            <el-col class="line" :span="2">~</el-col>
            <el-col :span="11">
              <el-input></el-input>
            </el-col>
            <!--<el-date-picker v-model="form.createTime" type="datetime" placeholder="选择日期时间"></el-date-picker>-->
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="特征代码：">
            <el-input v-model="form.modelCreater" style="width:199px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="特征更新日期：">
            <el-col :span="11">
              <el-input></el-input>
            </el-col>
            <el-col class="line" :span="2">~</el-col>
            <el-col :span="11">
              <el-input></el-input>
            </el-col>
            <!--<el-date-picker v-model="form.createTime" type="datetime" placeholder="选择日期时间"></el-date-picker>-->
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="特征说明：">
                <el-input v-model="form.modelCreater" style="width:199px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
             <el-form-item label="特征生效日期：">
            <el-col :span="11">
              <el-input></el-input>
            </el-col>
            <el-col class="line" :span="2">~</el-col>
            <el-col :span="11">
              <el-input></el-input>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="涉罪类型：">
                <el-input v-model="form.modelCreater" style="width:199px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
             <el-form-item label="关联可疑特征的报告数量：">
            <el-col :span="11">
              <el-input></el-input>
            </el-col>
            <el-col class="line" :span="2">~</el-col>
            <el-col :span="11">
              <el-input></el-input>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="映射特征代码：">
                <el-input v-model="form.modelCreater" style="width:199px"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item class="valable">
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button>清空</el-button>
      </el-form-item>
    </el-form>
     <div slot="header" class="titlefix">
        <span style="lineHeight:32px">自定义可疑交易特征列表：</span>
      </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号" min-width="50"></el-table-column>
      <el-table-column prop="dataName" label="特征代码" width="170"></el-table-column>
      <el-table-column prop="creater" label="特征说明" width="130"></el-table-column>
      <el-table-column prop="fileSize" label="涉罪类型" width="110"></el-table-column>
      <el-table-column prop="dataName" label="上报机构名称" width="170"></el-table-column>
      <el-table-column prop="total" label="版本号" width="110"></el-table-column>
      <el-table-column prop="createTime" sortable label="上报时间" width="300"></el-table-column>
      <el-table-column prop="createTime" sortable label="更新时间" width="300"></el-table-column>
      <el-table-column prop="createTime" sortable label="生效时间" width="300"></el-table-column>
      <el-table-column prop="creater" label="关联可疑特征的报告数量" width="200">
          <template slot-scope="scope">
            {{scope.row.creater}}
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" sortable label="映射特征代码" width="130"></el-table-column>
      <el-table-column fixed="right" label="操作" width="250">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="dialogVisible = true">修改</el-button>
          <el-button type="text" size="small" @click="dialogDeleteVisible = true">删除</el-button>
          <el-button type="text" size="small" @click="startLibary(scope)">映射特征代码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
    </el-pagination>

    <!-- 修改 -->
    <el-dialog title="修改数据模板属性" :visible.sync="dialogVisible" width="60%" top="10vh">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="数据模板名称：">
          <el-input v-model="form.dataName"></el-input>
        </el-form-item>
        <el-form-item label="描述信息：">
          <el-input type="textarea" v-model="form.desc" placeholder="银行可疑交易表的全量数据。"></el-input>
        </el-form-item>
        <el-form-item label="选择模板：">
          <el-radio-group v-model="form.model" disabled>
            <el-radio label="001-交易查询模板"></el-radio>
            <el-radio label="002-线索查询模板"></el-radio>
            <el-radio label="003-可疑报告查询模板"></el-radio>
            <el-radio label="004-名单库查询模板"></el-radio>
          </el-radio-group>
          <el-button type="text" style="margin-left:10px" @click="moreModel=!moreModel">更多<i class="el-icon-d-arrow-right"></i></el-button>
        </el-form-item>
        <div v-show="moreModel">
          <el-form-item label="">
            <el-radio-group v-model="form.model" disabled>
              <el-radio label="005-交易查询模板"></el-radio>
              <el-radio label="005-线索查询模板"></el-radio>
              <el-radio label="033-可疑报告查询模板"></el-radio>
              <el-radio label="304-名单库查询模板"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="">
            <el-radio-group v-model="form.model" disabled>
              <el-radio label="006-交易查询模板"></el-radio>
              <el-radio label="062-线索查询模板"></el-radio>
              <el-radio label="103-可疑报告查询模板"></el-radio>
              <el-radio label="204-名单库查询模板"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="">
            <el-radio-group v-model="form.model" disabled>
              <el-radio label="007-交易查询模板"></el-radio>
              <el-radio label="072-线索查询模板"></el-radio>
              <el-radio label="403-可疑报告查询模板"></el-radio>
              <el-radio label="504-名单库查询模板"></el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <el-form-item label="SQL语句：">
          <el-input type="textarea" v-model="form.sql" disabled></el-input>
        </el-form-item>
        <el-form-item label="数据类型：">
          <el-radio-group v-model="form.dataType">
            <el-radio label="公共表"></el-radio>
            <el-radio label="个人表"></el-radio>
            <el-radio label="自定义"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="数据可见人：">
          <div class="dataVisible">
            <el-tree accordion :data="form.dataVisible" show-checkbox node-key="id" :default-expanded-keys="[1]" :props="form.defaultProps"></el-tree>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span> -->
    </el-dialog>

    <!-- 删除 -->
    <el-dialog title="提示" :visible.sync="dialogDeleteVisible" width="30%">
      <span>
        <i class="el-icon-warning" style="color:#e6a23c;font-size: 22px;"></i> 当前数据正在被<el-button type="text">1</el-button>人使用</span>
        <p><i class="el-icon-warning" style="color:#e6a23c;font-size: 22px;"></i>是否删除当前选中的数据模板?</p>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="dialogDeleteVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!--可见人员-->
    <el-dialog title="数据可见人" :visible.sync="dialogdataVisible" class="personDialog">
      <span>
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">方案开发处</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedPersons" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="person in persons" :label="person" :key="person">{{person}}</el-checkbox>
        </el-checkbox-group>
      </span>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogdataVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="dialogdataVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="数据上传" :visible.sync="dialogupVisible" width="800px">
      <el-form label-width="180px">
        

        <el-form-item label="数据上传：">
          <el-upload class="upload-demo" multiple>
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="共享状态：">
          <el-radio v-model="dialog2.radio" label="1">共享</el-radio>
          <el-radio v-model="dialog2.radio" label="2">非共享</el-radio>
        </el-form-item>
        <el-form-item label="数据共享后可见人员：" v-if="dialog2.radio==1">
          <div class="dataVisible">
            <el-tree accordion :data="form.dataVisible" show-checkbox node-key="id" :default-expanded-keys="[1]" :props="form.defaultProps"></el-tree>
          </div>
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button @click="dialogupVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogupVisible = false">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
const personOptions = ['方案开发员001', '方案开发员002', '方案开发员003', '方案开发员004', '方案开发员005', '方案开发员006', '方案开发员007', '方案开发员008', '模型创建者001']
export default {
  data() {
    return {
      checkAll: false,
      checkedPersons: ['方案开发员001', '方案开发员002', '方案开发员003', '方案开发员004', '方案开发员005', '方案开发员006', '方案开发员007', '方案开发员008', '模型创建者001'],
      persons: personOptions,
      isIndeterminate: true,
      currentPage4: 1,
      form: {
        dataName: '银行可疑交易数据',
        model: '001-交易查询模板',
        dataType: '系统表',
        desc: '',
        sql:
          'select 主体名称，证件号，主体类型，机构行业类别或个人职业类别，主体国籍，家庭住址  from 主体属性库;',
        dataVisible: [
          {
            id: 1,
            label: '方案开发处',
            children: [
              {
                id: 11,
                label: '方案开发员001'
              },
              {
                id: 12,
                label: '方案开发员002'
              },
              {
                id: 13,
                label: '方案开发员003'
              },
              {
                id: 14,
                label: '方案开发员004'
              }
            ]
          },
          {
            id: 2,
            label: '信息管理处',
            children: [
              {
                id: 21,
                label: '信息管理处人员01'
              },
              {
                id: 22,
                label: '信息管理处人员02'
              },
              {
                id: 23,
                label: '信息管理处人员03'
              },
              {
                id: 24,
                label: '信息管理处人员04'
              },
              {
                id: 25,
                label: '信息管理处人员05'
              }
            ]
          },
          {
            id: 3,
            label: '分析移送处'
          },
          {
            id: 4,
            label: '报文接收部门'
          }
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      },
      deletePopover: false,
      dialogVisible: false,
      dialogDeleteVisible: false,
      dialogdataVisible: false,
      dialogupVisible: false,
      moreModel: false,
      dialog: {
        radio: '1',
        dialogTime: '',
        range: []
      },
      dialog2: {
        radio: '1',
        dialogTime: '',
        range: []
      },
      tableData: [
        {
          // dataNum: '10000001',
          dataName: '主体属性特征表',
          creater: '数据操作员001',
          createTime: '2018-01-21 8:00:00~2018-01-22 8:00:00',
          updateTime: '2018-01-22 8:00:00',
          dataState: '公共表',
          applyer: '--',
          dataVisible: '所有人',
          total: '100000笔',
          fileSize: '10M',
          frequency: '100次'
        },
        {
          // dataNum: '10000001',
          dataName: '账户属性特征表',
          creater: '数据操作员002',
          createTime: '2018-01-21 8:00:00~2018-01-22 8:00:00',
          updateTime: '2018-01-22 8:00:00',
          dataState: '公共表',
          applyer: '方案开发处长001',
          dataVisible: '方案开发处',
          total: '40000笔',
          fileSize: '10M',
          frequency: '58次'
        },
        {
          // dataNum: '10000001',
          dataName: '主体特征_反恐表',
          creater: '数据操作员003',
          createTime: '2018-01-21 8:00:00~2018-01-22 8:00:00',
          updateTime: '2018-01-22 8:00:00',
          dataState: '个人表',
          applyer: '模型创建者001',
          dataVisible: '模型创建者001',
          total: '550笔',
          fileSize: '10M',
          frequency: '1次'
        },
        {
          // dataNum: '10000001',
          dataName: '主体特征_涉毒表',
          creater: '数据操作员004',
          createTime: '2018-01-21 8:00:00~2018-01-22 8:00:00',
          updateTime: '2018-01-22 8:00:00',
          dataState: '个人表',
          applyer: '模型创建者002',
          dataVisible: '模型创建者002',
          total: '1000笔',
          fileSize: '10M',
          frequency: '5次'
        },
        {
          // dataNum: '10000001',
          dataName: '银行可疑交易数据',
          creater: '数据操作员005',
          createTime: '2018-01-21 8:00:00~2018-01-22 8:00:00',
          updateTime: '2018-01-22 8:00:00',
          dataState: '个人表',
          applyer: '模型创建者003',
          dataVisible: '模型创建者003',
          total: '3500笔',
          fileSize: '10M',
          frequency: '12次'
        }
      ]
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    onSubmit() {},
    startLibary(scope) {
      console.log('执行日志')
    },
    // tableDelete() {
    //   this.$confirm('是否删除当前选中的数据模板?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   })
    //     .then(() => {
    //       this.$message({
    //         type: 'success',
    //         message: '删除成功!'
    //       })
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: 'info',
    //         message: '已取消删除'
    //       })
    //     })
    // },
    handleCheckAllChange(val) {
      this.checkedPersons = val ? personOptions : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.persons.length
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.establishDataInfo {
    background: #ffffff;
    padding: 10px;
    .titlefix{
        margin: 5px;
    }
    .el-form {
        margin-bottom: 14px;
        padding-top:10px; 
        border-radius: 10px;
        border: 1px solid #f2f2f2; 
         .valable{
                  width:100%;
                  text-align:center;
                  margin-left:-140px;
                  .el-form-item__content button {
                      margin:0 80px;
                      width:150px
                  }
              }
    }
  .line {
    text-align: center;
  }
}
.personDialog{
  .el-checkbox__label{
    padding-right: 20px;
  }
  .el-checkbox+.el-checkbox{
    margin-left: 0px;
  }
}
</style>
