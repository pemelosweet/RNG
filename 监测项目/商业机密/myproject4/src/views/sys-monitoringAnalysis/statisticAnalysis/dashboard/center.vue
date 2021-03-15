<template>
  <div class="dashboard-center">
    <el-row :gutter="16" style="margin-bottom: 20px;">
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>国家反洗钱数据库  （1）</span>
          </div>
          <div class="content">
            <!-- <ul>
              <li>入库交易数： 100</li>
              <li>入库报告库：90</li>
              <li>总体数： 7</li>
              <li>账户数： 7</li>
            </ul> -->
            <img width="100%" height="200px" :src="img_01" alt="">
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>规则模型使用情况</span>
            <ul class="cord-title-dropdown">
              <li>
                <el-dropdown>
                  <span class="el-dropdown-link">
                    下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>选项1</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </li>
              <li>
                <el-dropdown>
                  <span class="el-dropdown-link">
                    下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>选项1</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </li>
            </ul>
          </div>
          <div class="content">
            <!-- <ul>
              <li>自主分析移送总数： 100</li>
              <li>上报研判移送总数：90</li>
              <li>协查总数： 7</li>
            </ul> -->
            <img width="100%" height="200px" :src="img_02" alt="">
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="16" style="margin-bottom: 20px;">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>触发类别</span>
          </div>
          <div class="content">
            <img width="100%" height="220px" :src="img_03" alt="">
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>检测分析成果</span>
          </div>
          <div class="content">
            <img width="100%" height="220px" :src="img_04" alt="">
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-card class="box-card">
          <div class="text item">
            <img width="100%" height="" :src="img_05" alt="">
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import img_01 from '@/assets/statisticAnalysis/dashboard/center/01.jpg'
import img_02 from '@/assets/statisticAnalysis/dashboard/center/02.jpg'
import img_03 from '@/assets/statisticAnalysis/dashboard/center/03.jpg'
import img_04 from '@/assets/statisticAnalysis/dashboard/center/04.jpg'
import img_05 from '@/assets/statisticAnalysis/dashboard/center/05.jpg'
export default {
  name: 'dashboard',
  data() {
    return {
      img_01,
      img_02,
      img_03,
      img_04,
      img_05
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.cord-title-dropdown {
  float: right;
  // display: inline-block;
  margin-left: auto;
  font-size: 0px;
  color: #409EFF;
  li:first-child {
      padding-left: 0px;
    }
  li{
    display: inline-block;
    padding:0 16px;
    position: relative;
    // font-size: 14px;
    // line-height: 22px;
    text-align: center;
  }
}

</style>
