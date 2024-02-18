import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getZim } from 'apis';
import { PropertyItem } from 'components';
import useUIStore from 'contexts/uiStore';

import styles from './LikedProperties.module.css';

import type { RealEstate } from 'apis/getZim';

const LikedProperties = () => {
  const [properties, setProperties] = useState<RealEstate[]>([]);
  const navigate = useNavigate();
  const ui = useUIStore();

  useEffect(() => {
    getZim().then((res) => setProperties(res.result.realEstateInfo));

    ui.setUI({
      naviEnabled: false,
      headerEnabled: true,
      headerTitle: '찜한 매물',
      headerBackButtonEnabled: true,
      headerRightButtons: [],
      path: 'my',
    });
  }, []);

  return (
    <div className={styles.root}>
      {properties.map((property) => (
        <PropertyItem
          key={property.realEstateId}
          id={property.realEstateId}
          like={true}
          type={property.realEstateType}
          priceType={property.transactionType}
          price={property.price}
          deposit={property.deposit}
          address={property.address}
          propertyName={property.agent}
          imageUrl={property.imageURL}
          onClick={() => navigate(`/item/${property.realEstateId}`)}
        />
      ))}
    </div>
  );
};

export default LikedProperties;
