import Axios from "axios";
import authHeader from '../auth-header'

const API_URL = 'http://localhost:3000/boats/' //move to env

const getAllBoats = async () => {
    const response = await Axios.get(API_URL, { headers: await authHeader() });
    return response.data;
}


export default {
    getAllBoats,
}
