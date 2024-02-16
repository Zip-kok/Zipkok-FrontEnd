import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { getUserDetail } from 'apis';
import { Modal } from 'contexts/modalStore';
import useModal from 'contexts/modalStore';
import useMyPageStore from 'contexts/useMyPageStore';
import MyPageStore from 'contexts/useMyPageStore';
import isLoggedIn from 'utils/isLoggedIn';

export default function Root() {
  console.log('Root');
  const modal = useModal();
  const MyPageStore: any = useMyPageStore();
  useEffect(() => {
    if (isLoggedIn()) {
      getUserDetail().then((res) => {
        MyPageStore.setImageUrl(res.result.imageUrl);
        MyPageStore.setNickname(res.result.nickname);
        MyPageStore.setBirthday(res.result.birthday);
        MyPageStore.setGender(res.result.gender);
        //api 수정필요
        MyPageStore.setAddress(res.result.address);
        MyPageStore.setRealEstateType(res.result.realEstateType);
        MyPageStore.setTransactionType(res.result.transactionType);
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
