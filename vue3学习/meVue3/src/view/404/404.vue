<template>
    <div class="page-404">
        <h1>404</h1>
        <el-button size="large" type="primary" @click="goBack">返回</el-button>
    </div>
</template>

<script lang="ts">
import { useRouter} from 'vue-router'
export default {
    name: '4014',
    setup(){
        const router = useRouter();
        const goBack = () => {
            router.go(-1)
        }

        return {
            goBack
        }
    }
}
</script>
<style lang="scss">
    .page-404 {
        padding:20px;
        text-align: center;
        font-size:48px;
        h1{
            text-align: center;
        }
    }
</style>