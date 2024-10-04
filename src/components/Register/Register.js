import "./Register.scss";
import { Link } from "react-router-dom";

const Register = (props) => {
  return (
    <div className="register-container mt-5">
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
            {/* Email */}
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                className="form-control"
                placeholder="Email address"
              />
            </div>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter username"
              />
            </div>
            {/* Phone number */}
            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                className="form-control"
                placeholder="Phone number"
              />
            </div>
            {/* Password */}
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
              />
            </div>
            {/* Re-Enter Password */}
            <div className="form-group">
              <label>Re-enter Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Re-enter Password"
              />
            </div>
            <button className="btn btn-primary">Log In</button>
            <span className="text-center">
              <Link className="forgot-password" href="/login">
                Already have an account? Login
              </Link>
            </span>
            <hr />
            <div className="text-center">
              <button className="btn btn-success">Create new account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
