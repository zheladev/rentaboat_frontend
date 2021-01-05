import Axios from "axios";
import authHeader from '../auth-header'

const API_URL = `${process.env.VUE_APP_API_URL}boats/` //move to env

const getAllBoats = async () => {
    const response = await Axios.get(API_URL, { headers: await authHeader() });
    return response.data;
}

const getBoatsByOwnerId = async (id) => {
    const response = await Axios.get(`${API_URL}owner/${id}`, { headers: await authHeader() });
    return response.data;
}

const getBoatById = async (id) => {
    const response = await Axios.get(`${API_URL}${id}`, { headers: await authHeader() });
    return response.data;
}

const postBoat = async (boatData) => {
    const response = await Axios.post(API_URL, boatData, { headers: await authHeader() });
    return response.data;
}


export default {
    getAllBoats,
    getBoatById,
    postBoat,
    getBoatsByOwnerId,
}
