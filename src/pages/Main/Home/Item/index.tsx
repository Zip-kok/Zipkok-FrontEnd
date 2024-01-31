import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
import useUIStore from 'contexts/uiStore';
import data from 'models/HomeItem.json';
import 'swiper/css';
import 'swiper/css/pagination';

import styles from './Item.module.css';
import StaticMap from '../../../../components/StaticMap/index';
const Item = () => {
  const navigate = useNavigate();

  const handleWriteClick = () => {
    navigate('../');
  };
  const { code, message, result } = data;
  //모달
  const [modalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(true);
  };
  const ui = useUIStore();
  useEffect(() => {
    ui.setUI((state) => ({
      ...state,
      headerTitle: '성북구 정릉동',
      headerIcon: undefined,
      headerBackButtonEnabled: true,
      naviEnabled: false,
    }));
  }, []);

  //더보기
  const [moreView, setMoreView] = useState(false);
  const charCount = result.detail.length;
  const handleMoreBtn = () => {
    setMoreView(!moreView);
  };

  const showMoreBtn = () => {
    const lineCount = result.detail.split('\n').length;
    return lineCount > 3 || charCount > 86;
  };

  return (
    <div className={styles.root}>
      <SwiperCom imageUrls={result.imageInfo.imageUrls} onClick={showModal} />
      {modalOpen && (
        <Swiper_modal
          imageUrls={result.imageInfo.imageUrls}
          setModalOpen={setModalOpen}
        />
      )}
      <div className={styles.body}>
        <div className={styles.address}>{result.address}</div>
        <div className={styles.priceContainer}>
          <div className={styles.priceType}>{result.transactionType}</div>
          <div className={styles.priceInf}>
            {result.deposit + ' / '}
            {result.price}
          </div>
        </div>
        <div className={styles.detailCtn}>
          {/* styles.moreView 클래스를 가진 div의 내용을 shouldShowMoreButton의 결과에 따라 다르게 렌더링 */}
          <div className={moreView ? '' : styles.moreView}>{result.detail}</div>
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
            text={data.result.areaSize + 'm^2'}
            sizeText={'(' + data.result.pyeongsu + ')평'}
          />
          <IconText img={size} text={data.result.realEstateType} />
          <IconText img={floor} text={data.result.floorNum + '층'} />
          <IconText
            img={money}
            text={'관리비 ' + data.result.administrativeFee + '만원'}
          />
        </div>
        <h4>위치</h4>
      </div>
      <StaticMap lat={result.latitude} lng={result.longitude}></StaticMap>
      <div className={styles.blank} />
      <div className={styles.blank} />
      <div className={styles.blank} />
      <BottomBtn text="콕리스트 기록" onClick={handleWriteClick} />
    </div>
  );
};

export default Item;
