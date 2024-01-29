import React from 'react';

import floor from 'assets/img/line(1)/floor.svg';
import link from 'assets/img/line(1)/link.svg';
import money from 'assets/img/line(1)/money.svg';
import size from 'assets/img/line(1)/size.svg';
import structure from 'assets/img/line(1)/structure.svg';
import { IconBtn } from 'components';
import IconText from 'components/IconText';
import data from 'models/kokItemDetail.json';

import styles from '../KokItem.module.css';

const BasicInf = () => {
  const { code, message, result } = data;

  return (
    <>
      <div className={styles.content}>
        <div className={styles.titleCtn}>
          <h4>기본정보</h4>
          <IconBtn
            image={link}
            text="상세보기"
            fontSize="12px"
            fontWeight="400"
          />
        </div>
        <div className={styles.infCtn}>
          <IconText
            img={structure}
            text={data.result.area_size + 'm^2'}
            sizeText={'(' + data.result.pyeongsu + ')평'}
          />
          <IconText img={size} text={data.result.realEstateType} />
          <IconText img={floor} text={data.result.floorNum + '층'} />
          <IconText
            img={money}
            text={'관리비 ' + data.result.administrativeFee + '만원'}
          />
        </div>
        <div className={styles.blank} />
        <h4>위치</h4>
      </div>

      <img className={styles.map} />
      <div className={styles.blank} />
      <div className={styles.blank} />
      <div className={styles.blank} />
    </>
  );
};

export default BasicInf;
