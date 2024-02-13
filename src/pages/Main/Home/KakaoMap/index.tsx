import { useCallback, useEffect, useState } from 'react';
import { MapMarker } from 'react-kakao-maps-sdk';

import styles from './KakaoMap.module.css';
import floating from '../../../../assets/img/pinIcon/floating.svg';
import position from '../../../../assets/img/pinIcon/positon.svg';
import spot from '../../../../assets/img/pinIcon/spot.svg';
declare global {
  interface Window {
    kakao: any;
  }
}
interface mapLocationInfo {
  southWestLat?: number;
  southWestLon?: number;
  northEastLat?: number;
  northEastLon?: number;
}

interface realEstateInfoList {
  realEstateId: number;
  imageURL: string;
  deposit: number;
  price: number;
  transactionType: string;
  realEstateType: string;
  address: string;
  detailAddress: string;
  latitude: number;
  longitude: number;
  agent: string;
  isZimmed: boolean;
  isKokked: boolean;
}
interface KakaoMapProps {
  lat?: number;
  lng?: number;
  mapLocationInfo: mapLocationInfo;
  setMapLocationInfo: React.Dispatch<React.SetStateAction<mapLocationInfo>>;
  realEstateInfoList?: realEstateInfoList[];
}

const KakaoMap = ({
  lat,
  lng,
  mapLocationInfo,
  setMapLocationInfo,
  realEstateInfoList,
}: KakaoMapProps) => {
  const [map, setMap] = useState<any>();
  const [coord, setCoord] = useState<[number, number]>();
  const [markers, setMarkers] = useState<any[]>([]);

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

  useEffect(() => {
    if (map === undefined) return;

    const boundsChangedListener = () => {
      //현재 맵의 두 좌표 등록

      //마커 띄우기
      if (realEstateInfoList === undefined) return;
      // 이전에 생성된 마커 제거
      markers.forEach((marker) => {
        marker.setMap(null);
      });
      // 이전 마커 배열 초기화
      setMarkers([]);

      const imageSrc = spot;
      // 새로 생성된 마커를 추적하기 위한 배열
      const newMarkers: any[] = [];

      for (let i = 0; i < realEstateInfoList.length; i++) {
        const { latitude, longitude } = realEstateInfoList[i];
        const position = new window.kakao.maps.LatLng(longitude, latitude);
        const imageSize = new window.kakao.maps.Size(24, 35);
        const markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
        );
        // 마커를 생성하고 추적 배열에 추가
        const marker = new window.kakao.maps.Marker({
          map: map,
          position: position,
          title: '위치',
          image: markerImage,
        });
        newMarkers.push(marker);
      }
      // 새로 생성된 마커 배열 업데이트
      setMarkers(newMarkers);
    };

    // bounds_changed 이벤트에 대한 이벤트 리스너 추가
    window.kakao.maps.event.addListener(
      map,
      'bounds_changed',
      boundsChangedListener,
    );
    window.kakao.maps.event.addListener(map, 'idle', function () {
      const bounds = map.getBounds();
      const southWestLat = bounds.ha;
      const southWestLon = bounds.qa;
      const northEastLat = bounds.oa;
      const northEastLon = bounds.pa;
      setMapLocationInfo({
        southWestLon,
        southWestLat,
        northEastLon,
        northEastLat,
      });
    });

    // 컴포넌트가 언마운트되면 이벤트 리스너 제거
    return () => {
      window.kakao.maps.event.removeListener(
        map,
        'bounds_changed',
        boundsChangedListener,
      );
    };
  }, [map, realEstateInfoList, markers]);

  return (
    <div className={styles.root}>
      <div className={styles.map} id="map"></div>
      <div className={styles.BtnCtn}>
        <img src={floating} />
        <img src={position} onClick={getCurrentPosBtn} />
      </div>
    </div>
  );
};

export default KakaoMap;
