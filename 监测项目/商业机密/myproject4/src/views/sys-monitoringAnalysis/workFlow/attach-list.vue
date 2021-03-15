<template>
    <div class="wf-attach-list">
        <strong class="title">相关附件</strong>
        <el-row :gutter="20">
            <el-col :span="8" v-for="(item,index) in attachList" :key="index">
                <span style="font-size:14px">附件{{index+1}}：</span><el-button type="text" @click="getAttach(item.attachId)">{{item.attachName}}</el-button>
            </el-col>
        </el-row>
    </div>

</template>
<script>
import { getToken } from '@/utils/auth'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      token: getToken()
    }
  },
  computed: {
    ...mapGetters(['attachList'])
  },
  methods: {
    // 获取下载文件
    getAttach(id) {
      location.href = `/file-service/fileupload/download?fileId=${id}` + '&token=' + this.token
    }
  }
}
</script>

<style lang="scss" scoped>
.wf-attach-list {
  border: 1px solid #7182a3;
  margin-top: 30px;
  padding: 28px;
  border-radius: 6px;
  position: relative;
    .title {
    display: inline-block;
    font-size: 16px;
    position: absolute;
    top: 0;
    margin-left: -12px;
    margin-top: -8px;
    padding: 0 10px;
    background: #fff;
  }
}
</style>
