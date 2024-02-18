import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getRealEstateInfo } from 'apis';
import { BottomBtn, PropertyComponents as Property } from 'components';

import type { GetRealEstateInfoResult } from 'apis/getRealEstateInfo';

export default function Confirm() {
  const [realEstateInfo, setRealEstateInfo] =
    useState<GetRealEstateInfoResult>();
  const { realEstateId } = useParams<{ realEstateId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (realEstateId === undefined) return;
    getRealEstateInfo(parseInt(realEstateId)).then((res) => {
      setRealEstateInfo(res.result);
    });
  }, [realEstateId]);

  return (
    <>
      <Property.Header
        pictures={realEstateInfo?.imageInfo.imageURL.filter<string>(
          (e): e is string => e !== null,
        )}
        address={{
          address_name: realEstateInfo?.address ?? '',
          x: realEstateInfo?.latitude ?? 0,
          y: realEstateInfo?.longitude ?? 0,
        }}
        detailAddress={realEstateInfo?.detailAddress ?? ''}
        deposit={realEstateInfo?.deposit}
        monthlyPrice={realEstateInfo?.price}
        price={realEstateInfo?.price}
        priceType={realEstateInfo?.transactionType ?? 'MONTHLY'}
      />

      <Property.BasicInfo
        area={realEstateInfo?.pyeongsu ?? undefined}
        houseType={realEstateInfo?.realEstateType ?? 'ONEROOM'}
        floor={realEstateInfo?.floorNum ?? 0}
        maintanenceFee={realEstateInfo?.administrativeFee}
        address={{
          address_name: realEstateInfo?.address ?? '',
          x: realEstateInfo?.latitude ?? 0,
          y: realEstateInfo?.longitude ?? 0,
        }}
      />
      <BottomBtn
        onClick={() => navigate(`/kok/edit/${realEstateId}`)}
        text="콕리스트 작성하기"
        occupySpace
      />
    </>
  );
}
