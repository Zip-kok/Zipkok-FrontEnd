import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getUserKokOption } from 'apis';
import { BottomBtn } from 'components';
import useUIStore from 'contexts/uiStore';
import useMenu from 'hooks/useMenu';

import Contract from './components/Contract';
import InsideHome from './components/InsideHome';
import NearHome from './components/NearHome';
import styles from './KokEdit.module.css';

import type { Option } from 'apis/getUserKokOption';

const KokEdit = () => {
  const ui = useUIStore();
  const [highlights, setHighlights] = useState<string[]>([]);
  const [outerOptions, setOuterOptions] = useState<Option[]>([]);
  const [insideOptions, setInsideOptions] = useState<Option[]>([]);
  const [contractOptions, setContractOptions] = useState<Option[]>([]);

  useEffect(() => {
    ui.setUI((state) => ({
      ...state,
      headerTitle: '콕리스트 항목 수정하기',
      headerIcon: undefined,
      headerBackButtonEnabled: true,
      naviEnabled: false,
    }));

    getUserKokOption().then((res) => {
      setHighlights(res.result.highlights);
      setOuterOptions(res.result.outerOptions);
      setInsideOptions(res.result.innerOptions);
      setContractOptions(res.result.contractOptions);
    });
  }, []);

  const navigate = useNavigate();

  // 상단 메뉴 설정
  const [TopMenu, Content, menuIndex] = useMenu([
    {
      name: '집 주변',
      element: (
        <NearHome
          highlights={highlights}
          options={outerOptions}
          setOptions={setOuterOptions}
        />
      ),
    },

    {
      name: '집 내부',
      element: <InsideHome />,
    },

    {
      name: '중개 / 계약',
      element: <Contract />,
    },
  ]);

  return (
    <div className={styles.root}>
      <div className={styles.menu}>
        <TopMenu />
      </div>
      <div className={styles.content}>
        <Content />
      </div>
      <BottomBtn text="저장하기" onClick={() => {}} />
    </div>
  );
};

export default KokEdit;
