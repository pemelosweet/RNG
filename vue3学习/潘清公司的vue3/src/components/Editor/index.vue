<template>
    <div ref="editorRef"></div>
</template>

<script lang="ts">
import {
    defineComponent,
    onMounted,
    ref,
    reactive,
    toRefs,
    nextTick,
} from 'vue';
import E from 'wangeditor';
export default defineComponent({
    name: 'editor',
    components: {},
    setup(props, context) {
        const state = reactive({
            editorRef: null,
        });
        onMounted(() => {
            nextTick(() => {
                const editor = new E(state.editorRef);
                editor.config.onchange = function (html) {
                    //监控变化，同步更新到父组件
                    context.emit('setHtml', html);
                };
                editor.create();
            });
        });

        return {
            ...toRefs(state),
        };
    },
});
</script>
<style scoped>
</style>
