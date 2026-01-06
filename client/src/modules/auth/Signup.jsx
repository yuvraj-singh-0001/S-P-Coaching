import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import API from "../../config/apiconfig"; // ✅ correct path

export default function Signup() {
  const navigate = useNavigate();

  // ================= FORM STATE =================
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student", // ✅ default role
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${API.AUTH}/signup`,
        form,
        { withCredentials: true }
      );

      if (res.data.success) {
        // signup ke baad login page
        navigate("/login");
      } else {
        setError(res.data.message || "Signup failed");
      }
    } catch {
      setError("Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-center mb-2">
          Create Account
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Sign up to get started
        </p>

        {error && (
          <p className="text-red-600 text-center mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          {/* PASSWORD */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          {/* ROLE SELECT */}
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border p-2 rounded bg-white"
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
