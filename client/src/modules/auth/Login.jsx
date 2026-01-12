import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import API from "../../config/apiconfig";
import { useAdminAuth } from "../Admin/AdminAuthContext";
import { GoogleLogin } from "@react-oauth/google";
import Layout from "../../components/layout/Layout";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAdminAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= EMAIL / PASSWORD LOGIN ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${API.AUTH}/login`,
        form,
        { withCredentials: true }
      );

      if (!res.data.success) {
        setError(res.data.message || "Login failed");
        return;
      }

      const user = res.data.user;
      setUser(user);

      // ===== ROLE BASED REDIRECT (NO EXTRA API CALL) =====
      if (user.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        // STUDENT
        if (user.admissionStatus === "Approved") {
          navigate("/student/dashboard", { replace: true });
        } else {
          // first time / not approved yet → always go to fees page
          navigate("/fees", { replace: true });
        }
      }

    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  /* ================= GOOGLE LOGIN ================= */
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
        setError(res.data.message || "Google login failed");
        return;
      }

      const user = res.data.user;
      setUser(user);

      // Google login = STUDENT ONLY
      if (user.admissionStatus === "Approved") {
        navigate("/student/dashboard", { replace: true });
      } else {
        // first time / not approved yet → always go to fees page
        navigate("/fees", { replace: true });
      }

    } catch {
      setError("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-gray-50 px-4 pt-24 pb-10">
        <div className="bg-white w-full max-w-md rounded-xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-2xl font-bold text-center mb-2">
          Welcome Back
        </h2>

        {error && (
          <p className="text-red-600 text-center mb-4">{error}</p>
        )}

        {/* EMAIL LOGIN */}
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* OR */}
        <div className="my-4 text-center text-gray-500 text-sm">
          OR
        </div>

        {/* GOOGLE LOGIN */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError("Google Login Failed")}
          />
        </div>

        <p className="text-center text-sm mt-4">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-yellow-500 font-semibold">
            Sign up
          </Link>
        </p>
      </div>
      </div>
    </Layout>
  );
};

export default Login;
