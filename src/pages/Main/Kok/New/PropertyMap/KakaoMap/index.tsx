import { useEffect, useState } from 'react';

import position from 'assets/img/pinIcon/positon.svg';
import spot from 'assets/img/pinIcon/spot.svg';

import styles from './KakaoMap.module.css';

import type { HouseType } from 'types/HouseType';
import type { PriceType } from 'types/PriceType';

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
  transactionType: PriceType;
  realEstateType: HouseType;
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
  selectedProprety: realEstateInfo | null;
  setSelectedProperty: React.Dispatch<
    React.SetStateAction<realEstateInfo | null>
  >;
}

const KakaoMap = ({
  lat,
  lng,
  mapLocationInfo,
  setMapLocationInfo,
  realEstatesInfo,
  selectedProprety,
  setSelectedProperty,
}: KakaoMapProps) => {
  const [map, setMap] = useState<any>();
  const [coord, setCoord] = useState<[number, number]>();
  const [estateMakers, setEstateMarkers] = useState<any[]>([]);

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
        prev.forEach((marker) => marker.setMap(null));

        return (
          realEstatesInfo?.map((realEstateInfo) => {
            const position = new window.kakao.maps.LatLng(
              realEstateInfo.longitude,
              realEstateInfo.latitude,
            );
            const marker = new window.kakao.maps.Marker({
              opacity:
                !selectedProprety ||
                selectedProprety?.realEstateId === realEstateInfo.realEstateId
                  ? 1
                  : 0.5,
              title: realEstateInfo.realEstateId.toString(),
              map: map,
              position: position,
              image: markerImage,
            });
            window.kakao.maps.event.addListener(marker, 'click', () => {
              setSelectedProperty(realEstateInfo);
            });
            return marker;
          }) ?? []
        );
      });
    };

    const handleClick = () => {
      setSelectedProperty(null);
    };

    window.kakao.maps.event.addListener(map, 'idle', handleIdle);
    window.kakao.maps.event.addListener(map, 'click', handleClick);

    // 컴포넌트가 언마운트되면 이벤트 리스너 제거
    return () => {
      window.kakao.maps.event.removeListener(map, 'idle', handleIdle);
      window.kakao.maps.event.removeListener(map, 'click', handleClick);
    };
  }, [map, realEstatesInfo]);

  useEffect(() => {
    if (map === undefined) return;

    // 마커 투명도 업데이트
    estateMakers.forEach((marker) => {
      if (
        !selectedProprety ||
        marker.getTitle() === selectedProprety?.realEstateId.toString()
      )
        marker.setOpacity(1);
      else marker.setOpacity(0.5);
    });
  }, [map, selectedProprety, realEstatesInfo]);

  return (
    <div className={styles.root}>
      <div className={styles.map} id="map"></div>
      <div className={styles.BtnCtn}>
        <button className="imgBtn" onClick={getCurrentPosBtn}>
          <img src={position} />
        </button>
      </div>
    </div>
  );
};

export default KakaoMap;
