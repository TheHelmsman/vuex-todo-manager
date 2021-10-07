// import axios from "axios";

const todos = {
  state() {
    return {
      todos: [
        {
          id: 1,
          title: "Todo One",
        },
        {
          id: 2,
          title: "Todo Two",
        },
      ],
    };
  },
  mutations: {},
  actions: {},
  getters: {
    allTodos: (state) => state.todos,
  },
};

export default todos;
