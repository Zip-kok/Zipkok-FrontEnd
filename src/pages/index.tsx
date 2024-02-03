import React from 'react';
import { Outlet } from 'react-router-dom';

import { Modal } from 'contexts/modalStore';
import useModal from 'contexts/modalStore';

export default function Root() {
  const modal = useModal();
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
