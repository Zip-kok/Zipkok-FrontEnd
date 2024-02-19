import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MapRealEstate, getMapRealEstate } from 'apis/getMapRealEstate';
import { PropertyItem } from 'components';
import useAddressStore from 'contexts/addressStore';
import useUIStore from 'contexts/uiStore';

import KakaoMap, { realEstateInfo } from './KakaoMap';
import styles from './OnMap.module.css';

interface mapLocationInfo {
  southWestLat?: number;
  southWestLon?: number;
  northEastLat?: number;
  northEastLon?: number;
}

export default function PropertyMap() {
  const navigate = useNavigate();
  const { address } = useAddressStore();
  const [mapRealEstate, setMapRealEstate] = useState<MapRealEstate>();
  const [mapLocationInfo, setMapLocationInfo] = useState<mapLocationInfo>({});
  const [selectedProperty, setSelectedProperty] =
    useState<realEstateInfo | null>(null);

  const ui = useUIStore();
  useEffect(() => {
    ui.setUI({
      naviEnabled: false,
      headerEnabled: true,
      headerTitle: '매물 선택하기',
      headerBackButtonEnabled: true,
      headerRightButtons: [],
      path: 'kok',
    });
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

  return (
    <div className={styles.root}>
      <div className={styles.map}>
        <KakaoMap
          lat={address.y}
          lng={address.x}
          mapLocationInfo={mapLocationInfo}
          setMapLocationInfo={setMapLocationInfo}
          realEstatesInfo={mapRealEstate?.realEstateInfoList}
          selectedProprety={selectedProperty}
          setSelectedProperty={setSelectedProperty}
        />
      </div>

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
            onClick={() => navigate(`/item/${selectedProperty.realEstateId}`)}
          />
        </div>
      )}
    </div>
  );
}
