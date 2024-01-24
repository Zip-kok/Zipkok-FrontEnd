import React from 'react';

import deleteBtnIcon from 'assets/img/fill/delete.svg';
import cameraIcon from 'assets/img/line(1)/camera.svg';
import { Highlight, KoklistGroup } from 'components';

import styles from './NearHome.module.css';

interface Picture {
  id: number;
  src: string;
}

interface NearHomeProps {
  pictures: Picture[];
}

export default function NearHome({ pictures }: NearHomeProps) {
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
          <Highlight text="CCTV" highlightEnabled />
          <Highlight text="주차장" highlightEnabled />
          <Highlight text="현관보안" highlightEnabled />
          <Highlight text="편세권" highlightEnabled />
          <Highlight text="역세권" highlightEnabled />
          <Highlight text="더블역세권" highlightEnabled />
          <Highlight text="트리플역세권" highlightEnabled />
          <Highlight text="공원" highlightEnabled />
          <Highlight text="마트" highlightEnabled />
        </div>
      </div>

      <hr className={styles.hr} />

      {/* 콕리스트 */}
      <div className={styles.koklistContainer}>
        <KoklistGroup
          title="공동현관"
          koklists={[
            { name: '공동현관 CCTV가 있는가 1', checked: true },
            { name: '공동현관 CCTV가 있는가 2', checked: false },
            { name: '공동현관 CCTV가 있는가 3', checked: true },
          ]}
          selected
        />

        <KoklistGroup
          title="복도 및 계단"
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
