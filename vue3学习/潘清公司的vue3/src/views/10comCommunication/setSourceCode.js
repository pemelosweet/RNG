const code = `

父组件：

<template>
    <div class="index">
        <p class="index-introduce">父子通信</p>
    </div>
    <div v-if="CCData.helloIsTrue1">
        <hello
            ref="hello"
            :txtRefNumP1="txtRefNum1"
            :txtRefStringP1="txtRefString1"
            :txtInputStringP1="txtInputString1"
            :txtReactiveObjP1="txtReactiveObj1"
            :txtRefArrayP1="txtRefArray"
            @listenTxtRefArray="listenTxtRefArray"
            @listenTxtInputString1="listenTxtInputString1"
            @listenTxtInputString2="listenTxtInputString2"
            :value="value"
            @update:value="value = $event"
        />
    </div>
</template>

<script lang="ts">
import hello from './Component/helloworld.vue';

import { defineComponent, onMounted, reactive, ref } from 'vue';
export default {
    name: 'index',
    components: {
        hello,
    },
    setup(props, context) {
        // 当前页面数据
        const CCData = reactive({
            helloIsTrue1: true, // 控制hello是否显示
        });

        const txtRefNum1 = ref('河北御芝林');

        const txtRefString1 = ref('22');

        const txtInputString1 = 33;

        const txtReactiveObj1 = reactive({
            id: '123',
            name: '2222',
            data: [
                { comid: '123456', name: 'txt1', value: '44' },
                { comid: '123457', name: 'txt2' },
                { comid: '123458', name: 'txt3' },
                { comid: '123459', name: 'txt4' },
            ],
        });

        let txtRefArray = ref([
            { id: '3', name: '5', txtIndexValue: '55' },
            { id: '4', name: '6' },
        ]);

        const listenTxtRefArray = val => {
            txtRefArray.value[0]['txtIndexValue'] = val;
            console.log(txtRefArray);
        };

        const listenTxtInputString1 = val => {
            console.log(val);
        };
        const listenTxtInputString2 = val => {
            txtReactiveObj1.data[0].value = val;
            console.log(txtReactiveObj1);
        };

        const value = ref('i/m dad');

        onMounted(() => {
            // 修改当前页ref和reactive数据：原样
            txtReactiveObj1.data[0].comid = '9999';
        });
        // 生命周期
        return {
            txtRefNum1,
            txtRefString1,
            txtInputString1,
            txtReactiveObj1,
            CCData,
            txtRefArray,
            listenTxtRefArray,
            value,
            listenTxtInputString1,
            listenTxtInputString2,
        };
    },
};
</script>
<style scoped>
.index {
    /* width: calc(100% - 180px); */
    font-family: Avenir, Helvetica, Arial, sans-serif;

    text-align: center;
}
.index-header {
    font-size: 50px;
    color: #409eff;
}
.index-introduce {
    font-size: 20px;
}
</style>




子组件：

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
    setup(props, ctx: any) {
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
            ctx.emit('listenTxtInputString1', val);
        };

        const listenTxtInputString2 = val => {
            ctx.emit('listenTxtInputString2', val);
        };

        const listenTxtRefArray = val => {
            ctx.emit('listenTxtRefArray', val);
        };

        const change = () => ctx.emit('update:value', 'im son');

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


`

export default {
    code
}