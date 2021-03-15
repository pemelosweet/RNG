<template>
    <div class="dataEntry_intermedium">
        <el-card>
            <div slot="header">
                <span>后端数据录入</span>
            </div>
            <div>
                <el-row >
                    <el-col :span="1.5" style="padding-top:7px">流程操作：</el-col>
                    <el-col :span="15">
                        <el-button type="primary">保存</el-button>
                        <el-button type="primary">提交</el-button>
                        <el-button type="primary">意见</el-button>
                        <router-link :to="{name: 'cueManage_dataEntry'}">
                            <el-button type="primary" style="margin-left:11px">关闭</el-button>
                        </router-link>
                         <el-button type="primary">打印</el-button>
                    </el-col>
                </el-row>
                <el-tabs type="border-card" style="margin-top:20px">
                    <el-tab-pane label="录入信息">
                    <div class="apporderwrap">
                      <div class="modeltitle">国际协查请求信息</div>
                      <div class="flex-modelmain"> 
                        <div class="flex-col-1 table-title">录入申请信息</div>   
                        <div class="flex-row txt-row">
                            <div class="flex-col-1">
                                <div class="flex-label">申请录入人：</div><div class="flex-input" style=""><span>张三</span></div>
                            </div>
                            <div class="flex-col-1">
                                <div class="flex-label">所在部门：</div><div class="flex-input"><span>XXXXX处</span></div>
                            </div>
                            <div class="flex-col-1">
                                <div class="flex-label">申请时间：</div><div class="flex-input"><span>2017-11-10 10:04:23</span></div>
                            </div>
                        </div>

                        <div class="flex-col-1 table-title">录入信息</div>   
                        <div class="flex-row">
                            <div class="flex-col-1">
                                <div class="flex-label">录入文件（可上传多个文件）：</div>
                                <div class="flex-input">
  
                                  <el-upload
                                    class="upload-demo"
                                    
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :before-remove="beforeRemove"
                            
                                    :on-exceed="handleExceed"
                                    :file-list="fileList">
                                    <span>XXXXXXX国际协查和通报信息.xls</span>
                                    <el-button type="primary">删除</el-button>
                                    <el-button size="small" type="primary">点击上传</el-button>
                                    <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                                    </el-upload>
                                </div>
                            </div>
                        </div>
                        <div class="flex-row">
                            <div class="flex-col-1">
                                <div class="flex-label">录入文件模板：</div><div class="flex-input"><span>XXXXXXX国际协查和通报信息.xls</span></div>
                            </div>
                        </div>
                      </div> 
                    </div>
                    </el-tab-pane>
                    <el-tab-pane label="相关附件"><Enclosure></Enclosure></el-tab-pane>
                    <el-tab-pane label="办理信息"><HandleInfo></HandleInfo></el-tab-pane>
                </el-tabs>
            </div>
           
        </el-card>
    </div>
</template>

<script>
import Enclosure from '@/views/sys-monitoringAnalysis/cueManage/dataEntry/enclosure'
import HandleInfo from '@/views/sys-monitoringAnalysis/cueManage/dataEntry/handleInfo'
export default {
  components: {
    Enclosure,
    HandleInfo
  },
  data() {
    return {
      fileList: []
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
    //   this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  }
}
</script>

<style lang="scss">
.dataEntry_intermedium {
  .apporderwrap {
    .flex-modelmain {
        border-left: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
    }
    .flex-row { 
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }
    .row-header-column {
        display: flex;
        flex: 0 0 30%;
        margin-bottom: 10px;
        
        span {
            flex: 0 0 120px;
            text-align: right;
            align-self:center;
        }
        .el-input {
            flex: 1;
        }
    }
      .flex-col-1 {
        flex: 1;
        display:flex;
        border-top: 1px solid #ccc;
        border-right: 1px solid #ccc;
      }
       .flex-label {
        flex: 0 0 150px;
        padding: 10px 20px;   
        text-align: right;
        border-right: 1px solid #ccc;
        // flex垂直居中的方法
        display:flex;
        align-items:center;
      }
      .flex-input {
        flex: 1;
        padding: 10px 20px;
        font-size: 14px;
        align-self:center;
      }
      .txt-row .flex-input {
        align-self:center;
      }
   }
  .table-title {
    padding: 10px 20px;
    font-weight: bold;
  }
  .modeltitle {
    text-align: center;
    font-weight: bold;
    margin-bottom: 10px;
  }
}
</style>
