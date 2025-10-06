// src/context/AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import { users } from '../data/mockData'; // Import data user kita

// 1. Membuat Context
const AuthContext = createContext(null);

// 2. Membuat Provider (Komponen yang akan menyediakan data)
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // Awalnya tidak ada user yang login

  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user); // Jika user ditemukan, simpan datanya di state
      return true; // Login berhasil
    }
    return false; // Login gagal
  };

  const logout = () => {
    setCurrentUser(null); // Hapus data user dari state
  };

  // Nilai yang akan dibagikan ke seluruh aplikasi
  const value = {
    currentUser,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 3. Membuat Custom Hook untuk mempermudah penggunaan context
export const useAuth = () => {
  return useContext(AuthContext);
};