/*
* @Author: Paul-Yellow
* @Date: 2019-03-27 09:34:24
 * @LastEditTime: 2019-03-27 15:35:24
 * @Description:是否使用CFCA进行登录
                window.useCfca=1（必须使用key登录）
                window.useCfca=0（可不使用key登录）
 */

// eslint-disable-next-line no-unused-vars
// window.sophonAddress = 'http://sc-tdh-01:8066'
// window.sophonworkFlow = 'http://11.129.93.66:9091'
// window.sophonCR = 'http://11.129.93.61:8066'
// 模型管理 新建模型需要交易时间的表 id
window.transactionTimeArr = ['29', '62', '96', '81', '45', '115', '119', '135', '142', '147', '156', '129', '133', '157']
// 公司星环地址 http://192.168.200.197:8066/projects
window.useCfca = 0
// window.sophonAddress = 'http://192.168.200.197:8066/projects' // 星环地址-------公司
// window.sophonworkFlow = 'http://192.168.200.197:9091/#!/home' // 星环地址-------公司
// window.sophonCR = 'http://192.168.200.197:8066/projects' // 星环地址-------公司
window.mstr = 'http://11.129.93.54:9088/MicroStrategy/servlet/mstrWeb?evt=3008'// mstr生产
// window.mstr = 'http://172.16.41.138:8080/MicroStrategy/servlet/mstrWeb?evt=3008'// mstr测试
window.sophonAddress = 'http://172.16.25.9:8066' // 星环地址-------集研
window.sophonAddress = 'http://172.16.30.21:8066' // 星环地址-------生产
window.sophonworkFlow = 'http://172.16.30.21:8066/projects' // 星环地址-------生产
window.sophonCR = 'http://172.16.25.9:8066' // 星环地址-------生产
// window.sophonAddress = 'http://sophon03:8066/projects' // 星环地址-------测试
// window.sophonworkFlow = 'http://sophon02:9091/#!/home' // 星环地址-------测试
// window.sophonCR = 'http://sophon03:8066/projects' // 星环地址-------测试
window.inAnalysisTools = '11.129.93.51:8080' // 进入分析工具
window.international = 'http://11.129.93.1:61450/#/create/index' // 国际情报 ----生产
// window.international = 'http://11.129.98.141:83/#/create/index' // 国际情报 ----三测
// window.international = 'http://192.168.200.65:9067/#/create/index' // 国际情报 ----公司
window.domestic = 'http://11.129.93.1:61446/ds/#/' // 国内合作子系统 ----生产
// window.domestic = 'http://11.129.98.141:82/ds/#/' // 国内合作子系统 ----三测
// window.domestic = 'http://192.168.200.65:9068/#/' // 国内合作子系统 ----公司
window.portalPath = 'http://11.129.93.2:61443/portal-rhfxq/' // 门户地址 ----生产
// window.portalPath = 'http://11.129.98.139:8080/portal-rhfxq/' // 门户地址 ----三测
// window.portalPath = 'http://192.168.200.81:8122/portal/' // 门户地址 ----公司
