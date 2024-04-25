import { Link } from 'react-router-dom';
import { useGetUser } from '../services/queries';
import { Comment } from '../types/types';
import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { BsHeart } from 'react-icons/bs';
import { LinkItUrl } from 'react-linkify-it';
import { formatDistance } from 'date-fns/formatDistance';

const CommentCard: React.FC<{ comments: Comment }> = ({ comments }) => {
  const { comment: commentText, postedAt, userId } = comments;
  const { data: user, error, isLoading } = useGetUser(userId);
  const userName = isLoading || !user ? '...' : error ? '<unknown>' : user.username;
  return (
    <Box fontSize="sm" color="GrayText">
      <Flex gap={1} align="baseline">
        <Box position="relative" w={4}>
          <Icon
            position="absolute"
            top="-0.8rem"
            as={BsHeart}
            fill="gray"
            cursor="pointer"
            _hover={{ fill: 'brown' }}
          />
        </Box>

        <Text fontSize="xs"> By: </Text>

        <Link to={''}>
          <Text fontSize="xs" fontWeight="bold">
            {userName}
          </Text>
        </Link>

        <Text fontSize="xs">{formatDistance(postedAt, Date.now(), { addSuffix: true })}</Text>
      </Flex>

      <Box whiteSpace="pre-line" borderLeft="1px solid #ddd" pl={2} ml="7px" fontSize="sm">
        <LinkItUrl>
          <Text color="InfoText" style={{ unicodeBidi: 'plaintext' }}>
            {commentText}
          </Text>
        </LinkItUrl>
      </Box>
    </Box>
  );
};

export default CommentCard;
