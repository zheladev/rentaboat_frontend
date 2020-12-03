import Axios from "axios"

const API_URL = 'http://localhost:3000/auth/' //move to env

const login = async (loginInfo) => {
    const response = await Axios.post(`${API_URL}login/`, loginInfo, { withCredentials: true });

    const user = response.data;
    console.log(response.headers)
    const authToken = response.headers['Set-Cookie'];

    //move to mutation?
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('authToken', authToken);

    return {
        status: response.status,
        user: user,
        authToken: authToken
    };
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