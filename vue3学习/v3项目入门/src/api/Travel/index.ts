// import axios from '@/axios'
import { get } from '@/axios'
import '@/mock'

const isMock = process.env.NODE_ENV === 'mock'

export const URL = {
    getStaffTravel: '/getStaffTravel',
    getProductionTravel: '/getProductionTravel',
    getClientTravel: '/getClientTravel',
}

/** 获取员工旅行数据 **/
export function getStaffTravelList(staffId) {
    return get(URL.getStaffTravel, isMock ? {} : { staffId })
}

/** 获取产品旅行数据 **/
export function getProductionTravelList(productionId) {
    return get(URL.getProductionTravel, isMock ? {} : { productionId })
}

/** 获取客户旅行数据 **/
export function getClientTravelList(clientId) {
    return get(URL.getClientTravel, isMock ? {} : { clientId })
}