import Axios from "axios";
import authHeader from '../auth-header'

const API_URL = 'http://localhost:3000/rentals/' //move to env

const getRentalsByBoat = async (id) => {
    const response = await Axios.get(`${API_URL}boat/${id}`, { headers: await authHeader() });
    return response.data;
}

const getRentalsByRenter = async (id) => {
    const response = await Axios.get(`${API_URL}renter/${id}`, { headers: await authHeader() });
    return response.data;
}

const postRental = async (rentalData) => {
    const response = await Axios.post(API_URL, rentalData, { headers: await authHeader() });
    return response.data;
}


export default {
    getRentalsByBoat,
    getRentalsByRenter,
    postRental,
}
