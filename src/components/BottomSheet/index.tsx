import React from 'react';

import styles from './BottomSheet.module.css';
import BottomSheetHeader from './BottomSheetHeader';

interface BottomSheetProps {
  children: React.ReactNode;
}

export default function BottomSheet({ children }: BottomSheetProps) {
  return (
    <div className={styles.container}>
      {/* 바텀시트 손잡아 */}
      <BottomSheetHeader />

      {/* 바텀시트 content */}
      <div> {children}</div>
    </div>
  );
}
