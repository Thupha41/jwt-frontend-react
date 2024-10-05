import { useState } from "react";
import "./Login.scss";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../services/userServices";

const Login = (props) => {
  let history = useHistory();
  const [valueLogin, setValueLogin] = useState("");
  const [password, setPassword] = useState("");
  const defaultValidInput = {
    validInput: true,
    validPassword: true,
  };
  const [objValidInput, setObjCheckValid] = useState(defaultValidInput);
  const handleCreateNewAccount = () => {
    history.push("/register");
  };

  const isValidInput = () => {
    let newValidState = { ...defaultValidInput };
    if (!valueLogin) {
      newValidState.validInput = false;
      toast.error("Please enter email address or phone number");
      return false;
    }
    if (!password) {
      newValidState.validPassword = false;
      toast.error("Please enter your password");
      return false;
    }
    setObjCheckValid(newValidState);
    return true;
  };
  const handleLogin = async () => {
    if (isValidInput()) {
      let response = await loginUser(valueLogin, password);
      let responseData = response.data;
      toast.success("Login success!");
    } else {
      toast.error("Login failed");
    }
  };

  return (
    <div className="login-container mt-5">
      <div className="container">
        <div className="row px-3 px-sm-0">
          <div className="contain-left col-12 col-sm-7 d-none d-sm-block">
            <div className="logo">Thupha</div>
            <div className="detail">
              Thupha helps you connect and share with the people in your life
            </div>
          </div>
          <div className="contain-right col-12 col-sm-5 d-flex flex-column gap-3 py-3">
            <div className="logo d-sm-none">Thupha</div>
            <input
              type="text"
              className={`form-control ${
                !objValidInput.validInput ? "is-invalid" : ""
              }`}
              placeholder="Email address or phone number"
              value={valueLogin}
              onChange={(event) => setValueLogin(event.target.value)}
            />
            <input
              type="password"
              className={`form-control ${
                !objValidInput.validPassword ? "is-invalid" : ""
              }`}
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button className="btn btn-primary" onClick={() => handleLogin()}>
              Log In
            </button>
            <span className="text-center">
              <Link className="forgot-password" href="/">
                Forgot your password?
              </Link>
            </span>
            <hr />
            <div className="text-center">
              <button
                className="btn btn-success"
                onClick={handleCreateNewAccount}
              >
                Create new account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
