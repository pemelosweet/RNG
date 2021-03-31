<template>
    <app-editor @setHtml="getHtml"></app-editor>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import appEditor from '@/components/Editor/index.vue';
export default defineComponent({
    name: 'editorUse',
    components: { appEditor },
    setup(props, context) {
        const state = reactive({
            editorHtml: '',
        });
        const getHtml = html => {
            state.editorHtml = html;
            //console.log(state.editorHtml);
        };
        return {
            ...toRefs(state),
            getHtml,
        };
    },
});
</script>
<style scoped>
</style>
