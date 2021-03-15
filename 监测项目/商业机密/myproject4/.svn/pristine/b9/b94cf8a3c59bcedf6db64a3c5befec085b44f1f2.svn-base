
import Layout from '../views/layout/Layout'
const _import = require('./_import_' + process.env.NODE_ENV)
const newRouter = {
  path: '/InformationManagement',
  component: Layout,
  name: 'InformationManagement',
  alwaysShow: true,
  meta: {
    title: 'InformationManagement',
    icon: 'work',
    role: ['monitor:InformationManagement:InformationManagement']
  },
  children: [
    // 上报线索库
    {
      path: '/reportClues',
      component: _import('sys-monitoringAnalysis/dataQuery/index'),
      name: 'reportClues',
      alwaysShow: true, // 一直显示根路由
      meta: {
        title: 'reportClues',
        role: ['monitor:reportClue:reportClueForBranch']
      },
      children: [
        {
          path: 'index',
          name: 'reportClues_index',
          component: _import('sys-monitoringAnalysis/informationInteraction/reportClues/index'),
          // hidden: true,
          meta: {
            title: 'reportCluesManage',
            role: ['monitor:reportClue:queryForBranch']
          }
        },
        {
          // 上报线索库 - 线索信息统计
          path: 'statistics',
          name: 'reportClues_statistics',
          component: _import('sys-monitoringAnalysis/informationInteraction/reportClues/statistics'),
          // hidden: true,
          meta: {
            title: 'statistics',
            role: ['monitor:reportClue:totalForBranch']
          }
        },
        {
          path: 'import',
          name: 'reportClues_import',
          component: _import('sys-monitoringAnalysis/informationInteraction/reportClues/import'),
          meta: {
            title: 'import'
          },
          hidden: true
        },
        {
          path: ':type/:id?',
          name: 'reportClues_add',
          component: _import('sys-monitoringAnalysis/informationInteraction/reportClues/add'),
          meta: {
            title: 'reportCluesAdd'
          },
          hidden: true
        }
      ]
    },
    // 上报名单
    {
      path: '/reportList',
      component: _import('sys-monitoringAnalysis/dataQuery/index'),
      name: 'reportList',
      alwaysShow: true, // 一直显示根路由
      meta: {
        title: 'reportList',
        role: ['monitor:reportlw:reportlwForBranch']
      },
      children: [
        {
          // 名单管理
          path: 'rosterManage',
          name: 'rosterWarning_rosterManage',
          component: _import(
            'sys-monitoringAnalysis/monitoringWarning/rosterWarning/rosterManage/index'
          ),
          meta: {
            title: 'rosterManage',
            role: ['monitor:reportLManage:reportLManageForBranch']
          }
        },
        {
          // 分支机构名单
          path: 'rosterManageBranch',
          name: 'rosterWarning_rosterManageBranch',
          component: _import(
            'sys-monitoringAnalysis/monitoringWarning/rosterWarning/rosterManageBranch/index'
          ),
          meta: {
            title: 'rosterManageBranch',
            role: ['monitor:reportLB:reportLBForBranch']
          }
        },
        {
          // 名单管理--手工录入
          path: 'rosterManage/manualEntry',
          name: 'rosterManage_manualEntry',
          component: _import(
            'sys-monitoringAnalysis/monitoringWarning/rosterWarning/rosterManage/manualEntry'
          ),
          meta: {
            title: 'manualEntry'
          },
          hidden: true
        },
        {
          // 分支机构管理--手工录入
          path: 'rosterManageBranch/manualEntry',
          name: 'rosterManageBranch_manualEntry',
          component: _import(
            'sys-monitoringAnalysis/monitoringWarning/rosterWarning/rosterManageBranch/manualEntry'
          ),
          meta: {
            title: 'manualEntry'
          },
          hidden: true
        },
        {
          // 名单管理--批量
          path: 'rosterManage/batchImport',
          name: 'rosterManage_batchImport',
          component: _import(
            'sys-monitoringAnalysis/monitoringWarning/rosterWarning/rosterManage/batchImport'
          ),
          meta: {
            title: 'import'
          },
          hidden: true
        },
        {
          // 名单管理--批量
          path: 'rosterManage/bigUpload',
          name: 'rosterManage_bigUpload',
          component: _import(
            'sys-monitoringAnalysis/monitoringWarning/rosterWarning/rosterManage/bigUpload'
          ),
          meta: {
            title: 'import'
          },
          hidden: true
        },
        {
          // 名单管理--分支批量
          path: 'rosterManageBranch/batchImport',
          name: 'rosterManageBranch_batchImport',
          component: _import(
            'sys-monitoringAnalysis/monitoringWarning/rosterWarning/rosterManageBranch/batchImport'
          ),
          meta: {
            title: 'import'
          },
          hidden: true
        },
        {
          // 名单管理--查看
          path: 'rosterManage/detail/:rosterId',
          name: 'rosterManage_detail',
          component: _import(
            'sys-monitoringAnalysis/monitoringWarning/rosterWarning/rosterManage/detail'
          ),
          meta: {
            title: 'import'
          },
          hidden: true
        },
        {
          // 名单管理--分支查看
          path: 'rosterManageBranch/detail/:rosterId',
          name: 'rosterManageBranch_detail',
          component: _import(
            'sys-monitoringAnalysis/monitoringWarning/rosterWarning/rosterManageBranch/detail'
          ),
          meta: {
            title: 'import'
          },
          hidden: true
        }
      ]
    },
    {
      path: '/reportEmphasisDoubtful',
      component: _import('sys-monitoringAnalysis/dataQuery/index'),
      name: 'reportEmphasisDoubtful',
      // redirect: '/reportEmphasisDoubtful/index',
      alwaysShow: true, // 一直显示根路由
      meta: {
        title: 'reportEmphasisDoubtful',
        role: ['monitor:reportSusTrade:reportSusTradeForBranch']
      },
      children: [
        {
          path: 'index',
          name: 'reportEmphasisDoubtful_index',
          component: _import('sys-monitoringAnalysis/reportEmphasisDoubtful/index'),
          // hidden: true,
          meta: {
            title: 'reportEmphasisDoubtfulQuery',
            role: ['monitor:reportSusTrade:totalForBranch']
          }
        },
        {
          // 上报重点可疑交易报告 - 统计
          path: 'statistics',
          name: 'reportEmphasisDoubtful_statistics',
          component: _import('sys-monitoringAnalysis/reportEmphasisDoubtful/statistics'),
          // hidden: true,
          meta: {
            title: 'reportEmphasisDoubtfulStatistics',
            role: ['monitor:reportSusTrade:queryForBranch']
          }
        },
        // {
        //   path: 'import',
        //   name: 'reportClues_import',
        //   component: _import('sys-monitoringAnalysis/informationInteraction/reportClues/import'),
        //   meta: {
        //     title: 'import'
        //   },
        //   hidden: true
        // },
        {
          path: 'reportEmphasisDoubtful/add',
          name: 'reportEmphasisDoubtful_add',
          component: _import('sys-monitoringAnalysis/reportEmphasisDoubtful/add'),
          meta: {
            title: 'reportCluesAdd'
          },
          hidden: true
        },
        {
          path: 'reportEmphasisDoubtful/import',
          name: 'reportEmphasisDoubtful_import',
          component: _import('sys-monitoringAnalysis/reportEmphasisDoubtful/import'),
          meta: {
            title: 'reportCluesAdd'
          },
          hidden: true
        }
      ]
    }
  ]
}
export default newRouter
