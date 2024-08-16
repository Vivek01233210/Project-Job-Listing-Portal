import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import MainLayout from "./Pages/MainLayout.jsx";
import Home from "./Pages/Home.jsx";
import Dashboard from './Pages/Dashboard/Dashboard.jsx';
import { useQuery } from '@tanstack/react-query';
import { checkUserAPI } from './APIServices/userAPI.js';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/slices/authSlice.js';
import Protect from './Pages/ProtectRoute.jsx';
import Public from './Pages/PublicRoute.jsx';
import PostJob from './Pages/PostJob.jsx';
import JobList from './Pages/JobList.jsx';
import MyApplications from './Pages/MyApplications.jsx';
import ViewJobList from './Pages/ViewJobList.jsx';


function App() {

  const dispatch = useDispatch();

  const { data, isLoading } = useQuery({
    queryKey: ['check-user'],
    queryFn: checkUserAPI,
  })

  const isAuthenticated = data?.isAuthenticated;
  // console.log(data)

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
  }, [data]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'post-job', element: <PostJob /> },
        { path: 'jobs', element: <JobList /> },
        { path: 'my-application', element: <MyApplications /> },
        { path: 'view-jobs', element: <ViewJobList /> },
      ]
    },
  ]);

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;