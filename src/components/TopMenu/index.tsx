import React from 'react';

import styles from './TopMenu.module.css';

interface TopMenu {
  name: string;
  onClick: () => void;
}

interface TopMenuProps {
  menus: TopMenu[];
  selectedMenu: string;
  height?: number;
}

const TopMenu = ({ menus, selectedMenu, height = 36 }: TopMenuProps) => {
  return (
    <div className={styles.container} style={{ height: `${height}px` }}>
      {menus.map((menu) => (
        <button
          className={`${styles.menuBtn} ${
            menu.name === selectedMenu && styles.selected
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
