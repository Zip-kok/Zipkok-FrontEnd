import React, { useEffect, useState } from 'react';

import compass from 'assets/img/common/compass.png';
import useUIStore from 'contexts/uiStore';

import styles from './Compass.module.css';

const Compass = () => {
  const [isIOS, setIsIOS] = useState(false);
  const [compassAngle, setCompassAngle] = useState(0);
  const [log, setLog] = useState('북향');
  const ui = useUIStore();

  useEffect(() => {
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent));
    return () => {
      window.removeEventListener('deviceorientationabsolute', handler);
      window.removeEventListener('deviceorientation', handler);
    };
  }, []);

  useEffect(() => {
    ui.setUI({
      naviEnabled: false,
      headerEnabled: true,
      headerTitle: '내 집 방향 찾기',
      headerBackButtonEnabled: true,
      headerRightButtons: [],
      path: 'kok',
    });
  }, []);

  function startCompass() {
    if (isIOS) {
      (DeviceOrientationEvent as any)
        .requestPermission()
        .then((response: string) => {
          if (response === 'granted') {
            window.addEventListener('deviceorientation', handler, true);
          } else {
            alert('has to be allowed!');
          }
        })
        .catch(() => alert('not supported'));
    }
  }

  function handler(e: any) {
    const compass = e.webkitCompassHeading || Math.abs(e.alpha - 360);
    const direction = mapDegreeToDirection(compass);
    setLog(`${direction}향`);
    setCompassAngle(compass);
  }

  //방향으로 변환 (한글)
  function mapDegreeToDirection(deg: number) {
    const directions = ['북', '북동', '동', '남동', '남', '남서', '서', '북서'];
    const index = Math.floor((deg % 360) / 45);
    return directions[index];
  }

  //방향으로 변환 (영어)
  function mapDegreeToDirectionEng(deg: number) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.floor((deg % 360) / 45);
    return directions[index];
  }

  return (
    <div className={styles.root}>
      <div style={{ display: 'flex', marginBottom: '30px' }}>
        <span className={styles.directionText}>{log}</span>
        <span className={styles.text}> 입니다</span>
      </div>
      <div className={styles.compass}>
        <img
          src={compass}
          alt="compass"
          style={{ transform: `rotate(${compassAngle}deg)` }}
        />
      </div>
      <div className={styles.wrapper}>
        <div className={styles.log}>
          {Math.floor(compassAngle)}°{mapDegreeToDirectionEng(compassAngle)}
        </div>
        <div className={styles.description}>핸드폰의 윗면이 </div>
        <div className={styles.description}>창문을 향하도록 해주세요</div>
      </div>
      <button className={styles.startBtn} onClick={startCompass}>
        측정하기
      </button>
    </div>
  );
};
export default Compass;
