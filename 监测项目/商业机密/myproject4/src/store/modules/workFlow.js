import request from '@/utils/request'
const workFlow = {
  state: {
    workFlow2business: null, // 业务需要参数
    businessFlag: false, // 是否调用业务接口
    dialog: false, // 是否打开工作流弹窗
    buttonData: [], // 工作流button数据
    workFlowInfobusiness: {}, // 工作流完整workflow信息
    business2workFlow: { // 工作流需要参数
      configCode: '',
      configId: '',
      workitemId: '',
      proInstId: '',
      proDirId: '',
      actInstId: '',
      actDefId: '',
      ricd: ''
    },
    seniorListNumberArr: [],
    formContent: {}, // 获取表单内容
    attachList: [], // 表单附件
    flowRecord: false // 查看流程图

  },
  mutations: {
    SET_WORKFLOW2BUSINESS: (state, params) => {
      state.workFlow2business = params
    },
    SET_BUSINFOWORKFLOW: (state, params) => {
      state.workFlowInfobusiness = params
    },
    SET_BUSINESS2WORKFLOW: (state, params) => {
      console.log(state.business2workFlow, 11111)
      for (var item in state.business2workFlow) {
        // console.log(state.business2workFlow, params, 3333)
        state.business2workFlow[item] = ''
      }
      // 过滤无用数据
      for (var key in state.business2workFlow) {
        // console.log(state.business2workFlow, params, 3333)
        if (params[key]) {
          state.business2workFlow[key] = params[key]
        }
      }
      console.log(state.business2workFlow)
    },
    SET_BUSINESSFLAG(state, params) {
      state.businessFlag = params
    },
    SET_BUTTONDATA(state, params) {
      state.buttonData = params
    },
    SET_DIALOG(state, params) {
      state.dialog = params
    },
    SET_FORMCONTENT(state, params) {
      state.formContent = params
    },
    SET_ATTACHlIST(state, params) {
      state.attachList = params
    },
    SET_FLOWRECORD(state, params) {
      state.flowRecord = params
    },
    SET_SENIORLIST(state, params) {
      state.seniorListNumberArr = params
    }

  },
  actions: {
    business({
      commit
    }, params) {
      commit('SET_WORKFLOW2BUSINESS', params)
    },
    workFlow({
      commit,
      dispatch
    }, params) {
      commit('SET_BUSINESS2WORKFLOW', params)
    },
    workFlowInfoMesg({
      commit,
      dispatch
    }, params) {
      commit('SET_BUSINFOWORKFLOW', params)
    },
    changeFlag({
      commit
    }, params) {
      commit('SET_BUSINESSFLAG', params)
    },
    operationButton({
      commit,
      rootState
    }, params) {
      // var system = 'receivesys'
      // rootState.user.token.indexOf('monitor') !== -1 ? system = 'monitor' : system = 'receivesys'
      request({
        url: 'monitor/workflow/listRoleOperations',
        method: 'get',
        params: {
          configId: params.configId,
          proDirId: params.proDirId,
          actDefId: params.actDefId,
          roleType: params.roleType,
          proInstId: params.proInstId,
          workitemName: params.name,
          pkgId: params.formId
        }
      })
        .then(res => {
          if (res.code === 200) {
            commit('SET_BUTTONDATA', res.data)
          }
        })
    },
    openWorkFlow({
      commit
    }, params) {
      commit('SET_DIALOG', params)
    },
    setFormContent({
      commit
    }, params) {
      commit('SET_FORMCONTENT', params)
    },
    setAttachList({
      commit
    }, params) {
      commit('SET_ATTACHlIST', params)
    },
    setFlowRecord({
      commit
    }, params) {
      commit('SET_FLOWRECORD', params)
    },
    seniorListNumberArr({
      commit
    }, params) {
      commit('SET_SENIORLIST', params)
    }

  }
}

export default workFlow
