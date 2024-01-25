import { createBrowserRouter } from 'react-router-dom';

import Root from 'pages';
import Auth from 'pages/Auth';
import Login from 'pages/Login';
import Main from 'pages/Main';
import Onboarding from 'pages/Onboarding';
import SignIn from 'pages/SignIn';
import Test from 'pages/Test';

import HomeRoute from './home';
import KokRoute from './kok';
import MyRoute from './my';

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Main />,
        children: [KokRoute, HomeRoute, MyRoute],
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
      { path: 'test', element: <Test /> },
      { path: 'auth', element: <Auth /> },
    ],
  },
]);

export default router;
