import React, { useState } from 'react'

import styles from "./Price.module.css"

interface PriceProps{
  confirmPrice: (Price: string) => void ;
}

export default function Price( {confirmPrice} : PriceProps) {
  const [price, setPrice] = useState("");

  function handleConfirmClick() {
    confirmPrice(price);
}

  return (
    <div className={styles.root}>
        <div className={styles.header}>
            <h1>
              거래 유형에 따른<br></br>가격 범위를 설정해주세요
            </h1>
        </div>
        <div className={styles.price}>
            <button>월세</button>
            <button>전세</button>
            <button>매매</button>
        </div>
        <div className={styles.footer}>
          <a>나중에 설정하기</a>
          <button className="btnBottom" disabled={price === ""} 
            onClick={handleConfirmClick}>
              확인
          </button>
        </div>
    </div>
  )
}