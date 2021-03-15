<template>
    <TravelLine class="staff-travel-line" :list="points">
        <template v-slot:default="scope">
            <div>
                <div class="msg">{{scope.data.message}}</div>
                <i class="stop" :data-type="scope.data.type"></i>
                <div class="date">{{scope.data.dateString}}</div>
            </div>
        </template>
    </TravelLine>
</template>
<script type="text/jsx" lang="ts">
    import { defineComponent, PropType } from 'vue'
    import StaffStopData from '../../classes/StaffStopData'
    import TravelLine from '@/components/TravelLine/index.vue'
    export default defineComponent({
        name: 'StaffTravelLine',
        components: {
            TravelLine
        },
        props: {
            list: {
                required: true,
                type: Array as PropType<Array<StaffStopData>>,
                default: ():Array<StaffStopData> => new Array<StaffStopData>(),
            }
        },
        computed: {
            points: {
                get():Array<StaffStopData> {
                    const me = this
                    return me.list.sort((item1:StaffStopData, item2:StaffStopData) => {
                        if (item1.date > item2.date) return -1
                        if (item1.date === item2.date) return 0
                        if (item1.date < item2.date) return 1
                    })
                },
                set(val:Array<StaffStopData>):void {
                    const me = this
                }
            }
        },
    })
</script>
<style lang="scss">
    .staff-travel-line {
        .stop {
            display:block;
            width: 1rem;
            height: 1rem;
            border-radius: 100%;
            margin: 1rem 0 0.5rem 2.5rem;
            &[data-type="1"] {
                background-color: #00ccff;
            }
            &[data-type="2"] {
                background-color: #ffd48e;
            }
            &[data-type="3"] {
                background-color: #32ff5a;
            }
            &[data-type="4"] {
                background-color: #ff67d2;
            }
            &[data-type="5"] {
                background-color: #6642ff;
            }
        }
        .msg {
            display: inline-block;
            padding: 0.5rem;
            max-width: 3rem;
            text-align: justify;
            line-height: 1.2rem;
            background-color: #eeeeee;
            border-radius: 0.3rem;
            margin-left: 1.7rem;
            position: relative;
            white-space: normal;
            word-break: break-all;
            &::after {
                content: "";
                display: block;
                position: absolute;
                width: 0.5rem;
                height: 0.5rem;
                transform: rotate(45deg);
                bottom: -0.2rem; left: 1rem;
                background-color: #eeeeee;
            }
        }
        .date {
            color: #999999;
            width: 6rem;
            text-align: center;
        }
    }
</style>