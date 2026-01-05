import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import API from "../../config/apiconfig";

const AdminAuthContext = createContext(null);

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) {
    throw new Error("useAdminAuth must be used inside AdminAuthProvider");
  }
  return ctx;
};

export const AdminAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 GET LOGGED IN USER
  const fetchMe = async () => {
    try {
      const res = await axios.get(`${API.AUTH}/me`, {
        withCredentials: true
      });

      if (res.data.success) {
        setUser(res.data.user);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 LOGOUT
  const logout = async () => {
    await axios.post(`${API.AUTH}/logout`, {}, {
      withCredentials: true
    });
    setUser(null);
    window.location.href = "/login";
  };

  useEffect(() => {
    fetchMe();
  }, []);

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        loading,
        logout,
        refreshUser: fetchMe
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};
