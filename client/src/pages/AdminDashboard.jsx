import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  FaUsers,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaRupeeSign,
  FaBars,
  FaEye,
} from "react-icons/fa";

import API from "../config/apiconfig";   // <-- IMPORTANT

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [activeTab, setActiveTab] = useState("ALL");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // ================= LOAD STUDENTS =================
  const getStudents = async () => {
    try {
      setLoading(true);

      let url = `${API.ADMIN}/students`;

      if (activeTab === "APPROVED") url += "?status=Approved";
      else if (activeTab === "PENDING") url += "?status=Pending";
      else if (activeTab === "REJECTED") url += "?status=Rejected";

      const res = await axios.get(url);
      let data = res.data.students;

      if (activeTab === "DUE") {
        data = data.filter((s) => s?.fees?.remaining > 0);
      }

      setStudents(data);
    } catch (err) {
      alert("Error loading students");
    }
    setLoading(false);
  };

  useEffect(() => {
    getStudents();
  }, [activeTab]);

  // ================= UPDATE STATUS =================
  const updateStatus = async (id, status) => {
    await axios.put(`${API.ADMIN}/students/status/${id}`, { status });
    alert(`Student ${status}`);
    setSelectedStudent(null);
    getStudents();
  };

  // ================= UPDATE FEES =================
  const updateFees = async (id) => {
    const total = prompt("Enter Total Fee:");
    const paid = prompt("Enter Paid Fee:");
    if (!total || !paid) return;

    await axios.put(`${API.ADMIN}/students/fees/${id}`, { total, paid });
    alert("Fees Updated");
    getStudents();
  };

  // ================= DELETE STUDENT =================
  const deleteStudent = async (id) => {
    if (!window.confirm("Delete Student?")) return;
    await axios.delete(`${API.ADMIN}/students/${id}`);
    alert("Student Deleted");
    getStudents();
  };

  // ================= SAVE EDIT =================
  const saveEdit = async () => {
    await axios.put(
      `${API.ADMIN}/students/${selectedStudent._id}`,
      selectedStudent
    );

    alert("Student Updated");
    setSelectedStudent(null);
    getStudents();
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      
      {/* SIDEBAR */}
      <div className="hidden md:block w-64 bg-gray-900 text-white p-5">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

        <div className="space-y-3">
          <button onClick={() => setActiveTab("ALL")}
            className={`w-full flex items-center gap-3 p-3 rounded ${activeTab==="ALL"?"bg-blue-600":"bg-gray-800 hover:bg-gray-700"}`}>
            <FaUsers /> All Students
          </button>

          <button onClick={() => setActiveTab("APPROVED")}
            className={`w-full flex items-center gap-3 p-3 rounded ${activeTab==="APPROVED"?"bg-green-600":"bg-gray-800 hover:bg-gray-700"}`}>
            <FaCheckCircle /> Approved
          </button>

          <button onClick={() => setActiveTab("PENDING")}
            className={`w-full flex items-center gap-3 p-3 rounded ${activeTab==="PENDING"?"bg-yellow-600":"bg-gray-800 hover:bg-gray-700"}`}>
            <FaClock /> Pending
          </button>

          <button onClick={() => setActiveTab("REJECTED")}
            className={`w-full flex items-center gap-3 p-3 rounded ${activeTab==="REJECTED"?"bg-red-600":"bg-gray-800 hover:bg-gray-700"}`}>
            <FaTimesCircle /> Rejected
          </button>

          <button onClick={() => setActiveTab("DUE")}
            className={`w-full flex items-center gap-3 p-3 rounded ${activeTab==="DUE"?"bg-purple-600":"bg-gray-800 hover:bg-gray-700"}`}>
            <FaRupeeSign /> Due Fees
          </button>
        </div>
      </div>

      {/* MOBILE NAV */}
      <div className="md:hidden w-full bg-gray-900 text-white p-4 flex justify-between">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <FaBars onClick={() => setMobileMenu(!mobileMenu)} className="text-2xl" />
      </div>

      {mobileMenu && (
        <div className="absolute bg-gray-900 text-white w-64 p-5 z-50 md:hidden">
          <button onClick={() => setMobileMenu(false)}
            className="text-right w-full text-lg mb-2">X</button>

          <button onClick={() => {setActiveTab("ALL"); setMobileMenu(false)}} className="block w-full p-3 bg-gray-700 mb-2 rounded">All Students</button>
          <button onClick={() => {setActiveTab("APPROVED"); setMobileMenu(false)}} className="block w-full p-3 bg-gray-700 mb-2 rounded">Approved</button>
          <button onClick={() => {setActiveTab("PENDING"); setMobileMenu(false)}} className="block w-full p-3 bg-gray-700 mb-2 rounded">Pending</button>
          <button onClick={() => {setActiveTab("REJECTED"); setMobileMenu(false)}} className="block w-full p-3 bg-gray-700 mb-2 rounded">Rejected</button>
          <button onClick={() => {setActiveTab("DUE"); setMobileMenu(false)}} className="block w-full p-3 bg-gray-700 mb-2 rounded">Due Fees</button>
        </div>
      )}

      {/* MAIN */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4">
          {activeTab==="ALL" && "All Students"}
          {activeTab==="APPROVED" && "Approved Students"}
          {activeTab==="PENDING" && "Pending Students"}
          {activeTab==="REJECTED" && "Rejected Students"}
          {activeTab==="DUE" && "Students With Due Fees"}
        </h1>

        <div className="bg-white p-4 rounded shadow overflow-auto">

          {loading ? (
            <p>Loading...</p>
          ) : students.length === 0 ? (
            <p>No Students Found</p>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="p-3">Name</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Class</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {students.map((s) => (
                  <tr key={s._id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-semibold">{s.name}</td>
                    <td className="p-3">{s.phone}</td>
                    <td className="p-3">{s?.className || "—"}</td>

                    <td className="p-3">
                      <span className={`px-3 py-1 rounded text-white ${
                        s.admissionStatus==="Approved"
                          ?"bg-green-600"
                          :s.admissionStatus==="Rejected"
                          ?"bg-red-600"
                          :"bg-yellow-600"
                      }`}>
                        {s.admissionStatus}
                      </span>
                    </td>

                    <td className="p-3 flex gap-2 flex-wrap">
                      <button
                        onClick={() => setSelectedStudent(s)}
                        className="px-3 py-1 bg-blue-600 text-white rounded flex items-center gap-2">
                        <FaEye /> View / Edit
                      </button>

                      <button
                        onClick={() => deleteStudent(s._id)}
                        className="px-3 py-1 bg-black text-white rounded">
                        Delete
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          )}
        </div>
      </div>

      {/* EDIT / VIEW MODAL */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
          <div className="bg-white w-[90%] md:w-[600px] p-6 rounded shadow-lg">

            <h2 className="text-2xl font-bold mb-3">Student Details & Edit</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input className="border p-2 rounded"
                value={selectedStudent.name}
                onChange={(e)=>setSelectedStudent({...selectedStudent,name:e.target.value})} />

              <input className="border p-2 rounded"
                value={selectedStudent.email || ""}
                onChange={(e)=>setSelectedStudent({...selectedStudent,email:e.target.value})} />

              <input className="border p-2 rounded"
                value={selectedStudent.phone}
                onChange={(e)=>setSelectedStudent({...selectedStudent,phone:e.target.value})} />

              <input className="border p-2 rounded"
                value={selectedStudent.className || ""}
                onChange={(e)=>setSelectedStudent({...selectedStudent,className:e.target.value})} />

              <input className="border p-2 rounded"
                value={selectedStudent?.fees?.total || 0}
                onChange={(e)=>setSelectedStudent({
                  ...selectedStudent,
                  fees:{...selectedStudent.fees,total:e.target.value}
                })} />

              <input className="border p-2 rounded"
                value={selectedStudent?.fees?.paid || 0}
                onChange={(e)=>setSelectedStudent({
                  ...selectedStudent,
                  fees:{...selectedStudent.fees,paid:e.target.value}
                })} />
            </div>

            <div className="flex gap-3 mt-5 flex-wrap">
              <button onClick={saveEdit}
                className="px-4 py-2 bg-green-600 text-white rounded">
                Save Changes
              </button>

              <button onClick={()=>updateStatus(selectedStudent._id,"Approved")}
                className="px-4 py-2 bg-green-700 text-white rounded">
                Approve
              </button>

              <button onClick={()=>updateStatus(selectedStudent._id,"Rejected")}
                className="px-4 py-2 bg-red-600 text-white rounded">
                Reject
              </button>

              <button onClick={()=>updateFees(selectedStudent._id)}
                className="px-4 py-2 bg-purple-700 text-white rounded">
                Update Fees
              </button>

              <button onClick={()=>setSelectedStudent(null)}
                className="px-4 py-2 bg-gray-700 text-white rounded">
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
