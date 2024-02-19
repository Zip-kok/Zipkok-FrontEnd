import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getKokConfig, postKok, putKok } from 'apis';
import { BottomBtn } from 'components';
import useModal from 'contexts/modalStore';
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
  const modal = useModal();

  const [kokConfig, setKokConfig] = useState<KokConfigResult>();
  const [pictures, setPictures] = useState<{
    outer: string[];
    inner: string[];
    contract: string[];
  }>({
    outer: [],
    inner: [],
    contract: [],
  });

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
    });
  }, [realEstateId]);

  useEffect(() => {
    if (kokId === null) return;
    getKokConfig(parseInt(kokId)).then((res) => {
      setKokConfig(res.result);
    });
  }, [kokId]);

  // 상단 메뉴 설정
  const [TopMenu, , , content] = useMenu([
    {
      name: '집 주변',
      element: (
        <NearHome
          pictures={pictures.outer}
          setPictures={(
            pictures: string[] | ((prevState: string[]) => string[]),
          ) =>
            setPictures((prev) => ({
              ...prev,
              outer:
                typeof pictures === 'function'
                  ? pictures(prev.outer)
                  : pictures,
            }))
          }
          highlights={kokConfig?.hilights || []}
          checkedHighlights={kokConfig?.checkedHilights || []}
          setCheckedHighlights={setHighlights}
          options={kokConfig?.outerOptions || []}
          setOptions={(
            options:
              | UserKokOption[]
              | ((prevState: UserKokOption[]) => UserKokOption[]),
          ) =>
            setKokConfig((prev) =>
              prev
                ? {
                    ...prev,
                    outerOptions:
                      typeof options === 'function'
                        ? options(prev.outerOptions)
                        : options,
                  }
                : undefined,
            )
          }
        />
      ),
    },

    {
      name: '집 내부',
      element: (
        <InsideHome
          pictures={pictures.inner}
          setPictures={(
            pictures: string[] | ((prevState: string[]) => string[]),
          ) =>
            setPictures((prev) => ({
              ...prev,
              inner:
                typeof pictures === 'function'
                  ? pictures(prev.inner)
                  : pictures,
            }))
          }
          furnitures={kokConfig?.furnitureOptions || []}
          checkedFurnitures={kokConfig?.checkedFurnitureOptions || []}
          setCheckedFurnitures={setFurnitures}
          options={kokConfig?.innerOptions || []}
          setOptions={(
            options:
              | UserKokOption[]
              | ((prevState: UserKokOption[]) => UserKokOption[]),
          ) =>
            setKokConfig((prev) =>
              prev
                ? {
                    ...prev,
                    innerOptions:
                      typeof options === 'function'
                        ? options(prev.innerOptions)
                        : options,
                  }
                : undefined,
            )
          }
        />
      ),
    },

    {
      name: '중개 / 계약',
      element: (
        <Contract
          pictures={pictures.contract}
          setPictures={(
            pictures: string[] | ((prevState: string[]) => string[]),
          ) =>
            setPictures((prev) => ({
              ...prev,
              contract:
                typeof pictures === 'function'
                  ? pictures(prev.contract)
                  : pictures,
            }))
          }
          options={kokConfig?.outerOptions || []}
          setOptions={(
            options:
              | UserKokOption[]
              | ((prevState: UserKokOption[]) => UserKokOption[]),
          ) =>
            setKokConfig((prev) =>
              prev
                ? {
                    ...prev,
                    outerOptions:
                      typeof options === 'function'
                        ? options(prev.outerOptions)
                        : options,
                  }
                : undefined,
            )
          }
        />
      ),
    },
  ]);

  const navigate = useNavigate();

  const handleSave = async () => {
    if (kokConfig === undefined) return;

    const getFile = async (url: string, prefix: string) =>
      new File(
        [await (await fetch(url)).blob()],
        `${prefix}${Math.random().toString(36).substring(2, 12)}.jpg`,
        {
          type: 'image/jpeg',
        },
      );

    const pictureData = await Promise.all([
      ...pictures.outer.map((url) => getFile(url, 'OUTTER')),
      ...pictures.inner.map((url) => getFile(url, 'INNER')),
      ...pictures.contract.map((url) => getFile(url, 'CONTRACT')),
    ]);

    const outerOptions = kokConfig.outerOptions.map((option) => ({
      optionId: option.optionId,
      checkedDetailOptionIds: option.detailOptions.map(
        (detail) => detail.detailOptionId,
      ),
    }));
    const innerOptions = kokConfig.innerOptions.map((option) => ({
      optionId: option.optionId,
      checkedDetailOptionIds: option.detailOptions.map(
        (detail) => detail.detailOptionId,
      ),
    }));
    const contractOptions = kokConfig.contractOptions.map((option) => ({
      optionId: option.optionId,
      checkedDetailOptionIds: option.detailOptions.map(
        (detail) => detail.detailOptionId,
      ),
    }));

    // 새 콕 작성
    if (kokId === null && realEstateId !== null)
      postKok(
        parseInt(realEstateId),
        kokConfig.checkedHilights ?? [],
        kokConfig.checkedFurnitureOptions ?? [],
        '남쪽',
        {
          checkedImpressions: [],
          facilityStarCount: 5,
          infraStarCount: 5,
          structureStarCount: 5,
          vibeStarCount: 5,
          reviewText: '',
        },
        outerOptions,
        innerOptions,
        contractOptions,
        pictureData,
      ).then((res) => {
        if (res.code === 7011) navigate(`/kok/${res.result.kokId}`);
        else
          modal.open({
            title: '콕리스트 등록 실패',
            description: res.message,
            primaryButton: '확인',
          });
      });
    // 기존 콕 수정
    else if (kokId !== null)
      putKok(
        parseInt(kokId),
        kokConfig.checkedHilights ?? [],
        kokConfig.checkedFurnitureOptions ?? [],
        '남쪽',
        {
          checkedImpressions: [],
          facilityStarCount: 5,
          infraStarCount: 5,
          structureStarCount: 5,
          vibeStarCount: 5,
          reviewText: '',
        },
        outerOptions,
        innerOptions,
        contractOptions,
        pictureData,
      ).then((res) => {
        if (res.code === 7011) navigate(`/kok/${kokId}`);
        else
          modal.open({
            title: '콕리스트 수정 실패',
            description: res.message,
            primaryButton: '확인',
          });
      });
  };

  return (
    <div className={styles.root}>
      <TopMenu className={styles.top} />
      <div className={styles.content}>{content}</div>
      <BottomBtn text="저장하기" onClick={handleSave} />
    </div>
  );
}
