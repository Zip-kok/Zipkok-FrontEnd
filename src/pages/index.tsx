import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { getUserDetail } from 'apis';
import { Modal } from 'contexts/modalStore';
import useModal from 'contexts/modalStore';
import useMyPageStore from 'contexts/useMyPageStore';
import isLoggedIn from 'utils/isLoggedIn';

export default function Root() {
  const modal = useModal();
  const MyPageStore = useMyPageStore();
  useEffect(() => {
    if (isLoggedIn()) {
      getUserDetail().then((res) => {
        console.log(res.result);
        MyPageStore.setImageUrl(res.result.imageUrl);
        MyPageStore.setNickname(res.result.nickname);
        MyPageStore.setBirthday(res.result.birthday);
        MyPageStore.setGender(res.result.gender);
        MyPageStore.setAddress(res.result.address);
        MyPageStore.setLatitude(res.result.latitude);
        MyPageStore.setLongitude(res.result.longitude);
        MyPageStore.setRealEstateType(res.result.realEstateType);
        MyPageStore.setTransactionType(res.result.transactionType);
        MyPageStore.setMPriceMin(res.result.mpriceMin);
        MyPageStore.setMPriceMax(res.result.mpriceMax);
        MyPageStore.setMDepositMin(res.result.mdepositMin);
        MyPageStore.setMDepositMax(res.result.mdepositMax);
        MyPageStore.setYDepositMin(res.result.ydepositMin);
        MyPageStore.setYDepositMax(res.result.ydepositMax);
        MyPageStore.setPurchaseMin(res.result.priceMin);
        MyPageStore.setPurchaseMax(res.result.priceMax);
      });
    }
  }, []);
  return (
    <>
      {/* modal */}
      {modal.enabled && (
        <>
          <Modal
            title={modal.title}
            description={modal.description}
            secondaryButton={modal.secondaryButton}
            primaryButton={modal.primaryButton}
            onPrimaryButtonClick={modal.onPrimaryButtonClick}
            onSecondaryButtonClick={modal.onSecondaryButtonClick}
          />
          <ModalOverlay />
        </>
      )}
      <Outlet />
    </>
  );
}

function ModalOverlay() {
  const modalStore = useModal();

  function handleOverlayClick() {
    modalStore.close();
  }

  const style = {
    position: 'fixed',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    top: 0,
    zIndex: 1000,
  } as React.CSSProperties;
  return <div style={style} onClick={handleOverlayClick}></div>;
}
