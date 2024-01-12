import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './KokEdit.module.css';

import NearHome from './NearHome';
import InsideHome from './InsideHome';
import Contract from './Contract';

import Header from '../../../../components/Header';
import useMenu from '../../../../hooks/useMenu';

import useNaviStore from '../../../../contexts/naviStore';

const KokEdit = () => {
  const { setNaviMenu, setShowNaviBar } = useNaviStore();

  useEffect(() => {
    setNaviMenu('my');
    setShowNaviBar(false);
  }, []);

  const navigate = useNavigate();

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
      <Header
        title="콕리스트 항목 수정하기"
        onBack={() => {
          navigate(-1);
        }}
        backBtnEnabled
      ></Header>
      <TopMenu />
      <Content />
    </div>
  );
};

export default KokEdit;
