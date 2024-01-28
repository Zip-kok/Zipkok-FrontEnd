import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BottomSheet from 'components/BottomSheet';
import useUIStore from 'contexts/uiStore';

import { Filter } from './components';
import styles from './Home.module.css';

export default function Home() {
  const [filterOpen, setFilterOpen] = useState(false);

  const ui = useUIStore();
  useEffect(() => {
    ui.setUI((state) => ({
      ...state,
      headerEnabled: false,
      naviEnabled: true,
      path: 'home',
    }));
  }, []);

  const navigate = useNavigate();

  // 테스트용
  function handleFilterClick() {
    setFilterOpen((prev) => !prev);
  }

  function handleOverlayClick() {
    setFilterOpen(false);
  }

  return (
    <div className={styles.root}>
      {/* 필터 */}
      {filterOpen && (
        <>
          <div className={styles.bottomSheet}>
            <BottomSheet>
              <Filter />
            </BottomSheet>
          </div>
          <div className={styles.overlay} onClick={handleOverlayClick}></div>
        </>
      )}

      {/* 리스트뷰 */}
      {}

      {/* 지도 */}
      <button onClick={handleFilterClick}>filter</button>
    </div>
  );
}
