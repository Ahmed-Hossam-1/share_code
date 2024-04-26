import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { Toaster } from 'react-hot-toast';

const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Toaster />
    </>
  );
};

export default Layout;
