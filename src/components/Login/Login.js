import "./Login.scss";
const Login = (props) => {
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
              className="form-control"
              placeholder="Email address or phone number"
            />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
            />
            <button className="btn btn-primary">Log In</button>
            <span className="text-center">
              <a className="forgot-password" href="/">
                Forgot your password
              </a>
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

export default Login;
