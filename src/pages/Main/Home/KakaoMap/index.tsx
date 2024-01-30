import { useEffect, useState } from 'react';

import styles from './KakaoMap.module.css';
import floating from '../../../../assets/img/pinIcon/floating.svg';
import position from '../../../../assets/img/pinIcon/positon.svg';

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap = () => {
  const [map, setMap] = useState<any>();

  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(37.5413, 127.0719),
        level: 3,
      };

      setMap(new window.kakao.maps.Map(container, options));
    });
  }, []);

  // 2) 현재 위치 함수
  const getCurrentPosBtn = () => {
    navigator.geolocation.getCurrentPosition(
      getPosSuccess,
      () => alert('위치 정보를 가져오는데 실패했습니다.'),
      {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000,
      },
    );
  };

  // 3) 정상적으로 현재위치 가져올 경우 실행
  const getPosSuccess = (pos: GeolocationPosition) => {
    // 현재 위치(위도, 경도) 가져온다.
    const currentPos = new window.kakao.maps.LatLng(
      pos.coords.latitude, // 위도
      pos.coords.longitude, // 경도
    );
    // 지도를 이동 시킨다.
    map.panTo(currentPos);
  };
  return (
    <div className={styles.root}>
      <div id="map" style={{ width: '100%', height: '550px' }}></div>
      <div className={styles.BtnCtn}>
        <img src={floating} />
        <img src={position} onClick={getCurrentPosBtn} />
      </div>
    </div>
  );
};

export default KakaoMap;
