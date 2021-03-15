<template>
  <div class="definedData">
    <el-card>
      <div slot="header">自定义数据类型</div>
      <el-row>
        <el-col :span="24">
          <span>录入类型</span>
          <el-button type="primary" style="margin-left:20px;margin-bottom:10px" @click="dialogVisible=true">新增数据类型</el-button>
          <el-button type="primary" @click="dialogTableVisible=true">自定义属性信息</el-button>
          <el-button type="primary" style="float:right">导 出</el-button>
        </el-col>
      </el-row>
      <el-table :data="tableData">
        <el-table-column type="selection" width="60"></el-table-column>
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column prop="name" label="类型名称" min-width="130"></el-table-column>
        <el-table-column prop="inputWay" label="录入方式" min-width="130"></el-table-column>
        <el-table-column prop="dataTable" label="是否对应数据表" min-width="120">
          <template slot-scope="scope">{{scope.row.dataTable}}</template>
        </el-table-column>
        <el-table-column prop="templateFile" label="介质模板文件" min-width="140"></el-table-column>
        <el-table-column prop="data" label="对应数据表" min-width="150"></el-table-column>
        <el-table-column prop="typeState" label="类型状态" min-width="80"></el-table-column>
        <el-table-column label="操作" min-width="280">
          <template slot-scope="scope">
            <el-button type="text" v-if="scope.row.typeState==='已启用'">停用</el-button>
            <el-button type="text" v-if="scope.row.typeState==='未启用'">启用</el-button>
            <el-button type="text" @click="dialogVisible=true">查看</el-button>
            <el-button type="text" @click="dialogVisible=true">编辑</el-button>
            <el-button type="text" @click="dialogTableVisible=true" v-if="scope.row.dataTable==='是'">自定义属性</el-button>
            <el-button type="text" @click="dialogTableVisible2=true" v-if="scope.row.dataTable==='否'">自定义属性</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]"
      :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400" background></el-pagination>

      <el-dialog title="新增数据类型" :visible.sync="dialogVisible">
        <el-form :model="form">
          <el-row>
            <el-col :span="12">
              <el-form-item label="数据类型名称：" :label-width="formLabelWidth">
                <el-input v-model="form.name" placeholder="公共举报信息"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="数据表名称：" :label-width="formLabelWidth">
                <el-input v-model="form.region"></el-input>
              </el-form-item>
            </el-col>
          </el-row>   
          <el-row>
            <el-col :span="12">
              <el-form-item label="是否存在数据表：" :label-width="formLabelWidth">
                <el-radio v-model="radio" label="1">文件传输</el-radio>
                <el-radio v-model="radio" label="2">数据库对接</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="介质模板文件：" :label-width="formLabelWidth">
                <el-input v-model="form.describe"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2"><el-button type="primary" style="margin-left:7px">上传</el-button></el-col>
          </el-row> 
          <el-row>
            <el-col :span="12">
              <el-form-item label="录入方式：" :label-width="formLabelWidth">
                <el-checkbox-group v-model="checkList">
                  <el-checkbox label="手工录入"></el-checkbox>
                  <el-checkbox label="介质传输"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="描述：" :label-width="formLabelWidth">
                <el-input v-model="form.describe"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="自定义属性信息" :visible.sync="dialogTableVisible" class="dialogTableVisible">
        <el-tabs v-model="activeName">
          <el-tab-pane label="属性信息" name="first">
            <el-form :model="form2">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="字段名称：" label-width="82px"><el-input></el-input></el-form-item>
                </el-col>
                <el-button type="primary" style="margin-left:15px">查询</el-button>
                <el-button type="primary">新增</el-button>
                <el-button type="primary">导入</el-button>
                <el-button type="primary">导出</el-button>
              </el-row>
            </el-form>
            <el-table :data="dialogtableData">
              <el-table-column type="selection" width="60"></el-table-column>
              <el-table-column type="index" label="序号" width="60"></el-table-column>
              <el-table-column prop="name" label="字段名称" min-width="100"></el-table-column>
              <el-table-column prop="fontType" label="字段类型" min-width="120">
                <template slot-scope="scope">
                  <el-select v-model="fontType">
                    <el-option label="文本" value="1"></el-option>
                    <el-option label="文本域" value="2"></el-option>
                    <el-option label="下拉列表" value="3"></el-option>
                    <el-option label="数字" value="4"></el-option>
                    <el-option label="日期" value="5"></el-option>
                    <el-option label="时间" value="6"></el-option>
                    <el-option label="附件" value="7"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="isMust" label="是否必填" min-width="110">
                <template slot-scope="scope">
                  <el-select v-model="isMust">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="2"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="isSearch" label="是否允许查询" min-width="120">
                <template slot-scope="scope">
                  <el-select v-model="isSearch">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="2"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="length" label="长度" min-width="80"></el-table-column>
              <el-table-column prop="beizhu" label="备注" min-width="100"></el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="下拉值信息" name="second">
            <el-form :model="form3">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="字段名称：" label-width="82px"><el-input></el-input></el-form-item>
                </el-col>
                <el-button type="primary" style="margin-left:15px">查询</el-button>
                <el-button type="primary">清除</el-button>
              </el-row>
            </el-form>
            <el-table :data="dialogtableData2">
              <el-table-column type="selection" width="60"></el-table-column>
              <el-table-column type="index" label="序号" width="60"></el-table-column>
              <el-table-column prop="fontname" label="字段名称" min-width="100"></el-table-column>
              <el-table-column prop="name" label="字典名称" min-width="100"></el-table-column>
              <el-table-column label="操作" min-width="120">
                <template slot-scope="scope">
                  <el-button type="text">选择字典值</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="属性分组" name="third">
            <!-- <el-form :model="form4">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="分组名称：" label-width="82px">
                    <el-select v-model="groupName" @change="chooseGroup">
                      <el-option label="常用信息" value="1"></el-option>
                      <el-option label="业务表单" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="选择属性：" label-width="82px">
                    <el-checkbox-group v-model="checkList2" v-show="generalMsg">
                      <el-checkbox label="来文编号"></el-checkbox>
                      <el-checkbox label="来文单位"></el-checkbox>
                      <el-checkbox label="国家"></el-checkbox>
                    </el-checkbox-group>
                    <el-checkbox-group v-model="checkList3" v-show="businessForm">
                      <el-checkbox label="业务编号"></el-checkbox>
                      <el-checkbox label="可疑交易名称"></el-checkbox>
                      <el-checkbox label="账户数量"></el-checkbox>
                      <el-checkbox label="主体信息"></el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </el-col>
                <el-button type="primary" style="margin-left:15px">增加分组</el-button>
              </el-row>
            </el-form> -->
            <el-tabs tab-position="left" style="height: 200px;">
              <el-tab-pane label="用户管理">用户管理</el-tab-pane>
              <el-tab-pane label="配置管理">配置管理</el-tab-pane>
              <el-tab-pane label="角色管理">角色管理</el-tab-pane>
              <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane label="唯一性约束" name="fourth">
            <el-transfer v-model="value1" :data="data" :titles="['属性列表：', '关键标识字段：']"></el-transfer>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogTableVisible = false">保 存</el-button>
        </div>
      </el-dialog>

      <el-dialog title="自定义属性信息" :visible.sync="dialogTableVisible2" class="dialogTableVisible">
        <el-tabs v-model="activeName">
          <el-tab-pane label="属性信息" name="first">
            <el-form :model="form2">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="字段名称：" label-width="82px"><el-input></el-input></el-form-item>
                </el-col>
                <el-button type="primary" style="margin-left:15px">查询</el-button>
                <el-button type="primary">新增</el-button>
                <el-button type="primary">导入</el-button>
                <el-button type="primary">导出</el-button>
              </el-row>
            </el-form>
            <el-table :data="dialogtableData">
              <el-table-column type="selection" width="60"></el-table-column>
              <el-table-column type="index" label="序号" width="60"></el-table-column>
              <el-table-column prop="name" label="字段名称" min-width="100"></el-table-column>
              <el-table-column prop="fontType" label="字段类型" min-width="120">
                <template slot-scope="scope">
                  <el-select v-model="fontType">
                    <el-option label="文本" value="1"></el-option>
                    <el-option label="文本域" value="2"></el-option>
                    <el-option label="下拉列表" value="3"></el-option>
                    <el-option label="数字" value="4"></el-option>
                    <el-option label="日期" value="5"></el-option>
                    <el-option label="时间" value="6"></el-option>
                    <el-option label="附件" value="7"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="isMust" label="是否必填" min-width="110">
                <template slot-scope="scope">
                  <el-select v-model="isMust">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="2"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="isSearch" label="是否允许查询" min-width="120">
                <template slot-scope="scope">
                  <el-select v-model="isSearch">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="2"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="length" label="长度" min-width="80"></el-table-column>
              <el-table-column prop="" label="对应数据字段" min-width="100">
                <template slot-scope="scope">
                  <el-select v-model="dataFont">
                    <el-option label="fields01" value="1"></el-option>
                    <el-option label="fields02" value="2"></el-option>
                    <el-option label="fields03" value="3"></el-option>
                  </el-select>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="下拉值信息" name="second">
            <el-form :model="form3">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="字段名称：" label-width="82px"><el-input></el-input></el-form-item>
                </el-col>
                <el-button type="primary" style="margin-left:15px">查询</el-button>
                <el-button type="primary">清除</el-button>
              </el-row>
            </el-form>
            <el-table :data="dialogtableData2">
              <el-table-column type="selection" width="60"></el-table-column>
              <el-table-column type="index" label="序号" width="60"></el-table-column>
              <el-table-column prop="fontname" label="字段名称" min-width="100"></el-table-column>
              <el-table-column prop="name" label="字典名称" min-width="100"></el-table-column>
              <el-table-column label="操作" min-width="120">
                <template slot-scope="scope">
                  <el-button type="text">选择字典值</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="属性分组" name="third">
            <el-form :model="form4">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="分组名称：" label-width="82px">
                    <el-select v-model="groupName" @change="chooseGroup">
                      <el-option label="常用信息" value="1"></el-option>
                      <el-option label="业务表单" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="选择属性：" label-width="82px">
                    <el-checkbox-group v-model="checkList2" v-show="generalMsg">
                      <el-checkbox label="来文编号"></el-checkbox>
                      <el-checkbox label="来文单位"></el-checkbox>
                      <el-checkbox label="国家"></el-checkbox>
                    </el-checkbox-group>
                    <el-checkbox-group v-model="checkList3" v-show="businessForm">
                      <el-checkbox label="业务编号"></el-checkbox>
                      <el-checkbox label="可疑交易名称"></el-checkbox>
                      <el-checkbox label="账户数量"></el-checkbox>
                      <el-checkbox label="主体信息"></el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </el-col>
                <el-button type="primary" style="margin-left:15px">增加分组</el-button>
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="唯一性约束" name="fourth">
            <el-transfer v-model="value1" :data="data" :titles="['属性列表：', '关键标识字段：']"></el-transfer>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="dialogTableVisible2 = false">保 存</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      const generateData = _ => {
        const data = []
        const contents = ['来文编号', '业务编号', '国家']
        contents.forEach((content, index) => {
          data.push({
            label: content,
            key: index
          })
        })
        return data
      }
      return {
        tableData: [
          {
            name: '公众举报信息',
            inputWay: '手动录入，介质传输',
            dataTable: '是',
            templateFile: '公众举报信息模板.xls',
            data: '公众举报信息表',
            typeState: '已启用'
          },
          {
            name: '公文函件',
            inputWay: '手动录入，介质传输',
            dataTable: '是',
            templateFile: '公文函件.xls',
            data: '公文函件表',
            typeState: '已启用'
          },
          {
            name: '国际协查通报信息',
            inputWay: '手动录入，介质传输',
            dataTable: '是',
            templateFile: '国际协查通报信息.xls',
            data: '国际协查通报信息表',
            typeState: '未启用'
          },
          {
            name: '国内协查通报信息',
            inputWay: '手动录入，介质传输',
            dataTable: '是',
            templateFile: '国内协查通报信息.xls',
            data: '国内协查通报信息表',
            typeState: '已启用'
          },
          {
            name: '****新数据类型',
            inputWay: '手工录入',
            dataTable: '否',
            templateFile: '关于******模板.xls',
            data: '----------------------',
            typeState: '未启用'
          }
        ],
        dialogtableData: [
          {
            name: '字段1',
            length: '50'
          },
          {
            name: '字段2',
            length: '300'
          },
          {
            name: '涉罪类型',
            length: '50'
          },
          {
            name: '字段4',
            length: '10'
          },
          {
            name: '字段5',
            length: '10'
          }
        ],
        dialogtableData2: [
          {
            fontname: '字段3',
            name: '涉罪类型'
          },
          {
            fontname: '字段**',
            name: '民族'
          },
          {
            fontname: '字段**',
            name: '报告类型'
          }
        ],
        dataFont: '',
        fontType: '',
        isMust: '',
        isSearch: '',
        groupName: '1',
        form: {
          name: ''
        },
        form2: {},
        form3: {},
        form4: {},
        currentPage: 1,
        pagesize: 10,
        dialogVisible: false,
        dialogTableVisible: false,
        dialogTableVisible2: false,
        formLabelWidth: '130px',
        activeName: 'first',
        radio: '1',
        checkList: [],
        checkList2: [],
        checkList3: [],
        data: generateData(),
        value1: [],
        generalMsg: true,
        businessForm: false
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
      },
      chooseGroup() {
        if (this.groupName === '1') {
          this.generalMsg = true
          this.businessForm = false
        } else if (this.groupName === '2') {
          this.generalMsg = false
          this.businessForm = true
        }
      }
    }
  }
</script>

<style lang="scss">
  .dialogTableVisible{
    .el-dialog__body{
      padding: 5px 20px;
    }
  }
</style>