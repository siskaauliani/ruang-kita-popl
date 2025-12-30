// src/context/AuthContext.jsx
import React, { createContext, useState, useContext } from "react";
import { users } from "../data/mockData";

// 1. Membuat Context
const AuthContext = createContext(null);

// 2. Provider
export const AuthProvider = ({ children }) => {
  // Ambil data user dari localStorage saat app pertama kali load
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Fungsi login
  const login = (email, password) => {
    console.info("[AUTH] Login attempt:", email);

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      setCurrentUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      console.info("[AUTH] Login success:", user.email);
      return true;
    }

    console.error("[AUTH] Login failed:", email);
    return false;
  };

  // Fungsi logout
  const logout = () => {
    console.info("[AUTH] User logout");
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  const value = {
    currentUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Custom Hook
export const useAuth = () => {
  return useContext(AuthContext);
};
