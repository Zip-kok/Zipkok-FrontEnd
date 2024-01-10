import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Root from './Root';

import Login from './Login';
import Onboarding from './Onboarding';
import SignIn from './SignIn';

import { Kok } from './Root/Kok';
import { Home } from './Root/Home';
import { Mypage } from './Root/Mypage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { path: 'kok', element: <Kok /> },
      { path: 'home', element: <Home /> },
      { path: 'my', element: <Mypage /> },
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
