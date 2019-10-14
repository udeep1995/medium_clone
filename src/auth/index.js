import Vue from "vue";
import { getToken } from "./storage";
const ApiService = {
  get(resource) {
    return Vue.axios.get(`${resource}`);
  },
  post(resource, params) {
    return Vue.axios.post(`${resource}`, params);
  },
  put(resource, params) {
    return Vue.axios.put(`${resource}`, params);
  },
  delete(resource) {
    return Vue.axios.delete(`${resource}`);
  },
  createHeader() {
    const token = getToken();
    if (!token) return;
    Vue.axios.defaults.headers.common["Authorization"] = `Token ${token}`;
  },
  clearHeader() {
    delete Vue.axios.defaults.headers.common["Authorization"];
  }
};

export default ApiService;
