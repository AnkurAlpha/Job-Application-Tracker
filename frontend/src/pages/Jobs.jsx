import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getJobs } from "../api/api.js";
import { toast } from "sonner";
import Skeleton from "react-loading-skeleton";
import { Eye } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Jobs = () => {
  const scope = useRef(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getJobs()
      .then(setJobs)
      .catch((err) => {
        const message = err.message || "Failed to fetch jobs";
        setError(message);
        toast.error(message);
      })
      .finally(() => setLoading(false));
  }, []);

  useGSAP(
    () => {
      if (loading || error) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".jobs-anim-header", {
        y: 12,
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
      });

      gsap.from(".jobs-anim-card", {
        y: 12,
        opacity: 0,
        duration: 0.42,
        ease: "power2.out",
        stagger: 0.06,
        delay: 0.08,
      });
    },
    { scope, dependencies: [loading, error, jobs.length] }
  );

  if (loading) {
    return (
      <div className="space-y-5">
        <div className="glass-card rounded-2xl p-6">
          <Skeleton width={180} height={28} />
          <div className="mt-2">
            <Skeleton width={320} height={16} />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <article key={`jobs-skeleton-${index}`} className="soft-panel rounded-2xl p-5">
              <Skeleton width="70%" height={22} />
              <div className="mt-3 space-y-2">
                <Skeleton count={3} height={14} />
              </div>
              <div className="mt-5 flex justify-end">
                <Skeleton width={92} height={30} borderRadius={9999} />
              </div>
            </article>
          ))}
        </div>
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
    <div ref={scope} className="space-y-5">
      <div className="jobs-anim-header glass-card flex flex-wrap items-end justify-between gap-3 rounded-2xl p-6">
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
            <article key={job.id} className="jobs-anim-card soft-panel rounded-2xl p-5 transition hover:-translate-y-0.5 hover:shadow-lg">
                <p className="text-base font-bold text-slate-900">{job.title}</p>
                <p className="mt-2 text-sm text-slate-600">{job.description || "No description provided."}</p>
                <div className="mt-4 flex justify-end">
                  <Link to={`/jobs/${job.id}`} className="btn btn-secondary !rounded-full !px-4 !py-1.5 !text-xs">
                    <Eye size={14} />
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
