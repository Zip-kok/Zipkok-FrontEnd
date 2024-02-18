import React from 'react';

import propertyImg_null from 'assets/img/common/propertyImg_null.svg';
import heartFillIcon from 'assets/img/fill/heart_fill.svg';
import heartIcon from 'assets/img/line(2)/heart_white.svg';
import listIcon from 'assets/img/line(2)/list.svg';
import { HouseType } from 'types/HouseType';
import convertHouseTypeToString from 'utils/convertHouseTypeToString';
import convertPriceTypeToString from 'utils/convertPriceTypeToString';
import getPriceString from 'utils/getPriceString';

import styles from './PropertyItem.module.css';

import type { PriceType } from 'types/PriceType';

interface PropertyItemProps {
  id: number;
  like: boolean;
  type: string;
  priceType: PriceType;
  deposit: number;
  price: number;
  address: string;
  propertyName: string;
  imageUrl: string | null;
  kokList?: boolean;
  onClick?: (propertyId: number) => void;
}
export default function PropertyItem({
  id,
  like,
  type,
  priceType,
  deposit,
  price,
  address,
  propertyName,
  imageUrl,
  kokList,
  onClick,
}: PropertyItemProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };
  return (
    <div className={styles.root} onClick={handleClick}>
      <div className={styles.item}>
        <div
          style={{
            position: 'relative',
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          {/* 이미지 유무 */}
          <img
            src={imageUrl ? imageUrl : propertyImg_null}
            alt="Property Image"
            className={styles.propertyImg}
          />
          <button className={styles.heartBtn}>
            <img src={like ? heartFillIcon : heartIcon} alt="Heart Icon" />
          </button>
        </div>

        {/* 매물에 대한 상세 내용 */}
        <div className={styles.detail}>
          <div className={styles.price}>
            {
              {
                MONTHLY: `${getPriceString(deposit * 10000)} / ${getPriceString(
                  price * 10000,
                )}`,
                YEARLY: `${getPriceString(deposit * 10000)}`,
                PURCHASE: `${getPriceString(price * 10000)}`,
              }[priceType]
            }
          </div>
          <div className={styles.address}>{address}</div>
          <div className={styles.property}>{propertyName}</div>

          <div className={styles.tags}>
            <div className={styles.tag}>
              {convertPriceTypeToString(priceType)}
            </div>
            <div className={styles.tag}>
              {convertHouseTypeToString(type as HouseType)}
            </div>
          </div>
        </div>

        {kokList && (
          <div className={styles.listBtn}>
            <img src={listIcon} alt="listIcon" />
          </div>
        )}
      </div>
    </div>
  );
}
