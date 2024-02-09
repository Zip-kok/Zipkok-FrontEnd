import { useEffect, useState } from 'react';

import styles from './KakaoMap.module.css';
import floating from '../../../../assets/img/pinIcon/floating.svg';
import position from '../../../../assets/img/pinIcon/positon.svg';

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapProps {
  lat?: number;
  lng?: number;
}

const KakaoMap = ({ lat, lng }: KakaoMapProps) => {
  const [map, setMap] = useState<any>();
  const [coord, setCoord] = useState<[number, number]>();

  // coord가 변경될 때마다 지도의 중심을 변경
  useEffect(() => {
    if (map === undefined) return;
    if (coord === undefined) return;

    const currentPos = new window.kakao.maps.LatLng(coord[0], coord[1]);
    map.panTo(currentPos);
  }, [map, coord]);

  // 전달된 lat 및 lng가 없을 시
  useEffect(() => {
    if (lat === undefined || lng === undefined) {
      getCurrentPosBtn();
    }
  }, []);

  // 1) 지도 생성
  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(lat ?? 0, lng ?? 0),
        level: 3,
      };

      setMap(new window.kakao.maps.Map(container, options));
    });
  }, []);

  // 2) 현재 위치 함수
  const getCurrentPosBtn = () => {
    navigator.geolocation.getCurrentPosition(
      getPosSuccess,
      () => {
        // 현재 위치 가져오기 실패 시 서울로 이동
        setCoord([37.5665, 126.978]);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000,
      },
    );
  };

  // 3) 정상적으로 현재위치 가져올 경우 실행
  const getPosSuccess = (pos: GeolocationPosition) => {
    const { latitude, longitude } = pos.coords;
    setCoord([latitude, longitude]);
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
