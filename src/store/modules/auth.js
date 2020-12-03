import Api from '../../services/api/auth'

const user = JSON.parse(localStorage.getItem('user'));
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
            console.log('failed')
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