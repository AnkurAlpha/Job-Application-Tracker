import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { applyForJob } from "../api/api";

const Apply = () => {
    const { id } = useParams();
    const [form, setForm] = useState({ name: "", email: "", resume: "" });
    const [submitting, setSubmitting] = useState(false);
    const [done, setDone] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const canSubmit =
        form.name.trim() && form.email.trim() && form.resume.trim();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSubmitting(true);
        try {
            await applyForJob({ ...form, jobId: id });
            setDone(true);
        } catch (e) {
            setError(e.message || "Failed to submit application");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="mx-auto max-w-2xl space-y-4">
            <Link
                to={`/jobs/${id}`}
                className="inline-flex items-center gap-2
        text-sm font-semibold text-slate-700 hover:text-slate-900" >
                ← Back to Job
            </Link>

            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <h1 className="text-2xl font-bold">Apply for Job</h1>
                <p className="mt-1 text-sm text-slate-600">
                    Fill details and submit your application.
                </p>

                {done && (
                    <div className="mt-4 rounded-xl border border-emerald-200
            bg-emerald-50 p-4">
                        <p className="text-sm font-semibold text-emerald-800">
                            Application submitted!
                        </p>
                        <p className="mt-1 text-sm text-emerald-700">
                            You can go back and apply to more jobs.
                        </p>
                    </div>
                )}

                {error && (
                    <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4">
                        <p className="text-sm font-semibold text-red-800">Error</p>
                        <p className="mt-1 text-sm text-red-700">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                        <label className="mb-1 block text-xs font-medium text-slate-700">
                            Name
                        </label>
                        <input
                            className="w-full rounded-xl border border-slate-200 px-3
                py-2 text-sm outline-none focus:border-slate-900
                focus:ring-2 focus:ring-slate-200"
                            name="name"
                            placeholder="Your name"
                            onChange={handleChange}
                            value={form.name}
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-medium text-slate-700">
                            Email
                        </label>
                        <input
                            className="w-full rounded-xl border border-slate-200 px-3 py-2
                text-sm outline-none focus:border-slate-900 focus:ring-2
                focus:ring-slate-200" name="email" placeholder="you@email.com"
                            onChange={handleChange} value={form.email} />
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-medium
                        text-slate-700"> Resume / Notes </label>
                        <textarea
                            className="w-full rounded-xl border
                            border-slate-200 px-3 py-2 text-sm
                            outline-none focus:border-slate-900 focus:ring-2
                            focus:ring-slate-200"
                            name="resume"
                            placeholder="Write a short note or paste resume text"
                            rows={6}
                            onChange={handleChange}
                            value={form.resume}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!canSubmit || submitting}
                        className="w-full rounded-xl bg-black px-4 py-2
                        text-sm font-semibold text-white hover:bg-slate-800
                        disabled:opacity-50" >
                        {submitting ? "Submitting..." : "Submit Application"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Apply
