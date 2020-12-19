import Api from '../../services/api/rental';

const state = {
    boatRentals: {},
    ownerRentals: {},
    userRentals: {},
}

const getters = {
    boatRentals: state => state.boatRentals,
    ownedRentals: state => state.ownedRentals,
    userRentals: state => state.userRentals,
}

const actions = {
    async fetchRentalsByBoat({ commit }, boatId) {
        const rentals = await Api.getRentalsByBoat(boatId);
        commit('setBoatRentals', rentals);
    },
    async fetchRentalsByOwner({ commit }, ownerId) {
        const rentals = await Api.getRentalsByOwner(ownerId);
        commit('setOwnerRentals', rentals);
    },
    async fetchRentalsByUser({ commit }, userId) {
        const rentals = await Api.getRentalsByUser(userId);
        commit('setUserRentals', rentals); 
    }
}

const mutations = {
    setBoatRentals: (state, rentals) => (state.boatRentals = rentals),
    setOwnerRentals: (state, rentals) => (state.ownerRentals = rentals),
    setUserRentals: (state, rentals) => (state.userRentals = rentals),
}

export default {
    state,
    getters,
    actions,
    mutations,
}