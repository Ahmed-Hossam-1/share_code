import { Navigate, Outlet } from 'react-router-dom';
import { isLoggedIn } from '../services/endPoint';

const AuthRouting = () => {
  return isLoggedIn() ? <Outlet /> : <Navigate to="/signin" replace={true} />;
};

export default AuthRouting;
