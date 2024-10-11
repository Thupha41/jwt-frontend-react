import React, { useContext, useEffect } from "react";
import { Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";
const PrivateRoute = (props) => {
  let history = useHistory();
  const { user } = useContext(UserContext);
  console.log(">>> check user", user);
  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (!session) {
      history.push("/login");
      window.location.reload();
    }
  }, []);
  return (
    <>
      <Route path={props.path} component={props.component} />
    </>
  );
};

export default PrivateRoute;
