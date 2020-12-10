import Api from '../../services/api/rental';

const state = {
    boatRentals: {},
    renterRentals: {},
}

const getters = {
    boatRentals: state => state.boatRentals,
    renterRentals: state => state.renterRentals,
}

const actions = {
    async fetchRentalsByBoat({ commit }, boatId) {
        const rentals = await Api.getRentalsByBoat(boatId);
        commit('setBoatRentals', rentals);
    },
    async fetchRentalsByRenter({ commit }, renterId) {
        const rentals = await Api.getRentalsByRenter(renterId);
        commit('setRenterRentals', rentals);
    }
}

const mutations = {
    setBoatRentals: (state, rentals) => (state.boatRentals = rentals),
    setRenterRentals: (state, rentals) => (state.renterRentals = rentals),
}

export default {
    state,
    getters,
    actions,
    mutations,
}