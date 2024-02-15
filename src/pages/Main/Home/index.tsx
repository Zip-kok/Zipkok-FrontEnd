import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getPin } from 'apis';
import { MapRealEstate, getMapRealEstate } from 'apis/getMapRealEstate';
import pinIcon from 'assets/img/pinIcon/pin.svg';
import { PropertyItem, BottomSheet } from 'components';
import useUIStore from 'contexts/uiStore';
import useMyPageStore from 'contexts/useMyPageStore';
import getPriceString from 'utils/getPriceString';

import HomeBottomSheet from './BottomSheet';
import { Filter, SearchBox } from './components';
import styles from './Home.module.css';
import KakaoMap, { realEstateInfo } from './KakaoMap';

import type { Pin } from 'types/Pin';

interface mapLocationInfo {
  southWestLat?: number;
  southWestLon?: number;
  northEastLat?: number;
  northEastLon?: number;
}

export default function Home() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterSet, setFilterSet] = useState(false);
  const [pins, setPins] = useState<Pin[]>([]);
  const [mapRealEstate, setMapRealEstate] = useState<MapRealEstate>();
  const [mapLocationInfo, setMapLocationInfo] = useState<mapLocationInfo>({});

  const [selectedProperty, setSelectedProperty] =
    useState<realEstateInfo | null>(null);
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);

  const ui = useUIStore();
  useEffect(() => {
    ui.setUI((state) => ({
      ...state,
      headerEnabled: false,
      naviEnabled: true,
      path: 'home',
    }));

    getPin().then((res) => setPins(res.result as Pin[]));
  }, []);

  useEffect(() => {
    const { southWestLat, southWestLon, northEastLat, northEastLon } =
      mapLocationInfo;
    if (
      southWestLat === undefined ||
      southWestLon === undefined ||
      northEastLat === undefined ||
      northEastLon === undefined
    )
      return;

    getMapRealEstate(
      southWestLat,
      southWestLon,
      northEastLat,
      northEastLon,
    ).then((res) => setMapRealEstate(res.result));
  }, [mapLocationInfo]);

  const MyPageStore = useMyPageStore((store) => store);
  useEffect(() => {
    if (MyPageStore.realEstateType) {
      setFilterSet(true);
    } else {
      setFilterSet(false);
    }
  }, [
    MyPageStore.realEstateType,
    MyPageStore.transactionType,
    MyPageStore.mpriceMax,
    MyPageStore.mdepositMax,
    MyPageStore.ydepositMax,
    MyPageStore.priceMax,
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
            {MyPageStore.realEstateType && (
              <div className={styles.filter} onClick={handleFilterClick}>
                {MyPageStore.transactionType}
              </div>
            )}
            {MyPageStore.transactionType && (
              <div className={styles.filter} onClick={handleFilterClick}>
                {MyPageStore.realEstateType}
              </div>
            )}
            {MyPageStore.transactionType === '월세' ? (
              MyPageStore.mpriceMax !== undefined &&
              MyPageStore.mdepositMax !== undefined && (
                <div className={styles.filter} onClick={handleFilterClick}>
                  {`~${getPriceString(
                    MyPageStore.mpriceMax,
                    true,
                  )}/~${getPriceString(MyPageStore.mdepositMax, true)}`}
                </div>
              )
            ) : (
              <>
                {MyPageStore.transactionType === '전세' && (
                  <div className={styles.filter} onClick={handleFilterClick}>
                    {`~${getPriceString(MyPageStore.ydepositMax!, true)}`}
                  </div>
                )}
                {MyPageStore.transactionType === '매매' && (
                  <div className={styles.filter} onClick={handleFilterClick}>
                    {`~${getPriceString(MyPageStore.priceMax!, true)}`}
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
        <KakaoMap
          lat={MyPageStore.address?.y}
          lng={MyPageStore.address?.x}
          mapLocationInfo={mapLocationInfo}
          setMapLocationInfo={setMapLocationInfo}
          realEstatesInfo={mapRealEstate?.realEstateInfoList}
          pins={pins}
          selectedProprety={selectedProperty}
          setSelectedProperty={setSelectedProperty}
          selectedPin={selectedPin}
          setSelectedPin={setSelectedPin}
        />
      </div>

      {/* 바텀 시트 */}
      {selectedProperty !== null && (
        <div className={styles.selectedProperty}>
          <PropertyItem
            id={selectedProperty.realEstateId}
            like={false}
            type={selectedProperty.realEstateType}
            priceType={selectedProperty.transactionType}
            deposit={selectedProperty.deposit}
            price={selectedProperty.price}
            address={selectedProperty.address}
            propertyName={selectedProperty.detailAddress}
            imageUrl={selectedProperty.imageURL}
            kokList={false}
          />
        </div>
      )}

      {selectedPin !== null && (
        <div className={styles.selectedPin}>
          <div>
            <h1>{selectedPin.name}</h1>
            <h2>{selectedPin.address.address_name}</h2>
          </div>
          <img src={pinIcon} />
        </div>
      )}

      {selectedProperty === null && selectedPin === null && (
        <HomeBottomSheet
          realEstateInfoList={mapRealEstate?.realEstateInfoList}
        />
      )}
    </div>
  );
}
