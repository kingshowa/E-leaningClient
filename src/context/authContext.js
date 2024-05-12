import React, { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [role, setRole] = useState(localStorage.getItem("role") || null);
  const [name, setName] = useState(localStorage.getItem("name") || null);
  const [photo, setPhoto] = useState(localStorage.getItem("photo") || null);

  const login = (newToken, userRole, newName, newPhoto) => {
    setToken(newToken);
    setRole(userRole);
    setName(newName);
    setPhoto(newPhoto);
    localStorage.setItem("token", newToken);
    localStorage.setItem("role", userRole);
    localStorage.setItem("name", newName);
    localStorage.setItem("photo", newPhoto);
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setName(null);
    setPhoto(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("photo");
  };

  return (
    <AuthContext.Provider value={{ token, role, name, photo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Typechecking props for the AuthProvider
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  return useContext(AuthContext);
};
