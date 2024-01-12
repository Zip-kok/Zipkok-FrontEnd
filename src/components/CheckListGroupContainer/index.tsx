import React, { forwardRef } from 'react';
import styles from './CheckListGroupContainer.module.css';

interface CheckListGroupContainerProps {
  children: React.ReactNode;
}

const CheckListGroupContainer = forwardRef<
  HTMLDivElement,
  CheckListGroupContainerProps
>((props, ref) => (
  <div className={styles.container} ref={ref}>
    {props.children}
  </div>
));
CheckListGroupContainer.displayName = 'CheckListGroupContainer';

export default CheckListGroupContainer;
