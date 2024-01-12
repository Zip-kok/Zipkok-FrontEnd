import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './LikedProperties.module.css';
import Header from '../../../../components/Header';
import properties from '../../../../models/properties';
import PropertyItem from '../../../../components/PropertyItem';

const LikedProperties = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.root}>
      <Header
        title="찜한 매물"
        onBack={() => {
          navigate(-1);
        }}
        backBtnEnabled
      ></Header>
      <div>
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
              showListIcon={false}
            />
          ))}
      </div>
    </div>
  );
};

export default LikedProperties;
