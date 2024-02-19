import React, { useEffect, useState } from 'react';

import styles from './Options.module.css';
import checkImg from '../../assets/img/check/check_selected.svg';

import type { UserKokOption } from 'apis/getUserKokOption';

interface OptionsComponentProps {
  kokOptions: UserKokOption[];
  setKokOptions?: React.Dispatch<React.SetStateAction<UserKokOption[]>>;
  readOnly?: boolean;
  initialValue?: boolean;
}

const OptionsComponent: React.FC<OptionsComponentProps> = ({
  kokOptions,
  setKokOptions,
  readOnly,
  initialValue,
}) => {
  return (
    <div className={styles.root}>
      {kokOptions.map((option, index) => (
        <div key={option.optionId}>
          <div className={styles.optionTitle}>
            <img src={checkImg} />
            {option.optionTitle}
          </div>

          <div className={styles.checkCtn}>
            {option.detailOptions.map((detailOption, detailIndex) => (
              <div key={detailOption.detailOptionId}>
                <input
                  type="checkbox"
                  className={styles.detailCheckBtn}
                  checked={
                    initialValue ? true : detailOption.detailOptionIsVisible
                  }
                  onChange={() => {
                    if (readOnly) return false;
                    setKokOptions?.((prevState) => {
                      const newOptions = [...prevState];
                      newOptions[index].detailOptions[
                        detailIndex
                      ].detailOptionIsVisible =
                        !detailOption.detailOptionIsVisible;

                      return newOptions;
                    });
                  }}
                  readOnly={readOnly}
                  id={`detail.${detailOption.detailOptionId}`}
                />
                <label
                  className={styles.checkLabel}
                  htmlFor={`detail.${detailOption.detailOptionId}`}
                >
                  <p className={styles.checkText}>
                    {detailOption.detailOptionTitle}
                  </p>
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OptionsComponent;
