import { createStore } from "vuex";

export default createStore({
  state: {
    sampleBlogCards: [
      {
        blogTitle: "Ferrari's response to Hungary",
        blogCoverPhoto: "stock-1",
        blogDate: "August 1, 2022",
      },
      {
        blogTitle: "The man behind the racer",
        blogCoverPhoto: "stock-2",
        blogDate: "August 1, 2022",
      },
      {
        blogTitle: "Piastri, Ricciardo, Williams and more",
        blogCoverPhoto: "stock-3",
        blogDate: "August 1, 2022",
      },
      {
        blogTitle: "Verstappen improving as a Driver",
        blogCoverPhoto: "stock-4",
        blogDate: "August 1, 2022",
      },
    ],
    editPost: false,
    user: null,
  },
  mutations: {
    toggleEditPost(state, payload) {
      state.editPost = payload;
    },
    saveUserData(state, payload) {
      state.user = payload;
    },
  },
  actions: {},
  modules: {},
});
