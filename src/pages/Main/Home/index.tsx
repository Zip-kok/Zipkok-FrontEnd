import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getPin } from 'apis';
import { MapRealEstate, getMapRealEstate } from 'apis/getMapRealEstate';
import pinIcon from 'assets/img/pinIcon/pin.svg';
import { PropertyItem, BottomSheet } from 'components';
import useAddressStore from 'contexts/addressStore';
import useUIStore from 'contexts/uiStore';
import useMyPageStore from 'contexts/useMyPageStore';
import convertHouseTypeToString from 'utils/convertHouseTypeToString';
import convertPriceTypeToString from 'utils/convertPriceTypeToString';
import getPriceString from 'utils/getPriceString';
import isLoggedIn from 'utils/isLoggedIn';

import HomeBottomSheet from './BottomSheet';
import { Filter, SearchBox } from './components';
import styles from './Home.module.css';
import KakaoMap, { realEstateInfo } from './KakaoMap';

import type { PinResult } from 'apis/getPin';
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
  const MyPageStore = useMyPageStore();
  const [initialLocation, setInitialLocation] = useState<{
    lat?: number;
    lng?: number;
    initialized: boolean;
  }>();
  const [selectedProperty, setSelectedProperty] =
    useState<realEstateInfo | null>(null);
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);

  const ui = useUIStore();
  const addressStore = useAddressStore();
  const handleSelectedProperty = (selectedPropertyId: number) => {
    navigate(`./item/${selectedPropertyId}`);
  };
  useEffect(() => {
    ui.setUI({
      naviEnabled: true,
      headerEnabled: false,
      headerTitle: '',
      headerBackButtonEnabled: true,
      headerRightButtons: [],
      path: 'home',
    });

    if (isLoggedIn()) {
      getPin().then((res) => setPins((res.result as PinResult).pinList));
    }
  }, []);

  useLayoutEffect(() => {
    if (addressStore.src === 'home_search') {
      setInitialLocation({
        lat: addressStore.address.y,
        lng: addressStore.address.x,
        initialized: true,
      });
      addressStore.resetSrc();
    } else if (MyPageStore.address !== undefined) {
      setInitialLocation({
        lat: MyPageStore.latitude,
        lng: MyPageStore.longitude,
        initialized: true,
      });
    } else {
      setInitialLocation({
        initialized: true,
      });
    }
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
    MyPageStore.purchaseMax,
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
              <Filter
                setFilterOpen={setFilterOpen}
                selectedHouseType={MyPageStore.realEstateType}
                selectedPriceType={MyPageStore.transactionType}
                prices={{
                  mprice: [
                    MyPageStore.mpriceMin ?? 0,
                    MyPageStore.mpriceMax ?? 400_000,
                  ],
                  mdeposit: [
                    MyPageStore.mdepositMin ?? 0,
                    MyPageStore.mdepositMax ?? 60_000_000,
                  ],
                  ydeposit: [
                    MyPageStore.ydepositMin ?? 0,
                    MyPageStore.ydepositMax ?? 60_000_000,
                  ],
                  price: [
                    MyPageStore.purchaseMin ?? 0,
                    MyPageStore.purchaseMax ?? 120_000_000,
                  ],
                }}
              />
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
                {convertPriceTypeToString(MyPageStore.transactionType)}
              </div>
            )}
            {MyPageStore.transactionType && (
              <div className={styles.filter} onClick={handleFilterClick}>
                {convertHouseTypeToString(MyPageStore.realEstateType)}
              </div>
            )}
            {MyPageStore.transactionType === 'MONTHLY' ? (
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
                {MyPageStore.transactionType === 'YEARLY' && (
                  <div className={styles.filter} onClick={handleFilterClick}>
                    {`~${getPriceString(MyPageStore.ydepositMax!, true)}`}
                  </div>
                )}
                {MyPageStore.transactionType === 'PURCHASE' && (
                  <div className={styles.filter} onClick={handleFilterClick}>
                    {`~${getPriceString(MyPageStore.purchaseMax!, true)}`}
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
        {initialLocation?.initialized && (
          <KakaoMap
            lat={initialLocation?.lat}
            lng={initialLocation?.lng}
            mapLocationInfo={mapLocationInfo}
            setMapLocationInfo={setMapLocationInfo}
            realEstatesInfo={mapRealEstate?.realEstateInfoList}
            pins={pins}
            selectedProprety={selectedProperty}
            setSelectedProperty={setSelectedProperty}
            selectedPin={selectedPin}
            setSelectedPin={setSelectedPin}
          />
        )}
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
            onClick={() =>
              handleSelectedProperty(selectedProperty.realEstateId)
            }
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
