// storing the token
const storeToken = (value) => {
  localStorage.setItem("token", value);
};

// getting the token
const getToken = () => {
  let token = localStorage.getItem("token");
  return token;
};
// removing the token
const removeToken = (value) => {
  localStorage.removeItem(value);
};

export { storeToken, getToken, removeToken };
