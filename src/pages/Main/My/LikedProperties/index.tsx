import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { PropertyItem } from 'components';
import useUIStore from 'contexts/uiStore';
import properties from 'models/properties';

import styles from './LikedProperties.module.css';

const LikedProperties = () => {
  const ui = useUIStore();
  useEffect(() => {
    ui.setUI((state) => ({
      ...state,
      headerTitle: '찜한 매물',
      headerIcon: undefined,
      headerBackButtonEnabled: true,
      naviEnabled: false,
    }));
  }, []);

  const navigate = useNavigate();
  return (
    <div className={styles.root}>
      {properties
        .filter((property) => property.like)
        .map((property) => (
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
  );
};

export default LikedProperties;
