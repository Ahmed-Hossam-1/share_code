import { Link } from 'react-router-dom';
import { useCountLikeComment, useGetUser } from '../services/queries';
import { Comment } from '../types/types';
import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { LinkItUrl } from 'react-linkify-it';
import { formatDistance } from 'date-fns/formatDistance';
import { useCallback } from 'react';
import { createLikeComment, deleteLikeComment } from '../services/endPoint';

const CommentCard: React.FC<{ comments: Comment; refetchComments: () => unknown }> = ({
  comments,
  refetchComments,
}) => {
  const { comment: commentText, postedAt, userId, liked, id } = comments;
  const { data: user, error, isLoading } = useGetUser(userId);
  const userName = isLoading || !user ? '...' : error ? '<unknown>' : user.username;
  const { data: countLikeComment, refetch: refetchLikeComment } = useCountLikeComment(id);

  const toggleLike = useCallback(
    async (commentId: string, like: boolean) => {
      if (like) {
        await createLikeComment(commentId);
      } else {
        await deleteLikeComment(commentId);
      }
      refetchComments();
      refetchLikeComment();
    },
    [refetchComments, refetchLikeComment]
  );

  return (
    <Box fontSize="sm" color="GrayText">
      <Flex gap={1} align="baseline">
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          position="relative"
          w={4}
          onClick={() => toggleLike(id, !liked)}
        >
          <Icon
            position="absolute"
            top="-0.8rem"
            as={liked ? BsHeartFill : BsHeart}
            fill="gray"
            cursor="pointer"
            _hover={{ fill: 'brown' }}
          />
          <span style={{ fontWeight: 'bold' }}>{countLikeComment?.likes}</span>
        </Box>

        <Text fontSize="xs"> By: </Text>

        <Link to={`/profile/${userId}`}>
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
