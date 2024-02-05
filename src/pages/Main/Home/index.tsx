import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BottomSheet from 'components/BottomSheet';
import useUIStore from 'contexts/uiStore';
import useMyPageStore from 'contexts/useMyPageStore';

import HomeBottomSheet from './BottomSheet';
import { Filter, SearchBox } from './components';
import styles from './Home.module.css';
import KakaoMap from './KakaoMap';

export default function Home() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterSet, setFilterSet] = useState(false);

  const ui = useUIStore();
  useEffect(() => {
    ui.setUI((state) => ({
      ...state,
      headerEnabled: false,
      naviEnabled: true,
      path: 'home',
    }));
  }, []);

  const { realEstateType, transactionType, priceMax, depositMax } =
    useMyPageStore((state) => ({
      realEstateType: state.realEstateType,
      transactionType: state.transactionType,
      priceMax: state.priceMax,
      depositMax: state.depositMax,
    }));
  useEffect(() => {
    if (realEstateType) {
      setFilterSet(true);
    } else {
      setFilterSet(false);
    }
  }, [realEstateType, transactionType, priceMax, depositMax]);

  const navigate = useNavigate();

  // 테스트용
  function handleFilterClick() {
    setFilterOpen((prev) => !prev);
  }

  function handleOverlayClick() {
    setFilterOpen(false);
  }

  // 필터 적용 버튼 클릭 핸들러
  const applyFilter = () => {
    // 필터를 적용하는 로직을 여기에 추가
    setFilterSet(true);
    setFilterOpen(false);
  };

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
      <SearchBox></SearchBox>

      {/* 필터가 설정되었을 때와 설정되지 않았을 때의 화면 */}
      {filterSet ? (
        // 필터가 설정되었을 때 보여줄 화면
        <div className={styles.filterCtn}>
          <div className={styles.filter} onClick={handleFilterClick}>
            {realEstateType}
          </div>
          <div className={styles.filter} onClick={handleFilterClick}>
            {transactionType}
          </div>
          <div className={styles.filter} onClick={handleFilterClick}>
            {priceMax && `${priceMax}이하`}
          </div>
          <div className={styles.filter} onClick={handleFilterClick}>
            {depositMax && `${depositMax}이하`}
          </div>
        </div>
      ) : (
        // 필터가 설정되지 않았을 때 보여줄 화면
        <div className={styles.notFilterCtn}>
          <p>
            아직 필터가 설정되지 않았어요
            <br /> 필터를 설정해보세요!
          </p>
          <button className={styles.filterBtn} onClick={handleFilterClick}>
            필터 설정하기
          </button>
        </div>
      )}

      <div>
        <KakaoMap />
      </div>
      <HomeBottomSheet />
    </div>
  );
}
