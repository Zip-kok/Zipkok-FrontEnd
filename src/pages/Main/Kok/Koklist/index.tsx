import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getUserKokList } from 'apis';
import checkIcon from 'assets/img/line(2)/check.svg';
import { ReactComponent as PenIcon } from 'assets/img/line(2)/pen_white.svg';
import { BottomBtn, PropertyItem } from 'components';
import useUIStore from 'contexts/uiStore';
import properties from 'models/properties';

import styles from './Kok.module.css';

export default function Koklist() {
  const ui = useUIStore();
  useEffect(() => {
    getUserKokList(1, 1).then((res) => {
      console.log(res);
    });
    ui.setUI((state) => ({
      ...state,
      headerTitle: '콕리스트',
      headerIcon: checkIcon,
      headerBackButtonEnabled: false,
      naviEnabled: true,
      headerRightButtons: [],
    }));
  }, []);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('./');
  };

  const handlePropertyClick = (propertyId: number) => {
    navigate(`./kokItem/${propertyId}`);
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
            deposit={property.deposit}
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
        onClick={() => navigate('./new/propertyList')}
        icon={<PenIcon />}
        style={{ bottom: '64px' }}
      />
    </div>
  );
}
