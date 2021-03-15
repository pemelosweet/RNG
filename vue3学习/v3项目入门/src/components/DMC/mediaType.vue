<!-- mediaType -->
<template>
    <div class="media-type">
        <div class="image"><el-image :src="url" fit="cover" /></div>
        <div class="title">OTC线下门店</div>
        <div class="button">
            <customButton type="mini" add-text="新建" show-text="查看列表" />
        </div>
    </div>
</template>

<script lang="ts">
// vue功能组件
import {
    defineComponent,
    reactive,
    toRefs,
    computed,
    watch,
    onMounted,
    getCurrentInstance
} from 'vue';
// import other
import { ElImage } from 'element-plus';
import customButton from './customButton.vue';
import OTC from '@/assets/images/DMC/OTC.png';

export default defineComponent({
    name: 'mediaType',
    props: {
        data: {
            type: Object,
            default: () => {}
        }
    },
    components: {
        ElImage,
        customButton
    },
    setup() {
        // 定义数据和方法
        const data = reactive({
            url: OTC,
            selectArr: {
                options: [
                    {
                        value: '选项1',
                        label: '黄金糕'
                    },
                    {
                        value: '选项2',
                        label: '双皮奶'
                    },
                    {
                        value: '选项3',
                        label: '蚵仔煎'
                    },
                    {
                        value: '选项4',
                        label: '龙须面'
                    },
                    {
                        value: '选项5',
                        label: '北京烤鸭'
                    }
                ]
            },
            value: ''
        });

        // 计算属性
        // computed(() => {})

        // 监听数据
        // watch(([])=>{})

        // 生命周期
        // onMounted(()=>{})

        return {
            ...toRefs(data)
        };
    }
});
</script>
<style lang="scss" scoped>
.media-type {
    display: inline-block;
    width: 290px;
    height: 260px;
    .image {
        display: flex;
        justify-content: center;
    }
    .title {
        display: flex;
        justify-content: center;
        font-weight: bold;
        padding: 20px 0 10px;
        font-size: 18px;
    }
    .button {
        display: flex;
        justify-content: center;
    }
}
</style>
