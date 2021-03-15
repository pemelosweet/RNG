<template>
  <div>
    <el-card>
      <div slot="header">文件发送</div>

      <div class="uploadBlock" >
        <div class="upload-border">
          <fileUpload ref="file"
          :onUploaded="onUploaded"
          :autoUpload=false
          :fileNum=10
          :multiple=false
          :accepts="['rar', 'zip', 'doc','docx','xls','ppt']"
          :onUploadError="onUploadError"
          ></fileUpload>
        </div>
      </div>

      <div style="margin-top:40px">
        <el-form ref="form" :model="form" :label-position="labelPosition" label-width="65px">
          <!--
          <el-row :gutter="20">
            <el-col :span="8">
                <el-form-item label="文件1:">
                    <el-input v-model="form.filename1" placeholder="" width="100%"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="8">
                <el-form-item label="文件2：">
                  <el-input v-model="form.filename2" placeholder=""></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="文件3：">
                  <el-input v-model="form.filename3" placeholder=""></el-input>
                </el-form-item>
            </el-col>
          </el-row>
          -->
          <el-row :gutter="20">
            <el-col :span="8">
                <el-form-item label="接收人:">
                    <el-input v-model="form.person" placeholder=""></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="3">
                 <el-button type="primary" @click="dialogVisible=true">选择</el-button>
            </el-col>
            <el-col :span="13" style="textAlign:right">
                <el-button type="primary">发送</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <el-dialog title="接收人列表" :visible.sync="dialogVisible">
        <el-form :model="form">
          <el-form-item label="部门名称：" :label-width="formLabelWidth">
            <el-select v-model="form.name" placeholder="请选择">
              <el-option label="全部" value="all"></el-option>
              <el-option label="国际处" value="internation"></el-option>
              <el-option label="移送处" value="send"></el-option>
              <el-option label="分析一处" value="analysis"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="接收人：" :label-width="formLabelWidth">
             <el-input v-model="form.filename" placeholder="" style="width:400px"></el-input>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" style="textAlign:right">
             <el-button type="primary">查询</el-button>
             <el-button type="primary">提交</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="receiveData"
          style="width: 100%" header-cell-class-name="el-table-hearder" >
          <el-table-column  type="selection" min-width="100">
            <template >
              <span>全选</span>/<span>反选</span>
            </template>
          </el-table-column>
          <el-table-column label="序号" type="index" min-width="100"></el-table-column>
          <el-table-column label="部门名称" prop="name" min-width="180"></el-table-column>
          <el-table-column label="接收人" prop="recName"></el-table-column>
        </el-table>
      </el-dialog>

    </el-card>
  </div>
</template>

<script>
  import fileUpload from '@/components/FileUpload'
  export default {
    components: { fileUpload },
    data() {
      return {
        form: {
          filename1: '',
          filename2: '',
          filename3: '',
          person: '',
          name: ''
        },
        tableData: [],
        labelPosition: 'right',
        dialogVisible: false,
        formLabelWidth: '120px',
        receiveData: [
          {
            name: '国际处',
            recName: 'User01'
          },
          {
            name: '移送处',
            recName: 'User02'
          },
          {
            name: '分析一处',
            recName: 'User03'
          }
        ]
      }
    },
    methods: {
      onUploaded(fileName, data) {
      // console.log(data)
        this.tableData = data.filesUploaded
      },
      onUploadError() {
      }
    }
  }
</script>

<style scoped>

</style>
