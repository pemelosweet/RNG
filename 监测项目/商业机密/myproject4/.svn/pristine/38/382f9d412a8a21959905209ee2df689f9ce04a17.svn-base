<template>
  <div class="home-quick-entry">
    <el-card class="fillcard secinline-box" :body-style="{'padding-top':'10px'}">
      <div slot="header" class="header">
        <i class="title-mark" style="background:#e78ede"></i>
        <span style="vertical-align:middle">快速填报入口</span>
      </div>
      <!-- <router-link to="dataSubmit/onlineFill">
        <div class="fillwrap">
          <el-button type="fill" size="medium">
            <svg-icon icon-class="fill" /> 在线填报</el-button>
        </div>
      </router-link> -->
      <router-link to="dataSubmit/pageLoading">
        <div class="fillwrap">
          <el-button type="loading" size="medium">
            <svg-icon icon-class="loading" /> 页面加载</el-button>
        </div>
      </router-link>
    </el-card>
  </div>

</template>
<script>
export default {
  data() {
    return {}
  },
  computed: {},
  methods: {},
  mounted() {}
}
</script>
<style lang="scss">
.home-quick-entry {
  .el-card {
    .el-card__header {
      font-weight: bold;
    }
    .el-card__body {
      height: 220px;

      .fillwrap {
        text-align: center;
        padding: 10px 0;
        .el-button--fill {
          color: #fff;
          background-color: #d79d01;
          border-color: #d79d01;
          padding: 20px 30px;
        }
        .el-button--loading {
          color: #fff;
          background-color: #82a623;
          border-color: #82a623;
          padding: 20px 30px;
        }
      }
    }
  }
}
</style>