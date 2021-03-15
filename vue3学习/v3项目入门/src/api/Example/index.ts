import { crmService } from '@/axios'
const ExampleAPI = {
    getUserInfo(params) {
        return crmService({
            url: '/getUserInfo',
            method: 'get',
            params
        })
    },
    addFn(data) {
        return crmService({
            url: '/addFn',
            method: 'post',
            data
        })
    }
    //...
}

export default ExampleAPI