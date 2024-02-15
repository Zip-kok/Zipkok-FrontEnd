import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './SwiperItem.module.css';

import 'swiper/css';

interface SwiperComProps {
  imageUrls?: string[];
  onClick?: () => void;
}
const SwiperItem: React.FC<SwiperComProps> = ({ imageUrls, onClick }) => {
  return (
    <Swiper
      className={styles.swiper}
      loop={true}
      slidesPerView={1.8}
      spaceBetween={20}
      slidesOffsetBefore={20}
    >
      {imageUrls?.map((item, idx) => (
        <SwiperSlide className={styles.swiperSlide} key={idx} onClick={onClick}>
          <img src={item} />
          <div className={styles.priceInf}>1000 / 50</div>
          <div className={styles.addressInf}>서울시 관악구 신림동 12-45</div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperItem;
