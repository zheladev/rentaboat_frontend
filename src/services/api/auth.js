import Axios from "axios"

const API_URL = `${process.env.VUE_APP_API_URL}auth/`

const login = async (loginInfo) => {
    try {
        const response = await Axios.post(`${API_URL}login/`, loginInfo);
        const user = response.data;
        console.log(response)
        const authToken = response.headers['x-access-token'];
    
        //move to mutation?
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('authToken', authToken);
    
        return {
            status: response.status,
            user: user,
            authToken: authToken
        };
    } catch (error) {
        return {
            status: error.response.status,
            user: null,
            authToken: null
        }
    }


}

const logout = () => {
    //move to mutation?
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
}

export default {
    login,
    logout
}