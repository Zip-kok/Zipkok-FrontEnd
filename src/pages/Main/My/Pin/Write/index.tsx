import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getPin, patchPin, postPin } from 'apis';
import useUIStore from 'contexts/uiStore';

import styles from './Write.module.css';

import type { Pin } from 'types/Pin';

export default function Write() {
  const ui = useUIStore();
  const pinId = useParams<{ pinId: string }>().pinId;
  const [pin, setPin] = useState<Pin>();

  useEffect(() => {
    ui.setUI((state) => ({
      ...state,
      headerTitle: pinId !== undefined ? '핀 수정하기' : '핀 등록하기',
      headerIcon: undefined,
      headerBackButtonEnabled: true,
      naviEnabled: false,
    }));

    if (pinId !== undefined) {
      getPin(parseInt(pinId)).then((res) => {
        setPin(res.result as Pin);
      });
    }
  }, []);

  return <div className={styles.root}></div>;
}
