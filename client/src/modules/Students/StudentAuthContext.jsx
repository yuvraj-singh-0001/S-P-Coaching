import { createContext, useContext, useEffect, useState } from "react";
import apiconfig from "../../config/api";

const StudentAuthContext = createContext();

export const StudentAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${apiconfig.AUTH}/me`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.user.role === "student") {
          setUser(data.user);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <StudentAuthContext.Provider value={{ user, loading }}>
      {children}
    </StudentAuthContext.Provider>
  );
};

export const useStudentAuth = () => useContext(StudentAuthContext);
