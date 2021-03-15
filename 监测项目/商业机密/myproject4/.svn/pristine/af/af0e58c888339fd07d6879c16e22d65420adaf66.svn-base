<template>
  <div class="system-manage-detail">

    <el-card>
      <router-link :to="{name: 'systemManage_updateLog'}">
          <a class="back" :style="backImg"></a>
      </router-link>
      <div slot="header" class="clearfix">
        <span>系统更新日志详情</span>
      </div>
      <el-form label-width="120px">
        <el-form-item label="版本号：">
          <span>{{formData.version}}</span>
        </el-form-item>
        <el-form-item label="更新日期：">
          <span>{{formData.onlineDate}}</span>
        </el-form-item>
        <el-form-item label="更新内容：">
          <span>{{formData.updateInfo}}</span>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// import { searchOne } from '@/api/sys-reportingAgency/systemManage/upDateLog'
export default {
  data: function() {
    return {
      backImg: {
        backgroundImage: 'url(' + require('@/assets/back/back.png') + ')',
        backgroundRepeat: 'no-repeat'
      },
      id: '',
      formData: {}
    }
  },
  computed: {},
  created() {
    this.getData()
  },
  methods: {
    getData() {
      // this.id = this.$route.query.id
      // searchOne(this.id).then(res => {
      //   this.formData = res.data[0]
      // })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.system-manage-detail {
  position: relative;

.card-wrap h3 {
  text-align: center;
}
.card-wrap p {
  text-indent: 2em;
  font-size: 0.9em;
  line-height: 1.3em;
  margin-bottom: 4em;
}
.btminfor {
  display: block;
  font-size: 0.9em;
}
.btminfor-two {
  margin-top: 4px;
}
.replywrap {
  margin-top: 15px;
  background: #eee;
  color: #666;
}
.el-form {
  width: 80%;
  margin: 0 auto;
}
.btn {
  text-align: right;
  margin-top: 10px;
}
}

</style>
