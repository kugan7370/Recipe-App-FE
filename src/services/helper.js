const getToken = async () => {
  return localStorage.getItem("token");
};

const setToken = async (token) => {
  localStorage.setItem("token", token);
};

const getUser = async () => {
  return JSON.parse(localStorage.getItem("user"));
};

const setUser = async (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const clearStorage =  () => {
  localStorage.clear();
};

const getCartFromStorage = () => {
  return JSON.parse(localStorage.getItem("cart"));
};

const setCartToStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const clearCartStorage = () => {
  localStorage.removeItem("cart");
};

export {
  getToken,
  setToken,
  getUser,
  setUser,
  clearStorage,
  getCartFromStorage,
  setCartToStorage,
  clearCartStorage,
};
