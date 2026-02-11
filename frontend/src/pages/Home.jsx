import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="grid gap-6 md:grid-cols-2 transition ease-in-out duration-500">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm
      hover:shadow-purple-500 transform duration-500 hover:scale-105">
                <h1 className="text-3xl font-bold tracking-tight">Job Application Tracker</h1>
                <p className="mt-3 text-slate-600">
                    Track jobs and quickly submit applications
                </p>
                <div className="mt-6 flex gap-3">
                    <Link to="/dashboard" className="rounded-xl bg-slate-900 px-4 py-2 text-sm
                  font-semibold text-white hover:bg-gradient-to-r
                  hover:from-indigo-70 hover:via-purple-700 hover:to-pink-700
                  transition duration-500 ease-in-out"> Dashboard</Link>
                    <Link to="/jobs" className="rounded-xl bg-slate-900 px-4 py-2 text-sm
                  font-semibold text-white hover:bg-gradient-to-r
                  hover:from-indigo-70 hover:via-purple-700 hover:to-pink-700
                  transition duration-500 ease-in-out"> Jobs</Link>
                </div>
            </div>
        </div>
    );
}

