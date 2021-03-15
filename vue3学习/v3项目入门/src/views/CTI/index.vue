<template>
    <div class="cti">
        <h1 class="cti-title">
            CallThink 呼叫中心平台 SDK-客户端控件 ATClient.http 演示
        </h1>
        <el-tabs type="border-card" class="cti-tabs">
            <el-tab-pane>
                <template #label>
                    <span><i class="el-icon-s-help"></i> 登录CTI服务器</span>
                </template>
                <div class="cti-row">
                    <label>代理服务器：</label>
                    <el-button
                        type="primary"
                        size="mini"
                        @click="Connect_CTI"
                        plain
                        >连接CTI服务器</el-button
                    >
                    <el-button
                        type="primary"
                        size="mini"
                        @click="DisConnect_CTI"
                        plain
                        >断开CTI服务器</el-button
                    >
                </div>
                <div>
                    <span class="cti-col">
                        <label>座席员工号：</label>
                        <el-input
                            v-model="personNum"
                            size="mini"
                            class="cti-input1"
                            id="txtUid"
                        ></el-input>
                    </span>
                    <span class="cti-col">
                        <label>密 码：</label>
                        <el-input
                            v-model="password"
                            size="mini"
                            class="cti-input1"
                            id="txtPwd"
                        ></el-input>
                    </span>
                    <span class="cti-col">
                        <label>分机号：</label>
                        <el-input
                            v-model="extNum"
                            size="mini"
                            class="cti-input1"
                            id="txtExt"
                        ></el-input>
                    </span>
                    <span class="cti-col">
                        <el-button
                            type="primary"
                            size="mini"
                            @click="client_login"
                            plain
                            >座席登入</el-button
                        >
                        <el-button
                            type="primary"
                            size="mini"
                            @click="client_logout"
                            plain
                            >座席登出</el-button
                        >
                    </span>
                </div>
            </el-tab-pane>
        </el-tabs>

        <el-tabs type="border-card" class="cti-tabs">
            <el-tab-pane>
                <template #label>
                    <span><i class="el-icon-phone"></i> 软电话命令</span>
                </template>
                <div class="cti-row">
                    <label>工作状态 - 设置状态：</label>
                    <el-button
                        type="primary"
                        size="mini"
                        @click="AT_Command('SetBusy')"
                        plain
                        >座席置忙</el-button
                    >
                    <el-button
                        type="primary"
                        size="mini"
                        @click="AT_Command('SetNoBusy')"
                        plain
                        >取消置忙</el-button
                    >
                    <el-button
                        type="primary"
                        size="mini"
                        @click="AT_Command('SetLeave')"
                        plain
                        >离席</el-button
                    >
                    <el-button
                        type="primary"
                        size="mini"
                        @click="AT_Command('SetNoLeave')"
                        plain
                        >取消离席</el-button
                    >
                    <el-button
                        type="primary"
                        size="mini"
                        @click="AT_Command('AfterWorking')"
                        plain
                        >进入事后处理</el-button
                    >
                    <el-button
                        type="primary"
                        size="mini"
                        @click="AT_Command('AfterNoWorking')"
                        plain
                        >取消事后处理</el-button
                    >
                    <el-input
                        v-model="txtCause"
                        size="mini"
                        class="cti-input1"
                        style="margin-left: 8px"
                        id="txtCause"
                    ></el-input>
                </div>
                <div class="cti-row">
                    <label>电话呼叫：</label>
                    <el-button
                        type="primary"
                        size="mini"
                        @click="AT_Command('PlaceCall')"
                        plain
                        >呼叫电话</el-button
                    >
                    <label style="margin: 0 8px">被叫号码</label>
                    <el-input
                        v-model="txtTel"
                        size="mini"
                        class="cti-input1"
                        style="margin-right: 8px"
                        placeholder="请输入被叫号码"
                        id="txtTel"
                    ></el-input>
                    <el-button
                        type="primary"
                        size="mini"
                        @click="AT_Command('Pickup')"
                        plain
                        >摘 机</el-button
                    >
                    <el-button
                        type="primary"
                        size="mini"
                        @click="AT_Command('Hangup')"
                        plain
                        >挂 机</el-button
                    >
                    <el-button
                        type="primary"
                        size="mini"
                        @click="AT_Command('Pickup_dj')"
                        plain
                        >代 接</el-button
                    >
                </div>
                <div class="cti-row">
                    <label>转接电话：</label>
                    <el-button
                        type="primary"
                        size="mini"
                        @click="AT_Command('HoldCall')"
                        plain
                        >保持呼叫</el-button
                    >
                    <el-button
                        type="primary"
                        size="mini"
                        @click="AT_Command('RetriveCall')"
                        plain
                        >恢复呼叫</el-button
                    >
                    <el-button
                        type="primary"
                        size="mini"
                        @click="AT_Command('TransCall')"
                        plain
                        >单步转接</el-button
                    >
                    <label style="margin: 0 8px">目标分机</label>
                    <el-input
                        v-model="txtTelTran"
                        size="mini"
                        class="cti-input1"
                        style="margin-right: 8px"
                        id="txtTel_tran"
                        placeholder="请输入目标分机"
                    ></el-input>
                    <el-button
                        type="primary"
                        size="mini"
                        @click="AT_Command('ConsTrans')"
                        plain
                        >协商转接</el-button
                    >
                    <el-button
                        type="primary"
                        size="mini"
                        @click="AT_Command('TranOver')"
                        plain
                        >协商转接完成</el-button
                    >
                    <el-button
                        type="primary"
                        size="mini"
                        @click="AT_Command('TransIVR')"
                        plain
                        >转接IVR</el-button
                    >
                    <el-input
                        v-model="txtIvr"
                        size="mini"
                        class="cti-input1"
                        style="margin-left: 8px"
                        id="txtIvrFile"
                    ></el-input>
                    <label style="margin: 0 8px">节点号</label>
                    <el-input
                        v-model="txtIvrNum"
                        size="mini"
                        class="cti-input1"
                        style="margin-right: 8px"
                        placeholder="请输入节点号"
                        id="txtIvrNode"
                    ></el-input>
                </div>
                <div class="cti-row">
                    <label>建立会议：</label>
                    <el-button
                        type="primary"
                        size="mini"
                        @click="AT_Command('Conf_est')"
                        plain
                        >单步建立会议</el-button
                    >
                    <label style="margin: 0 8px">分机/外线会议号码</label>
                    <el-input
                        v-model="txtTelConf"
                        size="mini"
                        class="cti-input1"
                        style="margin-right: 8px"
                        placeholder="请输入分机/外线会议号码"
                        id="txtTel_conf"
                    ></el-input>
                    <el-button
                        type="primary"
                        size="mini"
                        @click="AT_Command('ConsConf')"
                        plain
                        >协商会议</el-button
                    >
                    <el-button
                        type="primary"
                        size="mini"
                        @click="AT_Command('ConfOver')"
                        plain
                        >协商会议完成</el-button
                    >
                </div>
                <div class="cti-row">
                    <label>监听、强插、强拆：</label>
                    <el-button
                        type="primary"
                        size="mini"
                        @click="AT_Command('MoniExt')"
                        plain
                        >监 听</el-button
                    >
                    <el-button
                        type="primary"
                        size="mini"
                        @click="AT_Command('Insert')"
                        plain
                        >强 插</el-button
                    >
                    <el-button
                        type="primary"
                        size="mini"
                        @click="AT_Command('DisConnect')"
                        plain
                        >强 拆</el-button
                    >
                    <label style="margin: 0 8px">目标分机</label>
                    <el-input
                        v-model="txtTelInsert"
                        size="mini"
                        class="cti-input1"
                        style="margin-right: 8px"
                        placeholder="请输入目标分机"
                        id="txtTel_insert"
                    ></el-input>
                </div>
                <div class="cti-row">
                    <label>发送消息：</label>
                    <el-button
                        type="primary"
                        size="mini"
                        @click="AT_Command('SendNote')"
                        plain
                        >发送公文</el-button
                    >
                    <label style="margin: 0 8px">目标工号</label>
                    <el-input
                        v-model="txtDest"
                        size="mini"
                        class="cti-input1"
                        style="margin-right: 8px"
                        placeholder="请输入目标工号"
                        id="txtDest"
                    ></el-input>
                    <el-button
                        type="primary"
                        size="mini"
                        @click="AT_Command('SendEmail')"
                        plain
                        >发送邮件</el-button
                    >
                    <label style="margin: 0 8px">邮件地址</label>
                    <el-input
                        v-model="txtEmail"
                        size="mini"
                        class="cti-input1"
                        style="margin-right: 8px"
                        placeholder="请输入邮件地址"
                        id="txtEmail"
                    ></el-input>
                    <el-button
                        type="primary"
                        size="mini"
                        @click="AT_Command('SendSms')"
                        plain
                        >发送短信</el-button
                    >
                    <label style="margin: 0 8px">手机号码</label>
                    <el-input
                        v-model="txtMobile"
                        size="mini"
                        class="cti-input1"
                        style="margin-right: 8px"
                        placeholder="请输入手机号码"
                        id="txtMobile"
                    ></el-input>
                </div>
                <div class="cti-row">
                    <label>发送内容：</label>
                    <el-input
                        v-model="txtMsg"
                        size="mini"
                        style="width: 300px"
                        placeholder="请输入"
                        id="txtMsg"
                    ></el-input>
                </div>
            </el-tab-pane>
        </el-tabs>
        <el-tabs type="border-card" class="cti-tabs">
            <el-tab-pane>
                <template #label>
                    <span><i class="el-icon-s-flag"></i>当前状态</span>
                </template>
                <el-button
                    type="primary"
                    size="mini"
                    @click="btn_Command('ClearDisp')"
                    style="margin-bottom: 8px"
                    plain
                    >清除显示</el-button
                >
                <el-input
                    id="Prompt"
                    type="textarea"
                    :rows="10"
                    placeholder="请输入内容"
                    v-model="prompt"
                >
                </el-input>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>


<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue';
export default defineComponent({
    name: 'cti',
    components: {},
    setup(props, context) {
        const state = reactive({
            personNum: '8602', //座席员工号：
            password: 'UltraCRM@2020', //密码
            extNum: '3790', //分机号
            txtCause: '开会', //开会
            txtTel: '0015075093920', //被叫号码
            txtTelTran: '3790', //转接电话---目标分机set
            txtIvr: 'flow_day.dat', //转接Ivr
            txtIvrNum: '100', //节点号
            txtTelConf: '3790', //分机/外线会议号码
            txtTelInsert: '3790', //监听、强插、强拆---目标分机
            txtDest: '8602', //目标工号
            txtEmail: 'qinfei@yuzhilin.net.cn', //邮件地址
            txtMobile: '15075093920', //手机号码
            txtMsg: '该命令用于在线座席之间传送实时消息，格式可自己定义。', //发送内容
            prompt: '', //当前状态内容
            // 连接CTI服务器
            Connect_CTI: () => {
                const { Connect_CTI }: any = window;
                Connect_CTI();
            },
            // 断开CTI服务器
            DisConnect_CTI: () => {
                const { DisConnect_CTI }: any = window;
                DisConnect_CTI();
            },
            // 座席登入
            client_login: () => {
                const { client_login }: any = window;
                client_login();
            },
            // 座席登出
            client_logout: () => {
                const { client_logout }: any = window;
                client_logout();
            },
            // 软电话事件
            AT_Command: strCmd => {
                const { AT_Command }: any = window;
                AT_Command(strCmd);
            },
            // 清除显示
            btn_Command: clearTxt => {
                const { btn_Command }: any = window;
                btn_Command(clearTxt);
            },
        });
        return {
            ...toRefs(state),
        };
    },
});
</script>
<style scoped>
.cti-title {
    text-align: center;
    margin-bottom: 16px;
}
.cti-tabs {
    margin-bottom: 16px;
}
.cti-row {
    margin-bottom: 8px;
}
.cti-col {
    margin-right: 32px;
}
.cti-input1 {
    width: 150px;
}
</style>
