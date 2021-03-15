<template>
  <div>
    <el-card>
      <div slot="header">文件发送</div>

      <fileUpload ref="file" :tokenURL="tokenURL" :uploadURL="uploadURL" :onProgress="onProgress" :fileId="getUUIDRandom">
      </fileUpload>
    </el-card>
  </div>
</template>

<script>
// import fileUpload from '@/components/FileUpload/index.vue'
import fileUpload from '@/views/sys-monitoringAnalysis/fileTransfer/fileUpload.vue'
import { getIdApi } from '@/api/sys-monitoringAnalysis/fileTransfer/fileSend'
// import { getToken } from '@/utils/auth'
export default {
  components: { fileUpload },
  data() {
    return {
      noteFileID: '',
      fileList: [],
      fileId: '',
      submitForm: true
    }
  },
  computed: {

    tokenURL() {
      // /file-service
      // return process.env.BASE_API + '/fileupload/token?type=1'
      return '/upload/token?type=1'
    },
    uploadURL() {
      // return `http://10.10.121.7:8087/upload/upload-allAttach?noteId=` + this.getUUID() + `&type=1&ownSys=transmit`
      return `/upload/upload?type=1&noteId=` + this.getUUID() + `&extend1=transmit`
      // return '/fileupload/upload?type=1'
    }
  },
  mounted() {
    // this.noteFileID = this.getUUID()
    // this.getID()
    // this.fileId = this.getUUIDRandom()
    // getTK().then(res => {
    //   console.log(res)
    // })
  },
  methods: {
    getUUID() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        return (c === 'x' ? (Math.random() * 16) | 0 : 'r&0x3' | '0x8').toString(16)
      })
    },
    getUUIDRandom() {
      return 'xxxxxxxxxxxx6xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, c => {
        return (c === 'x' ? (Math.random() * 16) | 0 : 'r&0x3' | '0x8').toString(16)
      })
    },
    onProgress() {
      this.fetchData()
      console.log(1111)
    },
    // 获取 ID
    getID() {
      getIdApi().then(res => {
        if (res.code === 200) {
          this.fileId = res.data
        }
      })
    },
    // 计算附件大小
    allfileSize() {
      let sum = 0
      this.$refs.file.fileData.forEach(item => {
        const a = item.size
        sum += a
      })
      return sum
    }
  }
}
</script>

<style scoped>
  /* .upload-demo{
    width: 362px;
    margin:10px auto;
  }
  .upload-border{
    width: 1025px;
    margin:0px auto;
    border:1px solid rgb(247, 247, 247);
    background:rgb(247, 247, 247)
  } */
</style>
