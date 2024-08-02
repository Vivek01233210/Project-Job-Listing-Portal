import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import JobSeekerDash from './JobSeekerDash.jsx';

export default function Dashboard() {

    const { isAuthenticated, user } = useSelector((state) => state.auth);

    if (isAuthenticated && user.role === 'job-seeker') {
        return <JobSeekerDash/>
    }else if (isAuthenticated && user.role === 'employer') {
        return <h1>Employer Dashboard</h1>
    }else{
        return <Navigate to="/login" />
    }
}