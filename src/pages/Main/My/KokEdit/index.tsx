import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getUserKokOption, putUserKokOption } from 'apis';
import { BottomBtn } from 'components';
import useUIStore from 'contexts/uiStore';
import useMenu from 'hooks/useMenu';

import Contract from './components/Contract';
import Inner from './components/Inner';
import Outer from './components/Outer';
import styles from './KokEdit.module.css';

import type { UserKokOption } from 'apis/getUserKokOption';
import type { KokOption } from 'types/KokOption';

const KokEdit = () => {
  const ui = useUIStore();
  const navigate = useNavigate();

  const [showMessage, setShowMessage] = useState(false);
  const [highlights, setHighlights] = useState<string[]>([]);
  const [outerOptions, setOuterOptions] = useState<KokOption[]>([]);
  const [innerOptions, setInnerOptions] = useState<KokOption[]>([]);
  const [contractOptions, setContractOptions] = useState<KokOption[]>([]);

  useEffect(() => {
    ui.setUI((state) => ({
      ...state,
      headerTitle: '콕리스트 항목 수정하기',
      headerIcon: undefined,
      headerBackButtonEnabled: true,
      naviEnabled: false,
    }));

    // api 함수로부터 받은 데이터를 컴포넌트에서 사용할 수 있는 형태로 변환하는 함수
    function convertRawOptions(rawOptions: UserKokOption[]) {
      return rawOptions.map((option) => ({
        ...option,
        optionId: undefined,
        id: option.optionId,
      }));
    }

    // api 함수 호출 및 상태에 저장
    getUserKokOption().then((res) => {
      setHighlights(res.result.highlights);
      const rawOuterOptions = res.result.outerOptions;
      const rawInsideOptions = res.result.innerOptions;
      const rawContractOptions = res.result.contractOptions;

      setOuterOptions(convertRawOptions(rawOuterOptions));
      setInnerOptions(convertRawOptions(rawInsideOptions));
      setContractOptions(convertRawOptions(rawContractOptions));
    });
  }, []);

  // 상단 메뉴 설정
  const [TopMenu, , , contentElement] = useMenu([
    {
      name: '집 주변',
      element: (
        <Outer
          highlights={highlights}
          options={outerOptions}
          setOptions={setOuterOptions}
        />
      ),
    },

    {
      name: '집 내부',
      element: <Inner options={innerOptions} setOptions={setInnerOptions} />,
    },

    {
      name: '중개 / 계약',
      element: (
        <Contract options={contractOptions} setOptions={setContractOptions} />
      ),
    },
  ]);

  // 저장하기 버튼 클릭 시
  const handleSave = () => {
    putUserKokOption({
      highlights,
      outerOptions: outerOptions.map((option) => ({
        ...option,
        optionId: option.id,
      })),
      innerOptions: innerOptions.map((option) => ({
        ...option,
        optionId: option.id,
      })),
      contractOptions: contractOptions.map((option) => ({
        ...option,
        optionId: option.id,
      })),
    }).then(() => {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    });
  };

  return (
    <div className={styles.root}>
      {/* 상단 메뉴 */}
      <div className={styles.menu}>
        <TopMenu />
      </div>

      {/* 콘텐츠 */}
      <div className={styles.content}>{contentElement}</div>

      {/* 하단 */}
      {showMessage && (
        <div className={styles.message}>리스트가 저장되었어요.</div>
      )}
      <BottomBtn text="저장하기" onClick={handleSave} />
    </div>
  );
};

export default KokEdit;
