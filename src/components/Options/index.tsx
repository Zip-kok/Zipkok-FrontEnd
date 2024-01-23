import React, { useEffect, useState } from 'react';
import styles from './Options.module.css';
import checkImg from '../../assets/img/check/check_selected.svg';

interface OptionsComponentProps {
  optionData: {
    option: string;
    orderNumber: number;
    detailOptions: string[];
  }[];
}

const OptionsComponent: React.FC<OptionsComponentProps> = ({ optionData }) => {
  // 각 체크박스의 상태를 저장하는 상태
  const [checkboxStates, setCheckboxStates] = useState<{
    [key: string]: boolean;
  }>({});

  // 체크박스 초기값 체크로 변경
  useEffect(() => {
    const initialCheckboxStates: { [key: string]: boolean } = {};
    optionData.forEach((check) => {
      check.detailOptions.forEach((_, index) => {
        initialCheckboxStates[`${check.orderNumber}.${index}`] = true;
      });
    });
    setCheckboxStates(initialCheckboxStates);
  }, [optionData]);

  const handleCheckboxChange = (orderNumber: number, index: number) => {
    const key = `${orderNumber}.${index}`;
    setCheckboxStates((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className={styles.root}>
      {optionData.map((check) => (
        <div key={check.orderNumber}>
          <p className={styles.optionTitle}>
            <img src={checkImg} />
            {check.option}
          </p>

          <p className={styles.checkCtn}>
            {check.detailOptions.map((detailCheck, index) => (
              <span key={index}>
                <input
                  type="checkbox"
                  id={`checkBtn${check.orderNumber}.${index}`}
                  className={styles.checkBtn}
                  checked={checkboxStates[`${check.orderNumber}.${index}`]}
                  onChange={() =>
                    handleCheckboxChange(check.orderNumber, index)
                  }
                />
                <label
                  className={styles.checkLabel}
                  htmlFor={`checkBtn${check.orderNumber}.${index}`}
                >
                  <p className={styles.checkText}>{detailCheck}</p>
                </label>
              </span>
            ))}
          </p>
        </div>
      ))}
    </div>
  );
};

export default OptionsComponent;
