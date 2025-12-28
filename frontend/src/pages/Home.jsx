import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Job Application Tracker</h1>
      <Link to="/jobs">Go to Jobs</Link>
    </div>
  );
}

