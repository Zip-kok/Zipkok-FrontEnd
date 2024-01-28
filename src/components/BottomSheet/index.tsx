import React from 'react';

import styles from './BottomSheet.module.css';

interface BottomSheetProps {
  children: React.ReactNode;
}

export default function BottomSheet({ children }: BottomSheetProps) {
  return <div>{children}</div>;
}
