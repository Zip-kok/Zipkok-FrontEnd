import React from "react";
import styles from "./PropertyItem.module.css";

import heartIcon from "assets/img/kokList/white-heart.svg";
import listIcon from "assets/img/kokList/list.svg";
import propertyImg_null from "assets/img/kokList/propertyImg_null.svg";
import heartFillIcon from "assets/img/kokList/heart_fill.svg";

interface PropertyItemProps {
  id: number;
  like: boolean;
  type: string;
  priceType: string;
  price: number;
  maintenanceFee: number | null;
  address: string;
  propertyName: string;
  imageUrl: string | null;
  kokList: boolean;
}
export default function PropertyItem({
  id,
  like,
  type,
  priceType,
  price,
  maintenanceFee,
  address,
  propertyName,
  imageUrl,
  kokList,
}: PropertyItemProps) {
  return (
    <div className={styles.root}>
      <div className={styles.item}>
        <div
          style={{
            position: "relative",
            justifyContent: "center",
            alignContent: "center",
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
            {priceType === "월세"
              ? `${price.toLocaleString()} / ${maintenanceFee?.toLocaleString()}`
              : `${price.toLocaleString()}`}
          </div>
          <div className={styles.address}>{address}</div>
          <div className={styles.property}>{propertyName}</div>

          <div className={styles.tags}>
            <div className={styles.tag}>{priceType}</div>
            <div className={styles.tag}>{type}</div>
          </div>
        </div>

        {kokList && (
          <span className={styles.listBtn}>
            <img src={listIcon} alt="listIcon" />
          </span>
        )}
      </div>
    </div>
  );
}
