import { useParams } from 'react-router-dom';
import { useCurrentUser } from '../context/CurrentUser';
import { useGetUser } from '../services/queries';
import '../style/style.css';

const UserProfile = () => {
  const { userId } = useParams();
  const { currentUser } = useCurrentUser();
  const isOwner = currentUser?.id === userId;
  console.log(isOwner, 'isOwner');

  const { data: user } = useGetUser(userId);
  console.log(user);
  return (
    <div className="profile-user">
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>
          Name: {user?.first_name} {user?.last_name}
        </h1>
        <h2 style={{ fontSize: '22px' }}>UserName: {user?.username}</h2>
        <h3 style={{ fontSize: '20px' }}>Email: {user?.email}</h3>
      </div>
      <div>
        <img
          src={`${
            user?.avatar ? `http://localhost:3000/uploads/${user?.avatar}` : '/images/non-photo.png'
          }`}
          width={'100px'}
          className="avatar"
          alt="avatar"
        />
      </div>
    </div>
  );
};

export default UserProfile;
