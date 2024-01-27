import Home from 'pages/Main/Home';
import Search from 'pages/Main/Home/Search';

const HomeRoute = {
  children: [
    {
      index: true,
      element: <Home />,
    },
    { path: 'search', element: <Search /> },
  ],
};

export default HomeRoute;
