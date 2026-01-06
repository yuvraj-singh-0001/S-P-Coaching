import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import API from "../../config/apiconfig";
import { useAdminAuth } from "../Admin/AdminAuthContext";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAdminAuth();

  const redirectTo = location.state?.from || "/";

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

      setUser(res.data.user);

      if (res.data.user.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate(redirectTo, { replace: true });
      }

    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  /* ================= GOOGLE LOGIN (BACKEND CONNECTED) ================= */
  const handleGoogleSuccess = async (credentialResponse) => {
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${API.AUTH}/google`,
        {
          token: credentialResponse.credential,
        },
        { withCredentials: true }
      );

      if (!res.data.success) {
        setError(res.data.message || "Google login failed");
        return;
      }

      // ✅ sync context
      setUser(res.data.user);

      // ✅ Google login only for STUDENT
      navigate(redirectTo || "/admission", { replace: true });

    } catch {
      setError("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-center mb-2">
          Welcome Back
        </h2>

        {error && (
          <p className="text-red-600 text-center mb-4">{error}</p>
        )}

        {/* EMAIL LOGIN */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-60"
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
          <Link to="/signup" className="text-blue-600 font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
