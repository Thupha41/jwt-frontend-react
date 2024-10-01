import "./Login.scss";
const Login = (props) => {
  return (
    <div className="login-container mt-5">
      <div className="container">
        <div className="row">
          <div className="contain-left col-7">
            <div>Thupha</div>
            <div>
              Thupha helps you connect and share with the people in your life
            </div>
          </div>
          <div className="contain-right green col-5 d-flex flex-column gap-3 py-3">
            <input
              type="text"
              className="form-control"
              placeholder="Email address or phone number"
            />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
            />
            <button className="btn btn-primary">Log In</button>
            <span className="text-center">Forgot your password</span>
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

export default Login;
