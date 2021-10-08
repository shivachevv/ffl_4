
const state = {
  notifications: [],
};

const getters = {
  notifications: (state) => state.notifications,
};

const actions = {
  async addNotifications({ commit }, notifications) {
    commit("notifications", { notifications, clear: false });
  },
  async replaceNotifications({ commit }, notifications) {
    commit("notifications", { notifications, clear: true });
  },
  async clearNotifications({ commit }) {
    commit("notifications", { notifications: [], clear: true });
  },
};

const mutations = {
  notifications(state, { notifications, clear }) {
    state.notifications = clear
      ? notifications
      : [...state.notifications, ...notifications];
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
