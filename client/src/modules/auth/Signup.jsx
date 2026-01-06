import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import API from "../../config/apiconfig";
import { GoogleLogin } from "@react-oauth/google";
import { useAdminAuth } from "../Admin/AdminAuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const { setUser } = useAdminAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= EMAIL SIGNUP ================= */
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

      if (!res.data.success) {
        setError(res.data.message || "Signup failed");
        return;
      }

      navigate("/login");
    } catch {
      setError("Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ================= GOOGLE SIGNUP / LOGIN ================= */
  const handleGoogleSuccess = async (credentialResponse) => {
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${API.AUTH}/google`,
        { token: credentialResponse.credential },
        { withCredentials: true }
      );

      if (!res.data.success) {
        setError(res.data.message || "Google signup failed");
        return;
      }

      // ✅ sync context
      setUser(res.data.user);

      // ✅ SMART REDIRECT LOGIC
      if (res.data.isNewUser) {
        navigate("/fees", { replace: true });
      } else {
        navigate("/student/dashboard", { replace: true });
      }

    } catch {
      setError("Google signup failed");
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

        {error && (
          <p className="text-red-600 text-center mb-4">{error}</p>
        )}

        {/* EMAIL SIGNUP */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        {/* OR */}
        <div className="my-4 text-center text-gray-500 text-sm">
          OR
        </div>

        {/* GOOGLE SIGNUP */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError("Google signup failed")}
          />
        </div>

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
