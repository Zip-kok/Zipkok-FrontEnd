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
      <div>
        <OptionsComponent optionData={options} readOnly={true} />
        <div>
          <h4>계약서 사진</h4>
        </div>
      </div>
      <SwiperCom imageUrls={pictures}></SwiperCom>
    </>
  );
}
