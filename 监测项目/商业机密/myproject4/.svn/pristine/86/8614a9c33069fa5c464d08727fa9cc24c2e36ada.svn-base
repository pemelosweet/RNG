import Layout from '../views/layout/Layout'
const _import = require('./_import_' + process.env.NODE_ENV)
const newRouter = {
  path: '/monitoringAnalysis',
  component: Layout,
  name: 'monitoringAnalysis',
  alwaysShow: true,
  meta: {
    title: 'monitoringAnalysis',
    icon: 'form',
    role: ['monitor:monitoringAnalysis:monitoringAnalysis']
  },
  children: [
    {
      path: '/dataQuery',
      name: 'dataQuery',
      component: _import('sys-monitoringAnalysis/dataQuery/index'),
      alwaysShow: true, // 一直显示根路由
      meta: {
        title: 'dataQuery',
        role: ['monitor:dataQuery:dataQueryForBrabch']
      },
      children: [
        {
          // 数据查询 - 定制结果
          path: 'customResults',
          component: _import('sys-monitoringAnalysis/dataQuery/customResults/index'),
          name: 'dataQuery_customResults',
          meta: {
            title: 'customResults',
            role: ['monitor:dataManage:customResultForBranch']
          }
        },
        {
          // 数据查询2 - 定制结果
          path: 'customResults2',
          component: _import('sys-monitoringAnalysis/dataQuery/customResults/index2'),
          name: 'dataQuery_customResults2',
          meta: {
            title: 'customResults2',
            role: ['monitor:dataManage:customResultTWOForBranch']
          }
        },
        {
          // 数据查询 - 查询模板管理 - Paul // 数据查询数据查询
          path: 'templateManage',
          component: _import('sys-monitoringAnalysis/dataQuery/templateManage/index'),
          name: 'dataQuery_templateManage',
          meta: {
            title: 'templateManage',
            role: ['monitor:dataManage:templateForBrabch']
          }
        },
        {
          // 数据查询 - 查询模板管理 - 新增模板 - Paul
          path: 'templateManage/add',
          component: _import('sys-monitoringAnalysis/dataQuery/templateManage/add'),
          name: 'dataQuery_templateManage_add',
          meta: {
            title: 'add'
          },
          hidden: true
        },
        // 特定类型查询
        {
          path: 'dataType',
          name: 'dataQuery_dataType',
          component: _import('sys-monitoringAnalysis/dataQuery/dataType/index2'),
          meta: {
            title: 'dataType',
            role: ['monitor:dataManage:specificDataTypeQueryForBranch']
          }
        },
        // 特定类型查询2
        {
          path: 'dataType2',
          name: 'dataQuery_dataType2',
          component: _import('sys-monitoringAnalysis/dataQuery/dataType/index3'),
          meta: {
            title: 'dataType2',
            role: ['monitor:dataManage:specificDataTypeQueryTWOForBranch']
          }
        }
        //
        // {
        //   path: 'dataType/deleteRecord',
        //   name: 'dataType_deleteRecord',
        //   component: _import('sys-monitoringAnalysis/dataQuery/dataType/deleteRecord'),
        //   meta: {
        //     title: 'deleteRecord'
        //   },
        //   hidden: true
        // },
        // {
        //   // 交易详情
        //   path: 'dataType/tradeDetail',
        //   name: 'dataType_tradeDetail',
        //   component: _import('sys-monitoringAnalysis/dataQuery/dataType/tradeDetail'),
        //   hidden: true
        // },
        // {
        //   // 近、离线数据任务下载
        //   path: 'dataDown',
        //   component: _import('sys-monitoringAnalysis/dataQuery/dataDown/index'),
        //   name: 'dataQuery_dataDown',
        //   meta: {
        //     title: 'dataDown',
        //     role: ['monitor:dataDown:dataDown']
        //     // role: ['monitor:LifeCycle:LifeCycle']
        //   }
        // }
        // {
        //   // 数据查询 - 批量自动查询 - paul // 特定数据查询 // 特定数据查询--定制结果要素 // 特定数据查询--纠删履历 // 特定数据查询--录入标注名单信息 // 特定数据查询--标注问题 // 特定数据查询--报告类型详情--报告 // 特定数据查询--交易类型详情--大额 // 特定数据查询--交易类型详情--可疑
        //   path: 'automaticQuery',
        //   component: _import('sys-monitoringAnalysis/dataQuery/automaticQuery/index'),
        //   name: 'dataQuery_automaticQuery',
        //   meta: {
        //     title: 'automaticQuery',
        //     role: ['monitor:dataManage:batchAutomaticQuery']
        //   }
        // },
        // {
        //   path: 'search',
        //   component: _import('sys-monitoringAnalysis/dataQuery/search/index'),
        //   name: 'dataQuery_search',
        //   meta: {
        //     title: 'search',
        //     role: ['monitor:dataManage:fullTextRetrieval']
        //   }
        // },

        // {
        //   // 数据查询 - 回执查询
        //   path: 'receiptQuery',
        //   component: _import('sys-monitoringAnalysis/dataQuery/receipt/index'),
        //   name: 'dataQuery_receiptQuery',
        //   hidden: true,
        //   meta: {
        //     title: 'receiptQuery',
        //     role: ['monitor:dataManage:returnQuery']
        //   }
        // },
        // {
        //   // 数据查询 - 情报类文件查询 - paul
        //   path: 'intelligenceFile',
        //   component: _import('sys-monitoringAnalysis/dataQuery/intelligenceFile/index'),
        //   name: 'dataQuery_intelligenceFile',
        //   hidden: true,
        //   meta: {
        //     title: 'intelligenceFile',
        //     role: ['monitor:dataManage:intelligenceQuery']
        //   }
        // },
        // {
        //   // 数据查询 - 情报类文件查询 - 定制查询模板 - paul
        //   path: 'intelligenceFile/custom',
        //   component: _import('sys-monitoringAnalysis/dataQuery/intelligenceFile/custom'),
        //   name: 'dataQuery_intelligenceFile_custom',
        //   meta: {
        //     title: 'custom'
        //   },
        //   hidden: true
        // },
        // {
        //   // 数据查询 - 情报类文件查询 - 定制查询模板 -定制结果列表- paul
        //   path: 'intelligenceFile/resultList',
        //   component: _import('sys-monitoringAnalysis/dataQuery/intelligenceFile/resultList'),
        //   name: 'dataQuery_intelligenceFile_resultList',
        //   meta: {
        //     title: 'resultList'
        //   },
        //   hidden: true
        // },
        // {
        //   // 数据查询 - 情报类文件查询 - 查看-反馈信息- paul
        //   path: 'intelligenceFile/feedback',
        //   component: _import('sys-monitoringAnalysis/dataQuery/intelligenceFile/feedback'),
        //   name: 'dataQuery_intelligenceFile_feedback',
        //   meta: {
        //     title: 'view'
        //   },
        //   hidden: true
        // },
        // {
        //   // 数据查询 - 情报类文件查询 - 查看- paul
        //   path: 'intelligenceFile/view',
        //   component: _import('sys-monitoringAnalysis/dataQuery/intelligenceFile/view'),
        //   name: 'dataQuery_intelligenceFile_view',
        //   meta: {
        //     title: 'view'
        //   },
        //   hidden: true
        // }
      ]
    }, // 中心端分发任务
    {
      path: '/fenTaskInfo',
      name: 'fenTaskInfo',
      component: _import('sys-monitoringAnalysis/dataQuery/index'),
      // redirect: '/sendTaskInfo/searchTaskInfo', // redirect: '/reportClues/index',
      alwaysShow: true,
      meta: {
        title: 'fenTaskInfo',
        role: ['monitor:areaFunction:taskAnalysis']
      },
      children: [
        {
          // 分析任务查询
          path: 'searchTaskInfo',
          name: 'searchTaskInfo',
          component: _import('sys-monitoringAnalysis/sendTaskInfo/branch/list'),
          meta: {
            title: 'searchTaskInfo',
            role: ['monitor:areaFunction:taskAnalysis:query']
          }
        },
        {
          // 新建分析任务
          path: 'add',
          name: 'conjointAnalysis_detail',
          component: _import('sys-monitoringAnalysis/sendTaskInfo/branch/add'),
          meta: {
            title: 'sendTaskInfoAdd'
          },
          hidden: true
        },
        //  联合分析统计
        {
          path: 'sendTaskInfoStatistics',
          name: 'fenTaskInfo_statistics',
          component: _import('sys-monitoringAnalysis/sendTaskInfo/statistics'),
          hidden: true,
          meta: {
            title: 'sendTaskInfoStatistics',
            role: ['monitor:jointAnalysis:total']
          }
        },
        {
          path: 'fenTaskInfoDetail',
          name: 'fenTaskInfo_detail',
          component: _import('sys-monitoringAnalysis/sendTaskInfo/detail'),
          meta: {
            title: 'fenTaskInfoDetail'
          },
          hidden: true
        }
      ]
    },
    // 中心端地方协查及导出结果
    {
      path: '/fenResultExport',
      name: 'fenResultExport',
      component: _import('sys-monitoringAnalysis/dataQuery/index'),
      meta: {
        title: 'fenResultExport',
        role: ['monitor:areaFunction:areaAndResultOut']
      },
      children: [
        {
          path: 'fenResultExport',
          component: _import('sys-monitoringAnalysis/placeResultExport/branch/list'),
          meta: {
            title: 'fenResultExport'
          }
        },
        {
          path: 'fenResultExport_add',
          name: 'fenResultExport_add',
          hidden: true,
          component: _import('sys-monitoringAnalysis/placeResultExport/branch/add'),
          meta: {
            title: 'fenResultExport_add'
          }
        },
        {
          path: 'fenResultExport_send',
          name: 'fenResultExport_send',
          hidden: true,
          component: _import('sys-monitoringAnalysis/placeResultExport/branch/send'),
          meta: {
            title: 'fenResultExport_send'
          }
        }
      ]
    },
    // 分支行监测分析结果导出
    {
      path: '/fenResultExportJian',
      name: 'fenResultExportJian',
      // redirect: 'sys-monitoringAnalysis/placeResultExport/center/list',
      component: _import('sys-monitoringAnalysis/dataQuery/index'),
      meta: {
        title: 'fenResultExportJian',
        role: ['monitor:areaFunction:outResult']
      },
      children: [
        {
          path: 'fenResultExportJian',
          component: _import('sys-monitoringAnalysis/resultExport/branch/list'),
          meta: {
            title: 'fenResultExportJian'
          }
        },
        {
          path: 'fenResultExportJian_add',
          name: 'fenResultExportJian_add',
          hidden: true,
          component: _import('sys-monitoringAnalysis/resultExport/branch/add'),
          meta: {
            title: 'fenResultExportJian_add'
          }
        },
        {
          path: 'fenResultExportJian_send',
          name: 'fenResultExportJian_send',
          hidden: true,
          component: _import('sys-monitoringAnalysis/resultExport/branch/send'),
          meta: {
            title: 'fenResultExportJian_send'
          }
        }
      ]
    }
  ]
}
export default newRouter
