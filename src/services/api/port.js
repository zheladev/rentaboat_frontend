import Axios from "axios";
import authHeader from '../auth-header'

const API_URL = `${process.env.VUE_APP_API_URL}ports/` //move to env

const getAllPorts = async () => {
    const response = await Axios.get(API_URL, { headers: await authHeader() });
    return response.data;
}

export default {
    getAllPorts,
}