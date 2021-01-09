import Api from '../../services/api/user';

const state = {
    selectedUser: null,
    userBillingInformation: [],
}

const getters = {
    selectedUser: state => state.selectedUser,
    billingInformationArray: state => state.userBillingInformation,
}

const actions = {
    async fetchUser({ commit }, id) {
        const user = await Api.getUserById(id);
        commit('setUser', user);
    },
    async fetchBillingInformation({ commit }, id) {
        const billingInformation = await Api.getBillingInformationByUserId(id);
        commit('setBillingInformation', billingInformation);
    },
    async createBillingInformation({ commit }, id, billingInfoData) {
        const createdBillingInfo = await Api.createBillingInformation(id, billingInfoData);
        commit('createBillingInformation', createdBillingInfo);
    }

}

const mutations = {
    setUser: (state, user) => (state.selectedUser = user),
    setBillingInformation: (state, bi) => (state.userBillingInformation = bi),
    createBillingInformation: (state, bi) => (state.userBillingInformation = state.userBillingInformation.concat([bi])),
}

export default {
    state,
    getters,
    actions,
    mutations,
}