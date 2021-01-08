import Api from '../../services/api/port';

const state = {
    ports: [],
}

const getters = {
    allPorts: state => state.ports,
}

const actions = {
    async fetchPorts({ commit }) {
        const ports = await Api.getAllPorts();
        commit('setPorts', ports);
    },
}

const mutations = {
    setPorts: (state, ports) => (state.ports = ports),
}

export default {
    state,
    getters,
    actions,
    mutations
}