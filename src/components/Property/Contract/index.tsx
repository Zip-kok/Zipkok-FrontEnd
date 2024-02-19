import React from 'react';

import { OptionsComponent, SwiperCom } from 'components';

import styles from './Contract.module.css';

import type { UserKokOption } from 'apis/getUserKokOption';

interface ContractProps {
  options: UserKokOption[];
  setOptions?: React.Dispatch<React.SetStateAction<UserKokOption[]>>;
  pictures: string[];
}

export default function Contract({
  options,
  pictures,
  setOptions,
}: ContractProps) {
  return (
    <>
      {/* 체크리스트 */}
      <div className={styles.optionContainer}>
        <OptionsComponent
          kokOptions={options}
          setKokOptions={setOptions}
          readOnly={true}
        />
      </div>

      {/* 계약서 */}
      <div className={styles.header}>
        <span className={styles.title}>계약서 사진</span>
      </div>
      <SwiperCom imageUrls={pictures}></SwiperCom>
    </>
  );
}
