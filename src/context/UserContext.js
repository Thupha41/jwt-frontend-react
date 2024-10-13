import React, { useEffect, useState } from "react";
import { getUserAccount } from "../services/userServices";
const UserContext = React.createContext(null);

const UserProvider = ({ children }) => {
  const defaultData = {
    isLoading: true,
    isAuthenticated: false,
    token: "",
    account: {},
  };

  const [user, setUser] = useState(defaultData);
  const loginContext = (userData) => {
    setUser({ ...userData, isLoading: false });
  };
  const logoutContext = () => {
    setUser({ ...defaultData, isLoading: false });
  };

  const fetchUserAccount = async () => {
    let response = await getUserAccount();
    if (response && +response.EC === 1) {
      let data = {
        isAuthenticated: true,
        token: response.DT.accessToken,
        account: {
          roles: response.DT.roles,
          email: response.DT.email,
          username: response.DT.username,
        },
        isLoading: false,
      };
      setUser(data);
    } else {
      setUser({ ...defaultData, isLoading: false });
    }
  };

  useEffect(() => {
    if (
      window.location.pathname !== "/" &&
      window.location.pathname !== "/login"
    ) {
      fetchUserAccount();
    } else {
      setUser({ ...user, isLoading: false });
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, loginContext, logoutContext }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
