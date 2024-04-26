import { useState } from 'react';
import PostCard from '../components/PostCard';
import { usePosts } from '../services/queries';
import { Button } from '@chakra-ui/react';

const Home = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, refetch: refetchPost } = usePosts(page);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }
  const nextPage = () => {
    setPage(prev => prev + 1);
  };

  const prevPage = () => {
    setPage(prev => prev - 1);
  };

  const isLastPage = data?.posts.length >= 8 ? true : false;
  return (
    <div>
      {data?.posts.map(post => (
        <PostCard key={post.id} post={post} refetch={refetchPost} />
      ))}
      <div className="pagination">
        {page !== 1 && (
          <Button variant="outline" size="sm" onClick={prevPage}>
            Previous
          </Button>
        )}
        <span>{page}</span>
        {isLastPage && (
          <Button
            style={{ paddingLeft: '25px', paddingRight: '25px' }}
            variant="solid"
            size="sm"
            onClick={nextPage}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default Home;
