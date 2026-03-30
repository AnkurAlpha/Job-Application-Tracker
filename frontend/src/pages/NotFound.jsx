import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">404</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900">Page not found</h1>
      <p className="mt-2 text-sm text-slate-600">
        The page you are looking for does not exist or has moved.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Link
          to="/"
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Go Home
        </Link>
        <Link
          to="/jobs"
          className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100"
        >
          Browse Jobs
        </Link>
      </div>
    </div>
  );
}
