import My from 'pages/Main/My';
import KokEdit from 'pages/Main/My/KokEdit';
import LikedProperties from 'pages/Main/My/LikedProperties';
import MyPage from 'pages/Main/My/MyPage';
import Pin from 'pages/Main/My/Pin';
import PinWrite from 'pages/Main/My/Pin/Write';
import ProfileEdit from 'pages/Main/My/ProfileEdit';
import LocationEdit from 'pages/Main/My/ProfileEdit/LocationEdit';
import RecentlyView from 'pages/Main/My/RecentlyView';

const MyRoute = {
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
          element: <LocationEdit />,
        },
      ],
    },
    { path: 'likedProperties', element: <LikedProperties /> },
    {
      path: 'pin',
      children: [
        { index: true, element: <Pin /> },
        {
          path: 'edit/:pinId',
          element: <PinWrite />,
        },
        {
          path: 'write',
          element: <PinWrite />,
        },
      ],
    },
    { path: 'recentlyView', element: <RecentlyView /> },
  ],
};

export default MyRoute;
