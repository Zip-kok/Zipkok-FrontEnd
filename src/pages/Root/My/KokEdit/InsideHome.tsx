import React from 'react';

import styles from './KokEdit.module.css';

import useCheckList from 'hooks/useCheckList';

const InsideHome = () => {
  const [CheckListContainer, checkList, setCheckList] = useCheckList([
    {
      id: 0,
      name: '현관 / 보안',
      enabled: true,
      items: [
        {
          name: '별도의 현관문 잠금장치가 있나요?',
          enabled: true,
        },
        {
          name: '외부를 볼 수 있는 인터폰이 있나요?',
          enabled: true,
        },
        {
          name: '공간을 분리하는 현관 문턱이 있나요?',
          enabled: true,
        },
        {
          name: '로비/복도에 CCTV가 있나요?',
          enabled: true,
        },
      ],
    },
    {
      id: 1,
      name: '부엌',
      enabled: true,
      items: [
        {
          name: '싱크대 수압이 충분한가요?',
          enabled: true,
        },
        {
          name: '화구(ex, 가스레인지)의 화력이 충분한가요?',
          enabled: true,
        },
        {
          name: '냉장고의 크기가 충분한가요?',
          enabled: true,
        },
        {
          name: '싱크대 크기가 충분한가요?',
          enabled: true,
        },
        {
          name: '물을 틀었을 때 싱크대 아래의 물이 새나요?',
          enabled: true,
        },
        {
          name: '싱크대 아래에 곰팡이 흔적이 있나요?',
          enabled: true,
        },
        {
          name: '수납장/냉장고 뒤에 바퀴벌레 약이 있나요?',
          enabled: true,
        },
        {
          name: '주방 후드는 청결한가요?',
          enabled: false,
        },
      ],
    },
  ]);

  return (
    <div className={styles.root}>
      <div className={styles.checkListGroupContainer}>
        <CheckListContainer />
      </div>
    </div>
  );
};

export default InsideHome;
