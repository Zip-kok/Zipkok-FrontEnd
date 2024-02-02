import Home from 'pages/Main/Home';
import Search from 'pages/Main/Home/Search';

import Item from '../pages/Main/Home/Item/index';

const HomeRoute = {
  children: [
    {
      index: true,
      element: <Home />,
    },
    { path: 'search', element: <Search /> },
    { path: 'item', element: <Item /> },
  ],
};

export default HomeRoute;
