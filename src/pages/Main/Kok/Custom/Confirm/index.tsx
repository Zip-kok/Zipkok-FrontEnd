import React, { useEffect } from 'react';

import { PropertyComponents as Property } from 'components';
import useCustomKokStore from 'contexts/customKokStore';

export default function Confirm() {
  const customKokStore = useCustomKokStore();

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
    </>
  );
}
