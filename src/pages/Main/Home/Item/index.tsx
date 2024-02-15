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
import StaticMap from 'components/StaticMap/index';
import SwiperItem from 'components/SwiperItem';
import useUIStore from 'contexts/uiStore';
import data from 'models/HomeItem.json';

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
    const ItemId = parseInt(realEstateId, 10);
    getRealEstateInfo(ItemId).then((res) => setRealEstateInfo(res.result));
  }, []);

  const handleWriteClick = () => {
    navigate('../');
  };
  const handleOtherItemClick = () => {};

  const ui = useUIStore();

  useEffect(() => {
    ui.setUI((state) => ({
      ...state,
      headerTitle: realEstateInfo?.address,
      headerIcon: undefined,
      headerBackButtonEnabled: true,
      naviEnabled: false,
    }));
  }, []);
  //모달
  const [modalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  //더보기
  const [moreView, setMoreView] = useState(false);
  const charCount = realEstateInfo?.detail.length;
  const handleMoreBtn = () => {
    setMoreView(!moreView);
  };

  const showMoreBtn = () => {
    const lineCount = realEstateInfo?.detail.split('\n').length;
    if (lineCount === undefined || charCount === undefined) return;
    return lineCount > 3 || charCount > 86;
  };

  return (
    <div className={styles.root}>
      <SwiperCom
        imageUrls={realEstateInfo?.imageInfo.imageURL}
        onClick={showModal}
      />
      {modalOpen && (
        <Swiper_modal
          imageUrls={realEstateInfo?.imageInfo.imageURL}
          setModalOpen={setModalOpen}
        />
      )}
      <div className={styles.body}>
        <div className={styles.address}>{realEstateInfo?.address}</div>
        <div className={styles.priceContainer}>
          <div className={styles.priceType}>
            {realEstateInfo?.transactionType}
          </div>
          <div className={styles.priceInf}>
            {realEstateInfo?.deposit + ' / '}
            {realEstateInfo?.price}
          </div>
        </div>
        <div className={styles.detailCtn}>
          {/* styles.moreView 클래스를 가진 div의 내용을 shouldShowMoreButton의 결과에 따라 다르게 렌더링 */}
          <div className={moreView ? '' : styles.moreView}>
            {realEstateInfo?.detail}
          </div>
          {showMoreBtn() && (
            <button onClick={handleMoreBtn}>{moreView ? '' : '더보기'}</button>
          )}
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.titleCtn}>
          <h4>기본정보</h4>
          <IconBtn
            image={link}
            text="상세보기"
            fontSize="12px"
            fontWeight="400"
          />
        </div>
        <div className={styles.infCtn}>
          <IconText
            img={structure}
            text={realEstateInfo?.areaSize + 'm^2'}
            sizeText={'(' + realEstateInfo?.pyeongsu + ')평'}
          />
          <IconText img={size} text={realEstateInfo?.realEstateType} />
          <IconText img={floor} text={realEstateInfo?.floorNum + '층'} />
          <IconText
            img={money}
            text={'관리비 ' + realEstateInfo?.administrativeFee + '만원'}
          />
        </div>
        <h4>위치</h4>
      </div>
      <StaticMap
        lat={realEstateInfo?.longitude}
        lng={realEstateInfo?.latitude}
      ></StaticMap>

      <h4>주변의 다른 매물</h4>
      <SwiperItem
        imageUrls={realEstateInfo?.imageInfo.imageURL}
        onClick={handleOtherItemClick}
      ></SwiperItem>
      <div className={styles.blank} />
      <div className={styles.blank} />
      <div className={styles.blank} />
      <BottomBtn text="콕리스트 기록" onClick={handleWriteClick} />
    </div>
  );
};

export default Item;
