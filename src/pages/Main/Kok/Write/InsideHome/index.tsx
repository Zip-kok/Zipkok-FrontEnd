import React from 'react';

import compassIcon from 'assets/img/common/compass.svg';
import deleteBtnIcon from 'assets/img/fill/delete.svg';
import cameraIcon from 'assets/img/line(1)/camera.svg';
import { TextInput, OptionsComponent, Furnitures } from 'components';

import styles from './InsideHome.module.css';

import type { UserKokOption } from 'apis/getUserKokOption';

interface Picture {
  id: number;
  src: string;
}

interface InsideHomeProps {
  pictures: Picture[];
  furnitures: string[];
  checkedFurnitures: string[];
  setCheckedFurnitures: React.Dispatch<React.SetStateAction<string[]>>;
  options: UserKokOption[];
  setOptions: React.Dispatch<React.SetStateAction<UserKokOption[]>>;
}

export default function InsideHome({
  pictures,
  furnitures,
  checkedFurnitures,
  setCheckedFurnitures,
  options,
  setOptions,
}: InsideHomeProps) {
  return (
    <div className={styles.root}>
      {/* 사진 */}
      <div className={styles.pictureContainer}>
        <p>집 내부의 사진을 찍어주세요</p>

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

      {/* 옵션 가구 선택 */}
      <div className={styles.furnitureContainer}>
        <h1 className={styles.title}>옵션 가구 선택</h1>
        <div className={styles.furnitures}>
          {furnitures.map((furniture) => {
            const furnitureObj = Furnitures.find((f) => f.name === furniture);
            return (
              <button
                className={`${styles.furniture} ${
                  checkedFurnitures.includes(furniture) ? styles.selected : ''
                }`}
                key={furniture}
                onClick={() => {
                  if (checkedFurnitures.includes(furniture)) {
                    setCheckedFurnitures((prev) =>
                      prev.filter((f) => f !== furniture),
                    );
                  } else {
                    setCheckedFurnitures((prev) => [...prev, furniture]);
                  }
                }}
              >
                <img src={furnitureObj?.img} />
                {furnitureObj?.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* 집 방향 */}
      <div className={styles.directionContainer}>
        <div className={styles.header}>
          <h1>집 방향</h1>
          <h2>집 방향을 입력하고 우측 버튼을 눌러주세요</h2>
        </div>
        <div className={styles.directionInput}>
          <TextInput defaultValue="북동향" style={'roundedBox'} />
          <button className={styles.directionBtn}>
            <img src={compassIcon}></img>
          </button>
        </div>
      </div>

      {/* 콕리스트 */}
      <div className={styles.koklistContainer}>
        <OptionsComponent kokOptions={options} setKokOptions={setOptions} />
      </div>
    </div>
  );
}
