import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Complete.module.css';

import CompleteAnim from '../../../components/CompleteAnim';
import BottomBtn from '../../../components/BottomBtn';

export default function Complete() {
  const navigate = useNavigate();

  return (
    <div className={styles.root}>
      <CompleteAnim
        title="프로필 설정을 완료했어요!"
        subtitle={'키워드 설정 후\n더 빠르게 매물을 검색해보세요'}
      />
      <BottomBtn
        onClick={() => navigate('/onboarding')}
        text="키워드 설정하러 가기"
        onAnchorClick={() => navigate('/')}
        anchorText="나중에 설정하기"
      />
    </div>
  );
}
