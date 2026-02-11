import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getJobById } from "../api/api";

export default function JobDetails() {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        getJobById(id)
            .then(setJob)
            .catch((e) => setError(e.message || "Failed to load job"));
    }, [id]);

    if (error)
        return (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
                <p className="text-sm font-semibold text-red-800">Error</p>
                <p className="mt-1 text-sm text-red-700">{error}</p>
                <Link className="mt-4 inline-block text-sm font-semibold
                text-slate-900 underline" to="/jobs">
                    Back to Jobs
                </Link>
            </div>
        );

    if (!job)
        return (
            <div className="rounded-2xl border border-slate-200
            bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold">Loading…</p>
            </div>
        );

    return (
        <div className="space-y-4">
            <Link
                to="/jobs"
                className="inline-flex items-center gap-2 text-sm
                font-semibold text-slate-700 hover:text-slate-900"
            >
                ← Back to Jobs
            </Link>

            <div className="rounded-2xl border border-slate-200 bg-white
                p-8 shadow-sm">
                <h2 className="text-2xl font-bold">{job.title}</h2>
                <p className="mt-3 text-slate-600">
                    {job.description || "No description provided."}
                </p>

                <div className="mt-6 flex gap-3">
                    <Link
                        to={`/apply/${job.id}`}
                        className="rounded-xl bg-slate-900 px-4 py-2 text-sm
                                font-semibold text-white hover:bg-slate-800" >
                        Apply Now
                    </Link>
                    <Link
                        to="/jobs"
                        className="rounded-xl border border-slate-200 bg-white
                        px-4 py-2 text-sm font-semibold text-slate-900
                        hover:bg-slate-100" > Browse Jobs
                    </Link>
                </div>
            </div>
        </div>
    );
}

