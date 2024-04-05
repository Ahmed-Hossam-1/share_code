import { usePosts } from '../services/queries';

const Home = () => {
  const { data, isLoading, isError } = usePosts();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }
  return (
    <div>
      {data?.posts.map(post => (
        <div key={post.id}>
          <h1>{post.title}</h1>
          <p>{post.url}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
