import { useEffect, useState } from "react"
import { getJobs } from "../api/api.js"
import { Link } from "react-router-dom"
const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getJobs()
            .then(setJobs)
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);
    if (loading) return (
        <>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold">Loading jobs...</p>
                <p className="mt-1 text-sm text-slate-500">
                    Fetching from backend
                </p>
            </div>
        </>
    );
    if (error) return (
        <>
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
                <p className="text-sm font-semibold text-red-800"> Error </p>
                <p className="mt-1 text-sm text-red-700">{error}</p>
            </div>
        </>
    );
    return (
        <div>
            <div className="mb-5 flex items-end justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Jobs</h1>
                    <p className="mt-1 text-sm text-slate-600">
                        Click a job to view details and apply.
                    </p>
                </div>
                <div className="rounded-xl bg-white px-4 py-2 text-sm
        text-slate-600 shadow-sm ring-slate-200">
                    Total: <span className="font-semibold text-slate-900">{jobs.length}</span>
                </div>
            </div>
            {jobs.length == 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-sm font-semibold">No jobs yet</p>
                    <p className="mt-1 text-sm text-slate-600">
                        Add jobs from backend or spend your DB.
                    </p>
                </div>
            ) : (
                <>
                    <div className="grid gap-4 md:grid-cols-2">
                        {jobs.map((job) => (
                            <>
                                <div className="rounded-2xl border border-slate-200
                                bg-white p-6 shadow-sm" key={job.id}>
                                    <h3 className="text-base font-bold text-slate-900">
                                        {job.title}
                                    </h3>
                                    <p className="mt-2 line-clamp-3 text-sm text-slate-600">
                                        {job.description || "No description provided"}
                                    </p>
                                    <div className="mt-4 flex items-center justify-end">
                                        <Link to={`/jobs/${job.id}`} className="rounded-full
                                        bg-emerald-50 px-3 py-1 text-xs
                                        font-semibold text-emerald-700">View</Link>
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default Jobs
