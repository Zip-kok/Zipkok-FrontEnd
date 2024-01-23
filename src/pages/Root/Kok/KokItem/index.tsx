import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

import useNaviStore from 'contexts/naviStore';

import { Header, BottomBtn, SwiperCom } from 'components';

import styles from './KokItem.module.css';
import useMenu from 'hooks/useMenu';
import BasicInf from './BasicInf';
import NearHome from './NearHome';
import InsideHome from './InsideHome';
import Contract from './Contract';
import ReView from './ReView';

import data from 'models/kokItemDetail.json';

const KokItem = () => {
  const navigate = useNavigate();

  // 하단 내비게이션 바 설정
  const { setNaviMenu, setShowNaviBar } = useNaviStore();
  useEffect(() => {
    setNaviMenu('kok');
    setShowNaviBar(false);
  }, []);

  const handleEditClick = () => {
    navigate('../../kok');
  };
  const { code, message, result } = data;

  // 더 보기 구현
  const [isShowMore, setIsShowMore] = useState<boolean>(false);
  const textLimit = useRef<number>(75);
  {
    /* 더보기 글자수 제한*/
  }
  const commenter = useMemo(() => {
    const shortReview: string = result.detail.slice(0, textLimit.current);

    if (result.detail.length > textLimit.current) {
      if (isShowMore) {
        return result.detail;
      }
      return shortReview;
    }
    return result.detail;
  }, [isShowMore, result.detail]);

  const [MidMenu, Content, menuIndex] = useMenu([
    {
      name: '기본정보',
      element: <BasicInf />,
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
      element: <Contract />,
    },
    {
      name: '후기',
      element: <ReView />,
    },
  ]);

  return (
  <div className={styles.root}>
    <div className='top'>
    <Header title="성북구 정릉동" 
      backBtnEnabled
      heartBtnEnabled={true}
      heartBtnFill={result.isZimmed}
      shareBtnEnabled
      onBack={() => navigate(-1)}
      />  
    </div>
    <SwiperCom imageUrls={result.imageInfo.imageUrls} />
    <div className={styles.body}>
      <div className={styles.address}>{result.address}</div>
      <div className={styles.priceContainer}>
        <div className={styles.priceType}>{result.transactionType}</div>
        <div className={styles.priceInf}>{result.deposit+" / "}{result.price}</div>
      </div>
      <div className={styles.moreViewCtn}>
        <div>{commenter}</div>
        <div className={styles.moreViewBtn}onClick={() => setIsShowMore(!isShowMore)}>
          {(result.detail.length > textLimit.current) &&
          (isShowMore ? '닫기' : '더보기')}
        </div>
      </div>
    </div>
    <MidMenu />
    <Content />
    <BottomBtn
      text='콕리스트 수정하기'
      onClick={handleEditClick}
    />
  </div>
)}

export default KokItem;
