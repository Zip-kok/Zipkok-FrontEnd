import React from 'react';

import styles from './Contract.module.css';
import KoklistGroup from 'components/KoklistGroup';
import deleteBtnIcon from 'assets/img/fill/delete.svg';
import cameraIcon from 'assets/img/line(1)/camera.svg';

interface Picture {
  id: number;
  src: string;
}
interface ContractProps {
  pictures: Picture[];
}
export default function Contract({ pictures }: ContractProps) {
  return (
    <div className={styles.root}>
      {/* 사진 */}
      <div className={styles.pictureContainer}>
        <p>계약서 등의 사진을 찍어주세요</p>

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
      {/* 콕리스트 */}
      <div className={styles.koklistContainer}>
        <KoklistGroup
          title="계약 관련"
          koklists={[
            { name: '공동현관 CCTV가 있는가 1', checked: true },
            { name: '공동현관 CCTV가 있는가 2', checked: false },
            { name: '공동현관 CCTV가 있는가 3', checked: true },
          ]}
          selected
        />

        <KoklistGroup title="집주인 관련" koklists={[]} selected={false} />
        <KoklistGroup title="부동산 관련" koklists={[]} selected={false} />
      </div>
    </div>
  );
}
