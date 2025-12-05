import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(user.role === "admin" ? "/admin" : "/employee");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await login(formData.email, formData.password);

    if (result.success) {
      // Redirect based on role
      const role = localStorage.getItem("role");
      navigate(role === "admin" ? "/admin" : "/employee");
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto bg-slate-800 p-8 rounded-lg shadow-lg border border-slate-700">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">Login</h2>
      {error && (
        <div className="bg-red-900 border border-red-600 text-red-300 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-slate-300 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow appearance-none border border-slate-600 rounded w-full py-2 px-3 bg-slate-700 text-white leading-tight focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-slate-300 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="shadow appearance-none border border-slate-600 rounded w-full py-2 px-3 bg-slate-700 text-white leading-tight focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <Link
            to="/signup"
            className="inline-block align-baseline font-bold text-sm text-blue-400 hover:text-blue-300"
          >
            Don't have an account?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
