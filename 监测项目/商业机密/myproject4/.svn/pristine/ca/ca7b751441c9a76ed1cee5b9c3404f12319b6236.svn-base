<template>
  <div class="dashboard-system">
    <el-row :gutter="16" style="margin-bottom: 20px;">
      <el-col :span="16">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <!-- <span>数据库连接情况</span> -->
            <el-radio v-model="radio" label="1">NAS服务器</el-radio>
            <el-radio v-model="radio" label="2">青云服务器</el-radio>
          </div>
          <div class="content-server">
            <img width="100%" height="" :src="img_01" alt="">
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>数据库连接情况</span>
          </div>
          <div class="card-content" style="height: 238px;">
            <img width="100%" height="" :src="img_02" alt="">
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="16" style="margin-bottom: 20px;">
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>主题访问分析</span>
          </div>
          <div class="card-content">
            <img width="100%" height="" :src="img_03" alt="">
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <div class="content">
            <img width="100%" height="" :src="img_04" alt="">
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import img_01 from '@/assets/statisticAnalysis/dashboard/system/01.jpg'
import img_02 from '@/assets/statisticAnalysis/dashboard/system/02.jpg'
import img_03 from '@/assets/statisticAnalysis/dashboard/system/03.jpg'
import img_04 from '@/assets/statisticAnalysis/dashboard/system/04.jpg'
export default {
  data() {
    return {
      radio: '1',
      img_01,
      img_02,
      img_03,
      img_04

    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.dashboard-system {

}

</style>
