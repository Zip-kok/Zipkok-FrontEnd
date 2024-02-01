import Home from 'pages/Main/Home';
import HomeItem from 'pages/Main/Home/HomeItem';

const HomeRoute = {
  path: '/',
  element: <Home />,
  children: [
    {
      index: true,
      element: <HomeItem />,
    },
  ],
};

export default HomeRoute;
