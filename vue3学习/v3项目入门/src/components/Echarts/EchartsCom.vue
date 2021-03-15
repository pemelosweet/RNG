<script lang='ts'>
import { defineComponent, ref, h, watch } from 'vue';
import useEcharts from '@/hooks/useEcharts';

export default defineComponent({
    name: 'EchartsCom',
    props: {
        options: {
            type: Object,
            default: () => ({})
        }
    },
    setup(props) {
        const el = ref(null);
        const { setOptions } = useEcharts(el, props.options);
        let prevOptions = props.options;
        watch(props, (val) => {
            if (prevOptions !== val.options) {
                setOptions(val.options);
                prevOptions = val.options;
            }
        });
        return () => h('div', {
            ref: el
        });
    }
});
</script>