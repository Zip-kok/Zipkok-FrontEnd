import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './KokEdit.module.css';

import NearHome from './NearHome';
import InsideHome from './InsideHome';
import Contract from './Contract';

import Header from 'components/Header';
import useMenu from 'hooks/useMenu';

import useNaviStore from 'contexts/naviStore';

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
