import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import JobSeekerDash from './JobSeekerDash.jsx';
import EmployerDash from './EmployerDash.jsx';

export default function Dashboard() {

    const { isAuthenticated, user } = useSelector((state) => state.auth);

    if (isAuthenticated && user.role === 'job-seeker') {
        return <JobSeekerDash/>
    }else if (isAuthenticated && user.role === 'employer') {
        return <EmployerDash/>
    }else{
        return <Navigate to="/login" />
    }
}