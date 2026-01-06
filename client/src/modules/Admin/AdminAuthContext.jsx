import { createContext, useContext, useEffect, useState, useRef } from "react";
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
  const fetchedOnce = useRef(false);

  // 🔹 fetch logged-in user (cookie based)
  const fetchMe = async () => {
    try {
      const res = await axios.get(`${API.AUTH}/me`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setUser(res.data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 call only once on app load
  useEffect(() => {
    if (fetchedOnce.current) return;
    fetchedOnce.current = true;
    fetchMe();
  }, []);

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        loading,
        setUser,      // ✅ VERY IMPORTANT
        refreshUser: fetchMe,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};
