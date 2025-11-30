// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import API from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  // Check logged-in user on app start
  const checkUser = async () => {
    try {
      setChecking(true);
      const res = await API.get("/auth/me");
      setUser(res.data);
    } catch (err) {
      setUser(null);
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  // register/login accept guestId so backend can merge cart
  const register = async ({ name, email, password, guestId }) => {
    const res = await API.post("/auth/register", { name, email, password, guestId });
    setUser(res.data);
    return res.data;
  };

  const login = async ({ email, password, guestId }) => {
    const res = await API.post("/auth/login", { email, password, guestId });
    setUser(res.data);
    return res.data;
  };

  const logout = async () => {
    try {
      await API.post("/auth/logout");
    } catch (err) {
      // ignore
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, checking, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
