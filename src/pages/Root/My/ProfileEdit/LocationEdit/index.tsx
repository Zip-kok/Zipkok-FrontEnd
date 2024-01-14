import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './LocationEdit.module.css';

import useNaviStore from '../../../../../contexts/naviStore';

import Header from '../../../../../components/Header';
import Location from '../../../../Onboarding/Location';

export default function LocationEdit() {
  const { setNaviMenu, setShowNaviBar } = useNaviStore();
  useEffect(() => {
    setNaviMenu('my');
    setShowNaviBar(false);
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <div className="top">
        <Header
          title="프로필 수정하기"
          backBtnEnabled
          onBack={() => navigate(-1)}
        />
      </div>
      <div className={styles.content}>
        <Location
          confirmLocation={(location) => {
            // TODO: save location
            navigate(-1);
          }}
          skippable={false}
        />
      </div>
    </>
  );
}
