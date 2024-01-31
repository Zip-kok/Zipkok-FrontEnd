import React from 'react';

import defaultThumbnail from 'assets/img/common/defaultThumbnail.png';
import mapImg from 'assets/img/common/map.png';
import floorIcon from 'assets/img/line(1)/floor.svg';
import linkIcon from 'assets/img/line(1)/link.svg';
import maintanenceFeeIcon from 'assets/img/line(1)/money.svg';
import areaIcon from 'assets/img/line(1)/size.svg';
import houseTypeIcon from 'assets/img/line(1)/structure.svg';

import styles from './BasicInfo.module.css';
import BottomBtn from '../../BottomBtn';
import IconBtn from '../../IconBtn';

import type { Address } from 'types/Address';
import type { HouseType } from 'types/HouseType';
import type { PriceType } from 'types/PriceType';

interface BasicInfoProps {
  area?: number;
  houseType: HouseType;
  floor?: number;
  maintanenceFee?: number;
  address: Address;
}

export default function BasicInfo({
  area,
  houseType,
  floor,
  maintanenceFee,
  address,
}: BasicInfoProps) {
  function pyeongToSquareMeter(pyeong: number) {
    return pyeong * 3.305785;
  }

  return (
    <>
      {/* 기본정보 */}
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
      {/* 위치 */}
      <div>
        <div className={styles.header}>
          <span className={styles.title}>위치</span>
        </div>
        {/* TODO: address의 위치 정보를 이용해 카카오맵 띄우기 */}
        <div className={styles.map}>
          <img src={mapImg} />
        </div>
      </div>
      ;
    </>
  );
}
