import Kok from 'pages/Main/Kok';
import Custom from 'pages/Main/Kok/Custom';
import CustomConfirm from 'pages/Main/Kok/Custom/Confirm';
import CustomForm from 'pages/Main/Kok/Custom/Form';
import CustomFormLocationEdit from 'pages/Main/Kok/Custom/Form/LocationEdit';
import KokItem from 'pages/Main/Kok/KokItem';
import Koklist from 'pages/Main/Kok/Koklist';
import KokReview from 'pages/Main/Kok/KokReview';
import Complete from 'pages/Main/Kok/KokReview/Complete';
import NewKok from 'pages/Main/Kok/New';
import PropertyList from 'pages/Main/Kok/New/PropertyList';
import PropertyMap from 'pages/Main/Kok/New/PropertyMap';
import WriteKok from 'pages/Main/Kok/Write';

const KokRoute = {
  path: 'kok',
  element: <Kok />,
  children: [
    { index: true, element: <Koklist /> },
    {
      //직접 매물 등록하기
      path: 'custom',
      element: <Custom />,
      children: [
        { index: true, element: <CustomForm /> },
        { path: 'confirm', element: <CustomConfirm /> },
        { path: 'locationEdit', element: <CustomFormLocationEdit /> },
      ],
    },
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
      path: 'new',
      element: <NewKok />,
      children: [
        {
          // 콕리스트 작성_매물리스트
          path: 'propertyList',
          element: <PropertyList />,
        },
        {
          // 콕리스트 작성_매물리스트
          path: 'propertyMap',
          element: <PropertyMap />,
        },
        {
          // 새콕리스트 작성_체크 (=수정하기 화면 동일)
          path: 'write',
          element: <WriteKok />,
        },
        {
          // 새콕리스트 작성_후기
          path: 'review',
          children: [
            {
              index: true,
              element: <KokReview />,
            },
            {
              path: 'complete',
              element: <Complete />,
            },
          ],
        },
      ],
    },
    {
      // 새콕리스트 작성_체크 (=수정하기 화면 동일)
      path: 'edit',
      element: <WriteKok />,
    },
    {
      // 새콕리스트 작성_체크 (=수정하기 화면 동일)
      path: 'edit/:kokId',
      element: <WriteKok />,
    },
  ],
};

export default KokRoute;
