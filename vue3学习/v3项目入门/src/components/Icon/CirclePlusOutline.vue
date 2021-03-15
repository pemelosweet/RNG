<script lang='ts'>
import { defineComponent, h } from 'vue';

export default defineComponent({
    name: 'CirclePlusOutline',
    render() {
        return h("i", {
            class: "el-icon-circle-plus-outline pointer",
            ...this.$attrs
        })
    },
});
</script>
