<template>
    <div class="example">
        <h2>mock文档说明</h2>

        <p>1、index.ts mock数据总入口文件，module中个功能模块在index.ts中引入。</p>

        <p>2、module中按开发应用结构划分，如商品接口goods，用户接口users...</p>

        <p>3、module模块结构与api目录结构保持一致。</p>

        <p>4、使用mock数据，请运行 npm run mock</p>

        <p>5、mock如何定义数据，请参照文档 <a href="http://mockjs.com/" target="_blank">Mock</a>文档</p>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs, getCurrentInstance } from 'vue';
import ExampleAPI from '@/api/Example';
export default defineComponent({
    name: 'example',
    setup() {

        const data = reactive({
                name: 'zs',
                age: 18,
                sex: 'woman',
                list: [
                    {
                        id: '10000001',
                        goodsName: '大菠萝'
                    },
                    {
                        id: '10000002',
                        goodsName: '98k'
                    },
                    {
                        id: '10000003',
                        goodsName: 'ak47'
                    }
                ]
            })
        const list = ref([
            {
                name: 'zl',
                age: 18,
                sex: 'woman'
            },
            {
                name: 'ls',
                age: 23,
                sex: 'man'
            },
            {
                name: 'w5',
                age: 19,
                sex: 'man'
            }
        ])
        onMounted(() => {
            setTimeout(()=>{
                data.list[0].goodsName = '大菠萝威猛'
            }, 3000)
            ExampleAPI.getUserInfo({
                name: 'zhangsan',
            }).then(resp => {
                console.log(resp);
            });
            ExampleAPI.addFn({
                name: '张三',
            }).then(resp => {
                console.log(resp);
            });
        });
        return {
            data,
            list
        }
    },
})
</script>

<style lang="scss">
.example {
    padding: 20px;
    p {
        padding: 10px 0;
        font-size: 14px;
        a{
            color: #409eff;
        }
    }
}
</style>
