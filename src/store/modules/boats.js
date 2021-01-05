import Api from '../../services/api/boat';

const state = {
    boats: [],
    ownerBoats: [],
    currBoat: {}
}

const getters = {
    allBoats: state => state.boats,
    currBoat: state => state.currBoat,
    ownerBoats: state => state.ownerBoats,
}

const actions = {
    async fetchBoats({ commit }) {
        const boats = await Api.getAllBoats();
        commit('setBoats', boats);
    },
    async fetchBoatById({ commit }, id) {
        let boat = {};
        const inMemBoatArr = state.boats.filter(b => b.id === id);
        //TODO: fetch data again if X time has passed
        if (inMemBoatArr.length > 0) {
            boat = inMemBoatArr[0];
        } else {
            const fetchedBoat = await Api.getBoatById(id);
            boat = fetchedBoat;
        }
        commit('setCurrBoat', boat);
    },
    async fetchBoatsByOwnerId({ commit }, ownerId) {
        const boats = await Api.getBoatsByOwnerId(ownerId);
        commit('setOwnerBoats', boats);
    }
}

const mutations = {
    setBoats: (state, boats) => (state.boats = boats),
    setCurrBoat: (state, currBoat) => (state.currBoat = currBoat),
    setOwnerBoats: (state, ownerBoats) => (state.ownerBoats = ownerBoats),
}

export default {
    state,
    getters,
    actions,
    mutations
}