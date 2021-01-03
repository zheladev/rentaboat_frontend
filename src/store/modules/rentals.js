import Api from '../../services/api/rental';

const state = {
    boatRentals: {},
    ownerRentals: {},
    userRentals: {},
    createdRental: null,
}

const getters = {
    boatRentals: state => state.boatRentals,
    ownedRentals: state => state.ownedRentals,
    userRentals: state => state.userRentals,
    createdRental: state => state.createdRental,
    hasSuccessfullyCreatedRental: state => state.createdRental !== null,
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
        const res = await Api.createRental(rentalData);
        if (res.status === 200) {
            commit('createdRental', res.rental);
        }
    },
    // async getRentalPricing({ commit }, rentalPricingData) {
    //     //send request to backend
    // }
}

const mutations = {
    setBoatRentals: (state, rentals) => (state.boatRentals = rentals),
    setOwnerRentals: (state, rentals) => (state.ownerRentals = rentals),
    setUserRentals: (state, rentals) => (state.userRentals = rentals),
    createdRental: (state, rental) => (state.createdRentals = rental),
}

export default {
    state,
    getters,
    actions,
    mutations,
}