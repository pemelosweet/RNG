<template>
    <div>
        <div>您好 {{ txtRefNumP1 }}</div>

        <br /><br /><br />
        <div>
            <div>ref单值赋值并修改 ：</div>
            <div><input v-model="txtRefString1" /></div>
            <br />
            <br />
        </div>

        <div>
            <div>ref数组值接受后修改返回在修改渲染： ：</div>
            <div>
                <input id="inputTest1" type="text" v-model="txtInputString1" />
            </div>
            <br />
            <br />
        </div>

        <div>
            <div>reactive对象值修改后返回在修改渲染： ：</div>
            <div>
                <input
                    id="inputTest2"
                    type="text"
                    v-model="txtReactiveObj1.data[0].value"
                />
            </div>
            <br />
            <br />
        </div>

        <div>
            <div>ref值子组件数据修改后直接返回在修改渲染： ：</div>
            <div>
                <input
                    id="inputTest3"
                    type="text"
                    v-model="txtRefArray[0]['txtIndexValue']"
                />
            </div>
            <br />
            <br />
        </div>

        <br /><br /><br />
        <div>
            reactive值子组件修改后直接渲染：
            {{ value }}
            <button @click="change">change</button>
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    getCurrentInstance,
    onMounted,
    reactive,
    ref,
    watch,
    watchEffect,
} from 'vue';
export default defineComponent({
    props: {
        txtRefNumP1: { type: String, default: () => '' },
        txtRefStringP1: {
            type: String,
            default: ref('1'),
        },
        txtInputStringP1: { type: Number, default: '' },
        txtReactiveObjP1: { type: Object, default: {} },
        txtRefArrayP1: { type: Array, default: ref() },
        value: String,
    },

    components: {},
    setup(props, content) {
        let txtRefString1 = ref(Number(props.txtRefStringP1) + 10); // 接受父组件ref单值并在下面修改

        let txtInputString1 = ref(props.txtInputStringP1);
        let txtReactiveObj1 = reactive(props.txtReactiveObjP1);

        let txtRefArray = ref(props.txtRefArrayP1);

        let txtInputString3 = ref('');
        // 多个同时监听函数:txtInputString1 和 txtInputString2
        watch(
            () => [txtInputString1.value, txtReactiveObj1['data'][0]['value']],
            ([count1New, count2New], [count1Old, count2Old]) => {
                listenTxtInputString1(count1New);
                listenTxtInputString2(count2New);
            }
        );

        // 单个监听函数:txtRefArray
        watch(
            () => txtRefArray.value[0]['txtIndexValue'],
            (countNew, CountOld) => {
                listenTxtRefArray(countNew);
            }
        );

        // 监听单个函数，但是初始化会走
        watchEffect(() => {
            console.log(txtInputString3.value);
        });

        const listenTxtInputString1 = val => {
            content.emit('listenTxtInputString1', val);
        };

        const listenTxtInputString2 = val => {
            content.emit('listenTxtInputString2', val);
        };

        const listenTxtRefArray = val => {
            content.emit('listenTxtRefArray', val);
        };

        const change = () => content.emit('update:value', 'im son');

        onMounted(() => {
            // 修改父页面传递的ref和reactive数据
            txtReactiveObj1['id'] = 'herry';
            txtReactiveObj1['data'][0]['value'] = 34;

            // 打印父组件传递过来的ref/reactive/字面量内容

            txtRefArray.value[0]['txtIndexValue'] = 66;
        });

        return {
            txtRefString1,
            txtReactiveObj1,
            txtInputString1,
            txtInputString3,
            listenTxtRefArray,
            change,
            txtRefArray,
            listenTxtInputString1,
            listenTxtInputString2,
        };
    },
});
</script>

<style scoped>
div {
    text-align: center;
}
</style>>

