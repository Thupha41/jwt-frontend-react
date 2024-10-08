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
  return await axios.post("http://localhost:8080/api/v1/login", {
    valueLogin,
    password,
  });
};

const fetchAllUsers = async (page, limit) => {
  return await axios.get(
    `http://localhost:8080/api/v1/users/read?page=${page}&limit=${limit}`
  );
};
const deleteUser = async (userId) => {
  return await axios.delete(
    `http://localhost:8080/api/v1/users/delete/${userId}`
  );
};

const fetchAllRoles = async () => {
  return await axios.get(`http://localhost:8080/api/v1/roles/read`);
};
export { registerNewUser, loginUser, fetchAllUsers, deleteUser, fetchAllRoles };
