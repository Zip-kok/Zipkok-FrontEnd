import React from 'react';

import uncheckImg from 'assets/img/check/check_default.svg';
import checkImg from 'assets/img/check/check_selected.svg';

import styles from './Options.module.css';

import type { UserKokOption } from 'apis/getUserKokOption';

interface OptionsComponentProps {
  kokOptions: UserKokOption[];
  setKokOptions?: React.Dispatch<React.SetStateAction<UserKokOption[]>>;
  readOnly?: boolean;
}

const OptionsComponent: React.FC<OptionsComponentProps> = ({
  kokOptions,
  setKokOptions,
  readOnly,
}) => {
  return (
    <div className={styles.root}>
      {kokOptions.map((option) => (
        <div key={option.optionId}>
          <div className={styles.optionTitle}>
            <button
              className="imgBtn"
              onClick={() => {
                if (readOnly) return;

                setKokOptions?.((prevState) => {
                  const newOptions = [...prevState];
                  const index = newOptions.findIndex(
                    (e) => e.optionId === option.optionId,
                  );

                  newOptions[index].isVisible = !option.isVisible;
                  newOptions[index].detailOptions.forEach(
                    (e) => (e.detailOptionIsVisible = option.isVisible),
                  );

                  return newOptions;
                });
              }}
            >
              <img src={option.isVisible ? checkImg : uncheckImg} />
            </button>
            {option.optionTitle}
          </div>

          <div className={styles.checkCtn}>
            {option.detailOptions.map((detailOption) => (
              <div key={detailOption.detailOptionId}>
                <input
                  type="checkbox"
                  className={styles.detailCheckBtn}
                  checked={detailOption.detailOptionIsVisible}
                  onChange={(e) => {
                    if (readOnly) return;

                    setKokOptions?.((prevState) => {
                      const newOptions = [...prevState];

                      const parentIndex = newOptions.findIndex(
                        (e) => e.optionId === option.optionId,
                      );
                      const detailIndex = newOptions[
                        parentIndex
                      ].detailOptions.findIndex(
                        (e) => e.detailOptionId === detailOption.detailOptionId,
                      );

                      newOptions[parentIndex].detailOptions[
                        detailIndex
                      ].detailOptionIsVisible = e.target.checked;
                      newOptions[parentIndex].isVisible = newOptions[
                        parentIndex
                      ].detailOptions.some((e) => e.detailOptionIsVisible);

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
