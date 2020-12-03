import Axios from "axios"

const API_URL = 'http>//localhost:3000/auth/' //move to env

const login = async (loginInfo) => {
    const response = await Axios.post(`${API_URL}login/`, loginInfo);

    const user = response.data;
    const accessCookie = response.headers['Set-Cookie'];

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('accessCookie', accessCookie);

    return {
        user: user,
        accessCookie: accessCookie
    };
}

const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessCookie');
}