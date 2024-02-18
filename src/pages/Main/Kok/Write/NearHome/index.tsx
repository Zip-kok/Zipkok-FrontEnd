import React from 'react';

import deleteBtnIcon from 'assets/img/fill/delete.svg';
import cameraIcon from 'assets/img/line(1)/camera.svg';
import { Highlight, OptionsComponent } from 'components';

import styles from './NearHome.module.css';

import type { UserKokOption } from 'apis/getUserKokOption';

interface Picture {
  id: number;
  src: string;
}

interface NearHomeProps {
  pictures: Picture[];
  highlights: string[];
  checkedHighlights: string[];
  setCheckedHighlights: React.Dispatch<React.SetStateAction<string[]>>;
  options: UserKokOption[];
  setOptions: React.Dispatch<React.SetStateAction<UserKokOption[]>>;
}

export default function NearHome({
  pictures,
  highlights,
  checkedHighlights,
  setCheckedHighlights,
  options,
  setOptions,
}: NearHomeProps) {
  return (
    <div className={styles.root}>
      {/* 사진 */}
      <div className={styles.pictureContainer}>
        <p>집 밖의 사진을 찍어주세요</p>

        <div className={styles.pictures}>
          {/* 최대 사진 개수 이하인 경우에만 */}
          {pictures.length < 10 && (
            <div className={styles.picture}>
              <button className={styles.addPicture}>
                <img src={cameraIcon} />
                <p>{pictures.length} / 10</p>
              </button>
            </div>
          )}

          {pictures.map((picture) => (
            <div key={picture.id} className={styles.picture}>
              <img src={picture.src} />
              <button className={styles.deletePicture}>
                <img src={deleteBtnIcon} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 매물 하이라이트 */}
      <div className={styles.highlightContainer}>
        <h1 className={styles.title}>매물 하이라이트</h1>
        <div className={styles.highlights}>
          {highlights.map((highlight) => (
            <Highlight
              text={highlight}
              key={highlight}
              highlightEnabled={checkedHighlights.includes(highlight)}
              onEnable={() =>
                setCheckedHighlights((prev) => {
                  return [...prev, highlight];
                })
              }
              onDisable={() =>
                setCheckedHighlights((prev) =>
                  prev.filter((e) => e !== highlight),
                )
              }
            />
          ))}
        </div>
      </div>

      <hr className={styles.hr} />

      {/* 콕리스트 */}
      <div className={styles.koklistContainer}>
        <OptionsComponent kokOptions={options} setKokOptions={setOptions} />
      </div>
    </div>
  );
}
