import React, { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';

import { getUserKokList } from 'apis';
import { UserKokList } from 'apis/getUserKokList';
import checkIcon from 'assets/img/line(2)/check.svg';
import listIcon from 'assets/img/line(2)/list_default.svg';
import { ReactComponent as PenIcon } from 'assets/img/line(2)/pen_white.svg';
import { BottomBtn, PropertyItem } from 'components';
import useCustomKokStore from 'contexts/customKokStore';
import useUIStore from 'contexts/uiStore';
import properties from 'models/properties';
import { StatusCode } from 'types/StatusCode';

import styles from './Kok.module.css';
import { realEstateInfo } from '../../Home/KakaoMap/index';

export default function Koklist() {
  const ui = useUIStore();
  const [propertyList, setPropertyList] = useState<UserKokList>();

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  //페이지 끝에 도달했을때 추가 데이터를 가져오는 함수(무한스크롤 관련 함수)
  const getMoreData = useCallback(() => {
    //1페이지기준 6개씩 가져옴
    getUserKokList(page + 1, 6).then((res) => {
      if (res.code == 7008) {
        setHasMore(false);
        return;
      }
      setPropertyList((prevList) => ({
        ...res.result,
        koks: [...(prevList?.koks ?? []), ...res.result.koks],
      }));
      setPage(page + 1);
    });
  }, [page]);
  const customKokStore = useCustomKokStore();

  useEffect(() => {
    getUserKokList(page, 6).then((res) => {
      if (res.code == 7008) {
        return;
      } else if (res.code == 5015) {
      }
      setPropertyList(res.result);
    });
    ui.setUI((state) => ({
      ...state,
      headerTitle: '콕리스트',
      headerIcon: checkIcon,
      headerBackButtonEnabled: false,
      naviEnabled: true,
      headerRightButtons: [],
    }));
  }, []);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('./');
  };

  const handlePropertyClick = (kokId: number) => {
    customKokStore.setAddress({
      address_name: '',
      x: 0,
      y: 0,
    });
    customKokStore.setMemo();
    customKokStore.setDeposit();
    customKokStore.setMonthlyPrice();
    customKokStore.setPrice();
    customKokStore.setMaintanenceFee();
    customKokStore.setDetailAddress();
    customKokStore.setArea();
    customKokStore.setFloor();
    customKokStore.setHouseType('ONEROOM');
    customKokStore.setPriceType('MONTHLY');
    customKokStore.setNickName();

    navigate(`./kokItem/${kokId}`);
  };

  return (
    <div className={styles.root}>
      <div className={styles.propertyContainer}>
        <InfiniteScroll
          dataLength={propertyList?.koks.length || 0}
          next={getMoreData}
          hasMore={hasMore}
          loader={<></>}
        >
          {propertyList && propertyList.koks.length > 0 ? (
            propertyList.koks.map((property: any) => (
              <PropertyItem
                key={property.kokId}
                id={property.kokId}
                like={property.isZimmed}
                type={property.realEstateType}
                priceType={property.transactionType}
                price={property.price}
                deposit={property.deposit}
                address={property.address}
                propertyName={property.estateAgent}
                imageUrl={property.imageUrl}
                kokList={true}
                onClick={() => handlePropertyClick(property.kokId)}
              />
            ))
          ) : (
            <div className={styles.noKokList}>
              <img src={listIcon}></img>
              <div>
                콕리스트가 없어요
                <br />
                새로운 콕리스트를 작성해주세요
              </div>
            </div>
          )}
        </InfiniteScroll>
      </div>

      <BottomBtn
        text="새 콕리스트 작성"
        onClick={() => navigate('./new/propertyList')}
        icon={<PenIcon />}
        style={{ bottom: '64px' }}
      />
    </div>
  );
}
