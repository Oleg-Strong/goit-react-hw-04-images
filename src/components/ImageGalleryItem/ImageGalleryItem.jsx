import css from './ImageGalleryItem.module.css';
import React, { useState } from 'react';
import Modal from 'components/Modal';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ image: { webformatURL, largeImageURL, tags } }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(prevIsModalOpen => !prevIsModalOpen);
  };

  return (
    <li className={css.imageGalleryItem}>
      <img
        onClick={toggleModal}
        className={css.imageGalleryItemImage}
        src={webformatURL}
        alt={tags}
      />
      {isModalOpen && (
        <Modal closeModal={toggleModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
