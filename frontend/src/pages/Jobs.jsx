import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getJobs } from "../api/api.js";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getJobs()
      .then(setJobs)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="soft-panel rounded-2xl p-6">
        <p className="text-sm font-semibold text-slate-900">Loading jobs...</p>
        <p className="mt-1 text-sm text-slate-600">Fetching latest postings from backend.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <p className="text-sm font-semibold text-red-800">Error</p>
        <p className="mt-1 text-sm text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="glass-card flex flex-wrap items-end justify-between gap-3 rounded-2xl p-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Open Jobs</h1>
          <p className="mt-1 text-sm text-slate-600">Browse available roles and open the detail view to apply.</p>
        </div>
        <div className="badge">{jobs.length} total</div>
      </div>

      {jobs.length === 0 ? (
        <div className="soft-panel rounded-2xl p-6">
          <p className="text-sm font-semibold text-slate-900">No jobs yet</p>
          <p className="mt-1 text-sm text-slate-600">Add jobs from the backend seed or admin panel.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {jobs.map((job) => (
            <article key={job.id} className="soft-panel rounded-2xl p-5 transition hover:-translate-y-0.5 hover:shadow-lg">
              <p className="text-base font-bold text-slate-900">{job.title}</p>
              <p className="mt-2 text-sm text-slate-600">{job.description || "No description provided."}</p>
              <div className="mt-4 flex justify-end">
                <Link to={`/jobs/${job.id}`} className="btn btn-secondary !rounded-full !px-4 !py-1.5 !text-xs">
                  View Role
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;
