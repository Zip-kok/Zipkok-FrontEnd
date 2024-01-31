import React, { useState } from 'react';

import 'swiper/css';
import 'swiper/css/pagination';
import defaultThumbnail from 'assets/img/common/defaultThumbnail.png';
import { SwiperCom, Swiper_modal } from 'components';

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

  function isMemoLong() {
    if (!memo) return false;
    const lineCount = memo.split('\n').length;
    return lineCount > 3 || memo.length > 86;
  }

  return (
    <>
      {/* 썸네일 */}
      <div className={styles.thumbnail}>
        {pictures.length > 0 ? (
          /* pictures가 있을 때 */
          <>
            <SwiperCom
              imageUrls={pictures}
              onClick={() => setThumbnailModalOpen(true)}
            />
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
      <div className={styles.address}>{`${address} ${
        detailAddress ? detailAddress : ''
      }`}</div>

      {/* 가격 */}
      <div className={styles.priceContainer}>
        <span className={styles.priceType}>{priceType}</span>
        <span className={styles.price}>
          {
            {
              월세: `${deposit?.toLocaleString()} / ${monthlyPrice?.toLocaleString()}`,
              전세: `${deposit?.toLocaleString()}`,
              매매: `${price?.toLocaleString()}`,
            }[priceType]
          }
        </span>
      </div>

      {/* 메모 */}
      <div className={styles.memo}>
        <div className={isMemoExpanded ? '' : styles.expanded}>{memo}</div>
        {isMemoLong() && (
          <button
            className={styles.showMoreBtn}
            onClick={() => setIsMemoExpanded(true)}
          >
            {isMemoExpanded ? '' : '더보기'}
          </button>
        )}
      </div>
    </>
  );
}
