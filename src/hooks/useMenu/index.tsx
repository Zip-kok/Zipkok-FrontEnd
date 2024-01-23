import React, { useState, useCallback } from 'react';

import TopMenu from '../../components/TopMenu';

export interface Menu {
  name: string;
  element: React.ReactNode;
}

export default function useMenu(
  menus: Menu[],
  height = 48,
  defaultMenuIndex = 0,
) {
  console.assert(menus.length > 0, 'menus should not be empty');
  console.assert(defaultMenuIndex < menus.length, 'defaultMenuIndex invalid');

  const [index, setIndex] = useState(defaultMenuIndex);

  interface TopMenuProps {
    className?: string;
  }

  const menuCallback = useCallback(
    ({ className }: TopMenuProps) => (
      <TopMenu
        menus={menus.map((menu, index) => ({
          name: menu.name,
          onClick: () => setIndex(index),
        }))}
        selectedIndex={index}
        height={height}
        className={className}
      />
    ),
    [index],
  );

  const contentCallback = useCallback(
    () => <>{menus[index].element}</>,
    [index],
  );

  return [menuCallback, contentCallback, index] as [
    typeof menuCallback,
    typeof contentCallback,
    number,
  ];
}
