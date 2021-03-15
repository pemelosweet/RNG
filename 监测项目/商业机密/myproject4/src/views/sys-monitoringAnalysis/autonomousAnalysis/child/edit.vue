<template>
  <div class="cueManage_investigation_edit">
      <div>
        <header class="header">
          <el-row>
            <el-col :span="24">
              <div style="text-align:center;width:80%;height: 50px;line-height: 50px;margin: 0 auto;border-bottom: 1px solid #000;font-size:20px;">办理信息</div>
            </el-col>
          </el-row>
          
        </header>
      </div>
      <div>
        <el-form :model="form" >
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="移送处经办人：">
                <el-input v-model="form.inp1" placeholder=""></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="预分配处室：">
                <el-input v-model="form.inp2" placeholder=""></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="预分配分析员：">
                <el-input v-model="form.inp3" placeholder=""></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="8">
              <el-form-item label="紧急程度：">
                <el-select v-model="form.select" placeholder="请选择">
                  <el-option label="特别紧急" value="1"></el-option>
                  <el-option label="紧急" value="2"></el-option>
                  <el-option label="一般" value="3"></el-option>
                </el-select>
              </el-form-item>
            </el-col> -->
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="分析处室：">
                <el-input v-model="form.inp5" placeholder=""></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="分析员：">
                <el-input v-model="form.inp6" placeholder=""></el-input>
              </el-form-item>
            </el-col>
            
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="来件个人主体数：">
                <el-input v-model="form.inp7" placeholder=""></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="来件机构主体数：">
                <el-input v-model="form.inp8" placeholder=""></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="来件账户数：">
                <el-input v-model="form.inp9" placeholder=""></el-input>
              </el-form-item>
            </el-col>
            </el-row>
            <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="协查结果个人数：">
                <el-input v-model="form.inp11" placeholder=""></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="协查结果机构数：">
                <el-input v-model="form.inp12" placeholder=""></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="协查结果主体数：">
                <el-input v-model="form.inp13" placeholder=""></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="交易笔数：">
                <el-input v-model="form.inp14" placeholder=""></el-input>
              </el-form-item>
            </el-col>            
            <el-col :span="8">
              <el-form-item label="交易账户数：" >
                <el-input v-model="form.inp16" placeholder="" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="本币交易金额（万元RMB）：" >
                <el-input v-model="form.inp17" placeholder="" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="外币交易金额（折约万美元）：">
                <el-input v-model="form.inp18" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注项：">
                <el-input v-model="form.inp19" placeholder="请输入" type="textarea"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>

      </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          inp1: '关于*****标题',
          inp2: '',
          inp3: '',
          inp4: '',
          inp5: '',
          inp6: '',
          inp7: '',
          inp8: '',
          inp9: '',
          inp10: '',
          inp11: '',
          inp12: '',
          inp13: '',
          inp14: '',
          inp15: '',
          inp16: '',
          inp17: '',
          inp18: '',
          inp19: '',
          select: '',
          select2: ''
        }
      }
    }
  }
</script>

<style scoped lang="scss">
.cueManage_investigation_edit{
  // .header{
  //   text-align: center;
  //   font-size: 18px;
  //   color: #333;
  //   margin-bottom: 30px;
  // }
  .el-select{
    width: 100%
  }

}


</style>
