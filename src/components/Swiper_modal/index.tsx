import React, { useState } from 'react';

import Header from 'components/Header';
import { FreeMode, Pagination, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './Swiper_modal.module.css';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

interface modalProps {
  setModalOpen: (isOpen: boolean) => void;
  address?: string;
  imageUrls: string[];
  onClick?: () => void;
}

const Swiper_modal: React.FC<modalProps> = ({
  setModalOpen,
  address,
  imageUrls,
  onClick,
}: modalProps) => {
  const closeModal = () => {
    setModalOpen(false);
  };
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <div>
      <div className={styles.blank}></div>
      <div className={styles.root}>
        <Header title="성북구 정릉동" />
        <button className={styles.closeBtn} onClick={closeModal}>
          X
        </button>
        <Swiper
          pagination={{
            type: 'fraction',
          }}
          modules={[FreeMode, Thumbs, Pagination]}
          className={styles.swiper}
          thumbs={{ swiper: thumbsSwiper }}
          loop={true}
          spaceBetween={10}
        >
          {imageUrls.map((item, idx) => (
            <SwiperSlide className={styles.swiperSlide} key={idx}>
              <img src={item} />
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          modules={[FreeMode, Thumbs, Pagination]}
          className={styles.swiper2}
          loop={true}
          freeMode={true}
          watchSlidesProgress={true}
        >
          {imageUrls.map((item, idx) => (
            <SwiperSlide className={styles.swiperSlide} key={idx}>
              <img src={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Swiper_modal;
