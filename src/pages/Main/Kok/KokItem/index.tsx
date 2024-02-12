import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getKokInner, getKokOuter } from 'apis';
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
  useEffect(() => {
    ui.setUI((state) => {
      getKokOuter(1).then((res) => setKokOuter(res.result));
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
          furnitureOptions={innerDummy.result.furnitureOptions}
          direction={innerDummy.result.direction}
          options={innerDummy.result.options}
        />
      ),
    },
    {
      name: '중개 계약',
      element: (
        <Property.Contract
          options={contractDummy.result.options}
          pictures={contractDummy.result.imageInfo.imageUrls}
        />
      ),
    },
    {
      name: '후기',
      element: (
        <Property.Review
          impressions={reviewDummy.result.impressions}
          facilityStarCount={reviewDummy.result.facilityStarCount}
          infraStarCount={reviewDummy.result.infraStarCount}
          structureStarCount={reviewDummy.result.structureStarCount}
          vibeStarCount={reviewDummy.result.vibeStarCount}
          reviewText={reviewDummy.result.reviewText}
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
