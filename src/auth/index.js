import Vue from "vue";

const ApiService = {
  get(resource) {
    return Vue.axios.get(`${resource}`);
  },
  post(resource, params) {
    return Vue.axios.post(`${resource}`, params);
  }
};

export default ApiService;
