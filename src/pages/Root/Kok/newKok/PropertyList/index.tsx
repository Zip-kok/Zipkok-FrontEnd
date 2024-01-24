import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import mapIcon from 'assets/img/line(2)/map.svg';
import searchIcon from 'assets/img/line(2)/search.svg';
import { BottomBtn, TextInput, PropertyItem, IconBtn } from 'components';
import useUIStore from 'contexts/uiStore';
import properties from 'models/properties';

import styles from './PropertyList.module.css';

export default function PropertyList() {
  const navigate = useNavigate();

  // 하단 내비게이션 바 설정
  const { setNaviMenu, setShowNaviBar } = useUIStore();
  useEffect(() => {
    setNaviMenu('kok');
    setShowNaviBar(false);
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.searchBox}>
        <TextInput
          placeholder="도로명, 지번 검색"
          icon={searchIcon}
          style="underline"
        />
        <IconBtn
          image={mapIcon}
          text="지도에서 위치 보기"
          onClick={() => {
            navigate('./map');
          }}
          gap="8px"
          height="36px"
        />
      </div>

      <div className={styles.propertyContainer}>
        {properties.map((property) => (
          <PropertyItem
            key={property.id}
            id={property.id}
            like={property.like}
            type={property.type}
            priceType={property.priceType}
            price={property.price}
            maintenanceFee={property.maintenanceFee}
            address={property.address}
            propertyName={property.propertyName}
            imageUrl={property.imageUrl}
            kokList={property.kokList}
          />
        ))}
      </div>

      <BottomBtn
        text="매물 직접 등록하기"
        onClick={() => navigate('customProperty')}
        style={{ backgroundColor: 'transparent' }}
      />
    </div>
  );
}
