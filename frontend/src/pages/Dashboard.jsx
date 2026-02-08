import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getJobs } from "../api/api.js";

const Dashboard = () => {

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getJobs()
      .then(setJobs)
      .catch((err) => setError(err.message || "Failed to load data"))
      .finally(() => setLoading(false));
  }, []);

  const stats = useMemo(() => {
    // If your backend has status later, this will still work.
    const total = jobs.length;
    return {
      totalJobs: total,
      openJobs: total, // placeholder: you can change when status exists
      latestJobs: jobs.slice(0, 3),
    };
  }, [jobs]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold">Loading dashboard…</p>
        <p className="mt-1 text-sm text-slate-500">Fetching data from backend</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <p className="text-sm font-semibold text-red-800">Dashboard Error</p>
        <p className="mt-1 text-sm text-red-700">{error}</p>
        <Link
          to="/jobs"
          className="mt-4 inline-block rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Go to Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-2 text-sm text-slate-600">
          Quick overview for the frontend review demo.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/jobs"
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Browse Jobs
          </Link>
          <Link
            to="/"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100"
          >
            Home
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Total Jobs
          </p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {stats.totalJobs}
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Numbre of Total Jobs
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Open Jobs
          </p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {stats.openJobs}
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Number of open jobs to apply for
          </p>
        </div>

      </div>

      {/* Recent jobs */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Recent Jobs</h2>
            <p className="mt-1 text-sm text-slate-600">
                List of all the jobs that have recently came
            </p>
          </div>

          <Link
            to="/jobs"
            className="text-sm font-semibold text-slate-900 underline underline-offset-4"
          >
            View all
          </Link>
        </div>

        {stats.latestJobs.length === 0 ? (
          <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
            No jobs available yet. Add jobs from backend or seed the DB.
          </div>
        ) : (
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {stats.latestJobs.map((job) => (
              <Link
                key={job.id}
                to={`/jobs/${job.id}`}
                className="block rounded-2xl border border-slate-200 bg-white p-4 hover:bg-slate-50"
              >
                <p className="text-sm font-bold text-slate-900 line-clamp-1">
                  {job.title}
                </p>
                <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                  {job.description || "No description provided."}
                </p>

                <div className="mt-3 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  Open
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

export default Dashboard
