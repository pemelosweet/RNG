<template>
    <div>
        <canvas ref="barcode" v-if="isShow"></canvas>
    </div>
</template>

<script lang="ts">
    import {
        defineComponent,
        reactive,
        toRefs,
        ref,
        onMounted,
        nextTick
    } from 'vue';
    import JsBarcode from 'jsbarcode';
    export default defineComponent({
        name: 'codes',
        props:{
            barcodes: {
                type: String,
                default: () => ''
            }
        },
        setup(props, context) {
            const isShow = ref(true);
            const data = reactive({
                barcode: null
            });
            onMounted(() => {
                nextTick(() => {
                    if (props.barcodes !== '') {
                        JsBarcode(data.barcode, props.barcodes, {
                            height: 60,
                            displayValue: true // 是否在条形码下方显示文字
                        })
                    } else {
                        isShow.value = false;
                    }
                })
            });
            return{
                isShow,
                ...toRefs(data)
            }
        }
    });
</script>

<style scoped>

</style>
