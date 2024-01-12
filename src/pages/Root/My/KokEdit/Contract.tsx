import React from 'react';

import styles from './KokEdit.module.css';

import useCheckList from '../../../../hooks/useCheckList';

const Contract = () => {
  const [checkListContainer, checkList, setCheckList] = useCheckList([
    {
      id: 0,
      name: '집주인/매물 관련 질문체크',
      enabled: true,
      items: [
        {
          name: '집주인이 건물에 함께 상주하나요?',
          enabled: true,
        },
        {
          name: '관리비 포함 여부 항목을 질문했나요?',
          enabled: true,
        },
        {
          name: '새로 벽지 도배가 가능한가요?',
          enabled: true,
        },
        {
          name: '장판 교체가 가능한가요?',
          enabled: true,
        },
        {
          name: '하자있는 부분 보수해주시나요?',
          enabled: true,
        },
        {
          name: '입주 청소 해주시나요?',
          enabled: true,
        },
        {
          name: '반려동물 가능한가요?',
          enabled: true,
        },
      ],
    },
  ]);

  return (
    <div className={styles.root}>
      <div className={styles.checkListGroupContainer}>{checkListContainer}</div>
    </div>
  );
};

export default Contract;
