import React from 'react';

import { OptionsComponent, SwiperCom } from 'components';

import styles from './Contract.module.css';

interface ContractProps {
  options: {
    option: string;
    orderNumber: number;
    detailOptions: string[];
  }[];
  pictures: string[];
}

export default function Contract({ options, pictures }: ContractProps) {
  return (
    <>
      {/* 체크리스트 */}
      <div className={styles.optionContainer}>
        <OptionsComponent optionData={options} readOnly={true} />
      </div>

      {/* 계약서 */}
      <div className={styles.header}>
        <span className={styles.title}>계약서 사진</span>
      </div>
      <SwiperCom imageUrls={pictures}></SwiperCom>
    </>
  );
}
