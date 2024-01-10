import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './KokEdit.module.css';

import NearHome from './NearHome';
import InsideHome from './InsideHome';
import Contract from './Contract';

import Header from '../../../../components/Header';
import TopMenu from '../../../../components/TopMenu';
import Hightlight from '../../../../components/Highlight';

import useNaviStore from '../../../../contexts/naviStore';

type Menu = '집 주변' | '집 내부' | '중개 / 계약';

export const KokEdit = () => {
  const menuOptions = ['집 주변', '집 내부', '중개 / 계약'] as Menu[];

  const pages: Record<Menu, JSX.Element> = {
    '집 주변': <NearHome />,
    '집 내부': <InsideHome />,
    '중개 / 계약': <Contract />,
  };

  const { setNaviMenu } = useNaviStore();
  useEffect(() => {
    setNaviMenu('my');
  }, []);

  const [menu, setMenu] = useState<Menu>('집 주변');

  return (
    <div className={styles.root}>
      <Header
        title="콕리스트 항목 수정하기"
        onBack={() => {}}
        backBtnEnabled
      ></Header>

      <TopMenu
        menus={menuOptions.map((menu) => ({
          name: menu,
          onClick: () => setMenu(menu),
        }))}
        selectedMenu={menu}
        height={48}
      />

      <div className={styles.content}>{pages[menu]}</div>
    </div>
  );
};
