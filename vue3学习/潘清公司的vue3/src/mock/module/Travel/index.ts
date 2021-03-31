import Mock from 'mockjs'
import { URL } from '../../../api/Travel'

Mock.mock(URL.getStaffTravel, 'get', function() {
    return {
        status: 200,
        message: 'ok',
        success: true,
        data: Mock.mock({
            'data|10': [{
                'id|+1': 1,
                'date': '@DATE("yyyy-MM-dd")',
                'message': '@TITLE(1)',
                'type|1-5': 1,
            }]
        })
    }
})

Mock.mock(URL.getProductionTravel, 'get', function() {
    return {
        status: 200,
        message: 'ok',
        success: true,
        data: Mock.mock({
            'data|10': [{
                'id|+1': 1,
                'date': '@DATE("yyyy-MM-dd")',
                'name': '@TITLE(1)',
                'poster': 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
                'firstSaleDate': '@DATE("yyyy-MM-dd")',
                'firstSaleAmount|0-10000': 0,
                'lastSaleDate': '@DATE("yyyy-MM-dd")',
                'lastSaleAmount|0-10000': 0,
                'totalSaleAmount|0-10000': 0,
                'totalReturnedAmount|0-100': 0,
                'totalReturnedRate|0-1.2': 0,
            }]
        })
    }
})

Mock.mock(URL.getClientTravel, 'get', function() {
    return {
        status: 200,
        message: 'ok',
        success: true,
        data: Mock.mock({
            'data|10': [{
                'id|+1': 1,
            }]
        })
    }
})