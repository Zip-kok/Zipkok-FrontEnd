import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import mapImg from 'assets/img/common/map.png';
import BottomBtn from 'components/BottomBtn';
import PropertyItem from 'components/PropertyItem';
import useUIStore from 'contexts/uiStore';
import properties from 'models/properties';

import styles from './OnMap.module.css';

export default function PropertyMap() {
  const ui = useUIStore();
  useEffect(() => {
    ui.setUI((state) => ({
      ...state,
      headerIcon: undefined,
      title: '매물 선택하기',
    }));
  }, []);

  const navigate = useNavigate();

  const [property, setProperty] = useState(properties[0]);

  return (
    <div className={styles.root}>
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
