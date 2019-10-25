import { code2session, fingerVerify, getPhone } from '../../service'

const state = {
    openid: '',
    phone:''
};

const mutations = {
    updateOpenid(state, payload){
        state.openid = payload;
    },
    setPhone(state,payload){
        state.phone = payload.phoneNumber;
    }
};

const actions = {
    async login({commit}, params){
        let data = await code2session(params);
        if (data.openid){
            commit('updateOpenid', data.openid);
        }
    },

    async fingerVerify({state: {openid}}, params){
        params.openid = openid;
        let data = await fingerVerify(params);
        return data;
    },

    async getPhone({ commit }, params){
        let data = await getPhone(params);
        commit('setPhone',data)
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}