import React from 'react'

import styles from './KokItem.module.css'
import IconBtn from '../../../../components/IconBtn'
import link from '../../../../assets/img/link.svg'
import structure from '../../../../assets/img/kokItem/structure.svg'
import size from '../../../../assets/img/kokItem/size.svg'
import floor from '../../../../assets/img/kokItem/floor.svg'
import money from '../../../../assets/img/kokItem/money.svg'

import IconText from '../../../../components/IconText'

const BasicInf = () => {
  return (
    <div>
      <div className={styles.body}>
        <div className={styles.titleCtn}>
          <h4>기본정보</h4>
          <IconBtn 
          image={link}
          text="상세보기"
          fontSize='12px'
          fontWeight='400'
          />
        </div>
        <div className={styles.infCtn}>
          <IconText img={structure} text="37.4m"/>
          <IconText img={size} text="투룸"/>
          <IconText img={floor} text="6층"/>
          <IconText img={money} text="관리비 5만원"/>
        </div>
        <div className={styles.blank}/>
        <h4>위치</h4>
      </div>

      <img className={styles.map}/>
      <div className={styles.blank}/>
      <div className={styles.blank}/>
    </div>
  )
}

export default BasicInf;
