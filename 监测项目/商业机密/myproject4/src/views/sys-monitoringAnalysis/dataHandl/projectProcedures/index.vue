<template>
<div id="vue-frame">
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>项目处理流程</span>
    </div>
    <div class="text item">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="流程模版设计器" name="first">
          <iframe id="myframe_first" src="http://192.168.1.222:9090/uflo/designer" frameborder="0" width="100%" height="704px"></iframe>
        </el-tab-pane>
        <el-tab-pane label="待办页面" name="second">
          <iframe id="myframe_second" src="http://192.168.1.222:9090/uflo/todo" frameborder="0" width="100%" height="704px"></iframe>
        </el-tab-pane>
        <el-tab-pane label="监控页面" name="third">
          <iframe id="myframe_third" src="http://192.168.1.222:9090/uflo/central" frameborder="0" width="100%" height="704px"></iframe>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-card>
</div>

</template>
<script>
export default {
  data() {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang="scss">
  #vue-frame{
    .myframe{
      border-width: 0;
      border-style: inset;
      border-color: none;
      border-image: initial;
    }
    .el-card__body {
        padding: 0px;
    }
    .el-tabs__nav{
      left: 20px;
    }
    .el-tabs__header{
      margin: 0px;
    }
  }
</style>

