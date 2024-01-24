import React from 'react';

import styles from './InsideHome.module.css';
import compassIcon from '../../../../../assets/img/common/compass.svg';
import deleteBtnIcon from '../../../../../assets/img/fill/delete.svg';
import cameraIcon from '../../../../../assets/img/line(1)/camera.svg';
import KoklistGroup from '../../../../../components/KoklistGroup';
import TextInput from '../../../../../components/TextInput';

interface Picture {
  id: number;
  src: string;
}

interface InsideHomeProps {
  pictures: Picture[];
}

export default function InsideHome({ pictures }: InsideHomeProps) {
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
        <div className={styles.furnitures}>{/* TODO: 옵션 버튼 추가 */}</div>
      </div>

      {/* 집 방향 */}
      <div className={styles.directionContainer}>
        <div className={styles.header}>
          <h1>집 방향</h1>
          <h2>창문에 서서 우측 버튼을 눌러주세요</h2>
        </div>
        <div className={styles.directionInput}>
          <TextInput value="북동향" style={'roundedBox'} readOnly />
          <button className={styles.directionBtn}>
            <img src={compassIcon}></img>
          </button>
        </div>
      </div>

      {/* 콕리스트 */}
      <div className={styles.koklistContainer}>
        <KoklistGroup
          title="화장실"
          koklists={[
            { name: '공동현관 CCTV가 있는가 1', checked: true },
            { name: '공동현관 CCTV가 있는가 2', checked: false },
            { name: '공동현관 CCTV가 있는가 3', checked: true },
          ]}
          selected
        />

        <KoklistGroup
          title="에어컨"
          koklists={[
            { name: '공동현관 CCTV가 있는가 1', checked: true },
            { name: '공동현관 CCTV가 있는가 2', checked: false },
            { name: '공동현관 CCTV가 있는가 3', checked: true },
          ]}
          selected={false}
        />

        <KoklistGroup
          title="옷장"
          koklists={[
            { name: '공동현관 CCTV가 있는가 1', checked: true },
            { name: '공동현관 CCTV가 있는가 2', checked: false },
            { name: '공동현관 CCTV가 있는가 3', checked: true },
          ]}
          selected={false}
        />

        <KoklistGroup
          title="싱크대 주방"
          koklists={[
            { name: '공동현관 CCTV가 있는가 1', checked: true },
            { name: '공동현관 CCTV가 있는가 2', checked: false },
            { name: '공동현관 CCTV가 있는가 3', checked: true },
          ]}
          selected={false}
        />
      </div>
    </div>
  );
}
