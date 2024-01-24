import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Header } from 'components';
import useNaviStore from 'contexts/naviStore';
import useMenu from 'hooks/useMenu';

import Contract from './Contract';
import InsideHome from './InsideHome';
import styles from './KokEdit.module.css';
import NearHome from './NearHome';

const KokEdit = () => {
  const navigate = useNavigate();

  // 하단 내비게이션 바 설정
  const { setNaviMenu, setShowNaviBar } = useNaviStore();
  useEffect(() => {
    setNaviMenu('my');
    setShowNaviBar(false);
  }, []);

  // 상단 메뉴 설정
  const [TopMenu, Content, menuIndex] = useMenu([
    {
      name: '집 주변',
      element: <NearHome />,
    },

    {
      name: '집 내부',
      element: <InsideHome />,
    },

    {
      name: '중개 / 계약',
      element: <Contract />,
    },
  ]);

  return (
    <div className={styles.root}>
      <div className="top">
        <Header
          title="콕리스트 항목 수정하기"
          onBack={() => {
            navigate(-1);
          }}
          backBtnEnabled
        />
        <TopMenu />
      </div>
      <div className={styles.blank}></div>
      <Content />
    </div>
  );
};

export default KokEdit;
