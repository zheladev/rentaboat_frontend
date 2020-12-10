import Api from '../../services/api/boat';

const state = {
    boats: [],
    currBoat: {}
}

const getters = {
    allBoats: state => state.boats,
    currBoat: state => state.currBoat,
}

const actions = {
    async fetchBoats({ commit }) {
        const boats = await Api.getAllBoats();
        commit('setBoats', boats);
    },
    async fetchBoatById({ commit }, id) {
        let boat = {};
        const inMemBoatArr = state.boats.filter(b => b.id === id);
        if (inMemBoatArr.length > 0) {
            boat = inMemBoatArr[0];
        } else {
            const fetchedBoat = await Api.getBoatById(id);
            boat = fetchedBoat;
        }
        commit('setCurrBoat', boat);
    }
}

const mutations = {
    setBoats: (state, boats) => (state.boats = boats),
    setCurrBoat: (state, currBoat) => (state.currBoat = currBoat),
}

export default {
    state,
    getters,
    actions,
    mutations
}