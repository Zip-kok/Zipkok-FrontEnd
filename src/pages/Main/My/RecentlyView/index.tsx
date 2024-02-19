import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { PropertyItem } from 'components';
import useUIStore from 'contexts/uiStore';
import getRecents from 'utils/getRecents';

import styles from './RecentlyView.module.css';

const RecentlyView = () => {
  const navigate = useNavigate();
  const ui = useUIStore();

  const recents = getRecents();

  useEffect(() => {
    ui.setUI({
      naviEnabled: false,
      headerEnabled: true,
      headerTitle: '최근 본 매물',
      headerBackButtonEnabled: true,
      headerRightButtons: [],
      path: 'my',
    });
  }, []);
  return (
    <div className={styles.root}>
      {recents.reverse().map((recent) => (
        <PropertyItem
          key={recent.realEstateId}
          id={recent.realEstateId}
          like={recent.like}
          type={recent.type}
          priceType={recent.priceType}
          deposit={recent.deposit}
          price={recent.price}
          address={recent.address}
          propertyName={recent.propertyName}
          imageUrl={recent.imageUrl}
          kokList={recent.kokList}
          onClick={() => navigate(`/item/${recent.realEstateId}`)}
        />
      ))}
    </div>
  );
};

export default RecentlyView;
