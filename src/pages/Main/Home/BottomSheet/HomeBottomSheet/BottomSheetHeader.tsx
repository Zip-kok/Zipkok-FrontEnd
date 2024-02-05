import React, { FC } from 'react';

import handleImg from 'assets/img/common/handle.svg';
import { motion } from 'framer-motion';
import styled from 'styled-components';

import { BOTTOM_SHEET_HEIGHT } from './BottomSheetOption';
import styles from '../BottomSheet.module.css';

const Wrapper = styled.div`
  display: flex;
  height: 16px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;

  position: relative;
  padding: 4px 0;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const Handle = styled.div`
  width: 40px;
  height: 4px;
  border-radius: 2px;
  background-color: #4b5259;
  margin: auto;
`;

const BottomSheetHeader = () => {
  return (
    <Wrapper>
      <Handle />
    </Wrapper>
  );
};

export default BottomSheetHeader;
