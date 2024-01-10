import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './KokEdit.module.css';

import Header from '../../../../components/Header';
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
    </div>
  );
};
