import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { getKokReview, putKok, postKok } from 'apis';
import BottomBtn from 'components/BottomBtn';
import StarRating from 'components/StarRating';
import useModal from 'contexts/modalStore';
import useUIStore from 'contexts/uiStore';

import styles from './KokReview.module.css';

import type { KokConfigResult } from 'apis/getKokConfig';
import type { KokReview } from 'apis/getKokReview';

const Tags = [
  '깔끔해요',
  '조용해요',
  '세련돼요',
  '심플해요',
  '더러워요',
  '냄새나요',
  '시끄러워요',
  '좁아요',
  '그냥 그래요',
  '마음에 들어요',
  '별로예요',
];

export default function KokReview() {
  const { state } = useLocation();
  const { kokConfig } = state as { kokConfig: KokConfigResult };

  const realEstateId = new URLSearchParams(location.search).get('realEstateId');
  const kokId = new URLSearchParams(location.search).get('kokId');

  const ui = useUIStore();
  const modal = useModal();
  const [review, setReview] = useState<KokReview>({
    impressions: [],
    facilityStarCount: 5,
    infraStarCount: 5,
    structureStarCount: 5,
    vibeStarCount: 5,
    reviewText: '',
  });

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
      ...(kokConfig.outerImageUrls?.map((url) => getFile(url, 'OUTTER')) ?? []),
      ...(kokConfig.innerImageUrls?.map((url) => getFile(url, 'INNER')) ?? []),
      ...(kokConfig.contractImageUrls?.map((url) => getFile(url, 'CONTRACT')) ??
        []),
    ]);

    const outerOptions = kokConfig.outerOptions
      .filter((option) => option.isVisible)
      .map((option) => ({
        optionId: option.optionId,
        checkedDetailOptionIds: option.detailOptions
          .filter((detailOption) => detailOption.detailOptionIsVisible)
          .map((detail) => detail.detailOptionId),
      }));
    const innerOptions = kokConfig.innerOptions
      .filter((option) => option.isVisible)
      .map((option) => ({
        optionId: option.optionId,
        checkedDetailOptionIds: option.detailOptions
          .filter((detailOption) => detailOption.detailOptionIsVisible)
          .map((detail) => detail.detailOptionId),
      }));
    const contractOptions = kokConfig.contractOptions
      .filter((option) => option.isVisible)
      .map((option) => ({
        optionId: option.optionId,
        checkedDetailOptionIds: option.detailOptions
          .filter((detailOption) => detailOption.detailOptionIsVisible)
          .map((detail) => detail.detailOptionId),
      }));

    // 새 콕 작성
    if (
      (kokId === '' || kokId === null) &&
      realEstateId !== '' &&
      realEstateId !== null
    )
      postKok(
        parseInt(realEstateId),
        kokConfig.checkedHilights ?? [],
        kokConfig.checkedFurnitureOptions ?? [],
        '남쪽',
        {
          checkedImpressions: review.impressions,
          facilityStarCount: review.facilityStarCount,
          infraStarCount: review.infraStarCount,
          structureStarCount: review.structureStarCount,
          vibeStarCount: review.vibeStarCount,
          reviewText: review.reviewText,
        },
        outerOptions,
        innerOptions,
        contractOptions,
        pictureData,
      ).then((res) => {
        if (res.code === 7011) navigate('/kok/complete');
        else
          modal.open({
            title: '콕리스트 등록 실패',
            description: res.message,
            primaryButton: '확인',
          });
      });
    // 기존 콕 수정
    else if (kokId !== null && kokId !== '')
      putKok({
        kokId: parseInt(kokId),
        checkedHighlights: kokConfig.checkedHilights ?? [],
        checkedFurnitureOptions: kokConfig.checkedFurnitureOptions ?? [],
        direction: '남쪽',
        checkedOuterOptions: outerOptions,
        checkedInnerOptions: innerOptions,
        checkedContractOptions: contractOptions,
        files: pictureData,
        reviewInfo: {
          checkedImpressions: review?.impressions || [],
          facilityStarCount: review?.facilityStarCount || 0,
          infraStarCount: review?.infraStarCount || 0,
          structureStarCount: review?.structureStarCount || 0,
          vibeStarCount: review?.vibeStarCount || 0,
          reviewText: review?.reviewText || '',
        },
      }).then((res) => {
        if (res.code === 7014) navigate(`/kok/complete`);
        else
          modal.open({
            title: '콕리스트 수정 실패',
            description: res.message,
            primaryButton: '확인',
          });
      });
  };

  useEffect(() => {
    ui.setUI({
      naviEnabled: false,
      headerEnabled: true,
      headerTitle: '발품 후기',
      headerBackButtonEnabled: true,
      headerRightButtons: [],
      path: 'kok',
    });
  }, []);

  useEffect(() => {
    if (kokId === null || kokId === '') return;

    getKokReview(parseInt(kokId)).then((res) => {
      setReview(res.result);
    });
  }, [kokId]);

  const navigate = useNavigate();

  return (
    <div className={styles.root}>
      <div className={styles.reviews}>
        {/* <div className={styles.image}>
          <SwiperCom imageUrls={[]}></SwiperCom>
        </div> */}
        <div>
          <div className={styles.review}>
            <h1
              className={styles.textLabel}
              style={{ marginBottom: '17px', marginTop: '25px' }}
            >
              집의 첫인상이 어땠나요?
            </h1>
            <div>
              <div className={styles.tags}>
                {Tags.map((tag) => (
                  <button
                    key={tag}
                    className={
                      review?.impressions.includes(tag)
                        ? styles.tagSelected
                        : styles.tag
                    }
                    onClick={() =>
                      setReview((prev) => ({
                        ...prev,
                        impressions: prev?.impressions.includes(tag)
                          ? prev?.impressions.filter(
                              (impression) => impression !== tag,
                            )
                          : [...(prev?.impressions || []), tag],
                      }))
                    }
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.review}>
            <h1
              className={styles.textLabel}
              style={{ marginBottom: '28px', marginTop: '45px' }}
            >
              매물은 어떠셨나요?
            </h1>
            <StarRating
              label="시설"
              starCount={review?.facilityStarCount ?? 0}
              setStarCount={(
                starCount: number | ((prevState: number) => number),
              ) =>
                setReview((prev) => ({
                  ...prev,
                  facilityStarCount:
                    typeof starCount === 'function'
                      ? starCount(prev.facilityStarCount ?? 0)
                      : starCount,
                }))
              }
            />
            <StarRating
              label="인프라"
              starCount={review?.infraStarCount ?? 0}
              setStarCount={(
                starCount: number | ((prevState: number) => number),
              ) =>
                setReview((prev) => ({
                  ...prev,
                  infraStarCount:
                    typeof starCount === 'function'
                      ? starCount(prev.infraStarCount ?? 0)
                      : starCount,
                }))
              }
            />
            <StarRating
              label="구조"
              starCount={review?.structureStarCount ?? 0}
              setStarCount={(
                starCount: number | ((prevState: number) => number),
              ) =>
                setReview((prev) => ({
                  ...prev,
                  structureStarCount:
                    typeof starCount === 'function'
                      ? starCount(prev.structureStarCount ?? 0)
                      : starCount,
                }))
              }
            />
            <StarRating
              label="분위기"
              starCount={review?.vibeStarCount ?? 0}
              setStarCount={(
                starCount: number | ((prevState: number) => number),
              ) =>
                setReview((prev) => ({
                  ...prev,
                  vibeStarCount:
                    typeof starCount === 'function'
                      ? starCount(prev.vibeStarCount ?? 0)
                      : starCount,
                }))
              }
            />
          </div>
          <div className={styles.review}>
            <textarea
              placeholder="매물에 대한 후기를 자유롭게 남겨보세요."
              value={review?.reviewText}
              onChange={(e) =>
                setReview((prev) => ({
                  ...prev,
                  reviewText: e.target.value,
                }))
              }
            ></textarea>
          </div>
        </div>
      </div>
      <BottomBtn
        anchorText="건너뛰기"
        onAnchorClick={() => navigate('/kok/complete')}
        text="저장하기"
        onClick={handleSave}
        occupySpace
      />
    </div>
  );
}
