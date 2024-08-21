import { Navigate } from 'react-router-dom';
import JobSeekerDash from './JobSeekerDash.jsx';
import EmployerDash from './EmployerDash.jsx';
import { checkUserAPI } from '../../APIServices/userAPI.js';
import { useQuery } from '@tanstack/react-query';

export default function Dashboard() {

    const { data, isLoading, isError } = useQuery({
        queryKey: ['check-user'],
        queryFn: checkUserAPI,
    })

    if (isError) return <Navigate to='/login' />

    if (isLoading) return <h1>Loading...</h1>

    if (data?.isAuthenticated && data?.user?.role === 'job-seeker') {
        return <JobSeekerDash />
    } else if (data?.isAuthenticated && data?.user.role === 'employer') {
        return <EmployerDash />
    } else {
        return <Navigate to="/dashboard" />
    }
}