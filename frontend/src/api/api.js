const API_URL = import.meta.env.VITE_API_URL ;

export const getJobs = async () => {
    const res = await fetch(`${API_URL}/jobs`) ; // wait for fetching
    if ( !res.ok ) throw new Error("Failed to fetch jobs") ;
    return res.json() ;
}

export const getJobById = async (id) => {
    const res = await fetch(`${API_URL}/jobs/${id}`)
    if ( !res.ok ) throw new Error("Failed to fetch jobs") ;
    return res.json() ;
}

export const applyForJob = async(data) => {
    const res = await fetch(`${API_URL}/applications` , {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(data)
    }) ;
    if ( !res.ok ) throw new Error("Failed to fetch jobs") ;
    return res.json() ;
}
console.log("VITE_API_URL =", import.meta.env.VITE_API_URL);
