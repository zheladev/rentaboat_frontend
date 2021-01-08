import Api from '../../services/api/boat';

const state = {
    boats: [],
    ownerBoats: [],
    currBoat: {},
    updateStatus: false,
}

const getters = {
    allBoats: state => state.boats,
    currBoat: state => state.currBoat,
    ownerBoats: state => state.ownerBoats,
    hasUpdateSucceeded: state => state.updateStatus,
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
    },
    async createBoat({ commit }, boatData) {
        const boat = await Api.postBoat(boatData);
        commit('createBoat', boat);
    },
    async modifyBoat({ commit }, { boatId, boatData }) {
        const modifiedBoat = await Api.updateBoat(boatId, boatData);
        if (modifiedBoat.id === boatId) {
            const replaceIdx = state.ownerBoats.findIndex(b => b.id === boatId);
            const newBoatsArr = state.ownerBoats
                .slice(0, replaceIdx)
                .concat([modifiedBoat, ...state.ownerBoats.slice(replaceIdx + 1)]);
            commit('updateOwnerBoat', newBoatsArr);
        } else {
            commit('failedUpdateOwnerBoat');
        }
    }
}

const mutations = {
    setBoats: (state, boats) => (state.boats = boats),
    setCurrBoat: (state, currBoat) => (state.currBoat = currBoat),
    setOwnerBoats: (state, ownerBoats) => (state.ownerBoats = ownerBoats),
    updateOwnerBoat: (state, ownerBoats) => { state.ownerBoats = ownerBoats; state.updateStatus = true },
    createBoat: (state, boat) => { state.ownerBoats = state.ownerBoats.concat([boat]) },
    failedUpdateOwnerBoat: (state) => { state.updateStatus = false },
}

export default {
    state,
    getters,
    actions,
    mutations
}