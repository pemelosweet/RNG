<template>
  <div class="interAddForm">
    <el-form :model="petitionForm" label-width="100px" label="签呈批单表单">
        <el-row>
          <!-- 第一行 -->
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item label="单号：">
                <el-input v-model="petitionForm.odd"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="保存时间：" class="oddinput">
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
            <!-- <el-col :span="12">
              <el-form-item label="单内流水号：">
                <router-link :to="{name:'cueManage_analysis_fileList',params:{name:'second'}}">
                  <el-button type="text">{{this.waterNum}}</el-button>
                </router-link>
              </el-form-item>
            </el-col> -->
            <el-col :span="12">
              <el-form-item label="编号情况：">
                <el-input v-model="petitionForm.odd"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
        </el-row>
        <!-- <div class="ptitle">附件情况：</div>
        <el-row>
          <el-col :span="22">
            <el-form-item label="文件2：">
              <el-input v-model="petitionForm.odd"></el-input>
            </el-form-item>
          </el-col>
         <el-col :span="2">
           <i class="el-icon-circle-plus-outline icon-add"></i>
         </el-col>
        </el-row> -->
      </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // 保存时间
        petitionValue: '',
        petitionForm: {
          odd: '',
          petition: '',
          type: '',
          ptitle: '',
          unilt: ''
        }
      }
    }
  }
</script>

<style scoped lang="scss">
.interAddForm{
}


</style>
