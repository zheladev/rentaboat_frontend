import Api from '../../services/api/rental';

const state = {
    boatRentals: {},
    ownerRentals: {},
    userRentals: {},
    createdRentals: {},
}

const getters = {
    boatRentals: state => state.boatRentals,
    ownedRentals: state => state.ownedRentals,
    userRentals: state => state.userRentals,
    createdRentals: state => state.createdRentals,
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
    },
    async createRental({ commit }, rentalData) {
        const rental = await Api.createRental(rentalData);
        commit('createRental', rental)
    },
    async getRentalPricing({ commit }, rentalPricingData) {
        //send request to backend
    }
}

const mutations = {
    setBoatRentals: (state, rentals) => (state.boatRentals = rentals),
    setOwnerRentals: (state, rentals) => (state.ownerRentals = rentals),
    setUserRentals: (state, rentals) => (state.userRentals = rentals),
    createdRentals: (state, rental) => (state.createdRentals = state.createdRentals.concat([rental])),
}

export default {
    state,
    getters,
    actions,
    mutations,
}