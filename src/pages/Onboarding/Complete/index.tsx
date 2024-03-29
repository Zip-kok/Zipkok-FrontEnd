import React from 'react';
import { useNavigate } from 'react-router-dom';

import { CompleteAnim, BottomBtn } from 'components';

import styles from './Complete.module.css';

export default function Complete() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };

  return (
    <div className={styles.root}>
      <CompleteAnim
        title="키워드 설정을 완료했어요!"
        subtitle={'선택한 내용은\n마이페이지에서 수정 가능해요'}
      />
      <BottomBtn onClick={handleClick} text="홈으로 돌아가기" />
    </div>
  );
}
