import { createBrowserRouter } from 'react-router-dom';

import Auth from 'pages/Auth';
import Login from 'pages/Login';
import Onboarding from 'pages/Onboarding';
import Root from 'pages/Root';
import KokReview from 'pages/Root/Kok/KokReview';
import SignIn from 'pages/SignIn';
import Test from 'pages/Test';

import HomeRoute from './home';
import KokRoute from './kok';
import MyRoute from './my';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
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
  { path: 'kokReview', element: <KokReview /> },
  { path: 'auth', element: <Auth /> },
]);

export default router;
