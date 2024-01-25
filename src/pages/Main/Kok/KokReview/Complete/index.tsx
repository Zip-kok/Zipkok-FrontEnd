import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { CompleteAnim, BottomBtn } from 'components';
import useUIStore from 'contexts/uiStore';

import styles from './Complete.module.css';

export default function Complete() {
  const navigate = useNavigate();
  const ui = useUIStore();
  useEffect(() => {
    ui.setUI((state) => ({
      ...state,
      headerIcon: undefined,
      headerBackButtonEnabled: false,
    }));
  }, []);

  return (
    <div className={styles.root}>
      <CompleteAnim
        title="성공적으로 저장했어요!"
        subtitle={'작성한 내용은\n콕리스트에서 확인할 수 있어요'}
      />
      <BottomBtn
        onClick={() => navigate('/kok')}
        text="목록으로 돌아가기"
        occupySpace
      />
    </div>
  );
}
