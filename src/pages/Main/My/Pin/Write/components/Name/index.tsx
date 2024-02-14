import React, { useState } from 'react';

import { TextInput, BottomBtn } from 'components';

import styles from './Name.module.css';

import type { Pin } from 'types/Pin';

type PinWithoutId = Omit<Pin, 'id'>;

interface NameProps {
  pin: PinWithoutId;
  confirm: (name: string, detailAddress: string) => void;
}

export default function Name({ pin, confirm }: NameProps) {
  const [detailAddress, setDetailAddress] = useState('');
  const [name, setName] = useState(pin.name);

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div>
          <h1 className={styles.address}>{pin.address.address_name}</h1>
          <TextInput
            placeholder="상세 주소 (선택)"
            value={detailAddress}
            onChange={(e) => setDetailAddress(e.currentTarget.value)}
            style="roundedBox"
          />
        </div>
        <TextInput
          placeholder="핀의 별명을 입력해주세요. (최대 12자)"
          maxLength={12}
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          style="roundedBox"
        />
      </div>
      <BottomBtn
        disabled={!name}
        text="핀 등록하기"
        onClick={() => {
          if (name) {
            confirm(name, detailAddress);
          }
        }}
      />
    </div>
  );
}
