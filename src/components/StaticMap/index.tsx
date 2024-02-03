import React, { useEffect } from 'react';

import styles from './StaticMap.module.css';
import spotPin from '../../assets/img/pinIcon/spotPin.svg';

interface StaticMapProps {
  lat: number;
  lng: number;
}

const StaticMap: React.FC<StaticMapProps> = ({ lat, lng }) => {
  useEffect(() => {
    kakao.maps.load(() => {
      const mapContainer = document.getElementById('staticMap') as HTMLElement;

      const mapOption = {
        center: new kakao.maps.LatLng(lat, lng),
        level: 3,
      };

      const map = new kakao.maps.Map(mapContainer, mapOption);

      const imageSrc = spotPin,
        imageSize = new kakao.maps.Size(40, 40),
        imageOption = { offset: new kakao.maps.Point(27, 27) };

      const markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption,
        ),
        markerPosition = new kakao.maps.LatLng(lat, lng);

      const marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
      });

      marker.setMap(map);
    });
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
