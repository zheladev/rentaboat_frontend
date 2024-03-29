import AuthApi from '../../services/api/auth'
import UserApi from '../../services/api/user'

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
    successfulRegistration: false,
}

const getters = {
    user: state => state.user,
    isLoggedIn: state => state.isLoggedIn,
    hasSuccessfullyRegistered: state => state.successfulRegistration,
}

const actions = {
    async login({ commit } , loginInfo) {
        const login = await AuthApi.login(loginInfo);

        if (login.status === 200) {
            commit('loginSuccess', login.user);
        } else {
            commit('loginFailure');
        }
        
    },
    async logout({ commit }) {
        AuthApi.logout();
        commit('logout');
    },
    async signup({ commit }, registrationInfo) {
        const registrationStatus = await AuthApi.register(registrationInfo);
        if (registrationStatus.status === 200) {
            commit('registrationSuccess');
        } else {
            commit('registrationFailure');
        }
    },
    async promoteToOwner({ commit }, id) {
        console.log('hi')
        const promotedUser = await UserApi.promoteToOwner(id);
        commit('promoteToOwner', promotedUser);
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
    },

    registrationSuccess(state) {
        state.successfulRegistration = true;
    },

    registrationFailure(state) {
        state.successfulRegistration = false;
    },
    promoteToOwner(state, user) {
        state.user = user;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}