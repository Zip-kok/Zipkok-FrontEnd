import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { getKokReview, putKok } from 'apis';
import BottomBtn from 'components/BottomBtn';
import StarRating from 'components/StarRating';
import SwiperCom from 'components/Swiper';
import useModal from 'contexts/modalStore';
import useUIStore from 'contexts/uiStore';

import styles from './KokReview.module.css';

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
  const ui = useUIStore();
  const modal = useModal();
  const { kokId } = useParams<{ kokId: string }>();
  const [review, setReview] = useState<KokReview>();

  const handleSave = () => {
    if (kokId === undefined) return;

    putKok({
      kokId: parseInt(kokId),
      reviewInfo: {
        checkedImpressions: review?.impressions || [],
        facilityStarCount: review?.facilityStarCount || 0,
        infraStarCount: review?.infraStarCount || 0,
        structureStarCount: review?.structureStarCount || 0,
        vibeStarCount: review?.vibeStarCount || 0,
        reviewText: review?.reviewText || '',
      },
    }).then((res) => {
      if (res.code === 7014) navigate('/kok/complete');
      else
        modal.open({
          title: '후기 저장 실패',
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
    if (kokId === undefined) return;

    getKokReview(parseInt(kokId)).then((res) => {
      setReview(res.result);
    });
  }, [kokId]);

  const navigate = useNavigate();

  return (
    <div className={styles.root}>
      <div className={styles.reviews}>
        <div className={styles.image}>
          <SwiperCom imageUrls={[]}></SwiperCom>
          {/* TODO: 매물 이미지 추가 */}
        </div>
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
                      setReview((prev) =>
                        prev
                          ? {
                              ...prev,
                              impressions: prev?.impressions.includes(tag)
                                ? prev?.impressions.filter(
                                    (impression) => impression !== tag,
                                  )
                                : [...(prev?.impressions || []), tag],
                            }
                          : undefined,
                      )
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
                setReview((prev) =>
                  prev
                    ? {
                        ...prev,
                        facilityStarCount:
                          typeof starCount === 'function'
                            ? starCount(prev.facilityStarCount ?? 0)
                            : starCount,
                      }
                    : undefined,
                )
              }
            />
            <StarRating
              label="인프라"
              starCount={review?.infraStarCount ?? 0}
              setStarCount={(
                starCount: number | ((prevState: number) => number),
              ) =>
                setReview((prev) =>
                  prev
                    ? {
                        ...prev,
                        infraStarCount:
                          typeof starCount === 'function'
                            ? starCount(prev.infraStarCount ?? 0)
                            : starCount,
                      }
                    : undefined,
                )
              }
            />
            <StarRating
              label="구조"
              starCount={review?.structureStarCount ?? 0}
              setStarCount={(
                starCount: number | ((prevState: number) => number),
              ) =>
                setReview((prev) =>
                  prev
                    ? {
                        ...prev,
                        structureStarCount:
                          typeof starCount === 'function'
                            ? starCount(prev.structureStarCount ?? 0)
                            : starCount,
                      }
                    : undefined,
                )
              }
            />
            <StarRating
              label="분위기"
              starCount={review?.vibeStarCount ?? 0}
              setStarCount={(
                starCount: number | ((prevState: number) => number),
              ) =>
                setReview((prev) =>
                  prev
                    ? {
                        ...prev,
                        vibeStarCount:
                          typeof starCount === 'function'
                            ? starCount(prev.vibeStarCount ?? 0)
                            : starCount,
                      }
                    : undefined,
                )
              }
            />
          </div>
          <div className={styles.review}>
            <textarea
              placeholder="매물에 대한 후기를 자유롭게 남겨보세요."
              value={review?.reviewText}
              onChange={(e) =>
                setReview((prev) =>
                  prev
                    ? {
                        ...prev,
                        reviewText: e.target.value,
                      }
                    : undefined,
                )
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
