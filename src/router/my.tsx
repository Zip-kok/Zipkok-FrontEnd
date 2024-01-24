import My from 'pages/Root/My';
import KokEdit from 'pages/Root/My/KokEdit';
import LikedProperties from 'pages/Root/My/LikedProperties';
import MyPage from 'pages/Root/My/MyPage';
import ProfileEdit from 'pages/Root/My/ProfileEdit';
import LocationEdit from 'pages/Root/My/ProfileEdit/LocationEdit';

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
