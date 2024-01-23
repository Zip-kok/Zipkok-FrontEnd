import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NaviBar.module.css';

import useNaviStore from '../../contexts/naviStore';

import koklistSelected from 'assets/img/fill/koklist_selected.svg';
import koklistDefault from 'assets/img/line(2)/koklist_default.svg';
import homeSelected from 'assets/img/fill/home_selected.svg';
import homeDefault from 'assets/img/line(2)/home_default.svg';
import mySelected from 'assets/img/fill/my_selected.svg';
import myDefault from 'assets/img/line(2)/my_default.svg';

import NaviMenu from '../../types/NaviMenu';

const NaviBar = () => {
  const navigate = useNavigate();
  const { naviMenu } = useNaviStore();

  const handleClick = (menu: NaviMenu) => {
    navigate(`/${menu}`);
  };

  return (
    <div className={styles.container}>
      <button
        className={`${styles.menuBtn} ${
          naviMenu === 'kok' ? styles.selected : ''
        }`}
        onClick={() => handleClick('kok')}
      >
        <img src={naviMenu === 'kok' ? koklistSelected : koklistDefault}></img>
        <span className={styles.label}>콕리스트</span>
      </button>

      <button
        className={`${styles.menuBtn} ${
          naviMenu === 'home' ? styles.selected : ''
        }`}
        onClick={() => handleClick('home')}
      >
        <img src={naviMenu === 'home' ? homeSelected : homeDefault}></img>
        <span className={styles.label}>홈</span>
      </button>

      <button
        className={`${styles.menuBtn} ${
          naviMenu === 'my' ? styles.selected : ''
        }`}
        onClick={() => handleClick('my')}
      >
        <img src={naviMenu === 'my' ? mySelected : myDefault}></img>
        <span className={styles.label}>마이페이지</span>
      </button>
    </div>
  );
};

export default NaviBar;
