import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import MainLayout from "./Pages/MainLayout.jsx";
import Home from "./Pages/Home.jsx";
import Dashboard from './Pages/Dashboard/Dashboard.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'dashboard', element: <Dashboard /> },
    ]

  },
]);


function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;