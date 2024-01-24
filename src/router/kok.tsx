import Kok from 'pages/Root/Kok';
import KokItem from 'pages/Root/Kok/KokItem';
import NewKok from 'pages/Root/Kok/newKok';
import CustomProperty from 'pages/Root/Kok/newKok/CustomProperty';
import CustomPropertyConfirm from 'pages/Root/Kok/newKok/CustomProperty/Confirm';
import PropertyList from 'pages/Root/Kok/newKok/PropertyList';
import PropertyListOnMap from 'pages/Root/Kok/newKok/PropertyList/OnMap';
import WriteKok from 'pages/Root/Kok/WriteKok';

const KokRoute = {
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
              element: <></>,
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
};

export default KokRoute;
