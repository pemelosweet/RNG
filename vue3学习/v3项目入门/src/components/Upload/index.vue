<template>
<el-upload
    ref='upload'
    class="upload-demo"
    :drag='drag'
    :limit='limit'
    :multiple='multiple'
    :action="url"
    list-type='text/picture/picture-card'
    accept=".doc,.txt,.pdf,.xls,.docx,.xlsx,.avi,.mov,.wav,.mp3"
    :before-upload='beforeUpload'
    :on-change='handleChange'
    :on-exceed='handleExceed'
    :on-success='uploadSucess'
    :on-error='uploadError'
    >
    <i v-if='drag==true' class="el-icon-upload"></i>
    <el-button v-else size="small" type="primary">点击上传</el-button>
    <div class="el-upload__text" v-if='drag==true'>将文件拖到此处，或<em>点击上传</em></div>
</el-upload>
</template>
<script lang="ts">
import {uploadType} from '../../views/BI/pie.vue'
import { defineComponent,PropType, ref,toRefs } from 'vue'
import {
    ElUpload,ElMessage
} from 'element-plus';
export default defineComponent({
    name:'upload',
    components:{
        ElUpload
    },
    props:{
        uploadOption:Object as PropType<uploadType>
    },
    setup(props,context){
        let upload = ref(null)
        let uploadOptions = props.uploadOption
        const beforeUpload = (file) =>{
            const isMatch = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/pdf'
            if(!isMatch){
               ElMessage.error('图片格式不匹配!') 
            }
        }
        const handleChange = (file, fileList) => {
            const isLt5M = file.size / 1024 / 1024 < 50
            if (!isLt5M) {
                ElMessage.error('上传文件大小不能超过 50MB')
                file = null
                fileList = []
                upload.clearFiles() // 清除前端显示的文件列表
            }
        }
        const handleExceed = (files,fileList) => {
            if(fileList.length == 2){
                ElMessage('您已超出上传个数!')
            }
        }
        const uploadSucess = (response, file, fileList) => {
            context.emit('handleUpload','触发上传事件')
            ElMessage.success('上传成功!')
        }
        const uploadError = (err, file, fileList) => {
            ElMessage('上传失败!')
        }
        return{
            ...toRefs(uploadOptions),
            handleChange,
            handleExceed,
            uploadSucess,
            uploadError,
            upload
        }
    }
})
</script>
<style lang="scss" scoped>

</style>