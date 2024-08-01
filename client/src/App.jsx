import Navbar from "./components/Navbar/Navbar.jsx";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from "./components/Pages/MainLayout.jsx";
import Login from "./components/Pages/Login.jsx";
import Register from "./components/Pages/Register.jsx";

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
]);


function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;