import Api from '../../services/api/auth'

const user = JSON.parse(localStorage.getItem('user'));
/**
{
    "id": "81765a71-8b06-4fa3-b75b-0bbeddca3ac3",
    "email": "xxxxx@gmail.com",
    "username": "zheladev",
    "firstName": "a",
    "lastName": "b",
    "createdAt": "2020-11-26T14:36:00.511Z",
    "userType": {
        "id": "51716e52-83f3-4e29-bbf9-ceeefad943cb",
        "intValue": 0,
        "name": "admin",
        "isRegistrable": false,
        "isAdmin": true
    }
}
 */
const state = {
    user: user
}

const getters = {
    user: state => state.user,
    isLoggedIn: state => state.user !== null,
}

const actions = {
    async login({ commit } , loginInfo) {
        const login = await Api.login(loginInfo);

        if (login.status === 200) {
            commit('loginSuccess', login.user);
        } else {
            console.log('Login Failed')
            commit('loginFailure');
        }
        
    },
    async logout({ commit }) {
        Api.logout();
        commit('logout');
    }
}

const mutations = {
    loginSuccess(state, user) {
        state.user = user;
    },

    loginFailure(state) {
        state.user = null;
    },

    logout(state) {
        state.user = null;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}