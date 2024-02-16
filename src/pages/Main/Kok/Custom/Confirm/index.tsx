import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { BottomBtn, PropertyComponents as Property } from 'components';
import useCustomKokStore from 'contexts/customKokStore';

export default function Confirm() {
  const customKokStore = useCustomKokStore();
  const navigate = useNavigate();

  return (
    <>
      <Property.Header
        pictures={customKokStore.pictures}
        address={customKokStore.address}
        detailAddress={customKokStore.detailAddress}
        deposit={customKokStore.deposit}
        monthlyPrice={customKokStore.monthlyPrice}
        price={customKokStore.price}
        priceType={customKokStore.priceType}
      />

      <Property.BasicInfo
        area={customKokStore.area}
        houseType={customKokStore.houseType}
        floor={customKokStore.floor}
        maintanenceFee={customKokStore.maintanenceFee}
        address={customKokStore.address}
      />
      <BottomBtn
        onClick={() => navigate('/kok/edit/:kokId')}
        text="콕리스트 작성하기"
        occupySpace
      />
    </>
  );
}
