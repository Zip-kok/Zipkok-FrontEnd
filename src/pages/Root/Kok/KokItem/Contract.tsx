import React from 'react'
import styles from './KokItem.module.css'
import data from '../../../../models/kokItemContract.json'
import OptionsComponent from '../../../../components/Options';

const Contract = () => {

  const {options,imageInfo} = data.result;

  return (
    <div>
      <div className={styles.body}>
        <OptionsComponent optionData={options} />
        <div className={styles.ContractCtn}>
          <h4>계약서 사진</h4>
          <img src={imageInfo.imageUrls[0]} />
        </div>
      </div>
      <div className={styles.blank}/>
      <div className={styles.blank}/>
    </div>
  )
}

export default Contract;