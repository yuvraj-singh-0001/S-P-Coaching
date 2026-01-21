import { createContext, useContext, useEffect, useState } from "react";
import API from "../../config/apiconfig";

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= WAKE BACKEND ONCE ================= */
  useEffect(() => {
    let cancelled = false;

    const wakeAndLoadUser = async () => {
      try {
        const res = await fetch(`${API.AUTH}/me`, {
          credentials: "include"
        });

        const data = await res.json();

        if (!cancelled && data.success) {
          setUser(data.user);
          sessionStorage.setItem(
            "auth_user",
            JSON.stringify(data.user)
          );
        }
      } catch (err) {
        // backend sleeping or network issue → ignore
        console.warn("Backend waking up...");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    wakeAndLoadUser();

    return () => {
      cancelled = true;
    };
  }, []);

  /* ================= REFRESH USER ================= */
  const refreshUser = async () => {
    try {
      const res = await fetch(`${API.AUTH}/me`, {
        credentials: "include"
      });

      const data = await res.json();

      if (data.success) {
        setUser(data.user);
        sessionStorage.setItem(
          "auth_user",
          JSON.stringify(data.user)
        );
      }
    } catch (err) {
      console.warn("Failed to refresh user:", err);
    }
  };

  /* ================= LOGOUT ================= */
  const logout = async () => {
    try {
      await fetch(`${API.AUTH}/logout`, {
        method: "GET",
        credentials: "include",
      });
    } catch (err) {}

    sessionStorage.removeItem("auth_user");
    setUser(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{ user, loading, setUser, logout, refreshUser }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
