import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useNaviStore from '../../../contexts/naviStore';

import styles from './Kok.module.css';
import checkIcon from '../../../assets/img/kokList/check.svg';
import Header from '../../../components/Header';
import PtopertyItem from '../../../components/PropertyItem';
import BottomBtn from '../../../components/BottomBtn';
import { ReactComponent as PenIcon } from '../../../assets/img/kokList/pen.svg';

import properties from '../../../models/properties';
import PropertyItem from '../../../components/PropertyItem';

export const Kok = () => {
  const { setNaviMenu } = useNaviStore();
  useEffect(() => {
    setNaviMenu('kok');
  }, []);

  function handleSubmit(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className={styles.root}>
      <Header title="콕리스트" titleIcon={checkIcon} />
      <div>
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
            showListIcon={true}
          />
        ))}
      </div>
      <div className={styles.bottomBtnContainer}>
        <BottomBtn
          text="새 콕리스트 작성"
          onClick={handleSubmit}
          icon={<PenIcon />}
          style={{ backgroundColor: 'transparent' }}
        />
      </div>
    </div>
  );
};
