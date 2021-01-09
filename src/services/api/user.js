import Axios from "axios"
import authHeader from "../auth-header"

const API_URL = `${process.env.VUE_APP_API_URL}users/`
const API_URL_BILLING_APPEND = `/billing`

const getUserById = async (userId) => {
    const response = await Axios.get(`${API_URL}${userId}`, { headers: await authHeader() });
}

const createBillingInformation = async (userId, billingInfoData) => {
    const response = await Axios.post(`${API_URL}${userId}${API_URL_BILLING_APPEND}`, billingInfoData, { headers: await authHeader() });
    return response.data;
}

const getBillingInformationByUserId = async (userId) => {
    const response = await Axios.get(`${API_URL}${userId}${API_URL_BILLING_APPEND}`, { headers: await authHeader() });
    return response.data;
}


export default {
    getUserById,
    createBillingInformation,
    getBillingInformationByUserId
}