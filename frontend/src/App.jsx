import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Jobs from "./pages/Jobs.jsx";
import JobDetails from "./pages/JobDetails.jsx";
import Apply from "./pages/Apply.jsx";
import Layout from "./components/Layout.jsx";

const App = () => {
    return (
        <Layout>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="/apply/:id" element={<Apply />} />
            </Routes>
        </Layout>
    )
}

export default App;
