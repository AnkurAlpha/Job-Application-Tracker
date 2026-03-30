import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Navbar = () => {
  const { isAdmin, isAuthenticated, logout } = useAuth();

  const linkClass = ({ isActive }) =>
    [
      "rounded-xl px-3 py-2 text-sm font-medium transition",
      isActive
        ? "bg-teal-900 text-white shadow-sm"
        : "text-slate-700 hover:bg-white/80 hover:text-slate-900",
    ].join(" ");

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="brand-font text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
              Job Application Tracker
            </p>
            <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Recruitment workspace</p>
          </div>
          <span className="badge">Live Board</span>
        </div>

        <nav className="glass-card flex flex-wrap items-center gap-1 rounded-2xl p-1.5">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/jobs" className={linkClass}>
            Jobs
          </NavLink>
          <NavLink to="/dashboard" className={linkClass}>
            Dashboard
          </NavLink>
          {isAdmin ? (
            <NavLink to="/admin/create-job" className={linkClass}>
              Create Job
            </NavLink>
          ) : null}
          {!isAuthenticated ? (
            <NavLink to="/login" className={linkClass}>
              Login
            </NavLink>
          ) : null}
          {isAuthenticated ? (
            <button
              type="button"
              onClick={logout}
              className="ml-auto rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
            >
              Logout
            </button>
          ) : null}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
