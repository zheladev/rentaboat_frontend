import Api from '../../services/api/boat';

const state = {
    boats: []
}

const getters = {
    allBoats: state => state.boats
}

const actions = {
    async fetchBoats({ commit }) {
        const boats = await Api.getAllBoats();
        commit('setBoats', boats);
    }
}

const mutations = {
    setBoats: (state, boats) => (state.boats = boats),
}

export default {
    state,
    getters,
    actions,
    mutations
}