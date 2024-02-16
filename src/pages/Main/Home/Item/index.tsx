import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { GetRealEstateInfoResult } from 'apis/getRealEstateInfo';
import { getRealEstateInfo } from 'apis/getRealEstateInfo';
import floor from 'assets/img/line(1)/floor.svg';
import link from 'assets/img/line(1)/link.svg';
import money from 'assets/img/line(1)/money.svg';
import size from 'assets/img/line(1)/size.svg';
import structure from 'assets/img/line(1)/structure.svg';
import {
  BottomBtn,
  IconBtn,
  IconText,
  SwiperCom,
  Swiper_modal,
} from 'components';
import Property from 'components/Property';
import StaticMap from 'components/StaticMap/index';
import SwiperItem from 'components/SwiperItem';
import useUIStore from 'contexts/uiStore';

import 'swiper/css';
import 'swiper/css/pagination';
import styles from './Item.module.css';
const Item = () => {
  const navigate = useNavigate();
  const { realEstateId } = useParams();
  const [realEstateInfo, setRealEstateInfo] =
    useState<GetRealEstateInfoResult>();

  useEffect(() => {
    if (realEstateId === undefined) return;
    const ItemId = parseInt(realEstateId);
    getRealEstateInfo(ItemId).then((res) => setRealEstateInfo(res.result));
  }, []);

  const handleWriteClick = () => {
    navigate('../');
  };

  const ui = useUIStore();

  useEffect(() => {
    ui.setUI((state) => ({
      ...state,
      headerEnabled: true,
      headerTitle: realEstateInfo?.address,
      headerIcon: undefined,
      headerBackButtonEnabled: true,
      naviEnabled: false,
    }));
  }, [realEstateInfo]);

  return (
    <div className={styles.root}>
      {realEstateInfo && (
        <>
          <Property.Header
            pictures={realEstateInfo.imageInfo.imageURL}
            address={{
              address_name: realEstateInfo.address,
              x: realEstateInfo.longitude,
              y: realEstateInfo.latitude,
            }}
            detailAddress={realEstateInfo.detailAddress}
            priceType={realEstateInfo.transactionType}
            memo={realEstateInfo.detail}
            deposit={realEstateInfo.deposit}
            monthlyPrice={realEstateInfo.price}
            price={realEstateInfo.price}
          />

          <Property.BasicInfo
            area={realEstateInfo.pyeongsu}
            houseType={realEstateInfo.realEstateType}
            floor={realEstateInfo.floorNum}
            maintanenceFee={realEstateInfo.administrativeFee}
            address={{
              address_name: realEstateInfo.address,
              x: realEstateInfo.longitude,
              y: realEstateInfo.latitude,
            }}
          />
        </>
      )}

      <h4>주변의 다른 매물</h4>
      <SwiperItem
        imageUrls={realEstateInfo?.imageInfo.imageURL}
        onClick={() => {}}
      ></SwiperItem>
      <div className={styles.blank} />
      <div className={styles.blank} />
      <div className={styles.blank} />
      <BottomBtn text="콕리스트 기록" onClick={handleWriteClick} />
    </div>
  );
};

export default Item;
