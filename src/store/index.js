import { createStore } from "vuex";

export default createStore({
  state: {
    token: "",
    my_info: {}
  },
  mutations: {
    token(state, value) {
      state.token = value;
    },
    my_info(state, value) {
      state.my_info = value;
    }
  },
  actions: {},
  modules: {}
});
