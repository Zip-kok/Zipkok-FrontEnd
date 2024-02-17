import React, { useEffect } from 'react';

import mapImg from 'assets/img/common/map.png';
import BottomBtn from 'components/BottomBtn';
import useUIStore from 'contexts/uiStore';

import styles from './OnMap.module.css';

export default function PropertyMap() {
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

  return (
    <div className={styles.root}>
      <div className={styles.map}>
        <img src={mapImg} />
      </div>

      <div>
        {/*
          <PropertyItem
            key={property.id}
            id={property.id}
            like={property.like}
            type={property.type}
            priceType={property.priceType}
            price={property.price}
            deposit={0}
            address={property.address}
            propertyName={property.propertyName}
            imageUrl={property.imageUrl}
            kokList={property.kokList}
          />
  */}
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
