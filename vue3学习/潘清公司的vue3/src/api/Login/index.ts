import { oauthService } from '@/axios';

const LoginAPI = {
    // 登录
    /*
    @params userNo
    @params password
  */
    login(data) {
        return oauthService({
            url: '/user/login',
            method: 'post',
            data
        });
    },
    // 登出
    /*
    @params userNo
    @params token
  */
    logout(params) {
        return oauthService({
            url: '/user/logout',
            method: 'delete',
            params
        });
    },
    // 修改密码
    /*
    @params userNo
    @params password
  */
    updatePassword(data) {
        return oauthService({
            url: '/user/updatePassword',
            method: 'post',
            data
        });
    }
};

export default LoginAPI;
