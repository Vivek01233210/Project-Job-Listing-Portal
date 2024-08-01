import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar.jsx';

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}