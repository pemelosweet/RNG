<template>
  <div>
    <el-card>
      <el-form :model="form" class="table processTable" id="processTable">
        <el-row :gutter="20">
          <el-col :span="8" :offset="2">
            <el-form-item label="密级：" label-width="130px">
              <el-select clearable v-model="form.secret">
                <el-option value="0" label="机密"></el-option>
                <el-option value="1" label="秘密"></el-option>
                <el-option value="2" label="内部"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="缓急：" label-width="130px">
              <el-select clearable v-model="form.degreeOfUrgency">
                <el-option value="0" label="紧急"></el-option>
                <el-option value="1" label="一般"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- startprint -->
        <el-row>
          <p>反洗钱中心文件处理单</p>
          <table border="1">
            <tr>
              <td width="200" height="70;" align="center">主办处室</td>
              <td width="200" colspan="2">
                <el-input  v-model="form.sponsor"></el-input>
              </td>
              <td width="200" colspan="2">经办人及电话</td>
              <td width="200" colspan="2">
                <el-input  v-model="form.responsiblePhone"></el-input>
              </td>
            </tr>
            <tr>
              <td height="200" colspan="6">
                <el-input  v-model="form.fileContent" type="textarea" placeholder="关于xx的请示"></el-input>
              </td>
            </tr>
            <tr>
              <td height="200">行领导批示</td>
              <td colspan="6">
                <el-input  v-model="form.examineOpin" type="textarea"></el-input>
              </td>
            </tr>
            <tr>
              <td height="200">中心领导意见</td>
              <td colspan="6">
                <el-input  v-model="form.centreLeadOpin" type="textarea"></el-input>
              </td>
            </tr>
            <tr>
              <td width="200" height="200;" align="center">内部意见</td>
              <td width="200" colspan="2">
                <el-input  v-model="form.interOpin" type="textarea"></el-input>
              </td>
              <td width="200" colspan="2">会签意见</td>
              <td width="200" colspan="2">
                <el-input  v-model="form.countOpin" type="textarea"></el-input>
              </td>
            </tr>
          </table>
        </el-row>
        <!-- endprint -->
      </el-form>
    </el-card>

  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        secret: '',
        degreeOfUrgency: '',
        sponsor: '',
        responsiblePhone: '',
        fileContent: '',
        examineOpin: '',
        centreLeadOpin: '',
        interOpin: '',
        countOpin: ''
      }
    }
  },
  mounted() {
    this.getData
  },
  methods: {
    getData() {
      this.form = this.$route.query.formData
      document.getElementsByClassName('processTable')[0].style.display = 'block'
      var newHtml = document.getElementsByClassName('processTable')[0].innerHTML
      document.body.innerHTML = newHtml

      window.print()
      window.location.reload()
    }
  }
}
</script>

