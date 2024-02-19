import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import compassIcon from 'assets/img/common/compass.svg';
import deleteBtnIcon from 'assets/img/fill/delete.svg';
import cameraIcon from 'assets/img/line(1)/camera.svg';
import { TextInput, OptionsComponent, Furnitures } from 'components';

import styles from './InsideHome.module.css';

import type { UserKokOption } from 'apis/getUserKokOption';

interface InsideHomeProps {
  pictures: string[];
  setPictures: React.Dispatch<React.SetStateAction<string[]>>;
  furnitures: string[];
  checkedFurnitures: string[];
  setCheckedFurnitures: React.Dispatch<React.SetStateAction<string[]>>;
  options: UserKokOption[];
  setOptions: React.Dispatch<React.SetStateAction<UserKokOption[]>>;
}

export default function InsideHome({
  pictures,
  setPictures,
  furnitures,
  checkedFurnitures,
  setCheckedFurnitures,
  options,
  setOptions,
}: InsideHomeProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const fileChange = async (fileBlob: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);

    await new Promise<void>((resolve) => {
      reader.onload = () => {
        resolve();
      };
    });

    setPictures((prev) => [...prev, reader.result as string]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      fileChange(e.target.files[0]);
    }
  };
  const onClickCompass = () => {
    navigate('/kok/compass');
  };

  return (
    <div className={styles.root}>
      {/* 사진 */}
      <div className={styles.pictureContainer}>
        <p>집 내부의 사진을 찍어주세요</p>

        <div className={styles.pictures}>
          {/* 최대 사진 개수 이하인 경우에만 */}
          {pictures.length < 10 && (
            <div className={styles.picture}>
              <button
                className={styles.addPicture}
                onClick={() => fileInputRef.current?.click()}
              >
                <img src={cameraIcon} />
                <p>{pictures.length} / 10</p>
              </button>
              <input
                id="inputFile"
                type="file"
                name="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
                ref={fileInputRef}
                disabled={pictures.length >= 10}
              />
            </div>
          )}

          {pictures.map((picture) => (
            <div key={picture} className={styles.picture}>
              <img src={picture} />
              <button
                className={styles.deletePicture}
                onClick={() =>
                  setPictures((prev) => prev.filter((e) => e !== picture))
                }
              >
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
          <button className={styles.directionBtn} onClick={onClickCompass}>
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
