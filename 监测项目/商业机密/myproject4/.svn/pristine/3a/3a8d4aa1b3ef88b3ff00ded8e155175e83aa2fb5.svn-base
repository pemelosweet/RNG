import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
import monitoringAnalysis from './monitoringAnalysis'// 区域监测分析
import businessApplication from './businessApplication'// 业务申请
import InformationManagement from './InformationManagement'// 信息管理
// import statisticForm from './statisticForm'// 统计报表
// import { join } from 'path'
/**
 * 所有权限通用路由表
 * 如首页和登录页和一些不用权限的公用页面配置在这里
 * 配置详情
  hidden: true                   当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面(默认 false)
  redirect: noredirect           当设置 noredirect 的时候该路由不会在面包屑导航中出现
  name:'router-name'             设定路由的名字，一定要填写不然 使用 <keep-alive> 时会出现各种问题
  meta : {
    role: ['admin','editor']     设置该路由进入的权限，支持多个权限叠加
    title: 'title'               设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             设置该路由的图标
    noCache: true                如果设置为true ,则不会被 <keep-alive> 缓存(默认 false)
  }
**/
export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    component: _import('login/index'),
    hidden: true
  },
  {
    // 密码修改
    path: '/updataPassword',
    name: 'updataPassword',
    component: _import('login/updataPassword/index'),
    hidden: true
  },
  {
    path: '/404',
    component: _import('errorPage/404'),
    hidden: true
  },
  {
    path: '/systemMaintenance',
    component: _import('errorPage/systemMaintenance'),
    hidden: true
  },
  {
    path: '/changeLog',
    name: 'changeLog',
    component: _import('changeLog/index'),
    hidden: true
  },

  // demo  -upload
  {
    path: '/demo-upload',
    name: 'demo_upload',
    component: _import('demo/upload/index'),
    hidden: true
  }
]

// 实例化 vue 的时候只挂载constantRouter
export default new Router({
  // mode: 'history', // 后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  // fallback: true,
  routes: constantRouterMap
})

/**
 * 具有权限控制的菜单放在这里---------------------------------监测系统----------------------------------------
 */
export const monitorAnalysisRouterMap = [
  {
    path: '',
    component: Layout,
    redirect: 'index',
    name: 'home',
    meta: {
      title: 'home',
      icon: 'home'
    },
    children: [
      {
        path: 'index',
        name: 'monitor_workPlatform',
        component: _import('sys-monitoringAnalysis/workPlatform/index'),
        meta: {
          title: 'workPlatform',
          icon: 'work'
        }
      }
    ]
  },
  monitoringAnalysis,
  businessApplication,
  InformationManagement,
  // 测试页面
  {
    path: '/ceShi',
    name: 'ce_Shi',
    component: _import('sys-monitoringAnalysis/ceShi'),
    hidden: true
  },

  // 工作台--------监测
  // {
  //   path: '/workPlatform',
  //   component: Layout,
  //   name: 'monitorWorkPlatform',
  //   redirect: '/workPlatform/index',
  //   meta: {
  //     title: 'workPlatform',
  //     icon: 'work',
  //     role: [
  //       'monitor',
  //       'monitor_director',
  //       'monitor_manager',
  //       'monitor_transfer_person',
  //       'monitor_transfer_director',
  //       'monitor_analysis_director',
  //       'monitor_analysis_person',
  //       'monitor_analysis_leader',
  //       'monitor_transfer_numperson',
  //       'monitor_transfer_centerleader',
  //       'monitor_transfer_check',
  //       'monitor_transfer_general'
  //     ]
  //   },
  //   children: [{
  //     path: 'index',
  //     name: 'monitor_workPlatform',
  //     component: _import('sys-monitoringAnalysis/workPlatform/index'),
  //     meta: {
  //       title: 'workPlatform',
  //       icon: 'work'
  //     }
  //   }]
  // },

  // 联合分析
  {
    path: '/conjointAnalysis',
    component: Layout,
    name: 'conjointAnalysis',
    redirect: '/conjointAnalysis/list', // redirect: '/reportClues/index',
    // alwaysShow: true,
    meta: {
      title: 'conjointAnalysis',
      icon: 'work',
      role: ['monitor:jointAnalysis:jointAnalysis']
    },
    children: [
      {
        // hidden: true,
        path: 'list',
        name: 'conjointAnalysis_list',
        component: _import('sys-monitoringAnalysis/conjointAnalysis/list'),
        meta: {
          icon: 'work',
          title: 'conjointAnalysisList',
          role: ['monitor:jointAnalysis:query']
        }
      },
      {
        // 创建联合分析
        path: 'add',
        name: 'conjointAnalysis_add',
        component: _import('sys-monitoringAnalysis/conjointAnalysis/add'),
        meta: {
          title: 'conjointAnalysisAdd'
        },
        hidden: true
      },
      // {
      //   // 联合分析新建页面 - 分支机构端用户
      //   path: 'branch',
      //   name: 'conjointAnalysis_branch',
      //   component: _import('sys-monitoringAnalysis/conjointAnalysis/branch'),
      //   meta: {
      //     title: 'conjointAnalysisBranch'
      //   }
      // },

      //  联合分析统计
      {
        path: 'statistics',
        name: 'conjointAnalysis_statistics',
        component: _import('sys-monitoringAnalysis/conjointAnalysis/statistics'),
        hidden: true,
        meta: {
          title: 'conjointAnalysisStatistics',
          role: ['monitor:jointAnalysis:total']
        }
      },
      {
        path: 'detail',
        name: 'conjointAnalysis_detail',
        component: _import('sys-monitoringAnalysis/conjointAnalysis/detail'),
        meta: {
          title: 'conjointAnalysisDetail'
        },
        hidden: true
      }
    ]
  },
  // 中心端分发任务
  {
    path: '/sendTaskInfo',
    name: 'sendTaskInfo',
    component: Layout,
    redirect: '/sendTaskInfo/searchTaskInfo', // redirect: '/reportClues/index',
    alwaysShow: true,
    meta: {
      title: 'sendTaskInfo',
      icon: 'form',
      role: ['monitor:askAnalysisSend']
    },
    children: [
      {
        // 创建联合分析
        path: 'searchTaskInfo',
        name: 'searchTaskInfo',
        component: _import('sys-monitoringAnalysis/sendTaskInfo/list'),
        meta: {
          title: 'searchTaskInfo',
          role: ['monitor:areaFunction:taskAnalysis:query']
        }
      },
      {
        // 创建联合分析
        path: 'add',
        name: 'sendTaskInfo_add',
        component: _import('sys-monitoringAnalysis/sendTaskInfo/add'),
        meta: {
          title: 'sendTaskInfoAdd'
        },
        hidden: true
      }
    ]
  },
  // 中心端地方协查及导出结果
  {
    path: '',
    name: 'resultExport',
    component: Layout,
    redirect: 'sys-monitoringAnalysis/placeResultExport/center/list', // redirect: '/reportClues/index',
    meta: {
      title: 'resultExport',
      role: ['monitor:areaAndResultOut']
    },
    children: [
      {
        path: 'resultExport',
        component: _import('sys-monitoringAnalysis/placeResultExport/center/list'),
        meta: {
          title: 'resultExport',
          icon: 'form'
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
      }
    ]
  },
  // 中心端监测分析结果导出
  {
    path: '',
    name: 'resultExportJian',
    component: Layout,
    redirect: 'sys-monitoringAnalysis/resultExport/center/list', // redirect: '/reportClues/index',
    meta: {
      title: 'resultExportJian',
      role: ['monitor:outResult:menu']
    },
    children: [
      {
        path: 'resultExportJian',
        component: _import('sys-monitoringAnalysis/resultExport/center/list'),
        meta: {
          title: 'resultExportJian',
          icon: 'form'
        }
      },
      {
        path: 'resultExportJian_add',
        name: 'resultExportJian_add',
        hidden: true,
        component: _import('sys-monitoringAnalysis/resultExport/branch/add'),
        meta: {
          title: 'resultExportJian_add'
        }
      }
    ]
  },
  // 行政数据调查收集
  {
    path: '/administrationCollect',
    name: 'administrationCollect',
    alwaysShow: true,
    component: Layout,
    redirect: 'administrationCollect/dataUpload',
    meta: {
      icon: 'work',
      title: 'administrationCollect',
      role: ['monitor:AdmDataCollection:AdmDataCollection']
    },
    children: [
      {
        path: 'dataUpload',
        name: 'administrationCollect_dataUpload',
        component: _import('sys-monitoringAnalysis/administrationCollect/dataUpload'),
        meta: {
          title: 'collectDataUpload'
        },
        hidden: true
      },
      {
        path: 'view/:id',
        name: 'administrationCollect_view',
        component: _import('sys-monitoringAnalysis/administrationCollect/view'),
        meta: {
          title: 'collectDataUpload'
        },
        hidden: true
      },
      {
        path: 'query',
        name: 'administrationCollect_query',
        component: _import('sys-monitoringAnalysis/administrationCollect/query'),
        meta: {
          title: 'collectQuery',
          role: ['monitor:AdmDataCollection:query']
        }
      },
      {
        path: 'statistics',
        name: 'administrationCollect_statistics',
        component: _import('sys-monitoringAnalysis/administrationCollect/statistics'),
        meta: {
          title: 'collectStatistics',
          role: ['monitor:AdmDataCollection:total']
        }
      }
    ]
  },
  // 上报分析申请-黄志虎 // 中心端正确
  {
    path: '/judgedClues',
    component: Layout,
    name: 'judgedClues',
    redirect: '/judgedClues/index',
    alwaysShow: true, // 一直显示根路由
    meta: {
      title: 'judgedClues',
      icon: 'work',
      role: ['monitor:reportStudyClue:reportStudyClue']
    },
    children: [
      {
        path: 'index',
        name: 'judgedClues_index',
        component: _import('sys-monitoringAnalysis/judgedClues/index'),
        meta: {
          title: 'submit',
          role: ['monitor:reportStudyClue:query']
        }
      },
      {
        // 仅为演示使用（权限）
        path: 'manage',
        name: 'judgedClues_manage',
        component: _import('sys-monitoringAnalysis/judgedClues/manage'),
        meta: {
          title: 'judgedCluesManage',
          role: ['monitor:reportStudyClue:centerQuery']
        }
      },
      {
        // 中心端-上报判研线索 - 移送情况
        path: 'manage/handOver',
        name: 'judgedClues_handOver',
        component: _import('sys-monitoringAnalysis/judgedClues/handOver'),
        meta: {
          title: 'analyzeManage'
        },
        hidden: true
      },
      {
        // 仅为演示使用（权限）
        path: 'analyze',
        name: 'judgedClues_analyze',
        component: _import('sys-monitoringAnalysis/judgedClues/analyze'),
        meta: {
          title: 'analyze'
        },
        hidden: true
      },
      {
        // 仅为演示使用（权限）
        path: 'analyzeManage',
        name: 'judgedClues_analyzeManage',
        component: _import('sys-monitoringAnalysis/judgedClues/analyzeManage'),
        meta: {
          title: 'analyzeManage'
        },
        hidden: true
      },
      {
        path: 'add',
        name: 'judgedClues_add',
        component: _import('sys-monitoringAnalysis/judgedClues/add'),
        meta: {
          title: 'add'
        },
        hidden: true
      },
      {
        // 中心端-上报判研线索 - 后续办理情况
        path: 'analyzeManage/subsequent',
        name: 'judgedClues_subsequent',
        component: _import('sys-monitoringAnalysis/judgedClues/subsequent'),
        meta: {
          title: 'analyzeManage'
        },
        hidden: true
      },
      {
        // 中心端-上报判研线索 - 后续办理情况 -- 添加后续办理情况
        path: 'analyzeManage/subsequent/subsequentAdd',
        name: 'judgedClues_subsequent_subsequentAdd',
        component: _import('sys-monitoringAnalysis/judgedClues/subsequentAdd'),
        meta: {
          title: 'analyzeManage'
        },
        hidden: true
      },
      {
        // 中心端-上报判研线索 - 后续办理情况 -- 查看添加历史
        path: 'analyzeManage/subsequent/subsequentHistory',
        name: 'judgedClues_subsequent_subsequentHistory',
        component: _import('sys-monitoringAnalysis/judgedClues/subsequentHistory'),
        meta: {
          title: 'analyzeManage'
        },
        hidden: true
      },
      {
        // 中心端-上报判研线索 - 统计
        path: 'statistics',
        name: 'judgedClues_statistics',
        component: _import('sys-monitoringAnalysis/judgedClues/statistics'),
        // hidden: true,
        meta: {
          title: 'judgedCluesStatistics',
          role: ['monitor:reportStudyClue:total']
        }
      }
    ]
  },
  // 中心端-上报线索库-黄志虎
  {
    path: '/reportClues',
    component: Layout,
    name: 'reportClues',
    redirect: '/reportClues/index',
    alwaysShow: true, // 一直显示根路由
    meta: {
      title: 'reportClues',
      icon: 'work',
      role: ['monitor:reportClue:reportClue']
    },
    children: [
      {
        path: 'index',
        name: 'reportClues_index',
        component: _import('sys-monitoringAnalysis/informationInteraction/reportClues/index'),
        // hidden: true,
        meta: {
          title: 'reportCluesManage',
          role: ['monitor:reportClue:query']
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
          role: ['monitor:reportClue:total']
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
  // 上报重点可疑交易报告
  {
    path: '/reportEmphasisDoubtful',
    component: Layout,
    name: 'reportEmphasisDoubtful',
    redirect: '/reportEmphasisDoubtful/index',
    alwaysShow: true, // 一直显示根路由
    meta: {
      title: 'reportEmphasisDoubtful',
      icon: 'work',
      role: ['monitor:reportSusTrade:reportSusTradeForCenter']
    },
    children: [
      {
        path: 'index',
        name: 'reportEmphasisDoubtful_index',
        component: _import('sys-monitoringAnalysis/reportEmphasisDoubtful/index'),
        // hidden: true,
        meta: {
          title: 'reportEmphasisDoubtfulQuery',
          role: ['monitor:reportSusTrade:totalForCenter']
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
          role: ['monitor:reportSusTrade:queryForCenter']
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
  },
  // 分析监测-重点可疑报告核对-黄志虎
  {
    path: '/emphasisDoubtful',
    component: Layout,
    name: 'emphasisDoubtful',
    // alwaysShow: true,
    redirect: '/emphasisDoubtful/index',
    meta: {
      title: 'emphasisDoubtful',
      icon: 'work',
      role: ['monitor:keySusReport:keySusReport']
    },
    children: [
      {
        // 重点可疑报告核对录入处理状态报告
        path: 'index',
        name: 'emphasisDoubtful_index',
        component: _import('sys-monitoringAnalysis/emphasisDoubtful/index'),
        meta: {
          title: 'emphasisDoubtful',
          icon: 'work'
        }
      }
    ]
  },
  // 重点可疑报告核对管理
  {
    path: '/suspiciousCheck',
    component: Layout,
    name: 'suspiciousCheck',
    redirect: '/suspiciousCheck/index',
    // alwaysShow: true, // 一直显示根路由
    meta: {
      title: 'suspiciousCheck',
      icon: 'work',
      role: ['monitor:keySusReportManage:keySusReportManage']
    },
    children: [
      {
        path: 'index',
        name: 'suspiciousCheckQuery',
        component: _import('sys-monitoringAnalysis/suspiciousCheck/index'),
        meta: {
          title: 'suspiciousCheck',
          icon: 'work'
        }
      },
      {
        // 重点可疑报告核对手工录入
        path: 'suspiciousCheck/add',
        name: 'suspiciousCheck_add',
        component: _import('sys-monitoringAnalysis/suspiciousCheck/add'),
        meta: {
          title: 'suspiciousCheck_add'
        },
        hidden: true
      },
      {
        // 重点可疑报告核对批量录入
        path: 'suspiciousCheck/batchImport',
        name: 'suspiciousCheck_batchImport',
        component: _import('sys-monitoringAnalysis/suspiciousCheck/batchImport'),
        meta: {
          title: 'suspiciousCheck_batchImport'
        },
        hidden: true
      },
      {
        // 重点可疑报告核对查看详情
        path: 'suspiciousCheck/details',
        name: 'suspiciousCheck_details',
        component: _import('sys-monitoringAnalysis/suspiciousCheck/details'),
        meta: {
          title: 'suspiciousCheck_details',
          icon: 'work'
        },
        hidden: true
      }
    ]
  },

  // 任务管理
  // {
  //   path: '/taskManagement',
  //   component: Layout,
  //   name: 'taskManagement',
  //   redirect: '/taskManagement/index',
  //   meta: {
  //     title: 'taskManagement',
  //     icon: 'icon'
  //   },
  //   children: [
  //     {
  //       // 任务管理-高级预警结果分发-分析处室
  //       path: 'index',
  //       name: 'taskManagement_index',
  //       component: _import(
  //         'sys-monitoringAnalysis/taskManagement/index'
  //       ),
  //       meta: {
  //         title: 'advancedDistribution'
  //       }
  //     }
  //   ]
  // },
  // 分析监测-线索分析专项申请-黄志虎 改名 跨区域数据申请
  {
    path: '/analysisSpecial',
    component: Layout,
    name: 'analysisSpecial',
    redirect: '/analysisSpecial/index',
    alwaysShow: true, // 一直显示根路由
    meta: {
      title: 'analysisSpecial',
      icon: 'work',
      role: ['monitor:clueAnalysisSpecial:clueAnalysisSpecial']
    },
    children: [
      {
        path: 'index',
        name: 'analysisSpecial_query',
        component: _import('sys-monitoringAnalysis/analysisSpecial/index'),
        meta: {
          title: 'analysisSpecialQuery',
          role: ['monitor:clueAnalysisSpecial:query']
        }
      },
      {
        path: 'clueSave',
        name: 'analysisSpecial_clueSave',
        component: _import('sys-monitoringAnalysis/analysisSpecial/clue/clueSave'),
        meta: {
          title: 'analysisSpecialQuery'
        },
        hidden: true
      },
      {
        path: 'statistics',
        name: 'analysisSpecial_statistics',
        component: _import('sys-monitoringAnalysis/analysisSpecial/statistics'),
        meta: {
          title: 'analysisSpecialStatistics',
          role: ['monitor:clueAnalysisSpecial:total']
        }
      },
      {
        path: 'applyForm',
        name: 'analysisSpecial_applyForm',
        component: _import('sys-monitoringAnalysis/analysisSpecial/applyForm'),
        meta: {
          // title: 'analysisSpecialApply',
          // role: ['monitor:clueAnalysisSpecial:application']
        },
        hidden: true
      }
    ]
  },
  {
    path: '/businessManage',
    component: Layout,
    name: 'businessManage',
    redirect: '/businessManage/index',
    alwaysShow: true,
    meta: {
      title: 'businessManage',
      icon: 'work',
      role: ['monitor:areaFunction:crossRegionalCenter']
    },
    children: [
      {
        path: 'index',
        name: 'businessManage_query',
        component: _import('sys-monitoringAnalysis/analysisSpecial/index2'),
        meta: {
          title: 'businessManage_query',
          role: ['monitor:clueAnalysisSpecial:queryForCenter']
        }
      },
      {
        path: 'clueSave',
        name: 'analysisSpecial_clueSave2',
        component: _import('sys-monitoringAnalysis/analysisSpecial/clue/clueSave2'),
        meta: {
          title: 'analysisSpecialQuery'
        },
        hidden: true
      },
      {
        path: 'statistics',
        name: 'analysisSpecial_statistics',
        component: _import('sys-monitoringAnalysis/analysisSpecial/statistics2'),
        meta: {
          title: 'analysisSpecialStatistics',
          role: ['monitor:clueAnalysisSpecial:totalForCenter']
        }
      },
      {
        path: 'applyForm',
        name: 'analysisSpecial_applyForm',
        component: _import('sys-monitoringAnalysis/analysisSpecial/applyForm'),
        meta: {
          // title: 'analysisSpecialApply',
          // role: ['monitor:clueAnalysisSpecial:application']
        },
        hidden: true
      }
    ]
  },
  // 名单管理及预警
  {
    path: '/rosterWarning',
    component: Layout,
    alwaysShow: true,
    meta: {
      title: 'rosterWarning',
      icon: 'icon',
      role: ['monitor:listWarn:listWarn']
    },
    children: [
      // {
      //   // 任务管理-高级预警结果分发-分析处室
      //   path: 'index',
      //   name: 'taskManagement_index',
      //   component: _import(
      //     'sys-monitoringAnalysis/taskManagement/index'
      //   ),
      //   meta: {
      //     title: 'advancedDistribution'
      //   }
      // },
      // {
      //   // 任务管理-高级预警结果分发-分析处室
      //   path: 'earlyWarningResults',
      //   name: 'taskManagement_earlyWarningResults',
      //   component: _import(
      //     'sys-monitoringAnalysis/taskManagement/earlyWarningResults'
      //   ),
      //   meta: {
      //     title: 'earlyWarningResults'
      //   }
      // },
      {
        // 名单管理
        path: 'rosterManage',
        name: 'rosterWarning_rosterManage',
        component: _import(
          'sys-monitoringAnalysis/monitoringWarning/rosterWarning/rosterManage/index'
        ),
        meta: {
          title: 'rosterManage',
          role: ['monitor:listManage:listManage']
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
          role: ['monitor:branchManage:branchManage']
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
      // {
      //   // 名单管理--名单预警配置
      //   path: 'rosterManage/deploy',
      //   name: 'rosterManage_deploy',
      //   component: _import(
      //     'sys-monitoringAnalysis/monitoringWarning/rosterWarning/rosterManage/deploy'
      //   ),
      //   meta: {
      //     title: 'rosterManageDeploy'
      //   }
      // },
      // {
      //   // 名单管理--分支名单预警配置
      //   path: 'rosterManageBranch/deploy',
      //   name: 'rosterManageBranch_deploy',
      //   component: _import(
      //     'sys-monitoringAnalysis/monitoringWarning/rosterWarning/rosterManageBranch/deploy'
      //   ),
      //   meta: {
      //     title: 'rosterManageDeploy'
      //   }
      // },
      // {
      //   // 名单管理--名单预警配置 新增配置
      //   path: 'rosterManage/depAdd',
      //   name: 'rosterManage_depAdd',
      //   component: _import(
      //     'sys-monitoringAnalysis/monitoringWarning/rosterWarning/rosterManage/depAdd'
      //   ),
      //   meta: {
      //     title: 'depAdd'
      //   },
      //   hidden: true
      // },
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
      },
      {
        // 名单管理--名单对比
        path: 'rosterManage/comparison',
        name: 'rosterManage_comparison',
        component: _import(
          'sys-monitoringAnalysis/monitoringWarning/rosterWarning/rosterManage/comparison'
        ),
        meta: {
          title: 'import'
        },
        hidden: true
      },
      {
        // 名单管理--分析员
        path: 'rosterManageanalyst',
        name: 'rosterWarning_rosterManageanalyst',
        component: _import(
          'sys-monitoringAnalysis/monitoringWarning/rosterWarning/rosterManageanalyst/index'
        ),
        meta: {
          title: 'rosterManageanalyst',
          role: ['monitor:attentionList:attentionList']
        }
      },
      {
        // 代码配置
        path: 'levelConfiguration',
        name: 'rosterWarning_levelConfiguration',
        component: _import(
          'sys-monitoringAnalysis/monitoringWarning/rosterWarning/levelConfiguration/index'
        ),
        meta: {
          title: 'levelConfiguration',
          role: ['monitor:listWarn:configuration']
        }
      },
      {
        // 授权管理
        path: 'authorization',
        name: 'rosterManage_authorization',
        component: _import(
          'sys-monitoringAnalysis/monitoringWarning/rosterWarning/authorization/index'
        ),
        meta: {
          title: 'authorizationManage',
          role: ['monitor:licenseManage:licenseManage']
        }
      },
      {
        // 代码配置--批量
        path: 'levelConfiguration/batchImport',
        name: 'levelConfiguration_batchImport',
        component: _import(
          'sys-monitoringAnalysis/monitoringWarning/rosterWarning/levelConfiguration/batchImport'
        ),
        meta: {
          title: 'import'
        },
        hidden: true
      },
      {
        // 名单管理--批量
        path: 'rosterManageanalyst/batchImport',
        name: 'rosterManageanalyst_batchImport',
        component: _import(
          'sys-monitoringAnalysis/monitoringWarning/rosterWarning/rosterManageanalyst/batchImport'
        ),
        meta: {
          title: 'import'
        },
        hidden: true
      },
      {
        // 名单管理--手工录入
        path: 'rosterManageanalyst/:type/:id?',
        name: 'rosterManageanalyst_handleImport',
        component: _import(
          'sys-monitoringAnalysis/monitoringWarning/rosterWarning/rosterManageanalyst/handleImport'
        ),
        meta: {
          title: 'import'
        },
        hidden: true
      },
      {
        // 名单管理--查看名单
        path: 'detail/:id',
        name: 'rosterManageanalyst_detail',
        component: _import(
          'sys-monitoringAnalysis/monitoringWarning/rosterWarning/rosterManageanalyst/detail'
        ),
        meta: {
          title: 'import'
        },
        hidden: true
      },
      {
        // 预警规则管理
        path: 'forewarningRule',
        name: 'forewarningRule',
        component: _import(
          'sys-monitoringAnalysis/monitoringWarning/rosterWarning/forewarningRule/index'
        ),
        meta: {
          title: 'forewarningRule',
          role: ['monitor:warnRuleManage:warnRuleManage']
        }
      },
      // {
      //   // 高级预警规则管理
      //   path: 'advancedForewarningRule',
      //   name: 'advancedForewarningRule',
      //   component: _import(
      //     'sys-monitoringAnalysis/monitoringWarning/rosterWarning/advancedForewarningRule/index'
      //   ),
      //   meta: {
      //     title: 'advancedForewarningRule'
      //     // role: ['monitor:warnRuleManage:seniorwarnRuleManage']
      //   }
      // },
      {
        // 预警规则管理 - 新增规则
        path: 'forewarningRule/add',
        name: 'forewarningRule_add',
        component: _import(
          'sys-monitoringAnalysis/monitoringWarning/rosterWarning/forewarningRule/add'
        ),
        meta: {
          title: 'add'
        },
        hidden: true
      },
      // {
      //   // 高级预警规则管理 - 新增规则
      //   path: 'advancedForewarningRule/addSenior',
      //   name: 'forewarningRule_addSenior',
      //   component: _import(
      //     'sys-monitoringAnalysis/monitoringWarning/rosterWarning/advancedForewarningRule/addSenior'
      //   ),
      //   meta: {
      //     title: 'addSenior'
      //   },
      //   hidden: true
      // },
      {
        // 预警任务管理
        path: 'forewarningTask',
        name: 'forewarningTask',
        component: _import(
          'sys-monitoringAnalysis/monitoringWarning/rosterWarning/forewarningTask/index'
        ),
        meta: {
          title: 'forewarningTask',
          role: ['monitor:warnTaskManage:warnTaskManage']
        }
      },
      // {
      //   // 高级预警任务管理
      //   path: 'advancedForewarningTask',
      //   name: 'advancedForewarningTask',
      //   component: _import(
      //     'sys-monitoringAnalysis/monitoringWarning/rosterWarning/advancedForewarningTask/index'
      //   ),
      //   meta: {
      //     title: 'advancedForewarningTask',
      //     role: ['monitor:warnTaskManage:seniorwarnTaskManage']
      //   }
      // },
      {
        // 预警结果管理
        path: 'forewarningEnd',
        name: 'forewarningEnd',
        component: _import(
          'sys-monitoringAnalysis/monitoringWarning/rosterWarning/forewarningEnd/index'
        ),
        meta: {
          title: 'forewarningEnd',
          role: ['monitor:warnResultManage:warnResultManage']
        }
      },
      {
        // 高级名单预警处理
        path: 'advancedWarnListDispos',
        name: 'advancedWarnListDispos',
        component: _import(
          'sys-monitoringAnalysis/monitoringWarning/rosterWarning/advancedWarnListDispos/index'
        ),
        meta: {
          title: 'advancedWarnListDispos',
          role: ['monitor:warnResultManage:advancedWarnListDispose']
        }
      },
      // 预警规则配置
      {
        path: 'rule-configer',
        name: 'systemManage_ruleConfiger',
        component: _import('sys-monitoringAnalysis/systemManage/rule-configer'),
        meta: {
          title: 'ruleConfiger',
          role: ['monitor:warnRuleConfig:warnRuleConfig']
        }
      },
      {
        // 预警任务--新增
        path: 'forewarningTask/:type/:id?',
        name: 'forewarningTask_add',
        component: _import(
          'sys-monitoringAnalysis/monitoringWarning/rosterWarning/forewarningTask/add'
        ),
        meta: {
          title: 'newTask'
        },
        hidden: true
      },
      // {
      //   // 高级预警任务--新增
      //   path: 'advancedForewarningTask/:type/:id?',
      //   name: 'advancedForewarningTask_addSenior',
      //   component: _import(
      //     'sys-monitoringAnalysis/monitoringWarning/rosterWarning/advancedForewarningTask/addSenior'
      //   ),
      //   meta: {
      //     title: 'newTask'
      //   },
      //   hidden: true
      // },

      {
        // 预警结果管理 - 监测报告
        path: 'forewarningEnd/detail',
        component: _import(
          'sys-monitoringAnalysis/monitoringWarning/rosterWarning/forewarningEnd/detail'
        ),
        name: 'forewarningEnd_detail',
        meta: {
          title: 'detail'
        },
        hidden: true
      },
      {
        // 预警结果管理 - 定期汇总
        path: 'forewarningEnd/period-summarize/detail',
        component: _import(
          'sys-monitoringAnalysis/monitoringWarning/rosterWarning/forewarningEnd/summarize-detail'
        ),
        name: 'periodSummarize_detail',
        meta: {
          title: 'add'
        },
        hidden: true
      },
      {
        // 预警结果管理 - 定期汇总
        path: 'forewarningEnd/:type',
        component: _import(
          'sys-monitoringAnalysis/monitoringWarning/rosterWarning/forewarningEnd/more'
        ),
        name: 'forewarningEnd_more',
        meta: {
          title: 'add'
        },
        hidden: true
      },

      {
        // 授权管理
        path: 'detail/:id',
        name: 'rosterManage_authorization_detail',
        component: _import(
          'sys-monitoringAnalysis/monitoringWarning/rosterWarning/authorization/detail'
        ),
        meta: {
          title: 'authorizationManage'
        },
        hidden: true
      },
      {
        // 授权管理---新增授权
        path: 'authorization/add',
        name: 'authorization_add',
        component: _import(
          'sys-monitoringAnalysis/monitoringWarning/rosterWarning/authorization/add'
        ),
        meta: {
          title: 'addAuthorization'
        },
        hidden: true
      }
    ]
  },
  // 数据查询
  {
    path: '/dataQuery',
    component: Layout,
    name: 'dataQuery',
    alwaysShow: true, // 一直显示根路由
    meta: {
      title: 'dataQuery',
      icon: 'form',
      role: ['monitor:dataQuery:dataQuery']
    },
    children: [
      {
        // 数据查询 - 定制结果
        path: 'customResults',
        component: _import('sys-monitoringAnalysis/dataQuery/customResults/index'),
        name: 'dataQuery_customResults',
        meta: {
          title: 'customResults',
          role: ['monitor:dataManage:customResult']
        }
      },
      {
        // 数据查询 - 查询模板管理 - Paul // 数据查询数据查询
        path: 'templateManage',
        component: _import('sys-monitoringAnalysis/dataQuery/templateManage/index'),
        name: 'dataQuery_templateManage',
        meta: {
          title: 'templateManage',
          role: ['monitor:dataManage:template']
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
      // {
      //   // 数据查询 - 查询模板管理 - 查看模板
      //   path: 'templateManage/detail/:tplName',
      //   component: _import('sys-monitoringAnalysis/dataQuery/templateManage/detail'),
      //   name: 'dataQuery_templateManage_detail',
      //   hidden: true
      // },
      {
        path: 'dataType',
        name: 'dataQuery_dataType',
        component: _import('sys-monitoringAnalysis/dataQuery/dataType/index'),
        meta: {
          title: 'dataType',
          role: ['monitor:dataManage:specificDataTypeQuery']
        }
      },
      // {
      //   path: 'dataType/customResults',
      //   name: 'dataType_customResults',
      //   component: _import('sys-monitoringAnalysis/dataQuery/dataType/customResults'),
      //   meta: {
      //     title: 'customResults'
      //   },
      //   hidden: true
      // },
      {
        path: 'dataType/deleteRecord',
        name: 'dataType_deleteRecord',
        component: _import('sys-monitoringAnalysis/dataQuery/dataType/deleteRecord'),
        meta: {
          title: 'deleteRecord'
        },
        hidden: true
      },
      // {
      //   path: 'dataType/markProblem',
      //   name: 'dataType_markProblem',
      //   component: _import('sys-monitoringAnalysis/dataQuery/dataType/markProblem'),
      //   meta: {
      //     title: 'markProblem'
      //   },
      //   hidden: true
      // },
      {
        // 交易详情
        path: 'dataType/tradeDetail',
        name: 'dataType_tradeDetail',
        component: _import('sys-monitoringAnalysis/dataQuery/dataType/tradeDetail'),
        hidden: true
      },
      // {
      //   path: 'dataType/detail/report',
      //   name: 'dataType_detail_report',
      //   component: _import('sys-monitoringAnalysis/dataQuery/dataType/detail/report'),
      //   hidden: true
      // },
      // {
      //   path: 'dataType/detail/large',
      //   name: 'dataType_detail_large',
      //   component: _import('sys-monitoringAnalysis/dataQuery/dataType/detail/large'),
      //   hidden: true
      // },
      // {
      //   path: 'dataType/detail/suspicious',
      //   name: 'dataType_detail_suspicious',
      //   component: _import('sys-monitoringAnalysis/dataQuery/dataType/detail/suspicious'),
      //   hidden: true
      // },
      {
        // 近、离线数据任务下载
        path: 'dataDown',
        component: _import('sys-monitoringAnalysis/dataQuery/dataDown/index'),
        name: 'dataQuery_dataDown',
        meta: {
          title: 'dataDown',
          role: ['monitor:dataDown:dataDown']
          // role: ['monitor:LifeCycle:LifeCycle']
        }
      },
      {
        // 数据查询 - 批量自动查询 - paul // 特定数据查询 // 特定数据查询--定制结果要素 // 特定数据查询--纠删履历 // 特定数据查询--录入标注名单信息 // 特定数据查询--标注问题 // 特定数据查询--报告类型详情--报告 // 特定数据查询--交易类型详情--大额 // 特定数据查询--交易类型详情--可疑
        path: 'automaticQuery',
        component: _import('sys-monitoringAnalysis/dataQuery/automaticQuery/index'),
        name: 'dataQuery_automaticQuery',
        meta: {
          title: 'automaticQuery',
          role: ['monitor:dataManage:batchAutomaticQuery']
        }
      },
      {
        path: 'search',
        component: _import('sys-monitoringAnalysis/dataQuery/search/index'),
        name: 'dataQuery_search',
        meta: {
          title: 'search',
          role: ['monitor:dataManage:fullTextRetrieval']
        }
      },

      {
        // 数据查询 - 回执查询
        path: 'receiptQuery',
        component: _import('sys-monitoringAnalysis/dataQuery/receipt/index'),
        name: 'dataQuery_receiptQuery',
        hidden: true,
        meta: {
          title: 'receiptQuery',
          role: ['monitor:dataManage:returnQuery']
        }
      },
      {
        // 数据查询 - 情报类文件查询 - paul
        path: 'intelligenceFile',
        component: _import('sys-monitoringAnalysis/dataQuery/intelligenceFile/index'),
        name: 'dataQuery_intelligenceFile',
        hidden: true,
        meta: {
          title: 'intelligenceFile',
          role: ['monitor:dataManage:intelligenceQuery']
        }
      },
      {
        // 数据查询 - 情报类文件查询 - 定制查询模板 - paul
        path: 'intelligenceFile/custom',
        component: _import('sys-monitoringAnalysis/dataQuery/intelligenceFile/custom'),
        name: 'dataQuery_intelligenceFile_custom',
        meta: {
          title: 'custom'
        },
        hidden: true
      },
      {
        // 数据查询 - 情报类文件查询 - 定制查询模板 -定制结果列表- paul
        path: 'intelligenceFile/resultList',
        component: _import('sys-monitoringAnalysis/dataQuery/intelligenceFile/resultList'),
        name: 'dataQuery_intelligenceFile_resultList',
        meta: {
          title: 'resultList'
        },
        hidden: true
      },
      {
        // 数据查询 - 情报类文件查询 - 查看-反馈信息- paul
        path: 'intelligenceFile/feedback',
        component: _import('sys-monitoringAnalysis/dataQuery/intelligenceFile/feedback'),
        name: 'dataQuery_intelligenceFile_feedback',
        meta: {
          title: 'view'
        },
        hidden: true
      },
      {
        // 数据查询 - 情报类文件查询 - 查看- paul
        path: 'intelligenceFile/view',
        component: _import('sys-monitoringAnalysis/dataQuery/intelligenceFile/view'),
        name: 'dataQuery_intelligenceFile_view',
        meta: {
          title: 'view'
        },
        hidden: true
      }
    ]
  },
  // 统计报表
  {
    path: '/statisticForm',
    component: Layout,
    redirect: 'sys-monitoringAnalysis/statisticForm/index',
    alwaysShow: true, // 一直显示根路由
    meta: {
      icon: 'form',
      title: 'statisticForm',
      role: ['monitor:totalReport:totalReport']
    },
    children: [
      {
        // 固定报表
        path: 'index',
        name: 'fixedStatements_index',
        component: _import('sys-monitoringAnalysis/statisticForm/fixedStatements/index'),
        meta: {
          title: 'fixedStatements',
          role: ['monitor:totalReport:fixReport']
        }
      },
      {
        // 反洗钱局
        path: '/antimoneyAuthority',
        component: _import('sys-monitoringAnalysis/statisticForm/index'),
        redirect: 'sys-monitoringAnalysis/statisticForm/antimoneyAuthority/index',
        alwaysShow: true,
        meta: {
          title: 'antimoneyAuthority',
          role: ['monitor:totalReport:total']
        },
        children: [
          {
            path: 'index',
            name: 'statisticForm_big',
            component: _import('sys-monitoringAnalysis/statisticForm/antimoneyAuthority/index'),
            meta: {
              title: 'bigstatistic',
              role: ['monitor:total:highTrade']
            }
          },
          {
            // 支付机构大额统计分析
            path: 'payingOrg',
            name: 'statisticForm_payingOrg',
            component: _import(
              'sys-monitoringAnalysis/statisticForm/antimoneyAuthority/payingOrg'
            ),
            meta: {
              title: 'payingOrgstatistic',
              role: ['monitor:total:payingOrg']
            }
          },
          {
            // 可疑交易统计分析
            path: 'suspicious',
            name: 'statisticForm_suspicious',
            component: _import(
              'sys-monitoringAnalysis/statisticForm/antimoneyAuthority/suspicious'
            ),
            meta: {
              title: 'suspiciousstatistic',
              role: ['monitor:total:suspectTrade']
            }
          },
          {
            // 按交易主体统计
            path: 'dealmain',
            name: 'statisticForm_dealmain',
            component: _import('sys-monitoringAnalysis/statisticForm/antimoneyAuthority/dealmain'),
            meta: {
              title: 'suspiciousdealmain',
              role: ['monitor:total:subject']
            }
          },
          {
            // 账户资金流向分析
            path: 'moneyflow',
            name: 'statisticForm_moneyflow',
            component: _import('sys-monitoringAnalysis/statisticForm/antimoneyAuthority/moneyflow'),
            meta: {
              title: 'suspiciousflow',
              role: ['monitor:total:moneyFlow']
            }
          },
          {
            // 账户资金流向分析
            path: 'timerrate',
            name: 'statisticForm_timerrate',
            component: _import('sys-monitoringAnalysis/statisticForm/antimoneyAuthority/timerrate'),
            meta: {
              title: 'suspiciousrate',
              role: ['monitor:total:timelyRate']
            }
          },
          {
            // 账户资金流向分析
            path: 'sequence',
            name: 'statisticForm_sequence',
            component: _import('sys-monitoringAnalysis/statisticForm/antimoneyAuthority/sequence'),
            meta: {
              title: 'suspicioussequence',
              role: ['monitor:total:sequential']
            }
          },

          {
            // 图形展示化
            path: 'graphical',
            name: 'statisticForm_graphical',
            component: _import('sys-monitoringAnalysis/statisticForm/antimoneyAuthority/graphical'),
            meta: {
              title: 'suspiciousgraphical'
            },
            hidden: true
          },

          {
            // 自定义统计分析
            path: 'custom',
            name: 'statisticForm_custom',
            component: _import('sys-monitoringAnalysis/statisticForm/antimoneyAuthority/custom'),
            meta: {
              title: 'suspiciouscustom',
              role: ['monitor:total:customize']
            }
            // hidden: true
          }
        ]
      }
    ]
  },
  // 仪表盘
  {
    path: '',
    component: Layout,
    redirect: 'sys-monitoringAnalysis/statisticAnalysis/dashboard/index',
    name: 'dashboard_index',
    meta: {
      title: 'dashboard',
      icon: 'work',
      role: ['monitor:dashboard:dashboard']
    },
    children: [
      {
        path: 'dashboard',
        component: _import('sys-monitoringAnalysis/statisticAnalysis/dashboard/index'),
        meta: {
          title: 'dashboard',
          icon: 'form'
        }
      }
    ]
  },
  // 数据治理
  {
    path: '/dataGovernance',
    component: Layout,
    redirect: '/dataGovernance/rule/index',
    name: 'dataGovernance',
    alwaysShow: true,
    meta: {
      title: 'dataGovernance',
      icon: 'example',
      role: ['monitordataGovernance:dataGovernance']
    },
    children: [
      {
        // 公共common--交易详情--大额
        path: 'tradeDetail/tradeDetail',
        name: 'dataGovernance_tradeDetail_tradeDetail',
        component: _import('sys-monitoringAnalysis/dataGovernance/common/tradeDetail/tradeDetail'),
        hidden: true
      },
      {
        // 公共common--交易详情--报文
        path: 'tradeDetail/report',
        name: 'dataGovernance_tradeDetail_report',
        component: _import('sys-monitoringAnalysis/dataGovernance/common/tradeDetail/report'),
        hidden: true
      },
      {
        // 规则扫描
        path: '/rule',
        component: _import('sys-monitoringAnalysis/dataGovernance/rule/index'),
        redirect: '/dataGovernance/rule/rule',
        alwaysShow: true,
        meta: {
          title: 'ruleScanning',
          role: ['monitor:dataGovernance:regularScan']
        },
        children: [ // 规则配置
          {
            path: 'index',
            component: _import('sys-monitoringAnalysis/dataGovernance/rule/rule'),
            name: 'dataGovernance_rule',
            meta: {
              title: 'rule',
              role: ['monitor:regularScan:regularSet']
            }
          },
          { // 扫描问题
            path: 'scanningMonitor/index',
            component: _import('sys-monitoringAnalysis/dataGovernance/rule/scanningMonitor/index'),
            name: 'dataGovernance_rule_scanningMonitor',
            meta: {
              title: 'scanningMonitor',
              role: ['monitor:regularScan:scanningProblem']
            }
          },
          {
            // 扫描问题历史
            path: 'scanningTask/index',
            component: _import('sys-monitoringAnalysis/dataGovernance/rule/scanningTask/index'),
            name: 'dataGovernance_rule_scanningTask',
            meta: {
              title: 'scanningTask',
              role: ['monitor:regularScan:scanningProblemRecord']
            }
          }
        ]
      },
      {
        // 数据抽样分析
        path: '/dataSampling',
        component: _import('sys-monitoringAnalysis/dataGovernance/dataSampling/index'),
        redirect: '/dataGovernance/dataSampling/dataSampling',
        alwaysShow: true,
        meta: {
          title: 'dataSampling',
          role: ['monitor:dataGovernance:dataSampling']
        },
        children: [// 数据抽样
          {
            path: 'index',
            component: _import('sys-monitoringAnalysis/dataGovernance/dataSampling/sampling/index'),
            name: 'dataGovernance_dataSampling',
            meta: {
              title: 'dataSampling',
              role: ['monitor:dataSampling:dataSampling']
            }
          },
          {
            path: 'dealList',
            component: _import(
              'sys-monitoringAnalysis/dataGovernance/dataSampling/common/dealList'
            ),
            name: 'dataGovernance_dataSampling_common_dealList',
            hidden: true
          },
          { // 新增抽样任务
            path: 'createTask',
            component: _import(
              'sys-monitoringAnalysis/dataGovernance/dataSampling/common/createTask'
            ),
            name: 'dataGovernance_dataSampling_common_createTask',
            hidden: true
          },
          { // 数据抽样历史
            path: 'history/index',
            component: _import('sys-monitoringAnalysis/dataGovernance/dataSampling/history/index'),
            name: 'dataGovernance_dataSampling_history',
            meta: {
              title: 'dataSamplinghistory',
              role: ['monitor:dataSampling:dataSamplingRecord']
            }
          }
        ]
      },
      {
        // 跨机构比对
        path: '/crossbodyAlignment',
        component: _import('sys-monitoringAnalysis/dataGovernance/crossbodyAlignment/index'),
        redirect: '/dataGovernance/crossbodyAlignment/crossbody',
        alwaysShow: true,
        meta: {
          title: 'crossbodyAlignment',
          role: ['monitor:dataGovernance:crossAgencyComparison']
        },
        children: [// 跨机构比对
          {
            path: 'index',
            component: _import(
              'sys-monitoringAnalysis/dataGovernance/crossbodyAlignment/crossbody'
            ),
            name: 'dataGovernance_crossbodyAlignment_alignmentTask',
            meta: {
              title: 'crossbodyAlignment',
              role: ['monitor:crossAgencyComparison:crossAgencyComparison']
            }
          },
          {// 比对历史记录
            path: 'history/index',
            component: _import(
              'sys-monitoringAnalysis/dataGovernance/crossbodyAlignment/history/index'
            ),
            name: 'dataGovernance_crossbodyAlignment_history',
            meta: {
              title: 'comparingHistory',
              role: ['monitor:crossAgencyComparison:record']
            }
          },
          {
            path: 'exceptionList',
            component: _import(
              'sys-monitoringAnalysis/dataGovernance/crossbodyAlignment/exceptionList'
            ),
            name: 'dataGovernance_crossbodyAlignment_exceptionList',
            hidden: true
          }
        ]
      },
      {
        // 定点监测
        path: '/fixedPoint',
        component: _import('sys-monitoringAnalysis/dataGovernance/fixedPoint/index'),
        redirect: 'sys-monitoringAnalysis/dataGovernance/fixedPoint/extract/index',
        alwaysShow: true,
        meta: {
          title: 'fixedPoint',
          role: ['monitor:dataGovernance:fixed-pointMonitoring']
        },
        children: [// 抽取监测任务
          {
            path: 'extract/index',
            component: _import('sys-monitoringAnalysis/dataGovernance/fixedPoint/extract/index'),
            name: 'dataGovernance_fixedPoint_extract',
            meta: {
              title: 'extract',
              role: ['monitor:fixed-pointMonitoring:extractTask']
            }
          },
          {
            // 定点监测--新增抽取监测任务
            path: 'extract/add',
            name: 'dataGovernance_fixedPoint_extract_add',
            component: _import('sys-monitoringAnalysis/dataGovernance/fixedPoint/extract/add'),
            hidden: true
          },
          {
            // 定点监测--对比结果
            path: 'extract/result',
            name: 'dataGovernance_fixedPoint_extract_result',
            component: _import('sys-monitoringAnalysis/dataGovernance/fixedPoint/extract/result'),
            hidden: true
          },
          {
            // 定点监测--接收监测任务
            path: 'receive',
            component: _import('sys-monitoringAnalysis/dataGovernance/fixedPoint/receive/index'),
            name: 'dataGovernance_fixedPoint_receive',
            meta: {
              title: 'receive',
              role: ['monitor:fixed-pointMonitoring:receiveTask']
            }
          },
          {
            // 定点监测--接收监测任务-- 对比结果
            path: 'receive/result',
            component: _import('sys-monitoringAnalysis/dataGovernance/fixedPoint/receive/result'),
            name: 'dataGovernance_fixedPoint_receive_result',
            hidden: true
          },
          {
            // 定点监测--监测任务历史查询
            path: 'fixedPoint/query',
            component: _import('sys-monitoringAnalysis/dataGovernance/fixedPoint/query/index'),
            name: 'dataGovernance_fixedPoint_query',
            meta: {
              title: 'fpquery',
              role: ['monitor:fixed-pointMonitoring:historyTask']
            }
          }
        ]
      },
      {
        // 人工补正
        path: '/artificialCorrection',
        component: _import('sys-monitoringAnalysis/dataGovernance/artificialCorrection/index'),
        redirect: '/dataGovernance/scanningMonitor/artificialCorrection/launch/index',
        alwaysShow: true,
        meta: {
          title: 'artificialCorrection',
          role: ['monitor:dataGovernance:artificialCorrection']
        },
        children: [// 发起人工补正
          {
            path: 'index',
            component: _import(
              'sys-monitoringAnalysis/dataGovernance/artificialCorrection/launch/index'
            ),
            name: 'dataGovernance_artificialLaunch',
            meta: {
              title: 'artificialLaunch',
              role: ['monitor:artificialCorrection:artificialCorrection']
            }
          },
          // {
          //   path: 'launch/detail',
          //   component: _import(
          //     'sys-monitoringAnalysis/dataGovernance/artificialCorrection/launch/detail'
          //   ),
          //   name: 'dataGovernance_artificialLaunch_detail',
          //   hidden: true
          // },
          { // 发起补正通知
            path: 'notice/index',
            component: _import(
              'sys-monitoringAnalysis/dataGovernance/artificialCorrection/notice/index'
            ),
            name: 'dataGovernance_artificialCorrection_notice',
            meta: {
              title: 'artificialNotice',
              role: ['monitor:artificialCorrection:sendNotifications']
            }
          },
          { // 补正结果核对
            path: 'verify/index',
            component: _import(
              'sys-monitoringAnalysis/dataGovernance/artificialCorrection/verify/index'
            ),
            name: 'dataGovernance_artificialCorrection_verify',
            meta: {
              title: 'artificialVerify',
              role: ['monitor:artificialCorrection:resultCheck']
            }
          },
          { // 补正历史记录
            path: 'history/index',
            component: _import(
              'sys-monitoringAnalysis/dataGovernance/artificialCorrection/history/index'
            ),
            name: 'dataGovernance_artificialCorrection_history',
            meta: {
              title: 'artificialHistory',
              role: ['monitor:artificialCorrection:historyRecord']
            }
          },
          {
            path: 'history/tradeList',
            component: _import(
              'sys-monitoringAnalysis/dataGovernance/artificialCorrection/history/tradeList'
            ),
            name: 'dataGovernance_artificialCorrection_history_tradeList',
            hidden: true
          }
        ]
      },
      {
        // 自动清理
        path: '/dataClean',
        component: _import('sys-monitoringAnalysis/dataGovernance/dataClean/index'),
        redirect: 'sys-monitoringAnalysis/dataGovernance/dataClean/program',
        alwaysShow: true,
        meta: {
          title: 'dataClean',
          role: ['monitor:dataGovernance:autoClean']
        },
        children: [ // 清理方案管理
          {
            path: 'index',
            component: _import('sys-monitoringAnalysis/dataGovernance/dataClean/program'),
            name: 'dataGovernance_dataClean_program',
            meta: {
              title: 'cleanProgram',
              role: ['monitor:autoClean:cleaningScheme']
            }
          },
          {
            // 执行清理
            path: 'auto',
            component: _import('sys-monitoringAnalysis/dataGovernance/dataClean/auto'),
            name: 'dataGovernance_dataClean_auto',
            meta: {
              title: 'cleanAuto',
              role: ['monitor:autoClean:beginClean']
            }
          },
          {// 清理历史记录
            path: 'history',
            component: _import('sys-monitoringAnalysis/dataGovernance/dataClean/history'),
            name: 'dataGovernance_dataClean_history',
            meta: {
              title: 'cleanHistory',
              role: ['monitor:autoClean:cleanHistoryRecord']
            }
          },
          {
            // 数据治理--人工补正结果核对 -- 反馈
            path: '/feedBack/feed',
            component: _import(
              'sys-monitoringAnalysis/dataGovernance/dataClean/correction/feedback/feed'
            ),
            name: 'dataGovernance_correction_feedback_feed',
            hidden: true
          }
        ]
      },
      {
        // 数据治理--数据质量评价
        path: '/qualityEvaluation',
        component: _import('sys-monitoringAnalysis/dataGovernance/qualityEvaluation/index'),
        redirect: 'sys-monitoringAnalysis/dataGovernance/qualityEvaluation/basicConfig/index',
        alwaysShow: true,
        meta: {
          title: 'qualityEvaluation',
          role: ['monitor:dataGovernance:dataQualityEvaluation']
        },
        children: [ // --基础配置
          {
            path: '/basicConfig',
            component: _import(
              'sys-monitoringAnalysis/dataGovernance/qualityEvaluation/basicConfig/index'
            ),
            redirect: 'sys-monitoringAnalysis/dataGovernance/qualityEvaluation/basicConfig/organ',
            alwaysShow: true,
            meta: {
              title: 'basicConfig',
              role: ['monitor:basicConfig:basicConfig']
            },
            children: [
              {
                // 评价机构模板配置
                path: 'organ',
                component: _import(
                  'sys-monitoringAnalysis/dataGovernance/qualityEvaluation/basicConfig/organ'
                ),
                name: 'dataGovernance_qualityEvaluation_basicConfig',
                meta: {
                  title: 'evaluationOrgan',
                  role: ['monitor:templateConfig:templateConfig']
                }
              },
              {
                // 评价指标模板配置
                path: 'indicator',
                component: _import(
                  'sys-monitoringAnalysis/dataGovernance/qualityEvaluation/basicConfig/indicator'
                ),
                name: 'dataGovernance_qualityEvaluation_basicConfig_indicator',
                meta: {
                  title: 'evaluationIndicator',
                  role: ['monitor:indexConfig:indexConfig']
                }
              },
              {
                // 数据质量评价--查看评价机构
                path: 'queryName',
                component: _import(
                  'sys-monitoringAnalysis/dataGovernance/qualityEvaluation/basicConfig/queryName'
                ),
                name: 'dataGovernance_qualityEvaluation_queryName',
                hidden: true
              }
            ]
          },
          {
            // 数据质量评价--创建评价
            path: 'task',
            component: _import(
              'sys-monitoringAnalysis/dataGovernance/qualityEvaluation/task/index'
            ),
            name: 'dataGovernance_qualityEvaluation_task',
            meta: {
              title: 'task',
              role: ['monitor:evaluationTaskManage:evaluationTaskManage']
            }
          },
          {
            // 数据质量评价--创建评价
            path: 'task/add',
            component: _import('sys-monitoringAnalysis/dataGovernance/qualityEvaluation/task/add'),
            name: 'dataGovernance_qualityEvaluation_task_add',
            hidden: true
          },
          {
            // 数据质量评价--整合评价标准
            path: 'standard/index',
            component: _import(
              'sys-monitoringAnalysis/dataGovernance/qualityEvaluation/standard/index'
            ),
            name: 'dataGovernance_qualityEvaluation_standard',
            meta: {
              title: 'evaluateStandard',
              role: ['monitor:evaluationCriteria:evaluationCriteria']
            }
          },
          {
            // 数据质量评价--整合评价标准
            path: 'standard/detail',
            component: _import(
              'sys-monitoringAnalysis/dataGovernance/qualityEvaluation/standard/detail'
            ),
            name: 'dataGovernance_qualityEvaluation_standard_detail',
            hidden: true
          },
          {
            // 数据质量评价--整合评价标准
            path: 'standard/indicatorWay',
            component: _import(
              'sys-monitoringAnalysis/dataGovernance/qualityEvaluation/standard/indicatorWay'
            ),
            name: 'dataGovernance_qualityEvaluation_standard_indicatorWay',
            hidden: true
          },
          {
            // 数据质量评价--查看试算
            path: 'standard/queryTrial',
            component: _import(
              'sys-monitoringAnalysis/dataGovernance/qualityEvaluation/standard/queryTrial'
            ),
            name: 'dataGovernance_qualityEvaluation_standard_queryTrial',
            hidden: true
          },
          {
            // 数据质量评价--查看评价结果
            path: 'result/index',
            component: _import(
              'sys-monitoringAnalysis/dataGovernance/qualityEvaluation/result/index'
            ),
            name: 'dataGovernance_qualityEvaluation_result',
            meta: {
              title: 'evaluationResult',
              role: ['monitor:checkResult:checkResult']
            }
          },
          {
            // 数据质量评价--查看评价结果
            path: 'result/summary',
            component: _import(
              'sys-monitoringAnalysis/dataGovernance/qualityEvaluation/result/summary'
            ),
            name: 'dataGovernance_qualityEvaluation_result_summary',
            hidden: true
          },
          {
            // 数据质量评价--查看评价结果
            path: 'result/detail',
            component: _import(
              'sys-monitoringAnalysis/dataGovernance/qualityEvaluation/result/detail'
            ),
            name: 'dataGovernance_qualityEvaluation_result_detail',
            hidden: true
          },
          {
            // 数据质量评价--查看评价结果
            path: 'result/ratingForm',
            component: _import(
              'sys-monitoringAnalysis/dataGovernance/qualityEvaluation/result/ratingForm'
            ),
            name: 'dataGovernance_qualityEvaluation_result_ratingForm',
            hidden: true
          },
          {
            // 数据质量评价--细化指标
            path: 'thinIndicator',
            component: _import(
              'sys-monitoringAnalysis/dataGovernance/qualityEvaluation/thinIndicator/index'
            ),
            name: 'dataGovernance_qualityEvaluation_thinIndicator',
            meta: {
              title: 'thinIndicator',
              role: ['monitor:receiveEvaluationTask:receiveEvaluationTask']
            }
          },
          {
            // 数据质量评价--细化指标
            path: 'thinIndicator/detail',
            component: _import(
              'sys-monitoringAnalysis/dataGovernance/qualityEvaluation/thinIndicator/detail'
            ),
            name: 'dataGovernance_qualityEvaluation_thinIndicator_detail',
            hidden: true
          },
          {
            // 数据质量评价--细化指标
            path: 'thinIndicator/trial',
            component: _import(
              'sys-monitoringAnalysis/dataGovernance/qualityEvaluation/thinIndicator/trial'
            ),
            name: 'dataGovernance_qualityEvaluation_thinIndicator_trial',
            hidden: true
          },
          {
            // 数据质量评价--细化指标
            path: 'thinIndicator/queryTrial',
            component: _import(
              'sys-monitoringAnalysis/dataGovernance/qualityEvaluation/thinIndicator/queryTrial'
            ),
            name: 'dataGovernance_qualityEvaluation_thinIndicator_queryTrial',
            hidden: true
          }
          // {
          //   数据质量评价--指标评价
          //   path: 'indicator',
          //   component: _import(
          //     'sys-monitoringAnalysis/dataGovernance/qualityEvaluation/indicator/index'
          //   ),
          //   name: 'dataGovernance_qualityEvaluation_indicator',
          //   meta: {
          //     title: 'indicatorEvaluation'
          //     role: ['monitor:indexEvaluation:indexEvaluation']
          //   }
          // }
        ]
      },
      {
        // 数据治理--数据抽样评价--配置评价指标
        path: '/samplingEvaluation',
        component: _import('sys-monitoringAnalysis/dataGovernance/samplingEvaluation/index'),
        redirect: 'sys-monitoringAnalysis/dataGovernance/samplingEvaluation/configIndicator/index',
        alwaysShow: true,
        meta: {
          title: 'samplingEvaluation',
          role: ['monitor:dataGovernance:dataSamplingEvaluation']
        },
        children: [
          {
            // 数据抽样评价--配置评价指标
            path: 'configIndicator',
            component: _import(
              'sys-monitoringAnalysis/dataGovernance/samplingEvaluation/configIndicator/index'
            ),
            name: 'dataGovernance_samplingEvaluation_configIndicator',
            meta: {
              title: 'configIndicator',
              role: ['monitor:evaluationIndex:evaluationIndex']
            }
          },
          {
            // 数据抽样评价--随机抽样评价
            path: 'randomSampling',
            component: _import(
              'sys-monitoringAnalysis/dataGovernance/samplingEvaluation/randomSampling/index'
            ),
            name: 'dataGovernance_samplingEvaluation_randomSampling',
            meta: {
              title: 'randomSampling',
              role: ['monitor:randomEvaluation:randomEvaluation']
            }
          },
          {
            // 数据抽样评价--抽样评价历史
            path: 'randomSampling/sampling',
            component: _import(
              'sys-monitoringAnalysis/dataGovernance/samplingEvaluation/randomSampling/sampling'
            ),
            name: 'dataGovernance_samplingEvaluation_randomSampling_sampling',
            hidden: true
          },
          {
            // 数据抽样评价--查看抽样评价结果
            path: 'result',
            component: _import(
              'sys-monitoringAnalysis/dataGovernance/samplingEvaluation/result/index'
            ),
            name: 'dataGovernance_samplingEvaluation_result',
            meta: {
              title: 'samplingResult',
              role: ['monitor:checkResult:checkResult']
            }
          },
          {
            // 数据抽样评价-随机-抽样评价历史
            path: 'result/queryHistory',
            component: _import(
              'sys-monitoringAnalysis/dataGovernance/samplingEvaluation/result/queryHistory'
            ),
            name: 'dataGovernance_samplingEvaluation_queryHistory',
            hidden: true
          },
          {
            // 数据抽样评价-查看抽样评价结果-抽样评价历史
            path: 'result/queryHistoryResults',
            component: _import(
              'sys-monitoringAnalysis/dataGovernance/samplingEvaluation/result/queryHistoryResults'
            ),
            name: 'dataGovernance_samplingEvaluation_queryHistoryResults',
            hidden: true
          }

        ]
      }
    ]
  },
  // 中心端 - 线索管理
  {
    path: '/cueManage',
    name: 'cueManage',
    component: Layout,
    redirect: '/investigation/index',
    alwaysShow: true,
    meta: {
      title: 'cueManage',
      icon: 'work',
      role: [
        'monitor:clueManage:clueManage']
    },
    children: [
      {
        path: 'intelligence/analysis/fileList',
        name: 'cueManage_analysis_fileList',
        component: _import('sys-monitoringAnalysis/cueManage/intelligence/analysis/fileList'),
        hidden: true
      },
      {
        path: 'intelligence/analysis/numTransfer',
        name: 'cueManage_analysis_numTransfer',
        component: _import('sys-monitoringAnalysis/cueManage/intelligence/analysis/numTransfer'),
        meta: {
          title: 'numTransfer'
        },
        hidden: true
      },
      // {
      //   // 线索库管理 - 国际情报协查 // 编号移送
      //   path: 'interIntelligence',
      //   name: 'cueManage_interIntelligence',
      //   component: _import('sys-monitoringAnalysis/cueManage/interIntelligence/index'),
      //   meta: {
      //     title: 'interIntelligence'
      //   },
      //   hidden: true
      // },
      {
        // 线索库管理 - 国际情报协查流程
        path: 'interIntelligence',
        name: 'cueManage_interIntelligence',
        component: _import('sys-monitoringAnalysis/cueManage/interIntelligence/index'),
        meta: {
          title: 'interIntelligence'
        },
        hidden: true
      },
      {
        // 线索库管理 - 国际情报文件移送通报
        path: 'interFileTransfer',
        name: 'cueManage_interFileTransfer',
        component: _import('sys-monitoringAnalysis/cueManage/interFileTransfer/index'),
        meta: {
          title: 'interFileTransfer'
        },
        hidden: true
      },
      {
        // 线索库管理 - 情报管理起草、新增，
        path: 'intelligenceInfo',
        name: 'intelligenceInfo',
        component: _import('sys-monitoringAnalysis/cueManage/intelligence/addForm/intelligence'),
        meta: {
          title: 'intelligenceInfo'
        },
        hidden: true
      },

      {
        // 线索库管理 - 情报管理起草、新增，
        path: 'interAddForm',
        name: 'interAddForm',
        component: _import('sys-monitoringAnalysis/cueManage/intelligence/addForm/index'),
        meta: {
          title: 'interAddForm'
        },
        hidden: true
      },
      {
        // 线索管理 - 国际协查文件管理
        path: 'interFileManage',
        name: 'cueManage_interFileManage',
        component: _import('sys-monitoringAnalysis/cueManage/interFileManage/index'),
        meta: {
          title: 'interFileManage',
          role: ['monitor:clueManage:internationalCoordinationDocument']
        }
      },
      {
        // 线索管理 - 国际协查文件管理 - 新增第一个页面
        path: 'newFile',
        name: 'cueManage_newFile',
        component: _import('sys-monitoringAnalysis/cueManage/interFileManage/newFile'),
        meta: {
          title: 'interFileManage'
        },
        hidden: true
      },
      // 线索管理 - 国际协查文件管理 - 新增第二个页面
      {
        path: 'newFiles',
        name: 'cueManage_newFiles',
        component: _import('sys-monitoringAnalysis/cueManage/interFileManage/sendFile'),
        meta: {
          title: 'interFileManage'
        },
        hidden: true
      },
      {
        path: 'printPage',
        name: 'cueManage_printPage',
        component: _import('sys-monitoringAnalysis/cueManage/interIntelligence/printPage'),
        meta: {
          title: 'interFileManage'
        },
        hidden: true
      },
      {
        // 线索管理 - 协查文件管理
        path: 'investigation',
        name: 'cueManage_investigation',
        component: _import('sys-monitoringAnalysis/cueManage/investigation/index'),
        meta: {
          title: 'investigation',
          role: ['monitor:clueManage:territoryCoordinationDocument']
        }
      },
      {
        // 线索管理 - 协查文件档案
        path: 'investigation/archives',
        name: 'cueManage_investigation_archives',
        component: _import('sys-monitoringAnalysis/cueManage/investigation/archives'),
        meta: {
          title: 'archives'
        },
        hidden: true
      },
      {
        path: 'intelligence/analysis',
        name: 'cueManage_intelligence_analysis',
        component: _import('sys-monitoringAnalysis/cueManage/intelligence/analysis/index'),
        meta: {
          title: 'analysis',
          role: ['monitor:clueManage:territoryIntelligenceCoordinationDocument']
        }
      },
      {
        // 线索管理 - 自主分析
        path: 'autonomousAnalysis',
        name: 'cueManage_autonomousAnalysis',
        component: _import('sys-monitoringAnalysis/autonomousAnalysis/index'),
        meta: {
          title: 'autonomousAnalysis',
          role: ['monitor:clueManage:autonomousAnalysis']
        }
      },
      {
        // 线索管理 - 自主分析查看和编辑
        path: 'autonomousAnalysisInfo',
        name: 'cueManage_autonomousAnalysisInfo',
        component: _import('sys-monitoringAnalysis/autonomousAnalysis/autonomousAnalysisInfo'),
        meta: {
          title: 'autonomousAnalysisInfo'
        },
        hidden: true
      },
      {
        // 上报分析申请回显
        path: 'autonomousAnalysisInfoSB',
        name: 'cueManage_autonomousAnalysisInfoSB',
        component: _import('sys-monitoringAnalysis/autonomousAnalysis/add'),
        meta: {
          title: 'addSB'
        },
        hidden: true
      },
      // 线索管理 - 数据录入 // component: _import('sys-monitoringAnalysis/cueManage/intelligence'), // 情报分析
      {
        path: 'dataEntry',
        name: 'cueManage_dataEntry',
        component: _import('sys-monitoringAnalysis/cueManage/dataEntry/index'),
        meta: {
          title: 'dataEntry',
          role: ['monitor:clueManage:dataEntry']
        }
      },
      // 数据录入 - 新增
      {
        path: 'dataEntry/add',
        component: _import('sys-monitoringAnalysis/cueManage/dataEntry/add'),
        name: 'cueManage_dataEntry_add',
        meta: {
          title: 'add'
        },
        hidden: true
      },
      // 数据录入 - 编辑
      {
        path: 'dataEntry/edite',
        component: _import('sys-monitoringAnalysis/cueManage/dataEntry/edite'),
        name: 'cueManage_dataEntry_edite',
        meta: {
          title: 'edite'
        },
        hidden: true
      },
      // 数据录入 - 录入
      {
        path: 'dataEntry/approvalOrder',
        component: _import('sys-monitoringAnalysis/cueManage/dataEntry/approvalOrder'),
        name: 'cueManage_dataEntry_approvalOrder',
        meta: {
          title: 'approvalOrder'
        },
        hidden: true
      },
      {
        path: 'dataEntry/inter/index',
        name: 'dataEntry_inter',
        component: _import('sys-monitoringAnalysis/cueManage/dataEntry/inter/index'),
        hidden: true
      },
      {
        path: 'dataEntry/inter/medium',
        name: 'dataEntry_inter_medium',
        component: _import('sys-monitoringAnalysis/cueManage/dataEntry/inter/medium'),
        hidden: true
      },
      {
        path: 'dataEntry/feedBack/index',
        name: 'dataEntry_feedBack',
        component: _import('sys-monitoringAnalysis/cueManage/dataEntry/feedBack/index'),
        hidden: true
      },
      {
        path: 'dataEntry/feedBack/medium',
        name: 'dataEntry_feedBack_medium',
        component: _import('sys-monitoringAnalysis/cueManage/dataEntry/feedBack/medium'), // meta: { title: 'INTER } // 国际协查请求数据录入审批页面-- 介质导入 // meta: { title: 'feedBackmedium' } // 国际协查请求数据录入审批页面-- 手工录入
        // meta: { title: 'intermedium' } // 反馈信息请求数据录入审批页面-- 手工录入
        // meta: { title: 'feedBack' } // 反馈信息请求数据录入审批页面-- 介质导入
        hidden: true
      },
      // 线索管理 - 行政调查管理
      {
        path: 'administration',
        name: 'cueManage_administration',
        component: _import('sys-monitoringAnalysis/cueManage/administration/index'),
        meta: {
          title: 'administration',
          role: ['monitor:clueManage:adminManage']
        }
      },
      {
        path: 'administration/form',
        name: 'cueManage_administration_form',
        component: _import('sys-monitoringAnalysis/cueManage/administration/form'),
        meta: {
          title: 'form'
        },
        hidden: true
      },
      {
        path: 'administration/viewProcess',
        name: 'cueManage_administration_viewProcess',
        component: _import('sys-monitoringAnalysis/cueManage/administration/viewProcess'),
        meta: {
          title: 'viewProcess'
        },
        hidden: true
      },
      {
        // 代码配置
        path: 'levelConfiguration',
        name: 'cueManage_levelConfiguration',
        component: _import('sys-monitoringAnalysis/cueManage/levelConfiguration/index'),
        meta: {
          title: 'levelConfiguration',
          role: ['monitor:cueManage:levelConfiguration']
        }
      },
      {
        // 代码配置--批量
        path: 'levelConfiguration/batchImport',
        name: 'cueManage_levelConfiguration_batchImport',
        component: _import('sys-monitoringAnalysis/cueManage/levelConfiguration/batchImport'),
        meta: {
          title: 'import'
        },
        hidden: true
      }
      // // 线索管理 - 匹配信息查询
      // {
      //   path: 'matchField',
      //   name: 'cueManage_matchField',
      //   component: _import('sys-monitoringAnalysis/cueManage/matchField/index'),
      //   meta: {
      //     title: 'matchField',
      //     role: ['monitor:clueManage:matchingInformation']
      //   }
      // },
      // 线索管理 - 反馈信息查询
      // {
      //   path: 'backInformation',
      //   name: 'cueManage_backInformation',
      //   component: _import('sys-monitoringAnalysis/cueManage/backInformation/index'),
      //   meta: {
      //     title: 'backInformation',
      //     role: ['monitor:clueManage:feedback']
      //   }
      // }
    ]
  },
  // 匹配信息查询
  {
    path: '/matchField',
    component: Layout,
    alwaysShow: true,
    meta: {
      icon: 'work',
      title: 'matchFieldTitle',
      role: ['monitor:inforManage:inforManage']
    },
    children: [
      {
        path: 'matchField',
        name: 'cueManage_matchField',
        component: _import('sys-monitoringAnalysis/cueManage/matchField/index'),
        meta: {
          title: 'matchField',
          role: ['monitor:clueManage:matchingInformation']
        }
      },
      {
        path: 'storeUpdate',
        name: 'systemManage_storeUpdate',
        component: _import('sys-monitoringAnalysis/systemManage/storeUpdate'),
        meta: {
          title: 'storeUpdate',
          role: ['monitor:matchingInforUpdate:atchingInforUpdate']
        }
      },
      {
        path: 'typeManage',
        name: 'systemManage_typeManage',
        component: _import('sys-monitoringAnalysis/systemManage/typeManage'),
        meta: {
          title: 'typeManage',
          role: ['monitor:matchInforTypeManage:matchInforTypeManage']
        }
      },
      {
        path: 'definedData',
        name: 'systemManage_definedData',
        component: _import('sys-monitoringAnalysis/systemManage/definedData'),
        hidden: true,
        meta: {
          title: 'definedData'
          // role: ['monitor:inputDataType:inputDataType']
        }
      }
    ]
  },
  // 反馈信息查询
  {
    path: '/backInformation',
    component: Layout,
    alwaysShow: true,
    meta: {
      icon: 'work',
      title: 'backInformationTitle',
      role: ['monitor:feedbackManage:feedbackManage']
    },
    children: [
      {
        path: 'backInformation',
        name: 'cueManage_backInformation',
        component: _import('sys-monitoringAnalysis/cueManage/backInformation/index'),
        meta: {
          title: 'backInformation',
          role: ['monitor:clueManage:feedback']
        }
      },
      {
        path: 'authorityManage',
        name: 'systemManage_authorityManage',
        component: _import('sys-monitoringAnalysis/systemManage/authorityManage'),
        meta: {
          title: 'authorityManage',
          role: ['monitor:feedbackInforManage:feedbackInforManage']
        }
      }
    ]
  },
  // {
  //   // 统计分析
  //   path: 'dashboard',
  //   component: Layout,
  //   name: 'dashboard_index',
  //   redirect: 'sys-monitoringAnalysis/statisticAnalysis/dashboard/index',
  //   meta: { title: 'dashboard', icon: 'form', role: ['monitor'] },
  //   children: [
  //     {
  //       // 统计分析 - 仪表盘 // component: _import('sys-monitoringAnalysis/statisticAnalysis/reportForm/index'),
  //       path: 'index',
  //       component: _import('sys-monitoringAnalysis/statisticAnalysis/dashboard/index'),
  //       name: 'dashboard_index',
  //       meta: { title: 'dashboard' }
  //     }
  // {
  //   // 统计分析 - 中心
  //   path: 'CENTER,
  //   component: _import('sys-monitoringAnalysis/statisticAnalysis/dashboard/center'),
  //   name: 'dashboard_center',
  //   hidden: true
  // },
  // {
  //   // 统计分析 - 系统
  //   path: 'system',
  //   component: _import('sys-monitoringAnalysis/statisticAnalysis/dashboard/system'),
  //   name: 'dashboard_system',
  //   hidden: true
  // }
  //   ]
  // },
  // 宏观分析
  {
    path: '/macroAnalysis',
    component: Layout,
    name: 'macroAnalysis',
    alwaysShow: true, // 一直显示根路由
    meta: {
      title: 'macroAnalysis',
      icon: 'form',
      role: ['monitor:macroanalysis:macroanalysis']
    },
    children: [
      {
        // 宏观分析-自助分析
        path: 'SelfHelpAnalysis',
        component: _import('sys-monitoringAnalysis/macroAnalysis/SelfHelpAnalysis/index'),
        name: 'macroAnalysis_SelfHelpAnalysis',
        meta: {
          title: 'SelfHelpAnalysis',
          role: ['monitor:selfHelpnalysis:selfHelpnalysis']
        }
      },
      //   path: 'intelligentAnalyze', // { // 宏观分析 - 智能分析           （暂时屏蔽）
      //   component: _import('sys-monitoringAnalysis/macroAnalysis/intelligentAnalyze/index'),
      //   name: 'macroAnalysis_intelligentAnalyze',
      //   meta: { title: 'intelligentAnalyze' }
      // },
      {
        // 宏观分析 - 智能分析 - 查看
        path: 'intelligentAnalyze/view',
        component: _import('sys-monitoringAnalysis/macroAnalysis/intelligentAnalyze/view'),
        name: 'macroAnalysis_intelligentAnalyze_view',
        meta: {
          title: 'view'
        },
        hidden: true
      },
      {
        // 宏观分析 - 报表管理
        path: 'stateManage',
        component: _import('sys-monitoringAnalysis/macroAnalysis/stateManage/index'),
        name: 'macroAnalysis_stateManage',
        hidden: true,
        meta: {
          title: 'stateManage',
          role: ['monitor:reportManagement:reportManagement']
        }
      },
      {
        // 宏观分析 - 报表查看
        path: 'stateView',
        component: _import('sys-monitoringAnalysis/macroAnalysis/stateView/index'),
        name: 'macroAnalysis_stateView',
        meta: {
          title: 'stateView',
          role: ['monitor:reportView:reportView']
        }
      },
      {
        // 宏观分析 - 宏观分析报告管理
        path: 'reportManage',
        component: _import('sys-monitoringAnalysis/macroAnalysis/reportManage/index'),
        name: 'macroAnalysis_reportManage',
        meta: {
          title: 'reportManage',
          role: ['monitor:analysisReportManage:analysisReportManage']
        }
      },
      {
        // 宏观分析 - 宏观分析报告管理 - 新增页面
        path: 'reportManage/add',
        component: _import('sys-monitoringAnalysis/macroAnalysis/reportManage/add'),
        name: 'macroAnalysis_add',
        meta: {
          title: 'reportManage'
        },
        hidden: true
      },
      {
        // 宏观分析 - 宏观分析报告管理 - 新建预警规则
        path: 'reportManage/waningRule',
        component: _import('sys-monitoringAnalysis/macroAnalysis/reportManage/waningRule'),
        name: 'macroAnalysis_reportManage_waningRule',
        meta: {
          title: 'reportManage'
        },
        hidden: true
      },
      {
        // 宏观分析 - 查看详情页面
        path: 'reportManage/detail',
        component: _import('sys-monitoringAnalysis/macroAnalysis/reportManage/detail'),
        name: 'macroAnalysis_reportManage_detail',
        meta: {
          title: 'reportManage'
        },
        hidden: true
      },
      {
        // 宏观分析 - 修改
        path: 'reportManage/modification',
        component: _import('sys-monitoringAnalysis/macroAnalysis/reportManage/modification'),
        name: 'macroAnalysis_reportManage_modification',
        meta: {
          title: 'reportManage'
        },
        hidden: true
      },
      {
        // 宏观分析 - 宏观分析报告管理 - 新建报表
        path: 'reportManage/createReport',
        component: _import('sys-monitoringAnalysis/macroAnalysis/reportManage/createReport'),
        name: 'macroAnalysis_reportManage_createReport',
        meta: {
          title: 'reportManage'
        },
        hidden: true
      }
    ]
  },
  // 模型平台-----------------生产环境  ---------  宋显鹏
  {
    path: '/modelPlatform',
    component: Layout,
    redirect: '/dataControl/index',
    alwaysShow: true,
    name: 'modelPlatform',
    meta: {
      title: 'modelPlatform',
      icon: 'datasubmit',
      role: ['monitor:modelPlatform:modelPlatform']
    },
    children: [
      // 概述
      // {
      //   path: 'summarize',
      //   name: 'modelPlatform_summarize',
      //   component: _import('sys-monitoringAnalysis/modelPlatform/model/monitor/summarize'),
      //   hidden: true,
      //   meta: {
      //     title: 'summarize'

      //   }
      // },
      {
        // 数据管控
        path: '/dataControl',
        name: 'modelPlatform_dataControl',
        component: _import('sys-monitoringAnalysis/modelPlatform/dataControl/index'),
        alwaysShow: true,
        meta: {
          title: 'dataControl',
          role: ['monitor:dataControl:dataControl']
        },
        children: [
          // 三级导航 数据模型管理
          {
            path: 'dataModel',
            name: 'modelPlatform_dataModel',
            component: _import('sys-monitoringAnalysis/modelPlatform/dataControl/dataModel/index'),
            meta: {
              title: 'dataModel',
              role: ['monitor:dataTemplate:dataTemplate']

            }
          },
          // 三级导航 数据准备任务
          {
            path: 'dataReady',
            name: 'modelPlatform_dataReady',
            component: _import('sys-monitoringAnalysis/modelPlatform/dataControl/dataReady/index'),
            meta: {
              title: 'dataReady',
              role: ['monitor:dataReady:dataReady']
            }
          },
          // 三级导航 建模数据信息
          {
            path: 'establishDataInfo',
            name: 'modelPlatform_establishDataInfo',
            component: _import('sys-monitoringAnalysis/modelPlatform/dataControl/establishDataInfo/index'),
            meta: {
              title: 'establishDataInfo',
              role: ['monitor:dataModule:dataModule']
            }
          }

        ]
      },
      {
        // 模型管理
        path: '/modelManage',
        name: 'modelPlatform_modelManage',
        component: _import('sys-monitoringAnalysis/modelPlatform/modelManage/index'),
        alwaysShow: true,
        meta: {
          title: 'modelManage',
          role: ['monitor:modelManage:modelManage']
        },
        children: [
          // 模型信息
          {
            path: 'modelInfoIndex',
            name: 'modelPlatform_modelInfoIndex',
            component: _import('sys-monitoringAnalysis/modelPlatform/modelManage/modelInfoData/modelInfoIndex'),
            alwaysShow: true,
            meta: {
              title: 'modelInfoIndex',
              role: ['monitor:module:module']
            }
          }
          // 提交审核
          // {
          //   path: 'modelSubmitAudit',
          //   name: 'modelPlatform_modelSubmitAudit',
          //   component: _import('sys-monitoringAnalysis/modelPlatform/modelManage/modelInfoData/modelSubmitAudit'),
          //   alwaysShow: true,
          //   meta: {
          //     title: 'modelSubmitAudit'
          //   }
          // },
          // 模型管理 -------可用数据列表
          // {
          //   path: 'availableDataList',
          //   name: 'modelPlatform_availableDataList',
          //   component: _import('sys-monitoringAnalysis/modelPlatform/modelManage/availableDataList'),
          //   alwaysShow: true,
          //   meta: {
          //     title: 'availableDataList'
          //   }
          // },
          // 提交审核
          // {
          //   // 提交审核 - 提交审核页面
          //   path: 'submitExperiments/:tableInfo',
          //   name: 'modelPlatform_submitExperiments',
          //   component: _import('sys-monitoringAnalysis/modelPlatform/modelManage/modelInfoData/submitExperiments'),
          //   hidden: true
          // }
        ]
      },
      // {
      //   // 模型审核
      //   path: 'technologyModel',
      //   name: 'modelPlatform_technologyModel',
      //   alwaysShow: true,
      //   component: _import('sys-monitoringAnalysis/modelPlatform/technologyModel/index'),
      //   meta: {
      //     title: 'modelAudit',
      //     role: ['monitor:technologyModel:technologyModel']
      //   }
      // },
      // {
      //   // 模型审核 - 查看提交详情
      //   path: 'lookDataCollection',
      //   name: 'modelPlatform_lookDataCollection',
      //   component: _import('sys-monitoringAnalysis/modelPlatform/technologyModel/lookDataCollection'),
      //   hidden: true
      // },
      {
        //  模型监控
        path: '/monitor',
        name: 'modelPlatform_monitor',
        // redirect: '/monitor/index',
        alwaysShow: true,
        component: _import('sys-monitoringAnalysis/modelPlatform/model/monitor/index'),
        meta: {
          title: 'modelPlatformMonitor',
          role: ['monitor:modelMonitor:modelMonitor']
        },
        children: [
          // 概述
          // {
          //   path: 'summarize',
          //   name: 'modelPlatform_summarize',
          //   component: _import('sys-monitoringAnalysis/modelPlatform/model/monitor/summarize'),
          //   meta: {
          //     title: 'summarize'

          //   }
          // },
          // 发布列表
          {
            path: 'releaseList',
            name: 'modelPlatform_releaseList',
            component: _import('sys-monitoringAnalysis/modelPlatform/model/monitor/releaseList'),
            meta: {
              title: 'releaseList',
              role: ['monitor:publishList:publishList']

            }
          },
          {
            // 模型审核 - 查看审核详情
            path: 'lookDataSHInfo',
            name: 'modelPlatform_lookDataSHInfo',
            component: _import('sys-monitoringAnalysis/modelPlatform/model/monitor/lookDataSHInfo'),
            hidden: true
          },
          // 三级导航 预测监控
          {
            path: 'productionEnviron',
            name: 'modelPlatform_productionEnviron',
            component: _import('sys-monitoringAnalysis/modelPlatform/model/monitor/productionEnviron'),
            meta: {
              title: 'productionEnviron',
              role: ['monitor:predictive:predictive']

            }
          },
          // 三级导航 运行历史
          {
            path: 'runHistory',
            name: 'modelPlatform_runHistory',
            component: _import('sys-monitoringAnalysis/modelPlatform/model/monitor/runHistory'),
            meta: {
              title: 'runHistory',
              role: ['monitor:operationHistory:operationHistory']

            }
          }
        ]
      },
      {
        // 模型预警处理
        path: 'warningProcessing',
        name: 'modelPlatform_warningProcessing',
        alwaysShow: true,
        component: _import('sys-monitoringAnalysis/modelPlatform/warningProcessing/index'),
        meta: {
          title: 'warningProcessing',
          role: ['monitor:modelWarn:modelWarn']
        }
      },
      {
        // 模型预警处理 - 查看预测结果
        path: 'warningProcessing/view',
        name: 'modelPlatform_checkWarningDetails',
        component: _import('sys-monitoringAnalysis/modelPlatform/warningProcessing/view'),
        hidden: true,
        meta: {
          title: 'checkWarningDetails'

        }
      },
      {
        // 模型库监测
        path: 'libraryMonitoring',
        name: 'modelPlatform_libraryMonitoring',
        alwaysShow: true,
        component: _import('sys-monitoringAnalysis/modelPlatform/libraryMonitoring/index'),
        meta: {
          title: 'libraryMonitoring',
          role: ['monitor:libraryMonitoring:libraryMonitoring']
        }
      }
    ]
  },
  // 模型平台-----------------集研环境  ---------  宋显鹏
  {
    path: '/modelPlatformCR',
    component: Layout,
    // redirect: '/dataControl/index',
    alwaysShow: true,
    name: 'modelPlatformCR',
    meta: {
      title: 'modelPlatformCR',
      icon: 'datasubmit',
      role: ['model:modelPlatform:modelPlatform']
    },
    children: [
      // 概述
      // {
      //   path: 'summarize',
      //   name: 'modelPlatformCR_summarize',
      //   component: _import('sys-monitoringAnalysis/modelPlatformCR/model/monitor/summarize'),
      //   meta: {
      //     title: 'summarize'

      //   }
      // },
      {
        // 模型管理
        path: '/modelManage',
        name: 'modelPlatformCR_modelManage',
        component: _import('sys-monitoringAnalysis/modelPlatformCR/modelManage/index'),
        alwaysShow: true,
        meta: {
          title: 'modelInfoDataCR',
          role: ['model:modelManage:modelManage']
        },
        children: [
          // 模型信息
          {
            path: 'modelInfoIndexCR',
            name: 'modelPlatformCR_modelInfoIndex',
            component: _import('sys-monitoringAnalysis/modelPlatformCR/modelManage/modelInfoData/modelInfoIndexCR'),
            alwaysShow: true,
            meta: {
              title: 'modelInfoIndexCR',
              role: ['monitor:modelInfor:modelInfor']
            }
          },
          // 提交审核
          {
            path: 'modelSubmitAudit',
            name: 'modelPlatformCR_modelSubmitAudit',
            component: _import('sys-monitoringAnalysis/modelPlatformCR/modelManage/modelInfoData/modelSubmitAudit'),
            alwaysShow: true,
            meta: {
              title: 'modelSubmitAudit',
              role: ['monitor:submitAudit:submitAudit']
            }
          },
          // 模型管理 -------可用数据列表
          {
            path: 'availableDataList',
            name: 'modelPlatformCR_availableDataList',
            component: _import('sys-monitoringAnalysis/modelPlatformCR/modelManage/availableDataList'),
            alwaysShow: true,
            meta: {
              title: 'availableDataList',
              role: ['monitor:dataList:dataList']
            }
          },
          // 提交审核
          {
            // 提交审核 - 提交审核页面
            path: 'submitExperiments',
            name: 'modelPlatformCR_submitExperiments',
            component: _import('sys-monitoringAnalysis/modelPlatformCR/modelManage/modelInfoData/submitExperiments'),
            hidden: true
          },
          {
            // 模型审核 - 查看提交详情
            path: 'lookDataSH',
            name: 'modelPlatformCR_lookDataSH',
            component: _import('sys-monitoringAnalysis/modelPlatformCR/modelManage/modelInfoData/lookDataSH'),
            hidden: true
          }
        ]
      },
      {
        // 模型审核
        path: 'technologyModel',
        name: 'modelPlatformCR_technologyModel',
        alwaysShow: true,
        component: _import('sys-monitoringAnalysis/modelPlatformCR/technologyModel/index'),
        meta: {
          title: 'modelAudit',
          role: ['model:technologyModel:technologyModel']
        }
      },
      {
        // 模型审核 - 查看提交详情
        path: 'lookDataCollection',
        name: 'modelPlatformCR_lookDataCollection',
        component: _import('sys-monitoringAnalysis/modelPlatformCR/technologyModel/lookDataCollection'),
        hidden: true
      }
    ]
  },
  // 排名规则管理 -安小霞
  {
    path: '/rankingRules',
    component: Layout,
    alwaysShow: true,
    meta: {
      title: 'rankingRulesFather',
      role: ['monitor:rankingRules:rulesWarningDeal'],
      icon: 'fill'
    },
    children: [
      {
        // 规则预警处理
        path: 'rankingRulesIndex',
        name: 'rankingRules_Index',
        component: _import('sys-monitoringAnalysis/rankingRules/index'),
        meta: {
          title: 'rankingRules',
          role: ['monitor:rankingRules:rulesWarningDeal']
        }
      },
      {
        // 主体账户库参数管理
        path: 'rankingMainstayAdmin',
        name: 'rankingMainstay_Admin',
        component: _import('sys-monitoringAnalysis/rankingRules/rankingMainstayAdmin'),
        meta: {
          title: 'rankingMainstayAdmin',
          role: ['monitor:rankingRules:rulesAccount']
        }
      },
      {
        // 新建主体账户库参数管理
        path: 'newRankingMainstayAdmin',
        name: 'new_RankingMainstayAdmin',
        component: _import('sys-monitoringAnalysis/rankingRules/newRankingMainstayAdmin'),
        meta: {
          title: 'newRankingMainstayAdmin'
        },
        hidden: true
      }
    ]
  },
  // 可疑交易报告预警处理 -安小霞
  {
    path: '/suspWarningDeal',
    component: Layout,
    meta: {
      title: 'suspWarningDeal',
      role: ['monitor:suspWarningDeal:suspWarningDeal']
    },
    children: [
      {
        path: 'suspWarningDealIndex',
        name: 'suspWarningDeal_Index',
        component: _import('sys-monitoringAnalysis/suspWarningDeal/index'),
        meta: {
          title: 'suspWarningDeal',
          icon: 'icon'
        }
      }

    ]
  },
  // 数据生命周期管理
  {
    path: '/dataCycle',
    component: Layout,
    name: 'dataCycle',
    alwaysShow: true,
    meta: {
      title: 'dataCycle',
      icon: 'work',
      role: ['monitor:LifeCycle:LifeCycle']
    },
    children: [
      // 数据迁移列表页面
      {
        path: 'index',
        name: 'dataCycleQuery',
        component: _import('sys-monitoringAnalysis/dataCycle/index'),
        meta: {
          title: 'dataCycleQuery',
          role: ['monitor:dataCycleQuery:dataCycleQuery']
        }
      },
      // 统计日志
      {
        path: 'statistics',
        name: 'dataCycle_statistics',
        component: _import('sys-monitoringAnalysis/dataCycle/statistics'),
        meta: {
          title: 'dataCycleStatistics',
          role: ['monitor:logTotal:logTotal']
        }
      },
      // 数据迁移新增页面
      {
        path: '/dataCycle/add',
        name: 'dataCycle_add',
        component: _import('sys-monitoringAnalysis/dataCycle/add'),
        meta: {
          title: 'dataCycle_add'
        },
        hidden: true
      }
    ]
  },

  //   任务管理 -安小霞
  // 对应的预警子菜单权限
  // 模型预警 : "monitor:taskManagement:modelWarning"
  // 高级名单预警: "monitor:taskManagement:seniornameWarning"
  // 规则预警: "monitor:taskManagement:rulesWarning"
  // 可疑交易报告预警: "monitor:taskManagement:suspiciousWarning"
  {
    path: '/taskManagement',
    component: Layout,
    alwaysShow: true,
    meta: {
      title: 'taskManagement',
      icon: 'eye',
      role: ['monitor:taskManagement:taskManagement']
    },
    children: [
      {
        // 模型预警
        path: '/model',
        component: _import('sys-monitoringAnalysis/taskManagement/modelWarning/index'),
        redirect: '/taskManagement/modelWarning/model',
        alwaysShow: true,
        meta: {
          title: 'modelWarning',
          role: ['monitor:taskManagement:modelWarning']
        },
        children: [
          {
            //  模型预警配置
            path: 'warningConfiguration',
            name: 'model_WarningConfiguration',
            component: _import('sys-monitoringAnalysis/taskManagement/modelWarning/modelWarningConfiguration'),
            meta: {
              title: 'modelWarningConfiguration',
              role: ['monitor:taskManagement:modelWarnConfig']
            }
          },
          // 模型预警任务查询
          {
            path: 'index',
            name: 'modelWarning_query',
            component: _import('sys-monitoringAnalysis/taskManagement/modelWarning/model'),
            meta: {
              title: 'modelWarning_query',
              role: ['monitor:taskManagement:modelWarnSelect']
            }
          },
          {
            //  xinjian模型预警配置
            path: 'newModelWarnConfigur',
            name: 'new_modelWarningConfiguration',
            component: _import('sys-monitoringAnalysis/taskManagement/modelWarning/newModelWarnConfigur'),
            meta: {
              title: 'newModelWarnConfigur',
              role: ['monitor:taskManagement:modelWarning']
            },
            hidden: true
          },
          {
            //  查看模型预警
            path: 'details',
            name: 'modelWarning_seeModel',
            component: _import('sys-monitoringAnalysis/taskManagement/modelWarning/details'),
            meta: {
              title: 'seeModel',
              role: ['monitor:taskManagement:modelWarning']
            },
            hidden: true
          }
        ]
      },
      {
        // 可疑交易报告预警
        path: '/suspicious',
        component: _import('sys-monitoringAnalysis/taskManagement/suspiciousWarning/index'),
        redirect: '/taskManagement/suspiciousWarning/warning',
        alwaysShow: true,
        meta: {
          title: 'suspicious_warnings',
          role: ['monitor:taskManagement:suspiciousWarning']
        },
        children: [
          // 可疑交易报告预警任务查询

          {
            //  查看可疑交易报告预警
            path: 'details',
            name: 'modelWarning_suspicious',
            component: _import('sys-monitoringAnalysis/taskManagement/suspiciousWarning/details'),
            meta: {
              title: 'seeSuspicious',
              role: ['monitor:taskManagement:suspiciousWarning']
            },
            hidden: true
          },
          {
            //  可疑交易报告预警配置
            path: 'suspiciousWarningConfiguration',
            name: 'suspicious_WarningConfiguration',
            component: _import('sys-monitoringAnalysis/taskManagement/suspiciousWarning/suspiciousWarningConfiguration'),
            meta: {
              title: 'suspiciousWarningConfiguration',
              role: ['monitor:suspiciousWarn:suspiciousWarnConfig']
            }
          },
          {
            path: 'index',
            name: 'suspicious_warning',
            component: _import('sys-monitoringAnalysis/taskManagement/suspiciousWarning/warning'),
            meta: {
              title: 'suspicious_warning',
              role: ['monitor:suspiciousWarn:suspiciousWarnSelect']
            }
          },
          {
            //  xinjian可疑交易报告预警配置
            path: 'newSuspWarningConfigur',
            name: 'new_suspWarningConfigur',
            component: _import('sys-monitoringAnalysis/taskManagement/suspiciousWarning/newSuspWarningConfigur'),
            meta: {
              title: 'newSuspWarningConfigur',
              role: ['monitor:taskManagement:suspiciousWarning']
            },
            hidden: true
          }
        ]
      },
      {
        // 高级名单预警
        path: '/senior',
        component: _import('sys-monitoringAnalysis/taskManagement/seniorwarning/index'),
        redirect: '/taskManagement/seniorwarning/senior',
        alwaysShow: true,
        meta: {
          title: 'advancedList_senior',
          role: ['monitor:taskManagement:seniornameWarning']
        },
        children: [
          // 高级名单预警查询

          {
            // 高级预警规则管理
            path: 'advancedForewarningRule',
            name: 'advancedForewarningRule',
            component: _import(
              'sys-monitoringAnalysis/monitoringWarning/rosterWarning/advancedForewarningRule/index'
            ),
            meta: {
              title: 'advancedForewarningRule',
              role: ['monitor:listWarn:listWarnConfig']
            }
          },
          {
            // 高级预警规则管理 - 新增规则
            path: 'advancedForewarningRule/addSenior',
            name: 'forewarningRule_addSenior',
            component: _import(
              'sys-monitoringAnalysis/monitoringWarning/rosterWarning/advancedForewarningRule/addSenior'
            ),
            meta: {
              title: 'addSenior'
            },
            hidden: true
          },
          {
            // 高级预警任务管理
            path: 'advancedForewarningTask',
            name: 'advancedForewarningTask',
            component: _import(
              'sys-monitoringAnalysis/monitoringWarning/rosterWarning/advancedForewarningTask/index'
            ),
            meta: {
              title: 'advancedForewarningTask',
              role: ['monitor:listWarn:listWarnSelect']
            }
          },
          {
            // 高级预警任务--新增
            path: 'advancedForewarningTask/:type/:id?',
            name: 'advancedForewarningTask_addSenior',
            component: _import(
              'sys-monitoringAnalysis/monitoringWarning/rosterWarning/advancedForewarningTask/addSenior'
            ),
            meta: {
              title: 'newTask'
            },
            hidden: true
          },
          {
            //  查看高级名单预警
            path: 'details',
            name: 'advancedList_senior',
            component: _import('sys-monitoringAnalysis/taskManagement/seniorwarning/details'),
            meta: {
              title: 'seeSenior',
              role: ['monitor:taskManagement:seniornameWarning']
            },
            hidden: true
          },
          {
            //  高级名单预警配置
            path: 'seniorwarningConfiguration',
            name: 'seniorList_WarningConfiguration',
            component: _import('sys-monitoringAnalysis/taskManagement/seniorwarning/seniorListWarningConfiguration'),
            meta: {
              title: 'seniorListWarningConfiguration',
              role: ['monitor:taskManagement:seniornameWarning']
            }
          },
          {
            //  xinjian高级名单预警配置
            path: 'newSeniorlistWarningConfigur',
            name: 'new_seniorlistWarningConfigur',
            component: _import('sys-monitoringAnalysis/taskManagement/seniorwarning/newSeniorlistWarningConfigur'),
            meta: {
              title: 'newSeniorlistWarningConfigur',
              role: ['monitor:taskManagement:seniornameWarning']
            },
            hidden: true
          },
          {
            path: 'index',
            name: 'advancedList_metails',
            component: _import('sys-monitoringAnalysis/taskManagement/seniorwarning/senior'),
            meta: {
              title: 'advancedList_query',
              role: ['monitor:taskManagement:seniornameWarning']
            }
          }
        ]
      },
      {
        //  规则预警
        path: '/rules',
        component: _import('sys-monitoringAnalysis/taskManagement/rulesWarning/index'),
        redirect: '/taskManagement/rulesWarning/senior',
        alwaysShow: true,
        meta: {
          title: 'ruleWarning_rules',
          role: ['monitor:taskManagement:rulesWarning']
        },
        children: [
          // 规则预警任务查询

          {
            //  查看规则名单预警
            path: 'details',
            name: 'ruleWarning_details',
            component: _import('sys-monitoringAnalysis/taskManagement/rulesWarning/details'),
            meta: {
              title: 'ruleWarning_details'
            },
            hidden: true
          },
          {
            //  规则预警配置
            path: 'rulesWarningConfiguration',
            name: 'rules_WarningConfiguration',
            component: _import('sys-monitoringAnalysis/taskManagement/rulesWarning/rulesWarningConfiguration'),
            meta: {
              title: 'rulesWarningConfiguration',
              role: ['monitor:rulesWarn:rulesWarnConfig']
            }
          },
          {
            path: 'index',
            name: 'ruleWarning_query',
            component: _import('sys-monitoringAnalysis/taskManagement/rulesWarning/rule'),
            meta: {
              title: 'ruleWarning_query',
              role: ['monitor:rulesWarn:rulesWarnSelect']
            }
          },
          {
            //  xinjian规则预警配置
            path: 'newRulesWarningConfigur',
            name: 'new_rulesWarningConfigur',
            component: _import('sys-monitoringAnalysis/taskManagement/rulesWarning/newRulesWarningConfigur'),
            meta: {
              title: 'newRulesWarningConfigur',
              role: ['monitor:taskManagement:rulesWarning']
            },
            hidden: true
          }
        ]
      }
    ]
  },

  // 简单规则模型
  {
    path: '/ruleModel',
    component: Layout,
    alwaysShow: true,
    hidden: true,
    meta: {
      title: 'ruleModel',
      icon: 'icon',
      role: ['monitor:simpleRuleModel:simpleRuleModel']
    },
    children: [
      {
        path: 'simpleRule',
        name: 'simpleRule_index',
        component: _import('sys-monitoringAnalysis/ruleModel/index'),
        meta: {
          title: 'simpleRule',
          role: ['monitor:simpleRule:simpleRule']
        }
      },
      {
        path: 'executionRule',
        name: 'ruleModel_executionRule',
        component: _import('sys-monitoringAnalysis/ruleModel/executionRule/index'),
        meta: {
          title: 'executionRule',
          role: ['monitor:ruleExecute:ruleExecute']
        }
      },
      {
        path: 'executionRule/executing',
        name: 'ruleModel_executionRule_executing',
        component: _import('sys-monitoringAnalysis/ruleModel/executionRule/executing'),
        hidden: true
      }
    ]
  },
  // 数据处理
  {
    path: '/dataHandl',
    component: Layout,
    name: 'dataHandl',
    alwaysShow: true,
    hidden: true,
    meta: {
      title: 'dataHandl',
      icon: 'work',
      role: ['monitor:dataHandle:dataHandle']
    },
    children: [
      {
        // 数据处理 - 项目信息
        path: 'project',
        name: 'dataHandl_project',
        component: _import('sys-monitoringAnalysis/dataHandl/project/index'),
        meta: {
          title: 'dataHandlProject',
          role: ['monitor:projectInfo:projectInfo']
        }
      },
      {
        // 数据处理 - 项目处理流程
        path: 'projectProcedures',
        name: 'dataHandl_projectProcedures',
        component: _import('sys-monitoringAnalysis/dataHandl/projectProcedures/index'),
        meta: {
          title: 'projectProcedures',
          role: ['monitor:projectFlow:projectFlow']
        }
      },
      {
        // 数据处理 - 数据生命周期
        path: 'dataLifecycle',
        name: 'dataHandl_dataLifecycle',
        component: _import('sys-monitoringAnalysis/dataHandl/dataLifecycle/index'),
        meta: {
          title: 'dataLifecycleL',
          role: ['monitor:LifeCycle:LifeCycle']
        }
      },
      {
        // 数据处理 - 流程调度
        path: 'process/dispatch',
        name: 'dataHandl_process_dispatch',
        component: _import('sys-monitoringAnalysis/dataHandl/process/dispatch'),
        meta: {
          title: 'processDispatch',
          role: ['monitor:processPlan:processPlan']
        }
      },
      {
        // 数据处理 - 流程执行
        path: 'process/execute',
        name: 'dataHandl_process_execute',
        component: _import('sys-monitoringAnalysis/dataHandl/process/execute'),
        meta: {
          title: 'processExecute',
          role: ['monitor:processExecuteInfor:processExecuteInfor']
        }
      },
      {
        // 数据处理 - 结果信息
        path: 'resultInfo',
        name: 'dataHandl_resultInfo',
        component: _import('sys-monitoringAnalysis/dataHandl/resultInfo/index'),
        meta: {
          title: 'resultInfo',
          role: ['monitor:objectInfo:objectInfo']
        }
      },
      {
        // 数据处理 - 处理结果信息 - 流程
        path: 'resultInfo/resultProcess',
        name: 'dataHandl_resultInfo_resultProcess',
        component: _import('sys-monitoringAnalysis/dataHandl/resultInfo/resultProcess'),
        hidden: true
      },
      {
        // 数据处理 - 处理结果 - ID // meta: { title: 'resultInfo' }
        path: 'resultInfo/resultId',
        name: 'dataHandl_resultInfo_resultId',
        component: _import('sys-monitoringAnalysis/dataHandl/resultInfo/resultId/index'),
        hidden: true
      },
      {
        // 数据处理 - 处理结果 - ID - 详情 // meta: { title: 'resultInfo' }
        path: 'resultInfo/resultId/detail',
        name: 'dataHandl_resultInfo_resultId_detail',
        component: _import('sys-monitoringAnalysis/dataHandl/resultInfo/resultId/detail'),
        hidden: true
      }
    ]
  },
  // {
  //   // 文件传输 // meta: { title: 'resultInfo' }
  //   path: '/fileTransfer',
  //   component: Layout,
  //   name: 'fileTransfer',
  //   redirect: 'fileTransfer/fileSend',
  //   meta: {
  //     title: 'center_fileTransfer',
  //     icon: 'work',
  //     role: ['monitor']
  //   },
  //   children: [
  //     {
  //       // 文件传输 - 文件发送
  //       path: 'fileSend',
  //       component: _import('sys-monitoringAnalysis/fileTransfer/fileSend'),
  //       meta: {
  //         title: 'center_fileTransfer_fileSend'
  //       }
  //     },
  //     {
  //       // 文件传输 - 文件接收
  //       path: 'fileReceive',
  //       component: _import('sys-monitoringAnalysis/fileTransfer/fileReceive'),
  //       meta: {
  //         title: 'center_fileTransfer_fileReceive'
  //       }
  //     }
  //   ]
  // },
  // 举报管理
  {
    path: '/reportingManagement',
    component: Layout,
    name: 'reportingManagement',
    redirect: '/reportingManagement/index',
    alwaysShow: true, // 一直显示根路由
    meta: {
      title: 'reportingManagement',
      icon: 'work',
      role: ['monitor:report:report']
    },
    children: [
      {
        path: 'index',
        name: 'reportingManagement_index',
        component: _import('sys-monitoringAnalysis/reportingManagement/index'),
        meta: {
          title: 'warehousingPretreatment',
          role: ['monitor:report:Storage']
        }
      },
      {
        path: 'information',
        name: 'reportingManagement_information',
        component: _import('sys-monitoringAnalysis/reportingManagement/information'),
        meta: {
          title: 'informationProcessingFlow',
          role: ['monitor:report:circulation']
        }
      },
      {
        path: 'detailed',
        name: 'reportingManagement_detailed',
        component: _import('sys-monitoringAnalysis/reportingManagement/detailed'),
        meta: {
          title: 'inquiryDetailedDisplay',
          role: ['monitor:report:inquire']
        }
      },
      {
        path: 'statistics',
        name: 'reportingManagement_statistics',
        component: _import('sys-monitoringAnalysis/reportingManagement/statistics'),
        meta: {
          title: 'informationStatistics',
          role: ['monitor:report:reportTotal']
        }
      },
      {
        path: 'paper',
        name: 'reportingManagement_paper',
        component: _import('sys-monitoringAnalysis/reportingManagement/paper'),
        meta: {
          title: 'paper'
        },
        hidden: true
      },
      {
        path: 'query',
        name: 'reportingManagement_query',
        component: _import('sys-monitoringAnalysis/reportingManagement/newQuery'),
        meta: {
          title: 'query'
        },
        hidden: true
      },
      {
        path: 'handling',
        name: 'reportingManagement_handling',
        component: _import('sys-monitoringAnalysis/reportingManagement/handlingSituation'),
        meta: {
          title: 'handling'
        },
        hidden: true
      },
      {
        path: 'letters',
        name: 'reportingManagement_letters',
        component: _import('sys-monitoringAnalysis/reportingManagement/letters'),
        hidden: true
      }
    ]
  },
  {
    // 跨网单向文件传输 // meta: { title: 'resultInfo' }
    path: '/fileTransfer',
    component: Layout,
    name: 'fileTransfer',
    redirect: 'fileTransfer/fileSend',
    alwaysShow: true,
    meta: {
      title: 'center_fileTransfer',
      icon: 'work',
      role: ['monitor:crossNetwork:crossNetwork']
    },
    children: [
      // {
      // // 文件传输 - 文件发送
      //   path: 'fileSend',
      //   component: _import('sys-monitoringAnalysis/fileTransfer/fileSend'),
      //   meta: {
      //     title: 'center_fileTransfer_fileSend',
      //     role: ['monitor:sendFile:sendFile']
      //   }
      // },
      {
      // 文件传输 - 文件接收
        path: 'fileReceive',
        component: _import('sys-monitoringAnalysis/fileTransfer/fileReceive'),
        meta: {
          title: 'center_fileTransfer_fileReceive',
          role: ['monitor:fileReceive:fileReceive']
          // role: ['monitor:sendFile:sendFile']
        }
      }
    ]
  },
  // 数据权限管理
  {
    path: '/dataAuthority',
    component: Layout,
    redirect: '/dataAuthority/operator',
    alwaysShow: true, // 一直显示根路由
    meta: {
      icon: 'work',
      title: 'dataAuthority',
      role: ['monitor:dataAuthManagement:dataAuthManagement']
    },
    children: [
      {
        // 数据操作员 - 权限申请 --查询
        path: 'operator/index',
        component: _import('sys-monitoringAnalysis/dataAuthority/operator/index'),
        name: 'dataAuthority_operator',
        meta: {
          title: 'permissionApply',
          role: ['monitor:permissionRequest:permissionRequest']
        }
      },
      {
        // 数据操作员 - 跨区初审--查询
        path: 'operator/headOffice',
        component: _import('sys-monitoringAnalysis/dataAuthority/operator/headOffice'),
        name: 'dataAuthority_operator_headOffice',
        meta: {
          title: 'interregionalFirsttrial',
          role: ['monitor:crossDistrict:crossDistrict']
        }
      },
      {
        // 数据审批员 - 权限审批--查询
        path: 'approver/index',
        component: _import('sys-monitoringAnalysis/dataAuthority/approver/index'),
        name: 'dataAuthority_approver',
        meta: {
          title: 'permissionApprover',
          role: ['monitor:permissionApproval:permissionApproval']
        }
      },
      {
        // 数据审批员 - 跨区审批--查询
        path: 'approver/headOffice',
        component: _import('sys-monitoringAnalysis/dataAuthority/approver/headOffice'),
        name: 'dataAuthority_approver_headOffice',
        meta: {
          title: 'interregionalApprover',
          role: ['monitor:crossApproval:crossApproval']
        }
      },
      {
        // 工作台页面
        path: 'approver/noticeWork',
        component: _import('sys-monitoringAnalysis/dataAuthority/details'),
        name: 'dataAuthority_approver_noticeWork',
        hidden: true,
        meta: {
          title: 'interregionalNotice'
        }
      }
    ]
  },
  // 工作流 ------- 监测分析 -- 黄志虎
  {
    path: '/sys-monitoringAnalysis/work-flow',
    name: 'monitoringAnalysisWorkFlow',
    component: _import('sys-monitoringAnalysis/workFlow/index'),
    hidden: true
  },
  // 保证在最后
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
