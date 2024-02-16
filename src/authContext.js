import { createContext } from "react";

const AuthContext = createContext({
  authenticated: false,
  setAuthenticated: (auth) => {},
  userDetails: {},
  setUserDeatils: (user) => {},
});

export default AuthContext;

// import React,{ createContext }  from 'react';

// const UserContext = createContext(null);

// export default UserContext;