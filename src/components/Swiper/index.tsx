import React from 'react';

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './Swiper.module.css';

import 'swiper/css';
import 'swiper/css/pagination';

interface SwiperComProps {
  imageUrls: string[];
}

const SwiperCom: React.FC<SwiperComProps> = ({ imageUrls }) => {
  return (
    <Swiper
      pagination={{
        type: 'fraction',
      }}
      modules={[Pagination]}
      className={styles.swiper}
      loop={true}
    >
      {imageUrls.map((item, idx) => (
        <SwiperSlide className={styles.swiperSlide} key={idx}>
          <img src={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperCom;
