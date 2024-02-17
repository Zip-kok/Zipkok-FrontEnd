import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getPin, deletePin } from 'apis';
import pinIcon from 'assets/img/line(2)/pin.svg';
import arrowIcon from 'assets/img/line(2)/right_arrow.svg';
import useUIStore from 'contexts/uiStore';

import styles from './Pin.module.css';

import type { PinResult } from 'apis/getPin';
import type { Pin } from 'types/Pin';

export default function Pin() {
  const ui = useUIStore();
  const navigate = useNavigate();
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
      setPins((res.result as PinResult).pinList);
    });
  }, []);

  const handleDeletePin = (pinId: number) => {
    deletePin(pinId).then(() => {
      setPins((prevPins) => prevPins.filter((pin) => pin.id !== pinId));
    });
  };

  const handleEditPin = (pinId: number) => {
    navigate(`./edit/${pinId}`);
  };

  return (
    <div className={styles.root}>
      {/* 새로운 핀 등록하기 버튼 */}
      <button className={styles.newPinBtn} onClick={() => navigate('./write')}>
        <div>
          <img src={pinIcon} />
          <span className={styles.newPinBtnLabel}>새로운 핀 등록하기</span>
        </div>
        <img src={arrowIcon} />
      </button>

      {/* 핀 목록 */}
      <div className={styles.pinContainer}>
        {pins.map((pin) => (
          <div className={styles.pin} key={pin.id}>
            <div>
              <h1>{pin.name}</h1>
              <h2>{pin.address.addressName}</h2>
            </div>
            <div>
              <button onClick={() => handleEditPin(pin.id)}>수정</button>
              <button onClick={() => handleDeletePin(pin.id)}>삭제</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
