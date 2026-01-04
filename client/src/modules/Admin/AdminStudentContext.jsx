import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import API from "../../config/apiconfig";

const AdminStudentContext = createContext(null);

export const useAdminStudents = () => {
  const ctx = useContext(AdminStudentContext);
  if (!ctx) {
    throw new Error("useAdminStudents must be used inside AdminStudentProvider");
  }
  return ctx;
};

export const AdminStudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API.ADMIN}/students`, {
        withCredentials: true
      });
      setStudents(res.data.students || []);
    } catch (err) {
      console.error("Failed to fetch students", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 ONLY ONE API CALL
  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <AdminStudentContext.Provider
      value={{
        students,
        loading,
        refreshStudents: fetchStudents
      }}
    >
      {children}
    </AdminStudentContext.Provider>
  );
};
