import React from "react";
import { Switch, Route } from "react-router-dom";

import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Users from "../components/UserManagement/Users";
import PrivateRoute from "./PrivateRoute";
const AppRoute = () => {
  return (
    <>
      <Switch>
        <Route path="/" exact>
          Home
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <PrivateRoute path="/users" component={Users} />
        <Route path="*">404 Not Found</Route>
      </Switch>
    </>
  );
};

export default AppRoute;
