import { useState } from "react";
import axios from "axios";
import API from "../../config/apiconfig";
import { useAdminAuth } from "./AdminAuthContext";

const AdminProfile = () => {
  const { user, refreshUser } = useAdminAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveProfile = async () => {
    await axios.put(
      `${API.AUTH}/update-profile`,
      form,
      { withCredentials: true }
    );
    refreshUser();
    setMessage("Profile updated successfully");
  };

  return (
    <div className="max-w-xl bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">My Profile</h2>

      {message && (
        <div className="mb-4 text-green-700 bg-green-100 p-2 rounded">
          {message}
        </div>
      )}

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
        placeholder="Name"
      />

      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
        placeholder="Email"
      />

      <input
        name="password"
        value={form.password}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
        placeholder="New Password (optional)"
      />

      <button
        onClick={saveProfile}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save Changes
      </button>
    </div>
  );
};

export default AdminProfile;
