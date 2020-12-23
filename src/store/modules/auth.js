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
    user: user,
    isLoggedIn: user !== null,
}

const getters = {
    user: state => state.user,
    isLoggedIn: state => state.isLoggedIn,
}

const actions = {
    async login({ commit } , loginInfo) {
        const login = await Api.login(loginInfo);

        if (login.status === 200) {
            commit('loginSuccess', login.user);
        } else {
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
        state.isLoggedIn = true;
    },

    loginFailure(state) {
        state.user = null;
        state.isLoggedIn = false;
    },

    logout(state) {
        state.user = null;
        state.isLoggedIn = false;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}