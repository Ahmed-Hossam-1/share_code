import { Button, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      style={{
        height: 'calc(100vh - 120px)',
      }}
    >
      <Text fontSize="3xl" fontWeight="bold" mb="6">
        Welcome to Share Code
      </Text>

      <Link to="/home">
        <Button variant="solid" size="lg" mb="4">
          Go to Home
        </Button>
      </Link>
    </Flex>
  );
};

export default Welcome;
