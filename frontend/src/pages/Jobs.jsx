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
    if (loading) return <p>Loading Jobs... </p>
    if (error) return <p>{error}</p>;
    return (
        <div>
            <h1> Jobs </h1>
                {jobs.map(job => (
                    <div key={job.id} >
                        <h3> {job.title}</h3>
                        <Link to={`/jobs/${job.id}`}>View</Link>
                    </div>
                ))}
        </div>
    )
}

export default Jobs
