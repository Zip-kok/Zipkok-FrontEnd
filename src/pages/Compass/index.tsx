import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BottomBtn from 'components/BottomBtn';
import Header from 'components/Header';

import styles from './Compass.module.css';

interface CustomDeviceOrientationEvent extends DeviceOrientationEvent {
  webkitCompassHeading?: number;
}

export default function Compass() {
  const directions = ['북', '북동', '동', '남동', '남', '남서', '서', '북서'];
  const navigate = useNavigate();
  const [log, setLog] = useState('');
  const [isIOS, setIsIOS] = useState(false);
  const [pointDegree, setPointDegree] = useState(0);

  useEffect(() => {
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent));
    navigator.geolocation.getCurrentPosition(locationHandler);

    if (!isIOS) {
      window.addEventListener('deviceorientationabsolute', handler, true);
    }

    return () => {
      window.removeEventListener('deviceorientationabsolute', handler);
      window.removeEventListener('deviceorientation', handler);
    };
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
    `translate(-50%, -50%) rotate(${-compass}deg)`;
    setLog(`compass: ${compass}`);
  }

  function locationHandler(position: any) {
    const { latitude, longitude } = position.coords;
    setPointDegree(calcDegreeToPoint(latitude, longitude));

    while (pointDegree < 0) setPointDegree(pointDegree + 360);
  }

  function calcDegreeToPoint(latitude: number, longitude: number) {
    // 북극의 좌표
    const point = {
      lat: 90,
      lng: 0,
    };

    const phiK = (point.lat * Math.PI) / 180.0;
    const lambdaK = (point.lng * Math.PI) / 180.0;
    const phi = (latitude * Math.PI) / 180.0;
    const lambda = (longitude * Math.PI) / 180.0;
    const psi =
      (180.0 / Math.PI) *
      Math.atan2(
        Math.sin(lambdaK - lambda),
        Math.cos(phi) * Math.tan(phiK) -
          Math.sin(phi) * Math.cos(lambdaK - lambda),
      );
    return Math.round(psi);
  }

  return (
    <div className={styles.root}>
      <div className="top">
        <Header
          title="내 집 방향 찾기"
          backBtnEnabled
          onBack={() => navigate(-1)}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.direction}>
          <span className={styles.directionColor}>서향 </span>입니다
        </div>

        <div className={styles.log}>{log}</div>
        <button onClick={startCompass}>Start</button>

        <div className={styles.text}>
          <span>핸드폰의 윗면이</span>
          <br />
          <span>창문을 향하도록 해주세요</span>
        </div>
      </div>

      <BottomBtn text="입력하기" onClick={() => {}} />
    </div>
  );
}
