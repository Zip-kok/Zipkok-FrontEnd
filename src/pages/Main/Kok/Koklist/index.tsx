import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getUserKokList } from 'apis';
import { UserKokList } from 'apis/getUserKokList';
import checkIcon from 'assets/img/line(2)/check.svg';
import { ReactComponent as PenIcon } from 'assets/img/line(2)/pen_white.svg';
import { BottomBtn, PropertyItem } from 'components';
import useUIStore from 'contexts/uiStore';
import properties from 'models/properties';

import styles from './Kok.module.css';
import { realEstateInfo } from '../../Home/KakaoMap/index';

export default function Koklist() {
  const ui = useUIStore();
  const [propertyList, setPropertyList] = useState<UserKokList>();
  useEffect(() => {
    getUserKokList(1, 1).then((res) => {
      console.log(res);
      setPropertyList(res.result);
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

  const handlePropertyClick = (kokId: number) => {
    navigate(`./kokItem/${kokId}`);
  };

  return (
    <div className={styles.root}>
      <div className={styles.propertyContainer}>
        {propertyList &&
          propertyList.koks.map((property: any) => (
            <PropertyItem
              key={property.kokId}
              id={property.kokId}
              like={property.isZimmed}
              type={property.realEstateType}
              priceType={property.transactionType}
              price={property.price}
              deposit={property.deposit}
              address={property.address}
              propertyName={property.estateAgent}
              imageUrl={property.imageUrl}
              kokList={true}
              onClick={() => handlePropertyClick(property.kokId)}
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
