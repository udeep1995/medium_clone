import Vue from "vue";

const ApiService = {
  post(resource, params) {
    return Vue.axios.post(`${resource}`, params);
  }
};

export default ApiService;
