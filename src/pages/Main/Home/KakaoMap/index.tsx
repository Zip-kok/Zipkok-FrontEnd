import { useEffect, useState } from 'react';

import floating from 'assets/img/pinIcon/floating.svg';
import pinIcon from 'assets/img/pinIcon/pin.svg';
import position from 'assets/img/pinIcon/positon.svg';
import spot from 'assets/img/pinIcon/spot.svg';

import styles from './KakaoMap.module.css';

import type { Pin } from 'types/Pin';
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

export interface realEstateInfo {
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
  realEstatesInfo?: realEstateInfo[];
  pins?: Pin[];
}

const KakaoMap = ({
  lat,
  lng,
  mapLocationInfo,
  setMapLocationInfo,
  realEstatesInfo,
  pins,
}: KakaoMapProps) => {
  const [map, setMap] = useState<any>();
  const [coord, setCoord] = useState<[number, number]>();
  const [estateMakers, setEstateMarkers] = useState<any[]>([]);
  const [pinMarkers, setPinMarkers] = useState<any[]>([]);

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

  // 4) 지도 이벤트 리스너 추가
  useEffect(() => {
    if (map === undefined) return;

    const handleIdle = () => {
      // bounds 정보 업데이트
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

      // 마커 업데이트
      const markerImage = new window.kakao.maps.MarkerImage(
        spot,
        new window.kakao.maps.Size(24, 35),
      );

      setEstateMarkers((prev) => {
        prev.forEach((marker) => {
          marker.setMap(null);
        });

        return (
          realEstatesInfo?.map((realEstateInfo) => {
            const position = new window.kakao.maps.LatLng(
              realEstateInfo.longitude,
              realEstateInfo.latitude,
            );
            const marker = new window.kakao.maps.Marker({
              map: map,
              position: position,
              image: markerImage,
            });
            return marker;
          }) ?? []
        );
      });
    };

    window.kakao.maps.event.addListener(map, 'idle', handleIdle);

    // 컴포넌트가 언마운트되면 이벤트 리스너 제거
    return () => {
      window.kakao.maps.event.removeListener(map, 'idle', handleIdle);
    };
  }, [map, realEstatesInfo]);

  // 5) 핀 마커 추가
  useEffect(() => {
    if (map === undefined) return;

    const pinImage = new window.kakao.maps.MarkerImage(
      pinIcon,
      new window.kakao.maps.Size(48, 48),
    );

    pinMarkers.forEach((marker) => {
      marker.setMap(null);
    });

    setPinMarkers(
      pins?.map((pin) => {
        const position = new window.kakao.maps.LatLng(
          pin.address.x,
          pin.address.y,
        );
        const marker = new window.kakao.maps.Marker({
          map: map,
          position: position,
          image: pinImage,
        });
        return marker;
      }) ?? [],
    );
  }, [map, pins]);

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
