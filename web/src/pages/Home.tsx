import PostCard from '../components/PostCard';
import { usePosts } from '../services/queries';
import { useCurrentUser } from '../context/CurrentUser';

const Home = () => {
  const { data, isLoading, isError, refetch } = usePosts();
  const { currentUser } = useCurrentUser();

  console.log(currentUser);
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
