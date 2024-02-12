import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BottomSheet from 'components/BottomSheet';
import useUIStore from 'contexts/uiStore';
import useMyPageStore from 'contexts/useMyPageStore';
import getPriceString from 'utils/getPriceString';

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

  const {
    realEstateType,
    transactionType,
    mpriceMax,
    mdepositMax,
    ydepositMax,
    priceMax,
    address,
  } = useMyPageStore();
  useEffect(() => {
    if (realEstateType) {
      setFilterSet(true);
    } else {
      setFilterSet(false);
    }
  }, [
    realEstateType,
    transactionType,
    mpriceMax,
    mdepositMax,
    ydepositMax,
    priceMax,
  ]);

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
              <Filter setFilterOpen={setFilterOpen} />
            </BottomSheet>
          </div>
          <div className={styles.overlay} onClick={handleOverlayClick}></div>
        </>
      )}

      {/* 검색 박스 */}
      <div className={styles.searchBoxContainer}>
        <SearchBox></SearchBox>
      </div>

      {/* 필터 */}
      <div className={styles.filterContainer}>
        {/* 필터가 설정되었을 때와 설정되지 않았을 때의 화면 */}
        {filterSet ? (
          // 필터가 설정되었을 때 보여줄 화면
          <div className={styles.filterCtn}>
            {realEstateType && (
              <div className={styles.filter} onClick={handleFilterClick}>
                {transactionType}
              </div>
            )}
            {transactionType && (
              <div className={styles.filter} onClick={handleFilterClick}>
                {realEstateType}
              </div>
            )}
            {transactionType === '월세' ? (
              mpriceMax !== undefined &&
              mdepositMax !== undefined && (
                <div className={styles.filter} onClick={handleFilterClick}>
                  {`~${getPriceString(mpriceMax, true)}/~${getPriceString(
                    mdepositMax,
                    true,
                  )}`}
                </div>
              )
            ) : (
              <>
                {transactionType === '전세' && (
                  <div className={styles.filter} onClick={handleFilterClick}>
                    {`~${getPriceString(ydepositMax!, true)}`}
                  </div>
                )}
                {transactionType === '매매' && (
                  <div className={styles.filter} onClick={handleFilterClick}>
                    {`~${getPriceString(priceMax!, true)}`}
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          // 필터가 설정되지 않았을 때 보여줄 화면
          <div className={styles.notFilterCtn} onClick={handleFilterClick}>
            <p>
              아직 필터가 설정되지 않았어요
              <br /> 필터를 설정해보세요!
            </p>
            <button className={styles.filterBtn}>필터 설정하기</button>
          </div>
        )}
      </div>

      {/* 지도 */}
      <div className={styles.mapContainer}>
        <KakaoMap lat={address?.y} lng={address?.x} />
      </div>

      {/* 바텀 시트 */}
      <HomeBottomSheet />
    </div>
  );
}
