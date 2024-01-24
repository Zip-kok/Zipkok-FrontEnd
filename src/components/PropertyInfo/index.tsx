import React from 'react';

import defaultThumbnail from 'assets/img/common/defaultThumbnail.png';
import mapImg from 'assets/img/common/map.png';
import floorIcon from 'assets/img/line(1)/floor.svg';
import linkIcon from 'assets/img/line(1)/link.svg';
import maintanenceFeeIcon from 'assets/img/line(1)/money.svg';
import areaIcon from 'assets/img/line(1)/size.svg';
import houseTypeIcon from 'assets/img/line(1)/structure.svg';
import { PriceType, HouseType } from 'pages/Onboarding';

import styles from './PropertyInfo.module.css';
import BottomBtn from '../BottomBtn';
import IconBtn from '../IconBtn';

interface PropertyInfoProps {
  picture?: string;
  address: string;
  priceType: PriceType;
  deposit?: number;
  monthlyPrice?: number;
  price?: number;
  memo?: string;
  area?: number;
  houseType: HouseType;
  floor?: number;
  maintanenceFee?: number;
  detailAddress?: string;
}

export default function PropertyInfo({
  picture = defaultThumbnail,
  address,
  priceType,
  deposit,
  monthlyPrice,
  price,
  memo,
  area,
  houseType,
  floor,
  maintanenceFee,
  detailAddress,
}: PropertyInfoProps) {
  function pyeongToSquareMeter(pyeong: number) {
    return pyeong * 3.305785;
  }

  return (
    <div className={styles.container}>
      {/* 썸네일 */}
      <div className={styles.thumbnail}>
        <img src={picture} />
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
      <div className={styles.memo}>{memo}</div>

      {/* 기본 정보 */}
      <div>
        <div className={styles.header}>
          <span className={styles.title}>기본정보</span>
          <IconBtn
            image={linkIcon}
            text="상세보기"
            onClick={() => {}}
            gap="4px"
            height="36px"
            fontSize="12px"
            fontWeight="400"
            color="var(--gray-color-gray050_text, #4B5259)"
          />
        </div>

        <div className={styles.details}>
          {area !== undefined && (
            <div className={styles.detail}>
              <img src={areaIcon} />
              <span>{`${pyeongToSquareMeter(area).toFixed(
                1,
              )}㎡ (${area}평)`}</span>
            </div>
          )}
          <div className={styles.detail}>
            <img src={houseTypeIcon} />
            <span>{houseType}</span>
          </div>
          {floor !== undefined && (
            <div className={styles.detail}>
              <img src={floorIcon} />
              <span>{floor}층</span>
            </div>
          )}
          <div className={styles.detail}>
            <img src={maintanenceFeeIcon} />
            <span>
              관리비
              {maintanenceFee === 0
                ? ` 없음`
                : ` ${maintanenceFee?.toLocaleString()}만원`}
            </span>
          </div>
        </div>
      </div>

      {/* 위치 */}
      <div>
        <div className={styles.header}>
          <span className={styles.title}>위치</span>
        </div>
        <div className={styles.map}>
          <img src={mapImg} />
        </div>
      </div>

      <BottomBtn text="콕리스트 작성하기" onClick={() => {}} />
    </div>
  );
}
