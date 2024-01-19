import React, { useEffect, useState, useCallback } from 'react';

import styles from './Test.module.css';

export default function Test() {
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
      <span className={styles.text}>{log}</span>
      <button onClick={startCompass}>Start</button>
    </div>
  );
}
