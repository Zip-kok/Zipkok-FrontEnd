import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { PropertyComponents as Property, BottomBtn } from 'components';
import useUIStore from 'contexts/uiStore';
import useMenu from 'hooks/useMenu';
import data from 'models/kokItemDetail.json';
import 'swiper/css';
import 'swiper/css/pagination';

import InsideHome from './components/InsideHome';
import NearHome from './components/NearHome';
import ReView from './components/ReView';
import styles from './KokItem.module.css';

import type { Address } from 'types/Address';
import type { HouseType } from 'types/HouseType';
import type { PriceType } from 'types/PriceType';

const KokItem = () => {
  const ui = useUIStore();
  const { result } = data;

  const getAddressObject = useCallback(
    () =>
      ({
        address_name: result.address,
        x: result.longitude,
        y: result.latitude,
      }) as Address,
    [result],
  );

  useEffect(() => {
    ui.setUI((state) => ({
      ...state,
      headerTitle: result.address,
      headerIcon: undefined,
      headerBackButtonEnabled: true,
      naviEnabled: false,
    }));
  }, []);

  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate('../../kok');
  };

  const [MidMenu, Content, menuIndex] = useMenu([
    {
      name: '기본정보',
      element: (
        <Property.BasicInfo
          area={result.area_size}
          houseType={result.realEstateType as HouseType}
          floor={result.floorNum}
          maintanenceFee={result.administrativeFee}
          address={getAddressObject()}
        />
      ),
    },
    {
      name: '집 주변',
      element: <NearHome />,
    },
    {
      name: '집 내부',
      element: <InsideHome />,
    },
    {
      name: '중개 계약',
      element: <Property.Contract options={[]} pictures={[]} />,
    },
    {
      name: '후기',
      element: <ReView />,
    },
  ]);

  return (
    <div className={styles.root}>
      <Property.Header
        pictures={result.imageInfo.imageUrls}
        address={getAddressObject()}
        detailAddress={result.detailAddress}
        priceType={result.transactionType as PriceType}
        memo={result.detail}
        deposit={result.deposit}
        monthlyPrice={result.price}
        price={result.price}
      />

      <div className={styles.menu}>
        <MidMenu />
      </div>

      <Content />
      <BottomBtn text="콕리스트 수정하기" onClick={handleEditClick} />
    </div>
  );
};

export default KokItem;
