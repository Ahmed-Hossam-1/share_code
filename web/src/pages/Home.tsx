import PostCard from '../components/PostCard';
import { usePosts } from '../services/queries';

const Home = () => {
  const { data, isLoading, isError, refetch } = usePosts();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }
  return (
    <div>
      {data?.posts.map(post => (
        <PostCard key={post.id} post={post} refetch={refetch} />
      ))}
    </div>
  );
};

export default Home;
