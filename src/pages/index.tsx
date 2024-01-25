import React from 'react';
import { Outlet } from 'react-router-dom';

import { Modal } from 'components';
import useModalStore from 'contexts/modalStore';

export default function Root() {
  const modalStore = useModalStore();
  return (
    <>
      {/* modal */}
      {modalStore.enabled && (
        <>
          <Modal
            title={modalStore.title}
            description={modalStore.description}
            secondaryButton={modalStore.secondaryButton}
            primaryButton={modalStore.primaryButton}
            onPrimaryButtonClick={modalStore.onPrimaryButtonClick}
            onSecondaryButtonClick={modalStore.onSecondaryButtonClick}
          />
          <ModalOverlay />
        </>
      )}
      <Outlet />
    </>
  );
}

function ModalOverlay() {
  const modalStore = useModalStore();

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
