import React, { useState, useRef, useEffect } from 'react';

import 'swiper/css';
import 'swiper/css/pagination';
import defaultThumbnail from 'assets/img/common/defaultThumbnail.png';
import { SwiperCom, Swiper_modal } from 'components';
import convertPriceTypeToString from 'utils/convertPriceTypeToString';

import styles from './Header.module.css';

import type { Address } from 'types/Address';
import type { PriceType } from 'types/PriceType';

interface HeaderProps {
  pictures?: string[];
  address: Address;
  detailAddress?: string;
  priceType: PriceType;
  memo?: string;
  deposit?: number;
  monthlyPrice?: number;
  price?: number;
}

export default function Header({
  pictures = [],
  address,
  detailAddress,
  priceType,
  memo,
  deposit,
  monthlyPrice,
  price,
}: HeaderProps) {
  const [thumbnailModalOpen, setThumbnailModalOpen] = useState(false);
  const [isMemoExpanded, setIsMemoExpanded] = useState(false);
  const [isMemoClamped, setIsMemoClamped] = useState(false);

  const memoRef = useRef<HTMLParagraphElement>(null);

  const handleModalOpen = () => {
    setThumbnailModalOpen(true);
    document.body.style.overflow = 'hidden';
  };
  // memo의 높이가 클램핑되는지 확인
  useEffect(() => {
    // ResizeObserver 인스턴스 생성
    const observer = new ResizeObserver((entries) => {
      if (isMemoExpanded) return;

      const isClamped =
        entries[0].target.scrollHeight > entries[0].contentRect.height;
      setIsMemoClamped(isClamped);
    });

    // memoRef observe 시작
    if (memoRef.current) observer.observe(memoRef.current);

    // cleanup
    return () => {
      observer?.disconnect();
    };
  }, [memoRef, isMemoExpanded]);

  return (
    <>
      {/* 썸네일 */}
      <div className={styles.thumbnail}>
        {pictures.length > 0 ? (
          /* pictures가 있을 때 */
          <>
            <SwiperCom imageUrls={pictures} onClick={handleModalOpen} />
            {thumbnailModalOpen && (
              <Swiper_modal
                imageUrls={pictures}
                setModalOpen={setThumbnailModalOpen}
              />
            )}
          </>
        ) : (
          /* pictures가 없을 때 */
          <img src={defaultThumbnail} />
        )}
      </div>

      {/* 주소 */}
      <div className={styles.address}>{`${address.address_name} ${
        detailAddress ? detailAddress : ''
      }`}</div>

      {/* 가격 */}
      <div className={styles.priceContainer}>
        <span className={styles.priceType}>
          {convertPriceTypeToString(priceType)}
        </span>
        <span className={styles.price}>
          {
            {
              MONTHLY: `${deposit?.toLocaleString()} / ${monthlyPrice?.toLocaleString()}`,
              YEARLY: `${deposit?.toLocaleString()}`,
              PURCHASE: `${price?.toLocaleString()}`,
            }[priceType]
          }
        </span>
      </div>

      {/* 메모 */}
      <div className={styles.memoContainer}>
        <p
          className={`${styles.memo} ${isMemoExpanded ? styles.expanded : ''}`}
          ref={memoRef}
        >
          {memo}
        </p>
        {isMemoClamped && (
          <button
            className={styles.showMoreBtn}
            onClick={() => setIsMemoExpanded((prev) => !prev)}
          >
            {isMemoExpanded ? '접기' : '더보기'}
          </button>
        )}
      </div>
    </>
  );
}
