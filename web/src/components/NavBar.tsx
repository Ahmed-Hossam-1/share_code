/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Flex, Image, Text } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../context/CurrentUser';
import { isLoggedIn, logout } from '../services/endPoint';
import { useCallback } from 'react';

const NavBar = () => {
  const { currentUser, refetchCurrentUser } = useCurrentUser();

  const nav = useNavigate();
  const handelLogout = useCallback(() => {
    logout();
    refetchCurrentUser();
    nav('/');
  }, [nav, refetchCurrentUser]);

  return (
    <Flex py={10} px={20} mb={10} boxShadow="lg" align="center" justify="space-between" h={16}>
      <Link to={'/'}>
        <Image w={200} src="/images/logoin.png" />
      </Link>
      {isLoggedIn() ? (
        <Flex gap={5} align="center">
          <Link to="/new-post">
            <Button variant="solid" size="sm">
              New post
            </Button>
          </Link>
          {currentUser && (
            <Link className="profH" to={`/profile/${currentUser.id}`}>
              <Text fontSize="sm" color="gray.600">
                {currentUser?.username ?? ''}
              </Text>
              <img
                src={`${
                  currentUser?.avatar
                    ? `http://localhost:3000/uploads/${currentUser?.avatar}`
                    : '/images/non-photo.png'
                }`}
                className="avatarH"
                alt="avatar"
              />
            </Link>
          )}
          <Button onClick={handelLogout} size="sm" variant="ghost">
            Sign out
          </Button>
        </Flex>
      ) : (
        <Flex gap={5} align="center">
          <Link to="/signin">
            <Button variant="ghost" size="sm">
              Sign in
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="solid" size="sm">
              Sign up
            </Button>
          </Link>
        </Flex>
      )}
    </Flex>
  );
};

export default NavBar;
