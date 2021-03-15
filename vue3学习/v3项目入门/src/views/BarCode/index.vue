<template>
    <div>
        <bar-code barcodes="123456789"></bar-code>
    </div>
</template>
<script lang="ts">
    import { defineComponent } from 'vue';
    import barCode from '@/components/BarCode/index.vue';
    export default defineComponent({
        name: 'barcode',
        components: { barCode },
        setup(props, context) {
            return{}
        }
    });
</script>

<style scoped lang="scss">

</style>
