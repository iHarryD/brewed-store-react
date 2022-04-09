import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState({
    status: localStorage.getItem("logged-in") || false,
    userName: localStorage.getItem("user-name") || null,
  });

  function logout() {
    localStorage.removeItem("logged-in");
    localStorage.removeItem("user-name");
    localStorage.removeItem("encodedToken");
    setIsLoggedIn({
      status: false,
      userName: null,
    });
  }
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
