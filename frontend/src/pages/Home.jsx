import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline ">Job Application Tracker</h1>
      <Link className="text-blue-500 transition duration-300 ease-in-out hover:text-blue-600" to="/jobs">Go to Jobs</Link>
    </div>
  );
}

