<template>
  <div class="numwraper">
    <el-card>
      <div slot="header">
        <span>编号移送流程审批</span>
      </div>
      <el-row>
        <!-- 第一行 -->
        <div class="processrow">
          <span>流程操作：</span>
          <el-button type="primary" @click="printVisible = true" plain>打 印</el-button>
          <el-button type="primary" plain>保 存</el-button>
          <!-- <el-button type="primary" @click="submitVisible = true">提 交</el-button> -->
          <el-button type="primary" @click="adviceVisible = true" plain>意 见</el-button>

        </div>

        <el-tabs v-model="activeName" type="card">
          <!-- 正文信息 -->
          <el-tab-pane name="first">
            <el-badge slot="label">
              <span>签呈批单</span>
            </el-badge>
            <div class="ptitle">签呈批单表单</div>
            <el-form :model="petitionForm" label-width="100px">
              <el-row>
                <!-- 第一行 -->
                <el-col :span="8">
                  <el-form-item label="单号：" class="ptitleitem">
                    <el-input v-model="petitionForm.odd"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="保存时间 :" class="oddinput">
                    <el-date-picker v-model="petitionValue" type="datetime" placeholder="选择日期时间">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="签/呈：">
                    <el-select v-model="petitionForm.petition" placeholder="请选择活动区域">
                      <el-option label="签批单" value="shanghai"></el-option>
                      <el-option label="呈批单" value="beijing"></el-option>
                      <el-option label="均起草" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 第二行 -->

              <!-- 第三行 -->
              <el-row>
                <el-col :span="8">
                  <el-form-item label="单标题：" class="ptitleitem">
                    <el-input v-model="petitionForm.ptitle"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="类  别：">
                    <el-select v-model="petitionForm.type" placeholder="请选择活动区域">
                      <el-option label="线索" value="shanghai"></el-option>
                      <el-option label="通报" value="beijing"></el-option>
                      <el-option label="协查--受托" value="beijing"></el-option>
                      <el-option label="协查--委 托" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="发送单位：">
                    <el-select v-model="petitionForm.unilt" placeholder="请选择活动区域">
                      <el-option label="公安部" value="shanghai"></el-option>
                      <el-option label="中纪委" value="beijing"></el-option>
                      <el-option label="最高检" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <!-- 第四行 -->

              <el-col :span="24">
                <el-form-item label="份数：">
                  <el-input v-model="petitionForm.ptitle"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item label="签批单备注：">
                  <el-input type="textarea" v-model="petitionForm.ptitle"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="呈批单备注：">
                  <el-input type="textarea" v-model="petitionForm.ptitle"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-col :span="12">
                  <el-form-item label="函标题：">
                    <el-input v-model="petitionForm.odd"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="来函号：">
                    <el-input v-model="petitionForm.odd"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="24">
                <el-form-item label="函正文：">
                  <el-input type="textarea" v-model="petitionForm.ptitle"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-col :span="12">
                  <el-form-item label="单内流水号：">
                    <el-input v-model="petitionForm.odd"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="编号情况：">
                    <el-input v-model="petitionForm.odd"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
            </el-form>
          </el-tab-pane>
          <el-tab-pane name="second">
            <el-badge slot="label">
              <span>情报字函</span>
            </el-badge>
            <el-row class="table">
              <table border="1">
                <tr>
                  <td width="850" colspan="6" height="70;" align="center">
                    <h2>中国反洗钱监测分析中心</h2>
                    <p>【1】
                      <el-input placeholder="中心情报字（2018）号" style="width:25%"></el-input>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td height="900" colspan="6">
                    <p class="p1">【2】
                      <el-input placeholder="关于有关账户协查结果的函" style="width:25%"></el-input>
                    </p>
                    <p class="p2">【3】
                      <el-input placeholder="海关总署缉私局：" style="width:20%"></el-input>
                    </p>
                    <p class="p2">来函（【4】
                      <el-input placeholder="缉私情函（2018）号" style="width:20%"></el-input>）收悉，业经监测分析。现将协查结果提供【5】
                      <el-input placeholder="贵局" style="width:10%"></el-input>，请查收</p>
                    <p class="p3">【6】
                      <el-input placeholder="附件：协查结果反馈表（共一份）" style="width:30%"></el-input>
                    </p>
                    <p class="p4">【7】中国反洗钱监测分析中心</p>
                    <p class="p5"> 2018年&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp月&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp日</p>
                    <p class="p6"> 根据《中华人民共和国反洗钱法》的规定，本中心移送的线索内容及客户身份资料和交易信息须严格保密， 未经本中心同意严禁向线索涉及单位和个人及其他第三方披露，并只能用于法律规定的目的，不可作为执法、司法的证据。 另，线索及相关资料使用完毕须及时销毁，并请将使用情况及时反馈本中心。
                    </p>
                  </td>
                </tr>
              </table>

            </el-row>
          </el-tab-pane>
          <!-- 附件信息 -->
          <el-tab-pane name="third">
            <el-badge slot="label">
              <span>附件信息</span>
            </el-badge>
            <!-- <div class="divider divider-horizontal"></div> -->
            <el-row class="uploadContainer">
              <el-col :span="20" :offset="2">
                <File-Upload :accepts="accepts"></File-Upload>
              </el-col>
            </el-row>
            <div class="accestitle">附件列表</div>
            <el-table style="width: 100%" :data="accessoryTable.list.slice((accessoryTable.currentPage-1)*accessoryTable.pagesize,accessoryTable.currentPage*accessoryTable.pagesize)">
              <el-table-column type="selection" width="55" fixed></el-table-column>
              <el-table-column prop="type" label="附件类型" min-width="120" fixed></el-table-column>
              <el-table-column prop="name" label="附件名称" width="180" fixed></el-table-column>
              <el-table-column prop="option" fixed="right" label="操作" min-width="80">
                <template slot-scope="scope">
                  <el-button type="text" @click="delRow(scope)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <!-- 办理信息 -->
          <el-tab-pane name="four">
            <el-badge slot="label">
              <span>办理信息</span>
            </el-badge>
            <el-table style="width: 100%" :data="tableData">
              <el-table-column type="index" label="序号" min-width="55" fixed></el-table-column>
              <el-table-column prop="name" label="节点名称" min-width="120" fixed></el-table-column>
              <el-table-column prop="user" label="办理人" width="180" fixed></el-table-column>
              <el-table-column prop="time" label="办理时间" min-width="120"></el-table-column>
              <el-table-column prop="idea" label="办理意见" min-width="120"></el-table-column>
              <el-table-column prop="beizhu" label="备注" width="180"></el-table-column>
              <el-table-column prop="write" label="签名" width="180"></el-table-column>
            </el-table>
            <el-row style="marginBottom:20px">
              <el-col :span="12">
                <span>流程监控图 ：</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-steps :active="2" align-center>
                  <el-step title="业务人员审核整编" description=""></el-step>
                  <el-step title="移送处处长审阅" description=""></el-step>
                  <el-step title="...." description=""></el-step>
                  <el-step title="结束" description=""></el-step>
                </el-steps>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-row>
    </el-card>

    <!-- 打印弹框 -->
    <el-dialog title="打印页面" :visible.sync="printVisible">
      <el-table :data="printTable.list.slice((printTable.currentPage-1)*printTable.pagesize,printTable.currentPage*printTable.pagesize)">
        <el-table-column prop="" type="selection" label="单号" width="80"></el-table-column>
        <el-table-column type="selection" label="签批单" width="100" fixed></el-table-column>
        <el-table-column type="selection" label="呈批单" min-width="100"></el-table-column>
        <el-table-column type="selection" label="情报字函" width="100"></el-table-column>
        <el-table-column type="selection" label="每份情报档案表首页" width="150"></el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="printTable.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="100" layout="total, sizes, prev, pager, next" :total="400" background></el-pagination>
      <span slot="footer" class="dialog-footer">
        <el-button @click="printVisible = false">取 消</el-button>
        <el-button type="primary" @click="printVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 提交弹框内容 -->
    <!-- <el-dialog class="submitwrap" title="任务提交" :visible.sync="submitVisible">
      <div>
        <div class="dialogtitle">任务流向：</div>
        <el-row class="radiowrap">
          <el-radio v-model="radio" label="1">送移送处处长审核</el-radio>
        </el-row>
        <el-row class="dialogradio radiowrap">
          <el-radio v-model="radio" label="2">结束（如其他电子平台来件为主体信息空等情况）</el-radio>
        </el-row>
        <el-transfer :titles="['待选用户', '已选用户']" :button-texts="['', '']" v-model="value" :data="data"></el-transfer>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="submitVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitVisible = false">确 定</el-button>
      </span>
    </el-dialog> -->
    <el-dialog title="任务提交" :visible.sync="submitVisible" width="600px" class="dialog-block">
      <div class="task">
        <el-form :model="form" label-width="100px">
          <el-form-item label="任务流向：">
            <el-tag style="margin-left:10px">送移送处处长审核</el-tag>
          </el-form-item>
          <el-form-item label="待选用户：">
            <el-radio v-model="form.radio" label="1">备选项1</el-radio>
            <el-radio v-model="form.radio" label="2">备选项2</el-radio>
            <el-radio v-model="form.radio" label="3">备选项3</el-radio>
            <el-radio v-model="form.radio" label="4">备选项4</el-radio>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="submitVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 意见 -->
    <el-dialog title="填写意见" :visible.sync="adviceVisible">
      <el-input type="textarea"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="adviceVisible = false">取 消</el-button>
        <el-button type="primary" @click="adviceVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!--打印-->
    <el-dialog title="打印页面" :visible.sync="printVisible">
      <el-table :data="table4.list.slice((table4.currentPage-1)*table4.pagesize,table4.currentPage*table4.pagesize)">
        <el-table-column prop="" type="selection" label="单号" min-width="100"></el-table-column>
        <el-table-column type="index" prop="num" label="单号" width="60" fixed>
        </el-table-column>
        <el-table-column min-width="100" label="签批单">
          <template slot-scope="scope">
            <el-checkbox v-model="checked"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="呈批单" min-width="100">
          <template slot-scope="scope">
            <el-checkbox v-model="checked"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="情报字函" min-width="100">
          <template slot-scope="scope">
            <el-checkbox v-model="checked"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="线索表" min-width="100">
          <template slot-scope="scope">
            <el-checkbox v-model="checked"></el-checkbox>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="table4.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="100" layout="total, sizes, prev, pager, next" :total="400" background></el-pagination>
      <span slot="footer" class="dialog-footer">
        <el-button @click="printVisible = false">取 消</el-button>
        <el-button type="primary" @click="printVisible = false">确 定</el-button>

      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAnalysisiIndex } from '@/api/cueManage'
import FileUpload from '@/components/FileUpload/index'
export default {
  components: {
    FileUpload
  },
  data() {
    // 提交穿梭框定义
    // const generateData = _ => {
    //   const data = []
    //   for (let i = 1; i <= 15; i++) {
    //     data.push({
    //       key: i,
    //       label: `领导 ${i}`
    //     })
    //   }
    //   return data
    // }
    return {
      accepts: ['zip', 'rar'],
      activeName: 'first', // tabs
      petitionForm: {
        odd: '',
        petition: '',
        type: '',
        ptitle: '',
        unilt: ''
      },
      table4: {
        list: [],
        // 默认开始页码
        currentPage: 1,
        // 每页显示条数
        pagesize: 10
      },
      adviceVisible: false, // 意见弹框
      petitionValue: '',
      printVisible: false, // 打印弹框
      submitVisible: false, // 提交弹框
      accessoryTable: {
        // 请求信息分页
        list: [],
        // 默认开始页码
        currentPage: 1,
        // 每页显示条数
        pagesize: 10
      },
      handleTable: {
        list: [],
        // 默认开始页码
        currentPage: 1,
        // 每页显示条数
        pagesize: 10
      },
      printTable: {
        list: [],
        // 默认开始页码
        currentPage: 1,
        // 每页显示条数
        pagesize: 10
      },
      adviceTable: {
        list: [],
        // 默认开始页码
        currentPage: 1,
        // 每页显示条数
        pagesize: 10
      },
      // data: generateData(), // 提交穿梭框变量
      value: [], // 提交穿梭框变量
      form: {
        radio: 1 // 提交弹框单选框
      },
      tableData: [
        {
          name: '业务人员编号移送',
          user: 'user1',
          time: '2017-05-05 10:00:00',
          idea: '同意',
          beizhu: '******',
          write: '******'
        },
        {
          name: '移送处处长审阅',
          user: 'user2',
          time: '2017-05-06 10:00:00',
          idea: '同意',
          beizhu: '******',
          write: '******'
        },
        {
          name: '移送处分管领导审核',
          user: 'user3',
          time: '2017-05-07 10:00:00',
          idea: '同意',
          beizhu: '******',
          write: '******'
        },
        {
          name: '中心领导签批',
          user: 'user4',
          time: '2017-05-08 10:00:00',
          idea: '同意',
          beizhu: '******',
          write: '******'
        }
      ]
    }
  },
  methods: {
    handleSizeChange(size) {
      this.pagesize = size
      // console.log(`每页 ${size} 条`)
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      // console.log(`当前页: ${currentPage}`)
    },
    fetchData(listQuery) {
      this.listLoading = true
      getAnalysisiIndex(this.listQuery).then(response => {
        this.list = response.data.projects
        this.accessoryTable.list = response.data.accessoryTable
        this.handleTable.list = response.data.handleTable
        this.table4.list = response.data.table4
        this.listLoading = false
      })
    },
    delRow(scope) {
      const index = scope.$index
      this.$confirm('确定删除此附件吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.accessoryTable.list.splice(index, 1)
        })
        .catch(() => {})
    }
  },
  created() {
    var listQuery = { currentPage: this.currentPage, pageSize: this.pageSize }
    this.fetchData(listQuery)
  }
}
</script>

<style lang="scss">
.numwraper {
  // .el-form {
  //   margin: 0 120px;
  // }
  .ptitle {
    font-size: 0.9em;
    font-weight: bold;
    padding: 0 0 10px 0;
  }
  .accestitle {
    // 附件样式
    font-size: 0.9em;
    padding-bottom: 5px;
    margin-bottom: 10px;
    border-bottom: 1px solid #e8e8e8;
  }
  .processrow {
    padding-bottom: 10px;
    span {
      font-size: 0.9em;
    }
  }
  .oddinput .el-form-item__content {
    width: 64%;
  }
  .ptitleitem .el-form-item__content {
    width: 50%;
  }
  // 提交弹框样式
  // .submitwrap {
  //   .el-dialog__body {
  //     padding-top: 10px;
  //     .dialogtitle {
  //       margin-bottom: 8px;
  //     }
  //     .dialogradio {
  //       padding-bottom: 10px;
  //       border-bottom: 1px dashed #409eff;
  //     }
  //     .radiowrap {
  //       padding-left: 30px;
  //     }
  //     .el-transfer {
  //       margin: 10px 0 0 5%;
  //     }
  //   }
  // }

  .uploadContainer {
    margin-bottom: 30px;
  }
  .table {
    table {
      border-collapse: collapse;
      text-align: center;
      margin: 0 auto;
    }
    table p {
      text-align: center;
      margin-top: 20px;
    }
    table span {
      display: inline-block;
      width: 430px;
      text-align: right;
    }
    #time span {
      width: 30px;
    }
    .p1 {
      margin-top: -50px;
    }
    .p2 {
      margin-left: 10px;
      text-align: left;
      margin-top: 30px;
    }
    .p3 {
      margin-left: 10px;
      text-align: left;
      margin-top: 100px;
    }
    .p4 {
      margin-left: 10px;
      text-align: right;
      margin-right: 30px;
      margin-top: 200px;
    }
    .p5 {
      text-align: right;
      margin-right: 30px;
    }
    .p6 {
      width: 800px;
      margin: 240px auto 0;
      text-align: -webkit-auto;
    }
  }
}
.dialog-block {
  .el-radio {
    width: 100%;
    margin-left: 30px;
  }
}
</style>
