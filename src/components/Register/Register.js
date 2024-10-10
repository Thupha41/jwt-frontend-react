import { useState } from "react";
import "./Register.scss";
import { Link, useHistory } from "react-router-dom";
import { registerNewUser } from "../../services/userServices";
import { toast } from "react-toastify";

const Register = (props) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const defaultValidInput = {
    isValidEmail: true,
    isValidPhone: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
  };

  const [objCheckValid, setObjCheckValid] = useState(defaultValidInput);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10,15}$/;

  // Validation Logic
  const validateInput = () => {
    let newValidState = { ...defaultValidInput };

    // Trim values before validation
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();

    // Email Validation
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      newValidState.isValidEmail = false;
      toast.error(
        trimmedEmail ? "Please enter a valid email!" : "Please enter email!"
      );
      return false;
    }

    // Phone Validation
    if (!trimmedPhone || !phoneRegex.test(trimmedPhone)) {
      newValidState.isValidPhone = false;
      toast.error(
        trimmedPhone
          ? "Please enter a valid phone number!"
          : "Please enter phone number!"
      );
      return false;
    }

    // Password Validation
    if (!password) {
      newValidState.isValidPassword = false;
      toast.error("Please enter a password!");
      return false;
    }

    // Confirm Password Validation
    if (password && password !== confirmPassword) {
      newValidState.isValidConfirmPassword = false;
      toast.error("Passwords do not match!");
      return false;
    }

    setObjCheckValid(newValidState);
    return true;
  };

  const handleRegister = async () => {
    let checkValidate = validateInput();
    if (checkValidate) {
      // toast.success("Wow so easy!");
      let responseData = await registerNewUser(
        email,
        phone,
        username,
        password
      );
      if (+responseData.EC === 1) {
        history.push("/login");
        toast.success(responseData.EM);
      } else {
        toast.error(responseData.EM);
      }
    }
  };

  const handlePressEvent = (event) => {
    if (event.key === "Enter" && event.keyCode === 13) {
      handleRegister();
    }
  };

  return (
    <div className="register-container mt-5">
      <div className="container">
        <div className="row px-3 px-sm-0">
          <div className="contain-left col-12 col-sm-7 d-none d-sm-block">
            <div className="logo">Thupha</div>
            <div className="detail">
              Thupha helps you connect and share with the people in your life.
            </div>
          </div>
          <div className="contain-right col-12 col-sm-5 d-flex flex-column gap-3 py-3">
            <div className="logo d-sm-none">Thupha</div>
            {/* Email */}
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                className={`form-control ${
                  !objCheckValid.isValidEmail ? "is-invalid" : ""
                }`}
                placeholder="Email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            {/* Username */}
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            {/* Phone */}
            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                className={`form-control ${
                  !objCheckValid.isValidPhone ? "is-invalid" : ""
                }`}
                placeholder="Phone number"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </div>
            {/* Password */}
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className={`form-control ${
                  !objCheckValid.isValidPassword ? "is-invalid" : ""
                }`}
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            {/* Confirm Password */}
            <div className="form-group">
              <label>Re-enter Password</label>
              <input
                type="password"
                className={`form-control ${
                  !objCheckValid.isValidConfirmPassword ? "is-invalid" : ""
                }`}
                placeholder="Re-enter Password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                onKeyDown={(event) => {
                  handlePressEvent(event);
                }}
              />
            </div>
            {/* Register Button */}
            <div className="text-center">
              <button className="btn btn-success" onClick={handleRegister}>
                Create new account
              </button>
            </div>

            {/* Login Redirect */}
            <span className="text-center">
              <Link className="forgot-password" to="/login">
                Already have an account? Login
              </Link>
            </span>
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
