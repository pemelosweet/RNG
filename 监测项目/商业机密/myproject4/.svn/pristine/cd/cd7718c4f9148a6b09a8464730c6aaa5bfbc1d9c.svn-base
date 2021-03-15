<template>
<div style='width:100%;height:100%;background-color:#fff;position: relative'>
  <div
    v-if='dataPermission && initPermission'
    class="statisticsuspicious"
    v-loading="loading2"
    element-loading-text="首次加载较慢，请稍侯……"
    element-loading-background="rgba(0, 0, 0, 0.1)"
  >
   <p style="text-align:center">调用mstr地址</p>
  </div>
  <div v-if='!dataPermission||!initPermission' style="height:656px;position: relative;">
    <div style="position: absolute;left: 50%; top: 50%; transform: translateX(-50%) translateY(-50%);text-align: center">
      <i v-if='!dataPermission' class="el-icon-warning" style="font-size:65px;color: #E6A23C;"></i>
      <p v-if='!dataPermission' style="height:40px;font-size:18px;letter-spacing: 2px" >您还未申请数据权限，请到"数据权限管理模块"申请!</p>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getPermission } from '@/api/sys-monitoringAnalysis/statisticForm/large'
export default {

  data() {
    return {
      loading2: false,
      dataPermission: true,
      initPermission: false
    }
  },
  created() {
    this.getPermission()
  },
  mounted() {
    this.getData()
  },
  computed: {
    ...mapGetters(['roles'])
  },
  methods: {
    getPermission() {
      getPermission().then(res => {
        if (this.roles === 'branch' && !res.data.includes('ZFJGDETJFX')) {
          this.dataPermission = false
        }
        this.initPermission = true
      })
    }
  }
}
</script>

<style src="@riophae/vue-treeselect/dist/vue-treeselect.min.css"></style>
<style lang="scss">

.tableCell{
    text-align: left; 
    overflow:hidden; 
    white-space: nowrap; 
    text-overflow:ellipsis;
}

.el-cascader-menu{
min-width: 270px !important;
}

.vue-treeselect__menu {
  z-index: 2999 !important;
}
.statisticsuspicious {
  .el-cascader__tags .el-tag > span{
    -webkit-box-flex:1;
    -ms-flex:none;
    flex:none;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .multiple_select {
    .el-select {
      width: 100%;
    }
  }
  .title {
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: bold;
  }
  .addtype {
    .el-form-item__label {
      padding-right: 0;
    }
  }
  .btnalign {
    text-align: right;
    margin-bottom: 15px;
  }
  .custOptions > div{
    word-break:normal;
    display:block;
    white-space:pre-wrap;
    overflow:hidden;
  }
  .el-select__input.is-small{
    width: 100% !important;
  }
  .el-table thead tr th>.cell{
    white-space:normal !important;
  } 
}
</style>
