import { Button, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <Flex py={4} px={10} align="center" justify="space-between" h={16}>
      <Link to={'/'}>
        {/* <Image w={100} src="/images/logo.jpg" /> */}
        Logo
      </Link>
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
    </Flex>
  );
};

export default NavBar;