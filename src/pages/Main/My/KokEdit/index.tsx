import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Header } from 'components';
import useUIStore from 'contexts/uiStore';
import useMenu from 'hooks/useMenu';

import Contract from './components/Contract';
import InsideHome from './components/InsideHome';
import NearHome from './components/NearHome';
import styles from './KokEdit.module.css';

const KokEdit = () => {
  const ui = useUIStore();
  useEffect(() => {
    ui.setUI((state) => ({
      ...state,
      headerTitle: '콕리스트 항목 수정하기',
      headerIcon: undefined,
      headerBackButtonEnabled: true,
      naviEnabled: false,
    }));
  }, []);

  const navigate = useNavigate();

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
      <div className={styles.menu}>
        <TopMenu />
      </div>
      <div className={styles.blank}></div>
      <Content />
    </div>
  );
};

export default KokEdit;
