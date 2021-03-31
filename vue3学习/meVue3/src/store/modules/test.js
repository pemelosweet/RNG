const state = {
    count: 10,
}
const mutations = {
    increment(state, flag) {
        console.log(flag)
        flag ? state.count++ : state.count--
    }
}
const actions = {
    increment(context) {
        context.commit("increment");
    },
}

export default {
    state,
    mutations,
    actions
}
