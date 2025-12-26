import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import { getJobById } from "../api/api";

const JobDetails = () => {
    const {id} = useParams();
    const [job, setJobs] = useState(null) ;
    useEffect(()=>{
        getJobById(id).then(setJobs) ;
    },[id]) ;
    if (!job) return <p>Loading...</p>;

    return (
        <div>
            <h2>{job.title}</h2>
            <p>{job.description}</p>
            <Link to={`/apply/${job.id}`}>Apply</Link>
        </div>
    )
}

export default JobDetails
