import { ehrService } from '@/axios';

const UserAPI = {
    // 获取用户信息
    /*
    @params userNo
  */
    getCurrentDetails(params) {
        return ehrService({
            url: '/staff/getCurrentDetails',
            method: 'get',
            params
        });
    }
}

export default UserAPI;