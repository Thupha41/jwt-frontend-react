import axios from "axios";
const registerNewUser = async (email, phone, username, password) => {
  return await axios.post("http://localhost:8080/api/v1/register", {
    email,
    phone,
    username,
    password,
    // confirmPassword,
  });
};

const loginUser = async (valueLogin, password) => {
  return axios.post("http://localhost:8080/api/v1/login", {
    valueLogin,
    password,
  });
};

export { registerNewUser, loginUser };
