import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    sessionStorage.getItem("token") !== null ? setIsLoggedIn(true) : setIsLoggedIn(false)
  }, []);

  const loginHandler = () => {
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{
      isLoggedIn: isLoggedIn,
      onLogout: logoutHandler,
      onLogin: loginHandler,
    }}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
