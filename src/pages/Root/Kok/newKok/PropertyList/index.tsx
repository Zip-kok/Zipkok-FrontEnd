import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useNaviStore from '../../../../../contexts/naviStore';

import BottomBtn from '../../../../../components/BottomBtn';
import TextInput from '../../../../../components/TextInput';
import Header from '../../../../../components/Header';
import PropertyItem from '../../../../../components/PropertyItem';
import IconTextBtn from '../../../../../components/IconBtn';

import mapIcon from '../../../../../assets/img/map.svg';
import searchIcon from '../../../../../assets/img/line(1)/search.svg';

import styles from './PropertyList.module.css';

import properties from '../../../../../models/properties';

export default function PropertyList() {
  const navigate = useNavigate();

  // 하단 내비게이션 바 설정
  const { setNaviMenu, setShowNaviBar } = useNaviStore();
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
        <IconTextBtn
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
        onClick={() => navigate('../customProperty')}
        style={{ backgroundColor: 'transparent' }}
      />
    </div>
  );
}
