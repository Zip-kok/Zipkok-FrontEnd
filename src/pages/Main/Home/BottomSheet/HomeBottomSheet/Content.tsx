import React from 'react';
import { useNavigate } from 'react-router-dom';

import { PropertyItem } from 'components';
import properties from 'models/properties';

import { realEstateInfo } from '../../KakaoMap';
import styles from '../BottomSheet.module.css';
interface ContentProps {
  realEstateInfoList?: realEstateInfo[];
}

export default function Content({ realEstateInfoList }: ContentProps) {
  const navigate = useNavigate();
  const handlePropertyClick = (realEstateId: number) => {
    navigate(`./item/${realEstateId}`);
  };
  return (
    <div className={styles.root}>
      <div className={styles.propertyContainer}>
        {realEstateInfoList && realEstateInfoList.length > 0 ? (
          realEstateInfoList.map((property) => (
            <PropertyItem
              key={property.realEstateId}
              id={property.realEstateId}
              like={property.isZimmed}
              type={property.realEstateType}
              priceType={property.transactionType}
              price={property.price}
              deposit={property.deposit}
              address={property.address}
              propertyName={property.agent}
              imageUrl={property.imageURL}
              kokList={property.isKokked}
              onClick={() => handlePropertyClick(property.realEstateId)}
            />
          ))
        ) : (
          <div className={styles.error}>해당 지역에는 매물이 없습니다.</div>
        )}
      </div>
    </div>
  );
}
