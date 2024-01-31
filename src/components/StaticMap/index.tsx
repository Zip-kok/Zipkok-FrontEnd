import React, { useEffect } from 'react';

import styles from './StaticMap.module.css';

interface StaticMapProps {
  lat: number;
  lng: number;
}

const StaticMap: React.FC<StaticMapProps> = ({ lat, lng }) => {
  useEffect(() => {
    // Kakao Maps 라이브러리 로드 및 초기화
    const loadKakaoMaps = () => {
      window.kakao.maps.load(() => {
        const markerPosition = new window.kakao.maps.LatLng(lat, lng);
        const marker = {
          position: markerPosition,
        };

        const staticMapContainer = document.getElementById('staticMap');

        if (staticMapContainer) {
          const staticMapOption = {
            center: new window.kakao.maps.LatLng(lat, lng),
            level: 3,
            marker: marker,
          };

          // 여기에 추가된 부분: 클래스 적용
          staticMapContainer.classList.add(styles.staticMap);

          const staticMap = new window.kakao.maps.StaticMap(
            staticMapContainer,
            staticMapOption,
          );
        }
      });
    };

    // 이미 Kakao Maps 라이브러리가 로드되었을 경우
    if (window.kakao && window.kakao.maps) {
      loadKakaoMaps();
    } else {
      // Kakao Maps 라이브러리 로드
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_APP_KEY';
      script.onload = loadKakaoMaps;
      document.head.appendChild(script);
    }
  }, [lat, lng]);

  return (
    <div
      id="staticMap"
      style={{ width: '100%', height: '200px' }}
      className={styles.staticMap}
    ></div>
  );
};

export default StaticMap;
