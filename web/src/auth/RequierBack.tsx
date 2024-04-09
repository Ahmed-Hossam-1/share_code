import { Outlet } from 'react-router-dom';
import { isLoggedIn } from '../services/endPoint';

const RequierBack: React.FC = () => {
  if (isLoggedIn()) {
    window.history.back();
    return null;
  }

  return <Outlet />;
};

export default RequierBack;
