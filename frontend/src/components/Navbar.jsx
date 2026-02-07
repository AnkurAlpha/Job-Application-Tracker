import { NavLink } from "react-router-dom"

const Navbar = () => {
    const linkClass = ({isActive}) => "rounded-xl px-3 py-2 text-sm font-medium transition" +
            (isActive?" bg-slate-900 text-white":" text-slate-900");
    return (
        <>
        <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl justify-between px-4 py-4"></div>
            <div >
                <p className="text-base font-bold "> Job Tracker</p>
            </div>
            <nav className="flex gap-2">
                <NavLink to="/" className={linkClass}>Home</NavLink>
                <NavLink to="/jobs" className={linkClass}>Jobs</NavLink>
                <NavLink to="/apply" className={linkClass}>Apply</NavLink>
                <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
            </nav>
        </header>
        </>
    )
}

export default Navbar
