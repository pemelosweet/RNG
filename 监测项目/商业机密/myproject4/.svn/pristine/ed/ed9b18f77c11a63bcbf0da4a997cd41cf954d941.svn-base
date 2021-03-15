<template>
<div style="margin:60px 10%">

  <fileUpload ref="file" :tokenURL="tokenURL" :onProgress="onProgress" :uploadURL="uploadURL">
        </fileUpload>
</div>  
  
</template>
<script>
import FileUpload from '@/components/FileUpload/index.vue'
export default {
  components: {
    FileUpload
  },
  data() {
    return {}
  },
  computed: {
    tokenURL() {
      return '/file-service/fileupload/token?type=0'
    },
    uploadURL() {
      return '/file-service/fileupload/upload?type=0'
    }
  },
  methods: {
    onProgress() {

    }
  }

}

</script>
