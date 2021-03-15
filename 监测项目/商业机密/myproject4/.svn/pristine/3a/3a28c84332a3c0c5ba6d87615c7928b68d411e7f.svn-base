<template>
  <div class="reportManage_createReport">
    <el-card>
      <span slot="header">创建报告</span>
      <el-form label-width="120px">
        <el-form-item label="关联报表：">
          <el-checkbox-group v-model="linkReport">
            <el-checkbox label="1"> xxx报表1</el-checkbox>
            <el-checkbox label="2"> xxx报表2</el-checkbox>
            <el-checkbox label="3"> xxx报表3</el-checkbox>
            <el-checkbox label="4"> xxx报表4</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-row>
          <el-col :span="20">
            <el-form-item label="分析报告类型：">
              <el-select v-model="dialogForm.type" placeholder="请选择">
                <el-option label="灰皮书" value="1"></el-option>
                <el-option label="红皮书" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="20">
            <el-form-item label="标题：">
              <el-input v-model="dialogForm.title" placeholder="请输入标题"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="20">
            <el-form-item label="内容：">
              <el-input v-model="dialogForm.content" type="textarea" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="20">
            <el-form-item label="附件：">
              <el-upload class="upload-demo" drag  multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或
                  <em>点击上传</em>
                </div>
              </el-upload>

            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="发布对象：">
          <el-checkbox-group v-model="publishObj">
            <el-checkbox label="中心用户">中心用户</el-checkbox>
            <el-checkbox label="分支机构用户">分支机构用户</el-checkbox>
            <el-checkbox label="反洗钱局">反洗钱局</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

      </el-form>
      <div style="text-align:center">
        <router-link :to="{name:'macroAnalysis_reportManage'}">
          <el-button type="primary">提交审核</el-button>
        </router-link>
      </div>
    </el-card>

  </div>
</template>

<script>
export default {
  data() {
    return {
      linkReport: ['1', '2'],
      dialogForm: {
        type: '',
        content: '',
        title: ''
      },
      publishObj: ['中心用户', '反洗钱局']
    }
  }
}
</script>

<style lang="scss">
.reportManage_createReport {
  .el-upload {
    width: 100%;
    .el-upload-dragger {
      width: 100%;
    }
  }
}
</style>