import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginAdmin, signupAdmin } from "../api/api";
import { useAuth } from "../auth/AuthContext";
import { LogIn, UserPlus } from "lucide-react";
import { toast } from "sonner";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/admin/create-job";

  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ username: "", password: "", confirmPassword: "" });
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
      if (mode === "signup" && form.password !== form.confirmPassword) {
        throw new Error("Passwords do not match");
      }
      const payload = { username: form.username, password: form.password };
      const request = mode === "signup" ? signupAdmin(payload) : loginAdmin(payload);
      const data = await toast.promise(request, {
        loading: mode === "signup" ? "Creating account..." : "Signing in...",
        success: mode === "signup" ? "Account created" : "Logged in",
        error: (err) => err?.message || `${mode === "signup" ? "Signup" : "Login"} failed`,
      });
      login(data.token);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message || `${mode === "signup" ? "Signup" : "Login"} failed`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-md glass-card rounded-3xl p-8">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Admin Access</h1>
      <p className="mt-2 text-sm text-slate-600">Sign in or create an admin account to manage jobs.</p>

      <div className="mt-5 grid grid-cols-2 gap-2 rounded-xl border border-slate-200 bg-white p-1">
        <button
          type="button"
          onClick={() => {
            setMode("login");
            setError("");
          }}
          className={[
            "rounded-lg px-3 py-2 text-sm font-medium transition",
            mode === "login" ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100",
          ].join(" ")}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => {
            setMode("signup");
            setError("");
          }}
          className={[
            "rounded-lg px-3 py-2 text-sm font-medium transition",
            mode === "signup" ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100",
          ].join(" ")}
        >
          Signup
        </button>
      </div>

      {error ? <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div> : null}

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-slate-600">Username</label>
          <input
            name="username"
            value={form.username}
            onChange={onChange}
            autoComplete="username"
            className="field"
            placeholder="admin-user"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-slate-600">Password</label>
          <input
            name="password"
            value={form.password}
            onChange={onChange}
            type="password"
            autoComplete="current-password"
            className="field"
            placeholder="••••••••"
          />
        </div>

        {mode === "signup" ? (
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-slate-600">Confirm Password</label>
            <input
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={onChange}
              type="password"
              autoComplete="new-password"
              className="field"
              placeholder="••••••••"
            />
          </div>
        ) : null}

        <button
          type="submit"
          disabled={!form.username || !form.password || (mode === "signup" && !form.confirmPassword) || submitting}
          className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
        >
          {mode === "signup" ? <UserPlus size={16} /> : <LogIn size={16} />}
          {submitting ? (mode === "signup" ? "Creating account..." : "Signing in...") : mode === "signup" ? "Create Account" : "Login"}
        </button>
      </form>
    </section>
  );
}
