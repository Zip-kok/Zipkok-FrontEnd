import React from 'react';
import { useNavigate } from 'react-router-dom';

import homeSelected from 'assets/img/fill/home_selected.svg';
import koklistSelected from 'assets/img/fill/koklist_selected.svg';
import mySelected from 'assets/img/fill/my_selected.svg';
import homeDefault from 'assets/img/line(2)/home_default.svg';
import koklistDefault from 'assets/img/line(2)/koklist_default.svg';
import myDefault from 'assets/img/line(2)/my_default.svg';
import useUIStore from 'contexts/uiStore';

import styles from './NaviBar.module.css';

const NaviBar = () => {
  const navigate = useNavigate();
  const { path: naviMenu } = useUIStore();

  return (
    <div className={styles.container}>
      <button
        className={`${styles.menuBtn} ${
          naviMenu === 'kok' ? styles.selected : ''
        }`}
        onClick={() => navigate('kok')}
      >
        <img
          src={naviMenu === 'kok' ? koklistSelected : koklistDefault}
          className={styles.icon}
        ></img>
        <span className={styles.label}>콕리스트</span>
      </button>

      <button
        className={`${styles.menuBtn} ${
          naviMenu === 'home' ? styles.selected : ''
        }`}
        onClick={() => navigate('')}
      >
        <img
          src={naviMenu === 'home' ? homeSelected : homeDefault}
          className={styles.icon}
        ></img>
        <span className={styles.label}>홈</span>
      </button>

      <button
        className={`${styles.menuBtn} ${
          naviMenu === 'my' ? styles.selected : ''
        }`}
        onClick={() => navigate('my')}
      >
        <img
          src={naviMenu === 'my' ? mySelected : myDefault}
          className={styles.icon}
        ></img>
        <span className={styles.label}>마이페이지</span>
      </button>
    </div>
  );
};

export default NaviBar;
