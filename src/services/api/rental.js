import Axios from "axios";
import authHeader from '../auth-header'

const API_URL = 'http://localhost:3000/rentals/' //move to env

const getRentalsByBoat = async (id) => {
    const response = await Axios.get(`${API_URL}boat/${id}`, { headers: await authHeader() });
    return response.data;
}

const getRentalsByOwner = async (id) => {
    const response = await Axios.get(`${API_URL}owner/${id}`, { headers: await authHeader() });
    return response.data;
}

const getRentalsByUser = async (id) => {
    const response  = await Axios.get(`${API_URL}user/${id}`, { headers: await authHeader() });
    return response.data;
}

const postRental = async (rentalData) => {
    const response = await Axios.post(API_URL, rentalData, { headers: await authHeader() });
    return response.data;
}


export default {
    getRentalsByBoat,
    getRentalsByOwner,
    getRentalsByUser,
    postRental,
}
