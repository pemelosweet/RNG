<template>
  <div class="cueManage_interFileTransfer">
    <el-card>
      <a @click="goBack" class="back" :style="backImg"></a>
      <div slot="header">
        国际情报文件移送通报
      </div>
      <div style="marginBottom:18px">
        <span style="marginRight:20px">流程操作：</span>
        <el-button type="warning" plain @click="handlSave">保 存</el-button>
        <el-button type="primary" plain @click="handlSaveflow"> 提 交</el-button>
      </div>

      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="表单信息" name="formTabpane">
          <el-form :model="form" label-position="top">
            <div class="block">
              <h3 style="margin: 15px auto;textAlign:center">可疑交易通报表</h3>

              <el-row :gutter="20">
                <el-col :span="20" :offset="2">
                  <el-form-item label="可疑交易名称">
                    <el-input v-model="form.cdispose" placeholder="***账户可疑交易"></el-input>
                  </el-form-item>

                  <el-form-item label="关联移送记录">
                    <el-input v-model="form.ctriggermessage" type="textarea" placeholder="****某账户可疑交易（线索表编号：【2013】_2_1）"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="6" :offset="2">
                  <el-form-item label="涉及交易笔数">
                    <el-input v-model="form.cnumber" placeholder="请输入"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="主要交易发生地">
                    <el-cascader :options="optionsAddr" v-model="form.bodymessage" style="width:100%" @change="handleChange">
                    </el-cascader>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="交易时间段">
                    <el-date-picker v-model="form.dealdate" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="6" :offset="2">
                  <el-form-item label="涉及主要账户个数">
                    <el-input v-model="form.cmainnumber" placeholder="请输入"></el-input>
                  </el-form-item>
                </el-col>
                <!-- </el-row>

              <el-row :gutter="20"> -->
                <el-col :span="8">
                  <el-form-item label="累计交易金额">
                    <el-input v-model="form.crmb" placeholder="人民币"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="累计交易金额">
                    <el-input v-model="form.cyb" placeholder="外币"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="20" :offset="2">
                  <el-form-item label="初步判断">
                    <el-input v-model="form.cjudge" type="textarea" placeholder="***********为可疑交易"></el-input>
                  </el-form-item>

                  <el-form-item label="交易主体身份及相关信息">
                    <el-input v-model="form.csubject" type="textarea" placeholder="姓名：***   年龄：******民族：汉：籍贯：**********"></el-input>
                  </el-form-item>

                  <el-form-item label="监测分析触发点">
                    <el-input v-model="form.cpoints" type="textarea" placeholder="请输入"></el-input>
                  </el-form-item>

                  <el-form-item label="建议">
                    <el-input v-model="form.csuggest" type="textarea" placeholder="请输入"></el-input>
                  </el-form-item>

                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="9" :offset="2">
                  <el-form-item label="分析概述">
                    <el-upload class="upload-demo" ref="upload" :action="actionUrlG" :on-preview="handlePreview" :on-remove="handleRemove" :auto-upload="false">
                      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    </el-upload>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="文件">
                    <el-upload class="upload-demo" ref="upload" :action="actionUrl" :on-preview="handlePreview" :on-remove="handleRemove">
                      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    </el-upload>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>

          </el-form>
        </el-tab-pane>

        <el-tab-pane label="相关附件" name="filesTabpane" class="classFiles">
          <!-- <Correlation></Correlation> -->
          <el-upload class="upload-demo" drag  :file-list="fileList" :on-success="onsuccessAboute" :action="actionUrlother" multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
          <el-table :data="tablefileData">
            <el-table-column label="序号" type="index"></el-table-column>
            <el-table-column label="附件名称" prop="attachName"></el-table-column>
            <el-table-column label="操作" width="140">
              <template slot-scope="scope">
                <el-button type="text" @click="downLoad(scope)">下载</el-button>
                <el-button type="text" @click="delRow(scope)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background :current-page="currentPage" :page-size="pagesize" :page-sizes="[10, 20, 30, 40,50]" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
          </el-pagination>
        </el-tab-pane>

        <el-tab-pane label="办理信息" name="handlTabpane">
          <div class="information" style="margin-top:20px">
            <div class="list-block">
              <el-row>
                <el-col :span="12" style="margin-bottom:10px">
                  <span>流程信息：</span>
                </el-col>
              </el-row>
              <el-table :data="tableData">
                <el-table-column label="序号" type="index"></el-table-column>
                <el-table-column label="节点名称" prop="name"></el-table-column>
                <el-table-column label="执行用户" prop="user"></el-table-column>
                <el-table-column label="办理时间" prop="handleTime"></el-table-column>
                <el-table-column label="办理意见" prop="idea"></el-table-column>
                <el-table-column label="备注" prop="remark"></el-table-column>
              </el-table>
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background :current-page="currentPage" :page-size="pagesize" :page-sizes="[10, 20, 30, 40,50]" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
              </el-pagination>

            </div>
            <div class="map-block">
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

            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import Correlation from '@/views/sys-monitoringAnalysis/cueManage/investigation/correlation'
import {
  getHanldemss,
  delFilesapi,
  getFilesapi,
  editeListflow,
  editeList,
  sendList,
  sendFlow
} from '@/api/sys-monitoringAnalysis/cueManage/interFileTransfer.js'
import { getArea } from '@/api/common/citys.js'
import { getToken } from '@/utils/auth'
import { getUUIDTo } from '@/utils/index.js'
export default {
  components: {
    Correlation
  },
  data() {
    return {
      backImg: {
        backgroundImage: 'url(' + require('@/assets/back/back.png') + ')',
        backgroundRepeat: 'no-repeat'
      },
      activeName: 'formTabpane',
      fileList: [], // 附件
      UUID: '',
      form: {
        cdispose: '',
        ctriggermessage: '',
        bodymessage: [],
        dealdate: [],
        cnumber: '',
        cmainnumber: '',
        crmb: '',
        cyb: '',
        cjudge: '',
        csubject: '',
        cpoints: '',
        csummary: '',
        csuggest: ''
      },
      tablefileData: [
        {
          attachName: 'way晕晕晕'
        }
      ],
      // options
      optionsAddr: [],

      currentPage: 1,
      pagesize: 10,
      value1: '',
      value:
        '反馈信息XXXXXXXXXXXXX描述，反馈信息XXXXXXXXXXXXX描述，反馈信息XXXXXXXXXXXXX描述，反馈信息XXXXXXXXXXXXX描述，反馈信息XXXXXXXXXXXXX描述，反馈信息XXXXXXXXXXXXX描述，反馈信息XXXXXXXXXXXXX描述，反馈信息XXXXXXXXXXXXX描述，反馈信息XXXXXXXXXXXXX描述，反馈信息XXXXXXXXXXXXX描述，反馈信息XXXXXXXXXXXXX描述，反馈信息XXXXXXXXXXXXX描述，反馈信息XXXXXXXXXXXXX描述，反馈信息XXXXXXXXXXXXX描述，反馈信息XXXXXXXXXXXXX描述，反馈信息XXXXXXXXXXXXX描述，反馈信息XXXXXXXXXXXXX描述，反馈信息XXXXXXXXXXXXX描述，反馈信息XXXXXXXXXXXXX描述，反馈信息XXXXXXXXXXXXX描述，反馈信息XXXXXXXXXXXXX描述，反馈信息XXXXXXXXXXXXX描述。',
      tableData: [
        {
          name: '申请行政调查',
          user: '姓名',
          handleTime: '2017-11-10 10：04',
          idea: '请领导审核',
          remark: '***'
        },
        {
          name: '反洗钱局审批调查申请',
          user: '反洗钱局领导姓名',
          handleTime: '2017-11-11 16：20',
          idea: '请领导审批',
          remark: '***'
        },
        {
          name: '中心领导审核反馈结果',
          user: '中心领导姓名',
          handleTime: '2017-11-11 16：20',
          idea: '同意',
          remark: '***'
        }
      ]
    }
  },
  computed: {
    actionUrl() {
      return `/international/upload-allAttachGjFk?cid=${this.UUID}&token=${getToken()}`
    },
    actionUrlother() {
      return `/international/upload-allAttachGjFk?cid=${this.UUID}&token=${getToken()}`
    },
    actionUrlG() {
      return `/international/upload-allAttachGjFk?cid=${this.UUID}&token=${getToken()}`
    }
  },
  mounted() {
    getArea().then(res => {
      if (res.code === 200) {
        this.optionsAddr = res.data
      }
    })
    this.UUID = getUUIDTo()
  },
  methods: {
    handleTabClick(tab, event) {
      this.activeName = tab.name
      switch (this.activeName) {
        case 'handlTabpane':
          getHanldemss().then()
          break

        default:
          break
      }
    },

    // 相关附件 - 获取附件列表
    getFileList() {
      getFilesapi(this.UUID).then(res => {
        this.tablefileData = res.data
      })
    },

    // 相关附件 - 上传成功的回调
    onsuccessAboute(res, file, fileList) {
      if (res.code === 200) {
        this.getFileList()
        this.fileList = []
      }
    },

    // 相关附件 - 下载
    downLoad(scope) {
      location.href = `/upload/download/${scope.row.attachId}`
    },
    // 相关附件 - 删除
    delRow(scope) {
      delFilesapi(scope.row.attachId).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getFileList()
        }
      })
    },
    //  新增 - 参数
    newParams() {
      const obj = this.form
      obj.cbodymessage = this.form.bodymessage.join(',')
      obj.cdealdate = this.form.dealdate.join(',')
      obj.cid = this.$route.query.cid
      delete obj.bodymessage
      delete obj.dealdate
      obj.cid = this.UUID
      return obj
    },

    // 提交
    handlSaveflow() {
      switch (this.$route.query.pageFlag) {
        // 查看流程
        case 'lookFlow':
          editeListflow().then()
          break
        // 默认 新增
        default:
          sendFlow().then()
          break
      }
    },

    // 保存
    handlSave() {
      switch (this.$route.query.pageFlag) {
        // 查看流程
        case 'lookFlow':
          editeList().then()
          break
        // 默认 新增
        default:
          sendList(this.newParams()).then(res => {})
          break
      }
    },

    // 文件
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },

    //  发生地
    handleChange() {},

    // 返回
    goBack() {
      this.$router.go(-1)
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style lang="scss">
.cueManage_interFileTransfer {
  position: relative;
  .back {
    position: absolute;
    top: 0px;
    right: 0px;
  }
  .classFiles {
    .upload-demo {
      .el-upload {
        width: 100%;
        .el-upload-dragger {
          width: 100%;
        }
      }
    }
  }

  .list-block {
    margin-bottom: 30px;
  }
  .block {
    .el-date-editor {
      width: 100%;
    }
    .el-select {
      width: 100%;
    }
    .title {
      margin-bottom: 20px;
    }
    .el-form-item__label {
      padding: 0 4px 0 0;
    }
  }
}
</style>
