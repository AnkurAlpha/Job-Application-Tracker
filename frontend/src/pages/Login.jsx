import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginAdmin } from "../api/api";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/admin/create-job";

  const [form, setForm] = useState({ username: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const data = await loginAdmin(form);
      login(data.token);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-bold">Admin Login</h1>
      <p className="mt-1 text-sm text-slate-600">Sign in to create new jobs.</p>

      {error && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-700">Username</label>
          <input
            name="username"
            value={form.username}
            onChange={onChange}
            autoComplete="username"
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
            placeholder="admin"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-700">Password</label>
          <input
            name="password"
            value={form.password}
            onChange={onChange}
            type="password"
            autoComplete="current-password"
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={!form.username || !form.password || submitting}
          className="w-full rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
        >
          {submitting ? "Signing in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
