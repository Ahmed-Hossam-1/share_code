import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './pages/Home';
import Signin from './auth/Signin';
import Signup from './auth/Signup';
import RequierBack from './auth/RequierBack.tsx';
import AuthRouting from './auth/AuthRouting.tsx';
import Welcome from './pages/Welcome.tsx';
import NewPosts from './pages/NewPosts.tsx';
import UserProfile from './pages/UserProfile.tsx';
import CommentsPage from './pages/Comments.Page.tsx';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Welcome />} />

        <Route element={<RequierBack />}>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route element={<AuthRouting />}>
          <Route path="/home" element={<Home />} />
          <Route path="/new-post" element={<NewPosts />} />
          <Route path="/profile/:userId" element={<UserProfile />} />
          <Route path="/p/:postId" element={<CommentsPage />} />
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
