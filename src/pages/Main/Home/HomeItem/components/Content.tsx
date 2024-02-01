import React from 'react';
import { useNavigate } from 'react-router-dom';

import { PropertyItem } from 'components';
import properties from 'models/properties';

import styles from '../HomeItem.module.css';

export default function Content() {
  const navigate = useNavigate();

  // 해당 매물로 가는 함수, 구현 아직
  const handlePropertyClick = (propertyId: number) => {
    navigate(`./`);
  };
  return (
    <div className={styles.root}>
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
            onClick={() => handlePropertyClick(property.id)}
          />
        ))}
      </div>
    </div>
  );
}
