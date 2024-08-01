import Navbar from "./components/Navbar/Navbar.jsx";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from "./components/Pages/Login.jsx";
import Register from "./components/Pages/Register.jsx";
import MainLayout from "./components/Pages/MainLayout.jsx";
import Home from "./components/Pages/Home.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
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