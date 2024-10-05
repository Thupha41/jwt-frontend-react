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

export { registerNewUser };
