import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './KokEdit.module.css';

import Header from '../../../../components/Header';
import TopMenu from '../../../../components/TopMenu';
import Hightlight from '../../../../components/Highlight';

import useNaviStore from '../../../../contexts/naviStore';

export const KokEdit = () => {
  const { setNaviMenu } = useNaviStore();
  useEffect(() => {
    setNaviMenu('my');
  }, []);

  return (
    <div className={styles.root}>
      <Header
        title="콕리스트 항목 수정하기"
        onBack={() => {}}
        backBtnEnabled
      ></Header>

      <TopMenu
        menus={[
          { name: '집 주변', onClick: () => {} },
          { name: '집 내부', onClick: () => {} },
          { name: '중개 / 계약', onClick: () => {} },
        ]}
        selectedMenu="집 주변"
        height={48}
      />
    </div>
  );
};
