import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Root from './Root';

import Login from './Login';
import Onboarding from './Onboarding';
import SignIn from './SignIn';

import { Kok } from './Root/Kok';
import { Home } from './Root/Home';
import My from './Root/My';

import AddressSearch from '../components/AddressSearch';

// 마이
import MyPage from './Root/My/MyPage';
import KokEdit from './Root/My/KokEdit';
import ProfileEdit from './Root/My/ProfileEdit';
import LikedProperties from './Root/My/LikedProperties';

// 콕리스트
import KokItem from './Root/Kok/KokItem';
import NewKok from './Root/Kok/newKok';
import PropertyList from './Root/Kok/newKok/PropertyList';
import PropertyListOnMap from './Root/Kok/newKok/PropertyList/OnMap';
import CustomProperty from './Root/Kok/newKok/CustomProperty';
import CustomPropertyConfirm from './Root/Kok/newKok/CustomProperty/Confirm';
import WriteKok from './Root/Kok/WriteKok';

import Test from './Test';
import KokReview from './Root/Kok/KokReview';
import Compass from './Compass';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'kok',
        children: [
          { index: true, element: <Kok /> },
          {
            path: 'kokItem/:kokId',
            children: [
              // 콕리스트_작성한리스트 확인 (5가지 항목)
              { index: true, element: <KokItem /> },
              // 새콕리스트 작성_체크 (=수정하기 화면 동일)
              { path: 'edit', element: <WriteKok /> },
            ],
          },
          {
            path: 'newKok',
            element: <NewKok />,
            children: [
              {
                // 콕리스트 작성_매물리스트
                path: 'propertyList',
                children: [
                  { index: true, element: <PropertyList /> },
                  { path: 'map', element: <PropertyListOnMap /> },
                ],
              },
              {
                path: 'customProperty',
                children: [
                  // 콕리스트 작성_매물선택_직접등록
                  { index: true, element: <CustomProperty /> },
                  {
                    path: 'locationEdit',
                    element: <AddressSearch headerDisabled />,
                  },
                  {
                    path: 'confirm',
                    element: <CustomPropertyConfirm />,
                  },
                ],
              },
              {
                // 새콕리스트 작성_체크 (=수정하기 화면 동일)
                path: 'write',
                element: <WriteKok />,
              },
            ],
          },
        ],
      },
      { path: 'home', element: <Home /> },
      {
        path: 'my',
        element: <My />,
        children: [
          { index: true, element: <MyPage /> },
          { path: 'kokEdit', element: <KokEdit /> },
          {
            path: 'profileEdit',
            children: [
              { index: true, element: <ProfileEdit /> },
              {
                path: 'locationEdit',
                element: <AddressSearch title="프로필 수정하기" />,
              },
            ],
          },
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
  { path: 'test', element: <Test /> },
  { path: 'compass', element: <Compass /> },
  { path: 'kokReview', element: <KokReview /> },
]);

export default router;
