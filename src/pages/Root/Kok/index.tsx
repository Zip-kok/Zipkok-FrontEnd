import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import checkIcon from 'assets/img/line(2)/check.svg';
import { ReactComponent as PenIcon } from 'assets/img/line(2)/pen_white.svg';
import { Header, BottomBtn, PropertyItem } from 'components';
import useUIStore from 'contexts/uiStore';
import properties from 'models/properties';

import styles from './Kok.module.css';

export default function Kok() {
  const navigate = useNavigate();

  // 하단 내비게이션 바 설정
  const { setNaviMenu, setShowNaviBar } = useUIStore();
  useEffect(() => {
    setNaviMenu('kok');
    setShowNaviBar(true);
  }, []);

  const handleClick = () => {
    navigate('./');
  };

  const handlePropertyClick = (propertyId: number) => {
    navigate(`./kokitem/${propertyId}`);
  };

  return (
    <div className={styles.root}>
      <div className="top">
        <Header title="콕리스트" titleIcon={checkIcon} />
      </div>

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

      <BottomBtn
        text="새 콕리스트 작성"
        onClick={() => navigate('./newKok/propertyList')}
        icon={<PenIcon />}
        style={{ bottom: '64px' }}
      />
    </div>
  );
}
