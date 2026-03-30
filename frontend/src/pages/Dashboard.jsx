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
    const total = jobs.length;
    return {
      totalJobs: total,
      openJobs: total,
      latestJobs: jobs.slice(0, 3),
    };
  }, [jobs]);

  if (loading) {
    return (
      <div className="soft-panel rounded-2xl p-6">
        <p className="text-sm font-semibold text-slate-900">Loading dashboard...</p>
        <p className="mt-1 text-sm text-slate-600">Fetching data from backend.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <p className="text-sm font-semibold text-red-800">Dashboard Error</p>
        <p className="mt-1 text-sm text-red-700">{error}</p>
        <Link to="/jobs" className="btn btn-primary mt-4 inline-block">
          Go to Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <section className="glass-card rounded-3xl p-7 sm:p-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard Overview</h1>
        <p className="mt-2 text-sm text-slate-600">Quick snapshot of live roles and the latest listings.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/jobs" className="btn btn-primary">
            Browse Jobs
          </Link>
          <Link to="/" className="btn btn-secondary">
            Home
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="soft-panel rounded-2xl p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Total Jobs</p>
          <p className="mt-2 text-4xl font-bold text-slate-900">{stats.totalJobs}</p>
          <p className="mt-2 text-sm text-slate-600">Count of all jobs currently listed.</p>
        </article>

        <article className="soft-panel rounded-2xl p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Open Jobs</p>
          <p className="mt-2 text-4xl font-bold text-slate-900">{stats.openJobs}</p>
          <p className="mt-2 text-sm text-slate-600">Roles that are available for candidates right now.</p>
        </article>
      </section>

      <section className="soft-panel rounded-2xl p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Recent Jobs</h2>
            <p className="mt-1 text-sm text-slate-600">Most recently available opportunities.</p>
          </div>
          <Link to="/jobs" className="text-sm font-semibold text-teal-800 hover:text-teal-900">
            View all
          </Link>
        </div>

        {stats.latestJobs.length === 0 ? (
          <div className="mt-4 rounded-xl bg-slate-100 p-4 text-sm text-slate-700">No jobs available yet.</div>
        ) : (
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {stats.latestJobs.map((job) => (
              <Link key={job.id} to={`/jobs/${job.id}`} className="rounded-2xl border border-slate-200 bg-white/90 p-4 transition hover:-translate-y-0.5 hover:shadow-md">
                <p className="text-sm font-bold text-slate-900">{job.title}</p>
                <p className="mt-2 text-sm text-slate-600">{job.description || "No description provided."}</p>
                <div className="mt-3 inline-flex rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
                  Open
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
