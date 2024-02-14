import React from 'react';
import { useNavigate } from 'react-router-dom';

import { PropertyItem } from 'components';
import properties from 'models/properties';

import { realEstateInfoList } from '../../KakaoMap';
import styles from '../BottomSheet.module.css';
interface ContentProps {
  realEstateInfoList?: realEstateInfoList[];
}

export default function Content({ realEstateInfoList }: ContentProps) {
  const navigate = useNavigate();

  // 해당 매물로 가는 함수, 구현 아직
  const handlePropertyClick = (propertyId: number) => {
    navigate(`./`);
  };
  return (
    <div className={styles.root}>
      <div className={styles.propertyContainer}>
        {realEstateInfoList?.map((property) => (
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
        ))}
      </div>
    </div>
  );
}
