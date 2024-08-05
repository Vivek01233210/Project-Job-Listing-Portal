import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import JobSeekerDash from './JobSeekerDash.jsx';
import EmployerDash from './EmployerDash.jsx';
import { checkUserAPI } from '../../APIServices/userAPI.js';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { setUser } from '../../redux/slices/authSlice.js';

export default function Dashboard() {

    const { isAuthenticated, user } = useSelector((state) => state.auth);
console.log(isAuthenticated)
//     const dispatch = useDispatch();

    const { data, isLoading } = useQuery({
        queryKey: ['check-user'],
        queryFn: checkUserAPI,
    })

//     // console.log(data)

//     useEffect(() => {
//         if (data) {
//             dispatch(setUser(data));
//         }
//     }, [data])

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (data?.isAuthenticated && data?.user?.role === 'job-seeker') {
        return <JobSeekerDash />
    } else if (data?.isAuthenticated && data?.user.role === 'employer') {
        return <EmployerDash />
    } else {
        return <Navigate to="/login" />
    }
}