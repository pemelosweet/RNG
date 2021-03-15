<template>
    <el-card class="card">
        <div class="card-header">
            <div class="card-header-left">
                <span class="card-title">{{ title }}</span>
                <circle-plus-outline
                    v-if="showAddIcon"
                    @click="$emit('add-click')"
                ></circle-plus-outline>
            </div>
            <div class="card-header-right" v-if="showRight">
                <slot name="header-right">
                    <el-form
                        ref="formEl"
                        class="card-form"
                        :model="formData"
                        inline
                        :rules="formRules"
                    >
                        <el-form-item :label="rightLabel" prop="right">
                            <el-select
                                :model-value="modelValue"
                                @change="handleChange"
                            >
                                <el-option
                                    v-for="(item, index) in rightOptions"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.value"
                                />
                            </el-select>
                        </el-form-item>
                    </el-form>
                </slot>
            </div>
            <remove-outline
                v-if="showRemoveIcon"
                class="remove-icon"
                @click="handleRemove"
            />
        </div>
        <div class="card-body" ref="bodyEl" :style="bodyStyle">
            <div v-if="$slots.default" class="card-body-divider"></div>
            <slot />
        </div>
    </el-card>
</template>

<script lang='ts'>
import { computed, defineComponent, ref } from 'vue';
import CirclePlusOutline from '@/components/Icon/CirclePlusOutline.vue';
import RemoveOutline from '@/components/Icon/RemoveOutline.vue';
import animation from '@/utils/animation';

const UPDATE_MODEL_EVENT = 'update:modelValue';

export default defineComponent({
    name: 'label-card',
    components: {
        RemoveOutline,
        CirclePlusOutline,
    },
    props: {
        title: {
            type: String,
            default: '',
        },
        showRemoveIcon: {
            type: Boolean,
            default: true,
        },
        showAddIcon: {
            type: Boolean,
            default: true,
        },
        showRight: {
            type: Boolean,
            default: true,
        },
        rightLabel: {
            type: String,
            default: '',
        },
        modelValue: {},
        rightOptions: {
            type: Array,
            default: [],
        },
        rightRules: {
            type: Array,
            default: [],
        },
    },
    emits: [UPDATE_MODEL_EVENT, 'add-click'],
    setup(props, ctx) {
        const handleChange = value => {
            ctx.emit(UPDATE_MODEL_EVENT, value);
        };
        // 设置默认校验规则
        const formRules = computed(() => {
            return {
                right: props.rightRules.length
                    ? props.rightRules.length
                    : [
                          {
                              required: true,
                              message: props.rightLabel + '必填',
                              trigger: 'change',
                          },
                      ],
            };
        });

        const formData = computed(() => ({
            right: props.modelValue,
        }));

        const bodyEl = ref<HTMLElement>(null); // 内容容器元素
        const showBody = ref(true); // 是否显示body的内容
        const bodyStyle = computed(() => {
            return showBody.value ? {} : { overflow: 'hidden' };
        });
        let timer;
        const handleRemove = () => {
            if (timer) {
                return;
            }
            const setHeight = (height: string | number): void => {
                bodyEl.value.style.height =
                    typeof height === 'number' ? height + 'px' : height;
            };
            const getHeight = (): number => {
                return bodyEl.value.clientHeight;
            };
            const animationTime = 200;
            if (showBody.value) {
                // 收起
                const h = getHeight();
                animation({
                    el: bodyEl.value,
                    property: 'height',
                    start: h,
                    end: 0,
                    time: animationTime,
                    callback: () => {
                        showBody.value = !showBody.value;
                    },
                });
            } else {
                // 展开
                setHeight('auto');
                const h = getHeight();
                showBody.value = !showBody.value;
                animation({
                    el: bodyEl.value,
                    property: 'height',
                    start: 0,
                    end: h,
                    time: animationTime,
                    callback: () => {
                        setHeight('auto');
                    },
                });
            }
            timer = setTimeout(() => {
                timer = null;
            }, animationTime);
        };

        const formEl = ref(null);
        const validate = async (): Promise<boolean> => {
            if (formEl.value) {
                return formEl.value.validate();
            } else {
                return Promise.resolve(true);
            }
        };

        return {
            formEl,
            formRules,
            formData,
            bodyEl,
            bodyStyle,
            handleChange,
            handleRemove,
            validate,
        };
    },
});
</script>

<style scoped lang='scss'>
.card {
    position: relative;
}

.card-header {
    display: flex;
    justify-content: space-between;
}

.card-title {
    margin-right: 10px;
}

.card-body {
    .card + .card {
        margin-top: 20px;
    }
}

.card-body-divider {
    margin-top: 20px;
}

.remove-icon {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate3d(50%, -50%, 0);
}
.card-form::v-deep(.el-form-item) {
    margin: 0;
}
</style>