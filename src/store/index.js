import { createStore } from "vuex";

export default createStore({
  state: {
    token: "",
    my_info: {},
    posts: {},
    comments: {},
    replies: {},
    notifications: {}
  },
  mutations: {
    token(state, value) {
      state.token = value;
    },
    my_info(state, value) {
      state.my_info = value;
    },
    posts(state, value) {
      state.posts = value;
    },
    comments(state, value) {
      state.comments = value;
    },
    replies(state, value) {
      state.replies = value;
    },
    notifications(state, value) {
      state.notifications = value;
    }
  },
  actions: {},
  modules: {}
});
