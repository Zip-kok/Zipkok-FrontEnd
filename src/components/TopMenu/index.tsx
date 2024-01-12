import React from 'react';

import styles from './TopMenu.module.css';

export interface Menu {
  name: string;
  onClick: () => void;
}

interface TopMenuProps {
  menus: Menu[];
  selectedIndex: number;
  height?: number;
}

const TopMenu = ({ menus, selectedIndex, height = 36 }: TopMenuProps) => {
  return (
    <div className={styles.container} style={{ height: `${height}px` }}>
      {menus.map((menu, index) => (
        <button
          className={`${styles.menuBtn} ${
            index === selectedIndex && styles.selected
          }`}
          onClick={menu.onClick}
          key={menu.name}
        >
          {menu.name}
        </button>
      ))}
    </div>
  );
};

export default TopMenu;
