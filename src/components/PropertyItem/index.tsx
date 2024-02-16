import React from 'react';

import propertyImg_null from 'assets/img/common/propertyImg_null.svg';
import heartFillIcon from 'assets/img/fill/heart_fill.svg';
import heartIcon from 'assets/img/line(2)/heart_white.svg';
import listIcon from 'assets/img/line(2)/list.svg';
import getPriceString from 'utils/getPriceString';

import styles from './PropertyItem.module.css';

interface PropertyItemProps {
  id: number;
  like: boolean;
  type: string;
  priceType: string;
  deposit: number;
  price: number;
  address: string;
  propertyName: string;
  imageUrl: string | null;
  kokList: boolean;
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
                월세: `${getPriceString(deposit)} / ${getPriceString(price)}`,
                전세: `${getPriceString(deposit)}`,
                매매: `${getPriceString(price)}`,
              }[priceType]
            }
          </div>
          <div className={styles.address}>{address}</div>
          <div className={styles.property}>{propertyName}</div>

          <div className={styles.tags}>
            <div className={styles.tag}>{priceType}</div>
            <div className={styles.tag}>{type}</div>
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
