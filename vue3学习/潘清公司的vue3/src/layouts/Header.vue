<template>
    <el-header>
        <img src="../assets/images/logo.png" class="crm-logo" />
        <span class="crm-name">河北御芝林 Vue3+Vite+Ts+Element-plus模版</span>
        <div class="login-user">
            <el-row style="justify-content: flex-end">
                <el-col :span="8">
                    <el-badge :value="100" :max="99" class="item">
                        <i class="el-icon-message-solid" />
                    </el-badge>
                </el-col>
                <el-col :span="10">
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            {{ name
                            }}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click="updatePassword"
                                    >修改密码</el-dropdown-item
                                >
                                <el-dropdown-item @click="logout"
                                    >登出</el-dropdown-item
                                >
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </el-col>
            </el-row>
            <el-dialog
                title="修改密码"
                v-model="dialogVisible"
                width="50%"
                :close-on-click-modal="false"
                @closed="handleCloseFnc('ruleFormRef')"
            >
                <el-form
                    :model="ruleForm"
                    :rules="rules"
                    ref="ruleFormRef"
                    label-width="100px"
                    class="demo-ruleForm"
                >
                    <el-form-item label="新密码：" prop="newPwd">
                        <el-input
                            v-model.trim="ruleForm.newPwd"
                            show-password
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码：" prop="reNewPwd">
                        <el-input
                            v-model.trim="ruleForm.reNewPwd"
                            show-password
                        ></el-input>
                    </el-form-item>
                </el-form>

                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="handleCloseFnc('ruleFormRef')"
                            >取 消</el-button
                        >
                        <el-button
                            :disabled="disabled"
                            type="primary"
                            @click="handleSubmitFnc('ruleFormRef')"
                            >确 定</el-button
                        >
                    </span>
                </template>
            </el-dialog>
        </div>
    </el-header>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ElHeader, ElMessage, ElMessageBox, ElDialog } from 'element-plus';
import { getToken, removeToken } from '@/utils/auth';
import regExpLib from '@/utils/regexp-lib';
import loginAPI from '@/api/Login/';
import store from '@/store/';
export default defineComponent({
    name: 'headers',
    components: {
        ElHeader,
        ElDialog,
    },
    setup() {
        // 获取用户信息
        onMounted(() => {
            getCurrentDetails();
        });
        const router = useRouter();
        const route = useRoute();
        const data = reactive({
            name: '', //用户姓名
            dialogVisible: false, //是否打开修改密码弹窗
            ruleFormRef: null, // 表单ref
            ruleForm: {
                //密码表单信息
                newPwd: '', //新密码
                reNewPwd: '', //旧密码
            },
            rules: {
                newPwd: [
                    {
                        min: 5,
                        max: 8,
                        message: '长度在 5 到 8 个字符',
                        trigger: 'blur',
                    },
                    {
                        required: true,
                        validator: (rule, value, callback) => {
                            regExpLib.vChar(rule, value, callback, '密码');
                        },
                        trigger: 'blur',
                    },
                ],
                reNewPwd: [
                    {
                        min: 5,
                        max: 8,
                        message: '长度在 5 到 8 个字符',
                        trigger: 'blur',
                    },
                    {
                        required: true,
                        validator: (rule, value, callback) => {
                            regExpLib.vChar(rule, value, callback, '密码');
                        },
                        trigger: 'blur',
                    },
                ],
            },
            disabled: false, //更新密码，禁用按钮
            updatePassword() {
                //点击更新密码，打开弹窗
                data.dialogVisible = true;
            },
            // 登出
            logout() {
                const data = {
                    userNo: store.state.userInfo.userNo,
                };
                ElMessageBox.alert('确认登出！', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                })
                    .then(() => {
                        loginAPI.logout(data).then(resp => {
                            const { code }: any = resp;
                            removeToken();
                            if (route.fullPath === '/') {
                                router.push(`/login`);
                            } else {
                                router.push(
                                    `/login?redirect=${route.fullPath}`
                                );
                            }
                        });
                    })
                    .catch(() => {
                        //ElMessage.info('取消登出！')
                    });
            },
            // 修改密码
            handleSubmitFnc(ruleFormRef) {
                data[ruleFormRef].validate(valid => {
                    if (valid) {
                        const { newPwd, reNewPwd } = data.ruleForm;
                        if (newPwd === reNewPwd) {
                            data.disabled = true;
                            const datas = {
                                userNo: store.state.userInfo.userNo,
                                password: newPwd,
                            };
                            loginAPI
                                .updatePassword(datas)
                                .then(resp => {
                                    const { message }: any = resp;
                                    ElMessage.success(
                                        message || '修改密码成功,请重新登录！'
                                    );
                                    data.disabled = false;
                                    removeToken();
                                    location.reload(); //登录异常处理
                                    if (route.fullPath === '/') {
                                        router.push(`/login`);
                                    } else {
                                        router.push(
                                            `/login?redirect=${route.fullPath}`
                                        );
                                    }
                                })
                                .catch(() => {
                                    data.disabled = false;
                                });
                        } else {
                            ElMessage.error('新密码与确认密码不一致！');
                        }
                    }
                });
            },
            //取消
            handleCloseFnc(ruleFormRef) {
                data[ruleFormRef].resetFields();
                data.dialogVisible = false;
            },
        });
        // 获取用户姓名，进行展示
        const getCurrentDetails = () => {
            store.dispatch('getUserInfo', {}).then(resp => {
                data.name = resp.data.name;
            });
        };
        return {
            ...toRefs(data),
        };
    },
});
</script>
<style lang="scss">
.crm-logo {
    width: 32px;
    height: 32px;
    margin-right: 18px;
}
.crm-name {
    font-size: 18px;
    vertical-align: middle;
}
.el-header {
    background-color: #001529;
    color: #ffffff;
    height: 64px !important;
    line-height: 64px !important;
    padding-left: 26px !important;
}

.login-user {
    float: right;
    min-width: 300px;
    text-align: right;

    .el-badge__content.is-fixed {
        top: 16px !important;
        right: 8px !important;
    }

    .el-badge__content {
        padding: 0 3px;
    }

    .item {
        border-radius: 50%;

        .el-icon-message-solid {
            font-size: 18px;
        }
    }

    .logout {
        cursor: pointer;
    }

    .el-dropdown-link {
        color: #fff;
        cursor: pointer;
    }
    .el-dialog {
        text-align: left;
    }
}
</style>
