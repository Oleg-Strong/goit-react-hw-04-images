import css from './Modal.module.css';
import { createPortal } from 'react-dom';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ closeModal, children }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  });

  const handleKeydown = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  return createPortal(
    <div className={css.overlay} onClick={closeModal}>
      <div className={css.modal}>{children}</div>
    </div>,
    modalRoot
  );
};

export default Modal;
Modal.propTypes = {
  children: PropTypes.node,
  closeModal: PropTypes.func.isRequired,
};
