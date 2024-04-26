/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useCallback } from 'react';
import { Post } from '../types/types';
import { Box, Button, Flex, Icon, Text } from '@chakra-ui/react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns/formatDistance';
import { useQuery } from '@tanstack/react-query';
import { countComments, createLike, deleteLike, getUser } from '../services/endPoint';
import { useCountLike } from '../services/queries';

const PostCard: FC<{ post: Post; refetch: () => unknown; hideDiscuss?: boolean }> = ({
  post,
  refetch,
  hideDiscuss,
}) => {
  const { id, title, url: postUrl, user_id, liked, postedAt } = post;
  const { user, error, isLoading } = useGetUser(user_id);
  const { countCommentsRes } = useCountComments(id);
  const { data: countLike, refetch: refetchCountLike } = useCountLike(id);
  console.log(liked, 'liked');

  const userName = isLoading || !user ? '...' : error ? '<unknown>' : user.username;
  const commentsCount = countCommentsRes?.count ?? 0;
  const urlWithProtocol = postUrl?.startsWith('http') ? postUrl : 'http://' + postUrl;

  const toggleLike = useCallback(
    async (postId: string, like: boolean) => {
      if (like) {
        await createLike(postId);
      } else {
        await deleteLike(postId);
      }
      refetchCountLike();
      refetch();
    },
    [refetch, liked, countLike]
  );

  return (
    <Flex m={4} gap={2} align="baseline">
      <Box position="relative" w={4} onClick={() => toggleLike(id, !liked)}>
        <Icon
          position="absolute"
          top="-0.8rem"
          as={liked ? BsHeartFill : BsHeart}
          fill="gray"
          cursor="pointer"
          _hover={{ fill: 'brown' }}
        />
        <span>{countLike?.likes}</span>
      </Box>

      <Box>
        <Flex align="center">
          <Text color="gray.600" fontWeight="bold" pr={2} style={{ unicodeBidi: 'plaintext' }}>
            {title}
          </Text>

          <a href={urlWithProtocol}>
            <Text fontSize="sm" color="gray.400">
              ({getUrlDomain(urlWithProtocol)})
            </Text>
          </a>

          {!hideDiscuss && (
            <Link to={`/p/${id}`}>
              <Button
                ml={2}
                variant="outline"
                borderColor="gray.300"
                borderRadius={4}
                p={2}
                size="xs"
                color={commentsCount ? undefined : 'gray'}
              >
                {commentsCount
                  ? `${commentsCount} comment${commentsCount === 1 ? '' : 's'}`
                  : 'discuss'}
              </Button>
            </Link>
          )}
        </Flex>
        <Flex gap={1} fontSize="sm" color="gray.500">
          <Text>By:</Text>
          <Link to={`/profile/${user_id}`}>
            <Text fontWeight="bold">{userName}</Text>
          </Link>

          <Text> - {formatDistance(postedAt, Date.now(), { addSuffix: true })}</Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default PostCard;

const getUrlDomain = (url: string): string => {
  try {
    const short = new URL(url).host;
    return short?.startsWith('www.') ? short.substring(4) : short;
  } catch {
    return url;
  }
};

const useGetUser = (id: string) => {
  const {
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(id),
  });
  return { user, error, isLoading };
};

const useCountComments = (postId: string) => {
  const { data: countCommentsRes } = useQuery({
    queryKey: ['countComments', postId],
    queryFn: () => countComments(postId),
  });
  return { countCommentsRes };
};
