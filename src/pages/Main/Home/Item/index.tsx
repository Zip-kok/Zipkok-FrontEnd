import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getZim, zim } from 'apis';
import { deleteZim } from 'apis';
import { GetRealEstateInfoResult } from 'apis/getRealEstateInfo';
import { getRealEstateInfo } from 'apis/getRealEstateInfo';
import { BottomBtn } from 'components';
import Property from 'components/Property';
import useUIStore from 'contexts/uiStore';
import getPriceString from 'utils/getPriceString';

import 'swiper/css';
import 'swiper/css/pagination';
import styles from './Item.module.css';
import fillHeart from '../../../../assets/img/fill/heart_selected.svg';
import heart from '../../../../assets/img/line(2)/heart.svg';

const Item = () => {
  const navigate = useNavigate();
  const { realEstateId } = useParams();
  const [realEstateInfo, setRealEstateInfo] =
    useState<GetRealEstateInfoResult>();
  const [isZimmed, setIsZimmed] = useState(realEstateInfo?.isZimmed);

  useEffect(() => {
    if (realEstateId === undefined) return;
    const ItemId = parseInt(realEstateId);
    getRealEstateInfo(ItemId).then((res) => setRealEstateInfo(res.result));
  }, [realEstateId]);

  const handleWriteClick = () => {
    navigate('../');
  };
  const handlePress = () => {
    if (realEstateId === undefined) return;

    setIsZimmed(!isZimmed);
    if (!isZimmed) {
      zim(parseInt(realEstateId)).then((res) => res);
    } else if (isZimmed) {
      deleteZim(parseInt(realEstateId)).then((res) => res);
    }
  };
  const ui = useUIStore();
  useEffect(() => {
    ui.setUI((state) => ({
      ...state,
      headerEnabled: true,
      headerTitle: realEstateInfo?.address,
      headerIcon: undefined,
      headerBackButtonEnabled: true,
      naviEnabled: false,
      headerRightButtons: [
        {
          id: '1',
          img: isZimmed ? fillHeart : heart,
          onPress: handlePress,
        },
      ],
    }));
  }, [realEstateInfo, isZimmed]);

  return (
    <div className={styles.root}>
      {realEstateInfo && (
        <>
          <Property.Header
            pictures={realEstateInfo.imageInfo.imageURL}
            address={{
              address_name: realEstateInfo.address,
              x: realEstateInfo.latitude,
              y: realEstateInfo.longitude,
            }}
            detailAddress={realEstateInfo.detailAddress ?? undefined}
            priceType={realEstateInfo.transactionType}
            memo={realEstateInfo.detail ?? undefined}
            deposit={realEstateInfo.deposit}
            monthlyPrice={realEstateInfo.price}
            price={realEstateInfo.price}
          />

          <Property.BasicInfo
            area={realEstateInfo.pyeongsu ?? undefined}
            houseType={realEstateInfo.realEstateType}
            floor={realEstateInfo.floorNum ?? undefined}
            maintanenceFee={realEstateInfo.administrativeFee}
            address={{
              address_name: realEstateInfo.address,
              x: realEstateInfo.latitude,
              y: realEstateInfo.longitude,
            }}
          />
        </>
      )}

      <span className={styles.title}>주변의 다른 매물</span>
      <div className={styles.neighborContainer}>
        {realEstateInfo?.neighborRealEstates.map((neighbor) => (
          <button
            className={styles.neighbor}
            onClick={() => {
              navigate(`/item/${neighbor.realEstateId}`);
              window.scrollTo(0, 0);
            }}
            key={neighbor.realEstateId}
          >
            <img src={neighbor.imageUrl} />
            <h1>
              {neighbor.deposit && neighbor.price
                ? `${neighbor.deposit.toLocaleString()} / ${neighbor.price.toLocaleString()}`
                : getPriceString(neighbor.price * 10000)}
            </h1>
            <h2>{neighbor.address}</h2>
          </button>
        ))}
      </div>

      <BottomBtn text="콕리스트 기록" onClick={handleWriteClick} />
    </div>
  );
};

export default Item;
