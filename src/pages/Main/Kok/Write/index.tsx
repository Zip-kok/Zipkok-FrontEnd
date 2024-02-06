import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import propertyImg from 'assets/img/common/defaultThumbnail.png';
import { BottomBtn } from 'components';
import useUIStore from 'contexts/uiStore';
import useMenu from 'hooks/useMenu';

import Contract from './Contract';
import InsideHome from './InsideHome';
import NearHome from './NearHome';
import styles from './WriteKok.module.css';

export default function WriteKok() {
  const ui = useUIStore();
  useEffect(() => {
    ui.setUI((state) => ({
      ...state,
      headerTitle: '콕리스트 작성',
      headerIcon: undefined,
      headerBackButtonEnabled: true,
      naviEnabled: false,
      headerRightButtons: [],
    }));
  }, []);

  // 상단 메뉴 설정
  const [TopMenu, Content, menuIndex] = useMenu([
    {
      name: '집 주변',
      element: (
        <NearHome
          pictures={[
            { id: 0, src: propertyImg },
            { id: 1, src: propertyImg },
            { id: 2, src: propertyImg },
            { id: 3, src: propertyImg },
            { id: 4, src: propertyImg },
          ]}
        />
      ),
    },

    {
      name: '집 내부',
      element: (
        <InsideHome
          pictures={[
            { id: 0, src: propertyImg },
            { id: 1, src: propertyImg },
            { id: 2, src: propertyImg },
            { id: 3, src: propertyImg },
            { id: 4, src: propertyImg },
          ]}
        />
      ),
    },

    {
      name: '중개 / 계약',
      element: (
        <Contract
          pictures={[
            { id: 0, src: propertyImg },
            { id: 1, src: propertyImg },
            { id: 2, src: propertyImg },
            { id: 3, src: propertyImg },
            { id: 4, src: propertyImg },
          ]}
        />
      ),
    },
  ]);

  const navigate = useNavigate();

  // kokId가 undefined이면 새로운 콕리스트 등록
  // kokId가 있으면 해당 콕리스트 수정
  const { kokId } = useParams<{ kokId: string }>();

  return (
    <div className={styles.root}>
      <TopMenu className={styles.top} />
      <Content />
      <BottomBtn text="저장하기" onClick={() => {}} />
    </div>
  );
}
