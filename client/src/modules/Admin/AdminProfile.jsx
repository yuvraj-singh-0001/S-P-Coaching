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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setMessage("");
  };

  const saveProfile = async () => {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      if (!form.name.trim()) {
        setError("Name is required");
        return;
      }

      if (!form.email.trim()) {
        setError("Email is required");
        return;
      }

      const res = await axios.put(
        `${API.AUTH}/update-profile`,
        form,
        { withCredentials: true }
      );

      if (res.data.success) {
        setMessage("Profile updated successfully");
        await refreshUser();
        
        // Reset password field after successful update
        setForm(prev => ({
          ...prev,
          password: ""
        }));

        // Clear message after 3 seconds
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Failed to update profile";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">My Profile</h2>

      {message && (
        <div className="mb-4 text-green-700 bg-green-100 p-2 rounded">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-4 text-red-700 bg-red-100 p-2 rounded">
          {error}
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
        type="password"
        value={form.password}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
        placeholder="New Password (optional)"
      />

      <button
        onClick={saveProfile}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

export default AdminProfile;
