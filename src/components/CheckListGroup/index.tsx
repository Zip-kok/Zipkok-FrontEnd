import React, { useRef } from 'react';
import type { Identifier, XYCoord } from 'dnd-core';
import { useDrag, useDrop } from 'react-dnd';

import styles from './CheckListGroup.module.css';

import onIcon from '../../assets/img/checkList/on.svg';
import offIcon from '../../assets/img/checkList/off.svg';
import dragIcon from '../../assets/img/checkList/drag.svg';

interface CheckListGroupProps {
  index: number;
  name: string;
  enabled: boolean;
  children: React.ReactNode;
  onClick: () => void;
  moveGroup: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  index: number;
  name: string;
  type: string;
}

export default function CheckListGroup({
  index,
  name,
  enabled = true,
  children,
  onClick,
  moveGroup,
}: CheckListGroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: 'CheckList',

    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },

    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveGroup(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'CheckList',

    item: () => {
      return { index };
    },

    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div className={styles.container} ref={ref} data-handler-id={handlerId}>
      <div className={`${styles.header} ${!enabled ? styles.disabled : ''}`}>
        <div className={styles.headerLeft}>
          <button className="imgBtn" onClick={onClick}>
            <img src={enabled ? onIcon : offIcon}></img>
          </button>
          <span>{name}</span>
        </div>
        <div className={styles.drag}>
          <img src={dragIcon}></img>
        </div>
      </div>
      <div className={styles.checkListContainer}>{children}</div>
    </div>
  );
}
