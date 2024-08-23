import { createContext, useState } from "react";

export const LoginContext = createContext({});

export const LoginProvider = ({ children }) => {
  const [token, setToken] = useState({});

  return (
    <LoginContext.Provider value={{ token, setToken }}>
      {children}
    </LoginContext.Provider>
  );
};
