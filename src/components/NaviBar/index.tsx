import React from 'react';
import styles from './NaviBar.module.css';

import useNaviStore from '../../contexts/naviStore';

import koklistSelected from '../../assets/img/navi/koklist_selected.svg';
import koklistDefault from '../../assets/img/navi/koklist_default.svg';
import homeSelected from '../../assets/img/navi/home_selected.svg';
import homeDefault from '../../assets/img/navi/home_default.svg';
import mySelected from '../../assets/img/navi/my_selected.svg';
import myDefault from '../../assets/img/navi/my_default.svg';

const NaviBar = () => {
  const { naviMenu, setNaviMenu } = useNaviStore();

  return (
    <div className={styles.container}>
      <button
        className={`${styles.menuBtn} ${
          naviMenu === 'kok' ? styles.selected : ''
        }`}
        onClick={() => setNaviMenu('kok')}
      >
        <img src={naviMenu === 'kok' ? koklistSelected : koklistDefault}></img>
        <span className={styles.label}>콕리스트</span>
      </button>

      <button
        className={`${styles.menuBtn} ${
          naviMenu === 'home' ? styles.selected : ''
        }`}
        onClick={() => setNaviMenu('home')}
      >
        <img src={naviMenu === 'home' ? homeSelected : homeDefault}></img>
        <span className={styles.label}>홈</span>
      </button>

      <button
        className={`${styles.menuBtn} ${
          naviMenu === 'my' ? styles.selected : ''
        }`}
        onClick={() => setNaviMenu('my')}
      >
        <img src={naviMenu === 'my' ? mySelected : myDefault}></img>
        <span className={styles.label}>마이페이지</span>
      </button>
    </div>
  );
};

export default NaviBar;
