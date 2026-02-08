import { NavLink } from "react-router-dom"

const Navbar = () => {
    const linkClass = ({isActive}) => "rounded-xl px-3 py-2 text-sm font-medium " +
        "duration-500 transition ease-in-out"+
            (isActive?" bg-black text-white  hover:bg-gradient-to-r hover:from-indigo-700"+
            " hover:via-purple-700 hover:to-pink-700":"text-white hover:text-white");
    return (
        <>
        <header className="border-b border-slate-200 bg-white ">
        <div className="mx-auto flex max-w-5xl justify-between px-4"></div>
            <div className="mx-auto flex justify-center text-white bg-black">
                <p className="text-2xl font-bold"> Job Application Tracker</p>
            </div>
            <nav className="flex gap-2 bg-gradient-to-r
        from-indigo-500 via-purple-500 to-pink-500 py-2 px-2">
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
