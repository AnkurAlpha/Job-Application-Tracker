import { useState } from "react";
import { createJob } from "../api/api";
import { useAuth } from "../auth/AuthContext";

export default function AdminCreateJob() {
  const { token } = useAuth();
  const [form, setForm] = useState({ title: "", description: "" });
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setSubmitting(true);

    try {
      const created = await createJob({ ...form, token });
      setSuccessMessage(`Job created: ${created.title}`);
      setForm({ title: "", description: "" });
    } catch (err) {
      setError(err.message || "Failed to create job");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-bold">Create Job</h1>
      <p className="mt-1 text-sm text-slate-600">Admin-only form to publish a new role.</p>

      {successMessage && (
        <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
          {successMessage}
        </div>
      )}

      {error && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-700">Job Title</label>
          <input
            name="title"
            value={form.title}
            onChange={onChange}
            placeholder="Frontend Intern"
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-700">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
            rows={5}
            placeholder="React, APIs, UI ownership..."
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
          />
        </div>

        <button
          type="submit"
          disabled={!form.title.trim() || !form.description.trim() || submitting}
          className="w-full rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
        >
          {submitting ? "Creating..." : "Create Job"}
        </button>
      </form>
    </div>
  );
}
