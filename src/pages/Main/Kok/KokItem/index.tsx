import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  getKokInner,
  getKokOuter,
  getKokContract,
  getKokDetail,
  getKokReview,
} from 'apis';
import { KokOuter } from 'apis/getKokOuter';
import filledHeartIcon from 'assets/img/fill/heart_fill.svg';
import heartIcon from 'assets/img/line(2)/heart.svg';
import shareIcon from 'assets/img/line(2)/share.svg';
import { PropertyComponents as Property, BottomBtn } from 'components';
import useUIStore from 'contexts/uiStore';
import useMenu from 'hooks/useMenu';
import contractDummy from 'models/kokItemContract.json';
import detailDummy from 'models/kokItemDetail.json';
import innerDummy from 'models/kokItemInner.json';
import outerDummy from 'models/kokItemOuter.json';
import reviewDummy from 'models/kokItemReview.json';

import 'swiper/css';
import 'swiper/css/pagination';

import styles from './KokItem.module.css';
import { KokContract } from '../../../../apis/getKokContract';
import { KokDetail } from '../../../../apis/getKokDetail';
import { KokInner } from '../../../../apis/getKokInner';
import { KokReview } from '../../../../apis/getKokReview';

import type { Address } from 'types/Address';
import type { HouseType } from 'types/HouseType';
import type { PriceType } from 'types/PriceType';

const KokItem = () => {
  const ui = useUIStore();

  const getAddressObject = (
    address: string,
    longitude: number,
    latitude: number,
  ) =>
    ({
      address_name: address,
      x: longitude,
      y: latitude,
    }) as Address;
  const [KokOuter, setKokOuter] = useState<KokOuter>();
  const [KokInner, setKokInner] = useState<KokInner>();
  const [KokContract, setKokContract] = useState<KokContract>();
  const [KokDetail, setKokDetail] = useState<KokDetail>();
  const [KokReview, setKokReview] = useState<KokReview>();
  useEffect(() => {
    ui.setUI((state) => {
      getKokOuter(1).then((res) => setKokOuter(res.result));
      getKokInner(1).then((res) => setKokInner(res.result));
      return {
        ...state,
        headerTitle: detailDummy.result.address,
        headerIcon: undefined,
        headerBackButtonEnabled: true,
        naviEnabled: false,
        headerRightButtons: [
          { id: 'heart', img: heartIcon, onPress: () => {} },
          { id: 'share', img: shareIcon, onPress: () => {} },
        ],
      };
    });
  }, [detailDummy]);

  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate('../../kok');
  };

  const [MidMenu, Content, menuIndex] = useMenu([
    {
      name: '기본정보',
      element: (
        <Property.BasicInfo
          area={detailDummy.result.area_size}
          houseType={detailDummy.result.realEstateType as HouseType}
          floor={detailDummy.result.floorNum}
          maintanenceFee={detailDummy.result.administrativeFee}
          address={getAddressObject(
            detailDummy.result.address,
            detailDummy.result.longitude,
            detailDummy.result.latitude,
          )}
        />
      ),
    },
    {
      name: '집 주변',
      element: (
        <Property.Outer
          highlights={KokOuter!.hilights}
          options={KokOuter!.options}
        />
      ),
    },
    {
      name: '집 내부',
      element: (
        <Property.Inner
          furnitureOptions={KokInner!.furnitureOptions}
          direction={KokInner!.direction}
          options={KokInner!.options}
        />
      ),
    },
    {
      name: '중개 계약',
      element: (
        <Property.Contract
          options={KokContract!.options}
          pictures={KokContract!.imageInfo.imageURL}
        />
      ),
    },
    {
      name: '후기',
      element: (
        <Property.Review
          impressions={KokReview!.impressions}
          facilityStarCount={KokReview!.facilityStarCount}
          infraStarCount={KokReview!.infraStarCount}
          structureStarCount={KokReview!.structureStarCount}
          vibeStarCount={KokReview!.vibeStarCount}
          reviewText={KokReview!.reviewText}
        />
      ),
    },
  ]);

  return (
    <div className={styles.root}>
      <Property.Header
        pictures={detailDummy.result.imageInfo.imageUrls}
        address={getAddressObject(
          detailDummy.result.address ?? '',
          detailDummy.result.longitude ?? 0,
          detailDummy.result.latitude ?? 0,
        )}
        detailAddress={detailDummy.result.detailAddress}
        priceType={detailDummy.result.transactionType as PriceType}
        memo={detailDummy.result.detail}
        deposit={detailDummy.result.deposit}
        monthlyPrice={detailDummy.result.price}
        price={detailDummy.result.price}
      />

      {/* 메뉴 */}
      <div className={styles.menu}>
        <MidMenu />
      </div>

      {/* 콘텐츠 */}
      <div className={styles.content}>
        <Content />
      </div>

      <BottomBtn text="콕리스트 수정하기" onClick={handleEditClick} />
    </div>
  );
};

export default KokItem;
