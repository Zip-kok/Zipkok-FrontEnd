import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  getKokInner,
  getKokOuter,
  getKokContract,
  getKokDetail,
  getKokReview,
} from 'apis';
import { zim } from 'apis';
import { deleteZim } from 'apis';
import { KokContract } from 'apis/getKokContract';
import { KokDetail } from 'apis/getKokDetail';
import { KokInner } from 'apis/getKokInner';
import { KokOuter } from 'apis/getKokOuter';
import { KokReview } from 'apis/getKokReview';
import { PropertyComponents as Property, BottomBtn } from 'components';
import useModal from 'contexts/modalStore';
import useUIStore from 'contexts/uiStore';
import useMenu from 'hooks/useMenu';
import { StatusCode } from 'types/StatusCode';

import styles from './KokItem.module.css';
import fillHeart from '../../../../assets/img/fill/heart_selected.svg';
import heart from '../../../../assets/img/line(2)/heart.svg';

import 'swiper/css';
import 'swiper/css/pagination';

import type { UserKokOption } from 'apis/getUserKokOption';
import type { Address } from 'types/Address';
import type { HouseType } from 'types/HouseType';

interface RawOption {
  option: string;
  orderNumber: number;
  detailOptions: string[];
}

const KokItem = () => {
  const ui = useUIStore();
  const { kokId } = useParams();
  const modal = useModal();

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

  const convertRawOption = (rawOption: RawOption) =>
    ({
      optionId: rawOption.orderNumber,
      optionTitle: rawOption.option,
      orderNumber: rawOption.orderNumber,
      detailOptions: rawOption.detailOptions.map((detailOption, index) => ({
        detailOptionId: index,
        detailOptionTitle: detailOption,
        detailOptionIsVisible: false,
      })),
    }) as UserKokOption;

  const [KokOuter, setKokOuter] = useState<KokOuter>();
  const [KokInner, setKokInner] = useState<KokInner>();
  const [KokContract, setKokContract] = useState<KokContract>();
  const [KokDetail, setKokDetail] = useState<KokDetail>();
  const [KokReview, setKokReview] = useState<KokReview>();

  const handlePress = () => {
    if (KokDetail === undefined) return;

    if (!KokDetail.isZimmed) {
      zim(KokDetail.realEstateId).then((res) => {
        if (res.code === StatusCode.FAVORITES_ADD_SUCCESS)
          setKokDetail({ ...KokDetail, isZimmed: true });
        else
          modal.open({
            title: '찜 실패',
            description: '찜하기에 실패했습니다.',
            primaryButton: '확인',
          });
      });
    } else {
      deleteZim(KokDetail.realEstateId).then((res) => {
        if (res.code === StatusCode.FAVORITES_CANCEL_SUCCESS)
          setKokDetail({ ...KokDetail, isZimmed: false });
        else
          modal.open({
            title: '찜 취소 실패',
            description: '찜 취소에 실패했습니다.',
            primaryButton: '확인',
          });
      });
    }
  };
  useEffect(() => {
    if (kokId === undefined) return;
    const kokItemId = parseInt(kokId, 10);
    getKokOuter(kokItemId).then((res) => setKokOuter(res.result));
    getKokDetail(kokItemId).then((res) => setKokDetail(res.result));
    getKokInner(kokItemId).then((res) => setKokInner(res.result));
    getKokReview(kokItemId).then((res) => setKokReview(res.result));
    getKokContract(kokItemId).then((res) => setKokContract(res.result));

    console.log(KokInner);
  }, []);

  useEffect(() => {
    const splitedTitle = KokDetail?.address.split(' ');
    if (splitedTitle === undefined) return;
    const convertTitle = splitedTitle[0] + ' ' + splitedTitle[1];
    ui.setUI({
      naviEnabled: false,
      headerEnabled: true,
      headerTitle: KokDetail ? convertTitle : '',
      headerBackButtonEnabled: true,
      headerRightButtons: [
        {
          id: '1',
          img: KokDetail?.isZimmed ? fillHeart : heart,
          onPress: handlePress,
        },
      ],
      path: 'kok',
    });
  }, [KokDetail]);

  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/kok/edit?kokId=${kokId}`);
  };

  const [MidMenu, Content, menuIndex] = useMenu([
    {
      name: '기본정보',
      element: (
        <Property.BasicInfo
          area={KokDetail?.pyeongsu}
          houseType={KokDetail?.realEstateType as HouseType}
          floor={KokDetail?.floorNum}
          maintanenceFee={KokDetail?.administrativeFee}
          address={KokDetail?.address}
          latitude={KokDetail?.latitude}
          longitude={KokDetail?.longitude}
        />
      ),
    },
    {
      name: '집 주변',
      element: (
        <Property.Outer
          highlights={KokOuter ? KokOuter.hilights : []}
          options={KokOuter ? KokOuter.options.map(convertRawOption) : []}
        />
      ),
    },
    {
      name: '집 내부',
      element: (
        <Property.Inner
          furnitureOptions={KokInner?.furnitureOptions ?? []}
          direction={KokInner?.direction ?? ''}
          options={KokInner?.options.map(convertRawOption) ?? []}
        />
      ),
    },
    {
      name: '중개 계약',
      element: (
        <Property.Contract
          options={KokContract?.options.map(convertRawOption) ?? []}
          pictures={KokContract?.imageInfo.imageURL ?? []}
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
          KokDetail ? KokDetail.longitude : 0,
          KokDetail ? KokDetail.latitude : 0,
        )}
        detailAddress={KokDetail ? KokDetail.detailAddress : ''}
        priceType={KokDetail ? KokDetail.transactionType : 'MONTHLY'}
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
