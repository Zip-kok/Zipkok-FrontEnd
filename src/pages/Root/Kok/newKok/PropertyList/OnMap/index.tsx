import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useNaviStore from '../../../../../../contexts/naviStore';

import BottomBtn from '../../../../../../components/BottomBtn';
import Header from '../../../../../../components/Header';
import PropertyItem from '../../../../../../components/PropertyItem';
import properties from '../../../../../../models/properties';
import mapImg from '../../../../../../assets/img/kokList/map.png';

import styles from './OnMap.module.css';

export default function OnMap() {
  const [property, setProperty] = useState(properties[0]);
  const navigate = useNavigate();

  // 하단 내비게이션 바 설정
  const { setNaviMenu, setShowNaviBar } = useNaviStore();
  useEffect(() => {
    setNaviMenu('kok');
    setShowNaviBar(false);
  }, []);

  return (
    <div className={styles.root}>
      <div className="top">
        <Header title="콕리스트" backBtnEnabled onBack={() => navigate(-1)} />
      </div>

      <div className={styles.map}>
        <img src={mapImg} />
      </div>

      <div>
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
      </div>

      <BottomBtn
        text="콕리스트 작성하기"
        onClick={() => {}}
        style={{ backgroundColor: 'transparent' }}
        occupySpace
      />
    </div>
  );
}
