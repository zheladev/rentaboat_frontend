import Api from '../../services/api/boat';

const state = {
    boats: [],
    ownerBoats: [],
    currBoat: {},
    updateStatus: false,
    pages: 1,
}

const getters = {
    allBoats: state => state.boats,
    currBoat: state => state.currBoat,
    ownerBoats: state => state.ownerBoats,
    hasUpdateSucceeded: state => state.updateStatus,
    maxPages: state => state.pages,
}

const actions = {
    async fetchBoats({ commit }, { limit, page, searchParams = null }) {
        const boats = await Api.getAllBoats(page, limit, searchParams);
        commit('setBoats', boats);
    },
    async fetchBoatById({ commit }, id) {
        const boat = await Api.getBoatById(id);
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
    setBoats: (state, boats) => {
        state.boats = boats.data,
        state.pages = boats.totalPages
    },
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