import Axios from "axios";

const API_URL = 'http://localhost:3000/boats/' //move to env

const getAllBoats = async () => {
    const response = await Axios.get(API_URL);
    return response.data;
}


export default {
    getAllBoats,
}
