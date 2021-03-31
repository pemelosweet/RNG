<template>
    <el-scrollbar>
        <ul class="travel-line">
            <li v-for="(stop, index) in list" :key="index">
                <slot :data="stop" :$index="index"></slot>
            </li>
        </ul>
    </el-scrollbar>
</template>
<script type="text/jsx" lang="ts">
    import { defineComponent, PropType } from 'vue'
    export default defineComponent({
        name: 'TravelLine',
        props: {
            list: {
                required: true,
                type: Array,
                default: ():Array<any> => new Array<any>(),
            },
            measureHandler: {
                type: Function as PropType<() => void>,
                default: null
            }
        },
        /*watch: {
            list(val, oldVal):void {
                if (val === oldVal) return
                /!** 为准确显示滚动条，需要重新计算宽度 **!/
                const me = this
                me.$nextTick(function():void {
                    me.measure()
                })
            }
        },*/
        mounted() {
            const me = this
            me.measure()
        },
        updated() {
            const me = this
            me.measure()
        },
        methods: {
            measure():void {
                /** 为准确显示滚动条，需要重新计算宽度 **/
                const me = this
                if (typeof me.measureHandler === 'function') {
                    me.measureHandler()
                } else {
                    const { jQuery } :any = window
                    let w = 0
                    jQuery(me.$el).find('li').each((index, elm):void => {
                        // console.log('measure', index, elm)
                        w += elm.offsetWidth
                    })
                    jQuery(me.$el).find('.travel-line').css('width', w + 'px')
                }
            }
        }
    })
</script>
<style lang="scss">
    .travel-line {
        list-style: none;
        padding: 0;
        margin: 0;
        li {
            display: inline-flex;
            align-items: flex-end;
            &::before, &::after {
                content: '';
                display: inline-block;
                width: 5rem;
                border-bottom: 1px dashed #dddddd;
                margin-bottom: 2rem;
            }
        }
    }
</style>