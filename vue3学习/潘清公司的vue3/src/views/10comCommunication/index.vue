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

    <pre>
            <code>{{sourceCode}}</code>
        </pre>
</template>

<script lang="ts">
import hello from './Component/helloworld.vue';
import { defineComponent, onMounted, reactive, ref } from 'vue';
import setSourceCode from './setSourceCode.js';
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

        const sourceCode = setSourceCode.code;
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
            sourceCode,
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
