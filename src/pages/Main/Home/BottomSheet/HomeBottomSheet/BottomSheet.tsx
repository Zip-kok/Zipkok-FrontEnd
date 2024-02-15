import React, { FC } from 'react';

import { motion } from 'framer-motion';
import styled from 'styled-components';

import BottomSheetHeader from './BottomSheetHeader';
import { BOTTOM_SHEET_HEIGHT } from './BottomSheetOption';
import Content from './Content';
import { useBottomSheet } from './useBottomSheet';
import { realEstateInfo } from '../../KakaoMap';
import styles from '../BottomSheet.module.css';

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: calc(100% - 139px);
  left: 0;
  right: 0;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;

  height: ${BOTTOM_SHEET_HEIGHT}px;
  /* 움직임 효과 */
  transition: transform 150ms ease-out;
`;

const BottomSheetContent = styled.div`
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  background-color: white;
`;

interface BottomSheetProps {
  realEstateInfoList?: realEstateInfo[];
}
const BottomSheet = ({ realEstateInfoList }: BottomSheetProps) => {
  const { sheet, content, toggleSheet } = useBottomSheet();

  return (
    <Wrapper ref={sheet}>
      <div className={styles.listBtnWrapper}>
        <button className={styles.listBtn} onClick={toggleSheet}>
          목록보기
        </button>
      </div>
      <BottomSheetHeader />
      <BottomSheetContent ref={content}>
        <Content realEstateInfoList={realEstateInfoList} />
      </BottomSheetContent>
    </Wrapper>
  );
};

export default BottomSheet;
