import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import API from "../../config/apiconfig";
import { GoogleLogin } from "@react-oauth/google";
import { useAdminAuth } from "../Admin/AdminAuthContext";
import Layout from "../../components/layout/Layout";
import { Eye, EyeOff } from "lucide-react";

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
  const [showPassword, setShowPassword] = useState(false);

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
    <Layout>
      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-gray-50 px-4 pt-24 pb-10">
        <div className="bg-white w-full max-w-md rounded-xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-2xl font-bold text-center mb-2">
          Create Account
        </h2>

        {error && (
          <p className="text-red-600 text-center mb-4">{error}</p>
        )}

        {/* EMAIL SIGNUP */}
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0C4A8B] hover:bg-blue-800 text-white py-2 rounded font-semibold disabled:opacity-60 transition"
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
          <Link to="/login" className="text-yellow-500 font-semibold">
            Login
          </Link>
        </p>
        </div>
      </div>
    </Layout>
  );
}
