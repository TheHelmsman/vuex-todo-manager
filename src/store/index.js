import axios from "axios";
import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      count: 2,
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
  mutations: {
    setTodos: (state, todos) => (state.todos = todos),
    newTodo: (state, todo) => state.todos.unshift(todo),
    removeTodo: (state, id) =>
      (state.todos = state.todos.filter((todo) => todo.id !== id)),
    updateTodo: (state, updTodo) => {
      const index = state.todos.findIndex((todo) => todo.id === updTodo.id);
      if (index !== -1) {
        state.todos.splice(index, 1, updTodo);
      }
    },
  },
  actions: {
    async fetchTodos({ commit }) {
      const res = await axios.get("https://jsonplaceholder.typicode.com/todos");
      // console.log(res);
      commit("setTodos", res.data);
    },
    async addTodo({ commit }, title) {
      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/todos",
        { title, completed: false }
      );
      commit("newTodo", res.data);
    },
    async deleteTodo({ commit }, id) {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      commit("removeTodo", id);
    },
    async filterTodos({ commit }, e) {
      // console.log(commit, e);
      // Get selected number
      const limit = parseInt(
        e.target.options[e.target.options.selectedIndex].innerText
      );
      console.log(limit);
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
      );
      // console.log(res);
      commit("setTodos", res.data);
    },
    async updateTodo({ commit }, updTodo) {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/todos/${updTodo.id}`,
        updTodo
      );
      // console.log(response.data);
      commit("updateTodo", response.data);
    },
  },
  getters: {
    allTodos: (state) => state.todos,
  },
});

export default store;
