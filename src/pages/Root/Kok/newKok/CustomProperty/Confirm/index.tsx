import React from 'react';

import PropertyInfo from '../../../../../../components/PropertyInfo';

import useCustomKokStore from '../../../../../../contexts/customKokStore';

export default function Confirm() {
  const customKokStore = useCustomKokStore();

  return (
    <PropertyInfo
      picture={customKokStore.picture}
      address={customKokStore.address}
      memo={customKokStore.memo}
      deposit={customKokStore.deposit}
      monthlyPrice={customKokStore.monthlyPrice}
      price={customKokStore.price}
      maintanenceFee={customKokStore.maintanenceFee}
      detailAddress={customKokStore.detailAddress}
      area={customKokStore.area}
      floor={customKokStore.floor}
      houseType={customKokStore.houseType}
      priceType={customKokStore.priceType}
    />
  );
}
