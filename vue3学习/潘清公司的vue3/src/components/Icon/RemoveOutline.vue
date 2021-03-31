<script lang='ts'>
import { defineComponent, h } from 'vue';

export default defineComponent({
    name: 'RemoveOutline',
    render() {
        return h("i", {
            ...this.$attrs,
            class: "el-icon-remove-outline pointer"
        })
    },
});
</script>
