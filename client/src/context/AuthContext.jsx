import { useEffect, useState } from "react";
import api from "../api/axios";
import { createContext } from "./Context";


createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Load user from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // 🔐 Login
  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("user", JSON.stringify(res.data));
    setUser(res.data);
  };

  // 📝 Register
  const register = async (name, email, password) => {
    const res = await api.post("/auth/register", {
      name,
      email,
      password,
    });
    localStorage.setItem("user", JSON.stringify(res.data));
    setUser(res.data);
  };

  // 🚪 Logout
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
