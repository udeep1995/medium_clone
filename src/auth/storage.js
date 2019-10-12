export const saveToken = function(value) {
  localStorage.setItem("token", value);
};

export const getToken = function() {
  return localStorage.getItem("token");
};

export const clearToken = function() {
  localStorage.removeItem("token");
};
