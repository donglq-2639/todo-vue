import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

const API_URL = "http://localhost:3000";

export default new Vuex.Store({
  state: {
    employees: [],
    page: 1,
    totalCount: null,
    searchValue: "",
  },
  mutations: {
    setEmployees(state, payload) {
      state.employees = payload;
    },
    setTotalCount(state, payload) {
      state.totalCount = payload;
    },
    createEmployee(state, payload) {
      state.employees.push(payload);
    },
    editEmployee(state, payload) {
      state.employees = state.employees.map((employee) => {
        if (employee.id === payload.id) {
          return (employee = payload);
        }
        return employee;
      });
    },
    removeEmployee(state, id) {
      state.employees = state.employees.filter(
        (employee) => employee.id !== id
      );
    },
    setPage(state, page) {
      state.page = page;
    },
  },
  actions: {
    async getAllEmployees({ commit }, payload) {
      try {
        const { page } = payload;
        const res = await axios.get(`${API_URL}/employees?_page=${page || 1}`);
        commit("setTotalCount", +res.headers["x-total-count"]);
        commit("setPage", page || 1);
        commit("setEmployees", res.data);
      } catch (error) {
        error;
      }
    },
    async removeEmployee({ commit }, payload) {
      try {
        await axios.delete(`${API_URL}/employees/${payload.id}`);
        commit("removeEmployee", payload.id);
      } catch (error) {
        error;
      }
    },
    async createEmployee({ commit }, payload) {
      try {
        await axios.post(`${API_URL}/employees`, payload);
        commit("createEmployee", payload);
      } catch (error) {
        error;
      }
    },
    async editEmployee({ commit }, payload) {
      try {
        const res = await axios.patch(
          `${API_URL}/employees/${payload.id}`,
          payload
        );
        commit("editEmployee", res.data);
      } catch (error) {
        error;
      }
    },
  },
  getters: {
    getEmployees: (state) =>
      state.employees.map((employee) => {
        if (employee.preferences && employee.preferences.length > 0) {
          return {
            ...employee,
            preferences: employee.preferences.join(", "),
          };
        }
        return employee;
      }),
    getPage: (state) => state.page,
    getTotalCount: (state) => state.totalCount,
  },
});
