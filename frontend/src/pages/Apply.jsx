import { useParams } from "react-router-dom";
import { useState } from "react";
import { applyForJob } from "../api/api";

const Apply = () => {
    const {id} = useParams();
    const [form, setForm] = useState({
        name: "",
        email:"",
        resume:""
    }) ;
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }
    const handleSubmit= async (e) => {
        e.preventDefault() ;
        await applyForJob({...form,jobId: id}) ;
        alert("Applied Successfully") ;
    }
    return (
        <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <textarea name="resume" placeholder="Resume text" onChange={handleChange}/>
        <button type="submit">Submit</button>
        </form>
    )
}

export default Apply
