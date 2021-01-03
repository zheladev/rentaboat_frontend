import Axios from "axios";
import authHeader from '../auth-header'

const API_URL = `${process.env.VUE_APP_API_URL}rentals/` //move to env

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

const createRental = async (rentalData) => {
    const response = await Axios.post(API_URL, rentalData, { headers: await authHeader() });
    return {
        rental: response.data,
        status: response.status,
    };
}


export default {
    getRentalsByBoat,
    getRentalsByOwner,
    getRentalsByUser,
    createRental,
}
