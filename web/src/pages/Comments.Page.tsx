/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Flex, Text, Textarea } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useListComments, usePost } from '../services/queries';
import CommentCard from '../components/CommentCard';
import PostCard from '../components/PostCard';
import { useState } from 'react';
// import { useDocumentTitle } from '../utils/useDocumentTitle';
import { createComment } from '../services/endPoint';

const CommentsPage = () => {
  const { postId } = useParams();
  const {
    data: commentText,
    error: commentsError,
    isLoading: commentsLoading,
    // refetch: refetchComments,
  } = useListComments(postId!);
  const { data: postText, refetch: refetchPost, isLoading, error } = usePost(postId!);
  console.log(postText, 'pooooooooost');

  const postname = isLoading ? 'Loading...' : error || !postText ? 'Error' : postText.post.title;
  console.log(postname);
  const [comment, setComment] = useState('');
  const submitComment = async () => {
    console.log(comment, 'first');
    const postId = postText?.post.id;
    await createComment({ postId, comment });
    // refetchComments();
  };
  return (
    <div>
      <Box>
        {postText && <PostCard post={postText.post} refetch={refetchPost} hideDiscuss />}
        <form>
          <Flex direction="column" gap={4} mt={4} ml={4}>
            {commentsError ? <Text color="red.700">Error loading comments.</Text> : null}
            {commentsLoading ? <Text>Loading comments...</Text> : null}
            <Textarea
              placeholder="Type to add your own comment.."
              value={comment}
              onChange={e => setComment(e.target.value)}
              maxW="xl"
              style={{ unicodeBidi: 'plaintext' }}
            />
            <Box>
              <span
                onClick={submitComment}
                style={{
                  cursor: comment.length >= 1 ? 'pointer' : 'not-allowed',
                  background: comment.length >= 1 ? '#6d230c' : 'gray',
                  padding: '5px 10px',
                  borderRadius: '5px',
                  color: 'white',
                }}
                // disabled={comment.length == 0 ? true : false}
              >
                Add comment
              </span>
            </Box>

            <Box w="xl">
              <hr />
            </Box>

            {commentText?.comments.map(comment => (
              <CommentCard key={comment.id} comments={comment} />
            ))}

            {!commentText?.comments.length && (
              <Text color="GrayText" fontStyle="italic">
                No comments yet. Add the first comment below.
              </Text>
            )}
          </Flex>
        </form>
      </Box>
    </div>
  );
};

export default CommentsPage;
