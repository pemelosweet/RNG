<template>
  <div class="numwraper">
    <el-card>
      <div slot="header"><span>编号移送流程审批</span></div>
      <el-row>
        <!-- 第一行 -->
        <div class="processrow">
          <span>流程操作：</span>
          <el-button type="primary" @click="printVisible = true">打 印</el-button><el-button type="primary">保 存</el-button>
           <el-button type="primary" @click="submitVisible = true">提 交</el-button><el-button type="primary" @click="adviceVisible = true">意 见</el-button>
            <el-button type="primary">关闭</el-button>
        </div>

        <el-tabs v-model="activeName" type="card">
          <!-- 正文信息 -->
          <el-tab-pane name="first">
            <el-badge slot="label"><span>正文信息</span></el-badge>
            <div class="ptitle">签呈批单表单</div>
            <el-form :model="petitionForm" label-width="100px">
              <el-row>
                <!-- 第一行 -->
                <el-col :span="24">
                    <el-col :span="12">
                    <el-form-item label="单号：">
                        <el-input v-model="petitionForm.odd"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="12">
                    <el-form-item label="保存时间 :" class="oddinput">
                        <el-date-picker
                        v-model="petitionValue"
                        type="datetime"
                        placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    </el-col>
                </el-col>
                <!-- 第二行 -->
                <el-col :span="24">
                    <el-col :span="12">
                    <el-form-item label="签/呈：">
                        <el-select v-model="petitionForm.petition" placeholder="请选择活动区域">
                        <el-option label="签批单" value="shanghai"></el-option>
                        <el-option label="呈批单" value="beijing"></el-option>
                        <el-option label="均起草" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    </el-col>
                    <el-col :span="12">
                    <el-form-item label="类  别：">
                        <el-select v-model="petitionForm.type" placeholder="请选择活动区域">
                        <el-option label="线索" value="shanghai"></el-option>
                        <el-option label="通报" value="beijing"></el-option>
                        <el-option label="协查--受托" value="beijing"></el-option>
                        <el-option label="协查--委 托" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    </el-col>
                </el-col>
                <!-- 第三行 -->
                <el-col :span="24">
                    <el-form-item label="单标题：" class="ptitleitem">
                        <el-input v-model="petitionForm.ptitle"></el-input>
                    </el-form-item>
                </el-col>
                <!-- 第四行 -->
                <el-col :span="24">
                    <el-col :span="12">
                    <el-form-item label="份数：">
                        <el-input v-model="petitionForm.ptitle"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="12">
                    <el-form-item label="发送单位：">
                        <el-select v-model="petitionForm.unilt" placeholder="请选择活动区域">
                        <el-option label="公安部" value="shanghai"></el-option>
                        <el-option label="中纪委" value="beijing"></el-option>
                        <el-option label="最高检" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    </el-col>
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
                </el-row>
            </el-form>
          </el-tab-pane> 
          <!-- 附件信息 -->
          <el-tab-pane name="second">
            <el-badge slot="label"><span>附件信息</span></el-badge>
            <div class="accestitle">附件列表</div>
            <!-- <div class="divider divider-horizontal"></div> -->
            <div class="btnlist"><el-button type="primary">上传附件</el-button></div>
            <el-table style="width: 100%" :data="accessoryTable.list.slice((accessoryTable.currentPage-1)*accessoryTable.pagesize,accessoryTable.currentPage*accessoryTable.pagesize)">
              <el-table-column type="selection" width="55" fixed></el-table-column>
              <el-table-column prop="type" label="附件类型" min-width="120" fixed></el-table-column>
              <el-table-column prop="name" label="附件名称" width="180" fixed></el-table-column>
              <el-table-column prop="option" fixed="right" label="操作" min-width="80">
                  <template slot-scope="scope">
                      <el-button type="text">删除</el-button>
                  </template>
              </el-table-column>
            </el-table>  
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="accessoryTable.currentPage" :page-sizes="[10, 20, 30, 40]"
            :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400" background></el-pagination>
          </el-tab-pane>  
          <!-- 办理信息 -->
          <el-tab-pane name="third">
            <el-badge slot="label"><span>办理信息</span></el-badge>
            <el-table style="width: 100%" :data="handleTable.list.slice((handleTable.currentPage-1)*handleTable.pagesize,handleTable.currentPage*handleTable.pagesize)">
              <el-table-column type="index" label="序号" min-width="55" fixed></el-table-column>
              <el-table-column prop="type" label="节点名称" min-width="120" fixed></el-table-column>
              <el-table-column prop="name" label="办理人" width="180" fixed></el-table-column>
              <el-table-column type="index" label="办理时间" min-width="55" fixed></el-table-column>
              <el-table-column prop="type" label="办理意见" min-width="120" fixed></el-table-column>
              <el-table-column prop="name" label="备注" width="180" fixed></el-table-column>
              <el-table-column prop="name" label="签名" width="180" fixed></el-table-column>
            </el-table>  
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="handleTable.currentPage" :page-sizes="[10, 20, 30, 40]"
            :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400" background></el-pagination>
            <el-row style="marginBottom:20px">
              <el-col :span="12">
                <span>流程监控图 ：</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-steps :active="2" align-center>
                  <el-step title="填写协查类文件档案表" description=""></el-step>
                  <el-step title="移送处处长审核" description=""></el-step>
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
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="printTable.currentPage" :page-sizes="[10, 20, 30, 40]"
        :page-size="100" layout="total, sizes, prev, pager, next" :total="400" background></el-pagination>
      <span slot="footer" class="dialog-footer">
        <el-button @click="printVisible = false">取 消</el-button>
        <el-button type="primary" @click="printVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 提交弹框内容 -->
    <el-dialog class="submitwrap"
      title="任务提交"
      :visible.sync="submitVisible">
      <div>
        <div class="dialogtitle">任务流向：</div>
        <el-row class="radiowrap"><el-radio v-model="radio" label="1">送移送处处长审核</el-radio></el-row>
        <el-row class="dialogradio radiowrap"> <el-radio v-model="radio" label="2">结束（如其他电子平台来件为主体信息空等情况）</el-radio></el-row>
        <el-transfer :titles="['待选用户', '已选用户']" :button-texts="['', '']" v-model="value" :data="data"></el-transfer>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="submitVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    
    <!-- 意见 -->
    <el-dialog title="填写意见" :visible.sync="adviceVisible">
        <el-input type="textarea"></el-input>
       <span slot="footer" class="dialog-footer">
        <el-button @click="adviceVisible = false">取 消</el-button>
        <el-button type="primary" @click="adviceVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    // 提交穿梭框定义
    const generateData = _ => {
      const data = []
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `领导 ${i}`
        })
      }
      return data
    }
    return {
      activeName: 'first', // tabs
      petitionForm: {
        odd: '',
        petition: '',
        type: '',
        ptitle: '',
        unilt: ''
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
      data: generateData(), // 提交穿梭框变量
      value: [], // 提交穿梭框变量
      radio: 1 // 提交弹框单选框
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
    }
  }
}
</script>

<style lang="scss">
.numwraper {
  .el-form {
    margin: 0 120px;
  }
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
  .submitwrap {
    .el-dialog__body {
      padding-top: 10px;
      .dialogtitle {
        margin-bottom: 8px;
      }
      .dialogradio {
        padding-bottom: 10px;
        border-bottom: 1px dashed #409eff;
      }
      .radiowrap {
        padding-left: 30px;
      }
      .el-transfer {
        margin: 10px 0 0 5%;
      }
    }
  }
}
</style>
