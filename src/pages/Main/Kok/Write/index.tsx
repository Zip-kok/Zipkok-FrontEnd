import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getKokConfig, postKok, putKok } from 'apis';
import { BottomBtn } from 'components';
import useUIStore from 'contexts/uiStore';
import useMenu from 'hooks/useMenu';

import Contract from './Contract';
import InsideHome from './InsideHome';
import NearHome from './NearHome';
import styles from './WriteKok.module.css';

import type { KokConfigResult } from 'apis/getKokConfig';
import type { UserKokOption } from 'apis/getUserKokOption';

export default function WriteKok() {
  // kokId가 undefined이면 realEstateId에 해당하는 매물의 새로운 콕리스트 등록
  // kokId가 있으면 해당 콕리스트 수정
  const realEstateId = new URLSearchParams(location.search).get('realEstateId');
  const kokId = new URLSearchParams(location.search).get('kokId');
  const ui = useUIStore();

  const [kokConfig, setKokConfig] = useState<KokConfigResult>();

  const [outerOptions, setOuterOptions] = useState<UserKokOption[]>([]);
  const [innerOptions, setInnerOptions] = useState<UserKokOption[]>([]);
  const [contractOptions, setContractOptions] = useState<UserKokOption[]>([]);

  useEffect(() => console.log(outerOptions), [outerOptions]);

  const setHighlights = (
    highlights: string[] | ((prevState: string[]) => string[]),
  ) =>
    setKokConfig((prev) =>
      prev
        ? {
            ...prev,
            checkedHilights:
              typeof highlights === 'function'
                ? highlights(prev.checkedHilights ?? [])
                : highlights,
          }
        : undefined,
    );

  const setFurnitures = (
    furnitures: string[] | ((prevState: string[]) => string[]),
  ) =>
    setKokConfig((prev) =>
      prev
        ? {
            ...prev,
            checkedFurnitureOptions:
              typeof furnitures === 'function'
                ? furnitures(prev.checkedFurnitureOptions ?? [])
                : furnitures,
          }
        : undefined,
    );

  useEffect(() => {
    ui.setUI({
      naviEnabled: false,
      headerEnabled: true,
      headerTitle: '콕리스트 작성',
      headerBackButtonEnabled: true,
      headerRightButtons: [],
      path: 'kok',
    });
  }, []);

  useEffect(() => {
    if (realEstateId === null) return;
    getKokConfig().then((res) => {
      setKokConfig(res.result);
      setOuterOptions(res.result.outerOptions);
      setInnerOptions(res.result.innerOptions);
      setContractOptions(res.result.contractOptions);
    });
  }, [realEstateId]);

  useEffect(() => {
    if (kokId === null) return;
    getKokConfig(parseInt(kokId)).then((res) => {
      setKokConfig(res.result);
      setOuterOptions(res.result.outerOptions);
      setInnerOptions(res.result.innerOptions);
      setContractOptions(res.result.contractOptions);
    });
  }, [kokId]);

  // 상단 메뉴 설정
  const [TopMenu, , , content] = useMenu([
    {
      name: '집 주변',
      element: (
        <NearHome
          pictures={kokConfig?.outerImageUrls ?? []}
          setPictures={(
            pictures: string[] | ((prevState: string[]) => string[]),
          ) =>
            setKokConfig((prev) =>
              prev
                ? {
                    ...prev,
                    outerImageUrls:
                      typeof pictures === 'function'
                        ? pictures(prev.outerImageUrls ?? [])
                        : pictures,
                  }
                : undefined,
            )
          }
          highlights={kokConfig?.hilights || []}
          checkedHighlights={kokConfig?.checkedHilights || []}
          setCheckedHighlights={setHighlights}
          options={kokConfig?.outerOptions || []}
          setOptions={setOuterOptions}
        />
      ),
    },

    {
      name: '집 내부',
      element: (
        <InsideHome
          pictures={kokConfig?.innerImageUrls ?? []}
          setPictures={(
            pictures: string[] | ((prevState: string[]) => string[]),
          ) =>
            setKokConfig((prev) =>
              prev
                ? {
                    ...prev,
                    innerImageUrls:
                      typeof pictures === 'function'
                        ? pictures(prev.innerImageUrls ?? [])
                        : pictures,
                  }
                : undefined,
            )
          }
          furnitures={kokConfig?.furnitureOptions || []}
          checkedFurnitures={kokConfig?.checkedFurnitureOptions || []}
          setCheckedFurnitures={setFurnitures}
          options={kokConfig?.innerOptions || []}
          setOptions={setInnerOptions}
        />
      ),
    },

    {
      name: '중개 / 계약',
      element: (
        <Contract
          pictures={kokConfig?.contractImageUrls ?? []}
          setPictures={(
            pictures: string[] | ((prevState: string[]) => string[]),
          ) =>
            setKokConfig((prev) =>
              prev
                ? {
                    ...prev,
                    contractImageUrls:
                      typeof pictures === 'function'
                        ? pictures(prev.contractImageUrls ?? [])
                        : pictures,
                  }
                : undefined,
            )
          }
          options={kokConfig?.contractOptions || []}
          setOptions={setContractOptions}
        />
      ),
    },
  ]);

  const navigate = useNavigate();

  const handleSave = () => {
    navigate(
      `/kok/review?kokId=${kokId ?? ''}&realEstateId=${realEstateId ?? ''}`,
      {
        state: {
          kokConfig: {
            ...kokConfig,
            outerOptions,
            innerOptions,
            contractOptions,
          },
        },
      },
    );
  };

  return (
    <div className={styles.root}>
      <TopMenu className={styles.top} />
      <div className={styles.content}>{content}</div>
      <BottomBtn text="저장하기" onClick={handleSave} />
    </div>
  );
}
