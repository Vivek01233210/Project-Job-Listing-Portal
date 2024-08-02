import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Protect() {
    const { isAuthenticated } = useSelector((state) => state.auth);

    if (isAuthenticated) {
        return <Outlet />
    } else {
        return <h1>Access Denied!</h1>
        // return <Navigate to="/login" />
    }
}