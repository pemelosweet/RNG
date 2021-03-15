import { isRef, onMounted, onUnmounted, reactive, Ref, watchEffect } from 'vue';

import echarts from '@/echarts';
import { ElLoading } from 'element-plus';

export default (el: Ref<HTMLElement>, options: Record<string, any> = {}) => {
    let myChart = null;
    options = reactive(options);

    const refreshEcharts = () => {
        myChart && myChart.resize();
    };

    /**
     * 渲染 echarts，并监听 options 的变化
     * 如果 options 的引用地址发生了变化，需要调用 setOptions
     * @param options
     */
    const setOptions = (options) => {
        watchEffect(() => {
            // options 数据改变会再次执行这个函数
            myChart && myChart.setOption(options);
        });
    };

    onMounted(async () => {
        const dom = isRef(el) ? el.value : el;
        myChart = echarts.init(dom);
        // 绘制复杂图形时(例：绘制地图需要500ms)，会导致页面卡顿， setTimeout 绘制，会让用户先看到页面，然后在开始绘制
        // 页面会立即跳转，但是会有白屏，加 loading 处理一下白屏
        let loadingInstance = ElLoading.service({
            target: dom
        });
        setTimeout(() => {
            setOptions(options);
            loadingInstance.close();
            loadingInstance = null;
        }, 0);

        window.addEventListener('resize', refreshEcharts);
    });

    onUnmounted(() => {
        window.removeEventListener('resize', refreshEcharts);
    });

    return {
        options,
        setOptions
    };
};
