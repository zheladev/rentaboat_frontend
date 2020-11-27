import Axios from "axios"


const state = {
    boats: []
}

const getters = {
    allBoats: state => state.boats
}

const actions = {
    async fetchBoats({ commit }) {
        const response = await Axios.get('http://localhost:3000/boats');
        console.log(response.data)

        commit('setBoats', response.data);
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