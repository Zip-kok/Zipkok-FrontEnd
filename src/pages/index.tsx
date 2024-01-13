import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Root from './Root';

import Login from './Login';
import Onboarding from './Onboarding';
import SignIn from './SignIn';

import { Kok } from './Root/Kok';
import { Home } from './Root/Home';
import My from './Root/My';

import MyPage from './Root/My/MyPage';
import KokEdit from './Root/My/KokEdit';

import ProfileEdit from './Root/My/ProfileEdit';
import LikedProperties from './Root/My/LikedProperties';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { path: 'kok', element: <Kok /> },
      { path: 'home', element: <Home /> },
      {
        path: 'my',
        element: <My />,
        children: [
          { index: true, element: <MyPage /> },
          { path: 'kokEdit', element: <KokEdit /> },
          { path: 'ProfileEdit', element: <ProfileEdit /> },
          { path: 'likedProperties', element: <LikedProperties /> },
        ],
      },
    ],
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'signin',
    element: <SignIn />,
  },
  {
    path: 'onboarding',
    element: <Onboarding />,
  },
]);

export default router;
