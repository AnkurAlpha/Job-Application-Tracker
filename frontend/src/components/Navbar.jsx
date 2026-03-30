import { NavLink } from "react-router-dom"
import { useAuth } from "../auth/AuthContext"

const Navbar = () => {
    const { isAdmin, isAuthenticated, logout } = useAuth();
    const linkClass = ({isActive}) => "rounded-xl px-3 py-2 text-sm font-medium " +
        "duration-500 transition ease-in-out"+
            (isActive?" bg-black text-white  hover:bg-gradient-to-r hover:from-indigo-700"+
            " hover:via-purple-700 hover:to-pink-700":"text-white hover:text-white");
    return (
        <>
        <header className="border-b border-slate-200 bg-white ">
        <div className="mx-auto flex max-w-5xl justify-between px-4"></div>
            <div className="mx-auto flex justify-center text-white bg-black">
                <p className="text-2xl font-bold hover:scale-105 transition
                duration-500 hover:py-1"> Job Application Tracker</p>
            </div>
            <nav className="flex gap-2 bg-gradient-to-r
        from-indigo-500 via-purple-500 to-pink-500 py-2 px-2">
                <NavLink to="/" className={linkClass}>Home</NavLink>
                <NavLink to="/jobs" className={linkClass}>Jobs</NavLink>
                <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
                {isAdmin ? <NavLink to="/admin/create-job" className={linkClass}>+ Create Job</NavLink> : null}
                {!isAuthenticated ? <NavLink to="/login" className={linkClass}>Login</NavLink> : null}
                {isAuthenticated ? (
                  <button type="button" onClick={logout} className="rounded-xl px-3 py-2 text-sm font-medium text-white hover:bg-black/20 transition duration-500 ease-in-out">
                    Logout
                  </button>
                ) : null}
            </nav>
        </header>
        </>
    )
}

export default Navbar
