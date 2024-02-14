import React, { useEffect, useState } from 'react';

import { getPin, patchPin, postPin } from 'apis';
import pinIcon from 'assets/img/line(2)/pin.svg';
import arrowIcon from 'assets/img/line(2)/right_arrow.svg';
import useUIStore from 'contexts/uiStore';

import styles from './Pin.module.css';

import type { Pin } from 'types/Pin';

export default function Pin() {
  const ui = useUIStore();
  const [pins, setPins] = useState<Pin[]>([]);

  useEffect(() => {
    ui.setUI((state) => ({
      ...state,
      headerTitle: '나의 핀 관리',
      headerIcon: undefined,
      headerBackButtonEnabled: true,
      naviEnabled: false,
    }));

    getPin().then((res) => {
      setPins(res.result);
    });
  }, []);

  return (
    <div className={styles.root}>
      {/* 새로운 핀 등록하기 버튼 */}
      <button className={styles.newPinBtn}>
        <div>
          <img src={pinIcon} />
          <span className={styles.newPinBtnLabel}>새로운 핀 등록하기</span>
        </div>
        <img src={arrowIcon} />
      </button>

      {/* 핀 목록 */}
      <div className={styles.pinContainer}>
        {pins.map((pin) => (
          <div className={styles.pin}>
            <div>
              <h1>{pin.name}</h1>
              <h2>{pin.address.address_name}</h2>
            </div>
            <div>
              <button>수정</button>
              <button>삭제</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
