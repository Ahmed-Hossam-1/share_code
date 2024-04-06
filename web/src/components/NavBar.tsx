import { Button, Flex, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useCurrentUser } from '../context/CurrentUser';

const NavBar = () => {
  const { currentUser } = useCurrentUser();
  return (
    <Flex py={4} px={20} pt={10} align="center" justify="space-between" h={16}>
      <Link to={'/'}>
        <Image w={200} src="/images/logoin.png" />
      </Link>
      {currentUser ? (
        <Flex gap={5} align="center">
          <Link to="">
            <Button variant="solid" size="sm">
              New post
            </Button>
          </Link>
          {currentUser && (
            <Link to="">
              <Text fontSize="sm" color="gray.600">
                {currentUser.username}
              </Text>
            </Link>
          )}
          <Button size="sm" variant="ghost">
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
