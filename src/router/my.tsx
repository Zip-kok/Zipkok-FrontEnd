import My from 'pages/Main/My';
import KokEdit from 'pages/Main/My/KokEdit';
import LikedProperties from 'pages/Main/My/LikedProperties';
import MyPage from 'pages/Main/My/MyPage';
import ProfileEdit from 'pages/Main/My/ProfileEdit';
import LocationEdit from 'pages/Main/My/ProfileEdit/LocationEdit';

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
  ],
};

export default MyRoute;