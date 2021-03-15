<!-- elementPlugins -->
<template>
    <div class="element-plugins">
        <el-row>
            <el-col :span="12">
                <custom-divider :title-size="18" title="表单校验" />
                <h2>
                    <span style="padding:20px;color: #F56C6C">注意： </span
                    >表单验证时，表单的model 与 ref 命名不要重复
                </h2>
                <el-form
                    :model="ruleForm"
                    :rules="rules"
                    ref="ruleFormValidate"
                    label-width="100px"
                    class="demo-ruleForm"
                >
                    <el-form-item label="联系电话" prop="phone">
                        <el-input v-model="ruleForm.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="活动名称" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="活动区域" prop="region">
                        <el-select
                            v-model="ruleForm.region"
                            placeholder="请选择活动区域"
                        >
                            <el-option
                                label="区域一"
                                value="shanghai"
                            ></el-option>
                            <el-option
                                label="区域二"
                                value="beijing"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="活动时间" required>
                        <el-col :span="11">
                            <el-form-item prop="date1">
                                <el-date-picker
                                    type="date"
                                    placeholder="选择日期"
                                    v-model="ruleForm.date1"
                                    style="width: 100%;"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-form-item prop="date2">
                                <el-time-picker
                                    placeholder="选择时间"
                                    v-model="ruleForm.date2"
                                    style="width: 100%;"
                                ></el-time-picker>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="即时配送" prop="delivery">
                        <el-switch v-model="ruleForm.delivery"></el-switch>
                    </el-form-item>
                    <el-form-item label="活动性质" prop="type">
                        <el-checkbox-group v-model="ruleForm.type">
                            <el-checkbox
                                label="美食/餐厅线上活动"
                                name="type"
                            ></el-checkbox>
                            <el-checkbox
                                label="地推活动"
                                name="type"
                            ></el-checkbox>
                            <el-checkbox
                                label="线下主题活动"
                                name="type"
                            ></el-checkbox>
                            <el-checkbox
                                label="单纯品牌曝光"
                                name="type"
                            ></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="特殊资源" prop="resource">
                        <el-radio-group v-model="ruleForm.resource">
                            <el-radio label="线上品牌商赞助"></el-radio>
                            <el-radio label="线下场地免费"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="活动形式" prop="desc">
                        <el-input
                            type="textarea"
                            v-model="ruleForm.desc"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="上传图片" prop="imageUrl">
                        <el-upload
                            class="avatar-uploader"
                            action="http://mock.local.yzl.cn:8080/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload"
                        >
                            <img
                                v-if="imageUrl"
                                :src="ruleForm.imageUrl"
                                class="avatar"
                            />
                            <i
                                v-else
                                class="el-icon-plus avatar-uploader-icon"
                            ></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            type="primary"
                            @click="submitForm('ruleFormValidate')"
                            >立即创建</el-button
                        >
                        <el-button @click="resetForm('ruleFormValidate')"
                            >重置</el-button
                        >
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
// vue功能组件
import {
    defineComponent,
    reactive,
    ref,
    toRefs,
    getCurrentInstance
} from 'vue';
// import other
import { ElSelect, ElMessage } from 'element-plus';
import customDivider from '@/components/DMC/customDivider.vue';
import regExp from '@/utils/regexp-lib';
export default defineComponent({
    name: 'elementPlugins',
    // props: {},
    components: {
        ElSelect,
        customDivider
    },
    setup() {
        //方法集合
        const funcList = {
            submitForm(ruleFormValidate) {
                data[ruleFormValidate].validate(valid => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(ruleFormValidate) {
                data[ruleFormValidate].resetFields();
            },
            //上传
            handleAvatarSuccess(res, file) {
                data.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    ElMessage.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    ElMessage.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
        };

        // 定义数据和方法
        //const ruleFormValidate= ref(null)
        const data = reactive({
            ruleFormValidate: null,
            imageUrl: '',
            ruleForm: {
                phone: '',
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: '',
                imageUrl: ''
            },
            rules: {
                phone: [
                    {
                        required: true,
                        validator: (rule, value, callback) => {
                            regExp.vPhone(rule, value, callback, '手机号');
                        },
                        trigger: 'blur'
                    }
                ],
                name: [
                    {
                        required: true,
                        message: '请输入活动名称',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 5,
                        message: '长度在 3 到 5 个字符',
                        trigger: 'blur'
                    }
                ],
                region: [
                    {
                        required: true,
                        message: '请选择活动区域',
                        trigger: 'change'
                    }
                ],
                date1: [
                    {
                        type: 'date',
                        required: true,
                        message: '请选择日期',
                        trigger: 'change'
                    }
                ],
                date2: [
                    {
                        type: 'date',
                        required: true,
                        message: '请选择时间',
                        trigger: 'change'
                    }
                ],
                type: [
                    {
                        type: 'array',
                        required: true,
                        message: '请至少选择一个活动性质',
                        trigger: 'change'
                    }
                ],
                resource: [
                    {
                        required: true,
                        message: '请选择活动资源',
                        trigger: 'change'
                    }
                ],
                desc: [
                    {
                        required: true,
                        message: '请填写活动形式',
                        trigger: 'blur'
                    }
                ],
                imageUrl: [
                    {
                        required: true,
                        message: '请上传图片',
                        trigger: 'change'
                    }
                ]
            },
            ...funcList
        });

        return {
            ...toRefs(data)
        };
    }
});
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
