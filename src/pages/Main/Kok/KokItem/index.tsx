import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  getKokInner,
  getKokOuter,
  getKokContract,
  getKokDetail,
  getKokReview,
} from 'apis';
import { KokContract } from 'apis/getKokContract';
import { KokDetail } from 'apis/getKokDetail';
import { KokInner } from 'apis/getKokInner';
import { KokOuter } from 'apis/getKokOuter';
import { KokReview } from 'apis/getKokReview';
import filledHeartIcon from 'assets/img/fill/heart_fill.svg';
import heartIcon from 'assets/img/line(2)/heart.svg';
import shareIcon from 'assets/img/line(2)/share.svg';
import { PropertyComponents as Property, BottomBtn } from 'components';
import useUIStore from 'contexts/uiStore';
import useMenu from 'hooks/useMenu';
import { StatusCode } from 'types/StatusCode';

import 'swiper/css';
import 'swiper/css/pagination';

import styles from './KokItem.module.css';

import type { Address } from 'types/Address';
import type { HouseType } from 'types/HouseType';
import type { PriceType } from 'types/PriceType';

const KokItem = () => {
  const ui = useUIStore();
  const { kokId } = useParams();

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
    console.log(kokId);
    if (kokId === undefined) return;
    const kokItemId = parseInt(kokId, 10);
    getKokOuter(kokItemId).then((res) => setKokOuter(res.result));
    getKokDetail(kokItemId).then((res) => setKokDetail(res.result));
    getKokInner(kokItemId).then((res) => setKokInner(res.result));
    getKokReview(kokItemId).then((res) => setKokReview(res.result));
    getKokContract(kokItemId).then((res) => setKokContract(res.result));
  }, []);

  useEffect(() => {
    ui.setUI((state) => {
      return {
        ...state,
        headerTitle: KokDetail ? KokDetail.address : '',
        headerIcon: undefined,
        headerBackButtonEnabled: true,
        naviEnabled: false,
        headerRightButtons: [
          { id: 'heart', img: heartIcon, onPress: () => {} },
          { id: 'share', img: shareIcon, onPress: () => {} },
        ],
      };
    });
  }, [KokDetail]);

  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate('../../kok');
  };

  const [MidMenu, Content, menuIndex] = useMenu([
    {
      name: '기본정보',
      element: (
        <Property.BasicInfo
          area={KokDetail?.areaSize}
          houseType={KokDetail?.realEstateType as HouseType}
          floor={KokDetail?.floorNum}
          maintanenceFee={KokDetail?.administrativeFee}
          address={
            KokDetail
              ? getAddressObject(
                  KokDetail!.address,
                  KokDetail!.longtitude,
                  KokDetail!.latitude,
                )
              : { address_name: '', x: 0, y: 0 }
          }
        />
      ),
    },
    {
      name: '집 주변',
      element: (
        <Property.Outer
          highlights={KokOuter ? KokOuter.hilights : []}
          options={KokOuter ? KokOuter.options : []}
        />
      ),
    },
    {
      name: '집 내부',
      element: (
        <Property.Inner
          furnitureOptions={KokInner ? KokInner.furnitureOptions : []}
          direction={KokInner ? KokInner!.direction : ''}
          options={KokInner ? KokInner!.options : []}
        />
      ),
    },
    {
      name: '중개 계약',
      element: (
        <Property.Contract
          options={KokContract ? KokContract.options : []}
          pictures={KokContract ? KokContract.imageInfo.imageURL : []}
        />
      ),
    },
    {
      name: '후기',
      element: (
        <Property.Review
          impressions={KokReview ? KokReview.impressions : []}
          facilityStarCount={KokReview ? KokReview.facilityStarCount : 0}
          infraStarCount={KokReview ? KokReview.infraStarCount : 0}
          structureStarCount={KokReview ? KokReview.structureStarCount : 0}
          vibeStarCount={KokReview ? KokReview.vibeStarCount : 0}
          reviewText={KokReview ? KokReview.reviewText : ''}
        />
      ),
    },
  ]);

  return (
    <div className={styles.root}>
      <Property.Header
        pictures={KokDetail ? KokDetail.imageInfo.imageUrls : []}
        address={getAddressObject(
          KokDetail ? KokDetail.address : '',
          KokDetail ? KokDetail.longtitude : 0,
          KokDetail ? KokDetail.latitude : 0,
        )}
        detailAddress={KokDetail ? KokDetail.detailAddress : ''}
        priceType={KokDetail ? KokDetail.transactionType : '월세'}
        memo={KokDetail ? KokDetail.detail : ''}
        deposit={KokDetail ? KokDetail.deposit : 0}
        monthlyPrice={KokDetail ? KokDetail.price : 0}
        price={KokDetail ? KokDetail.price : 0}
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
