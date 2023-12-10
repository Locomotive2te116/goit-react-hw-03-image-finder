import React from 'react';
import s from './ImageGalleryItem.module.css';
export const ImageGalleryItem = ({ id, webformatURL, type, largeImageURL }) => {
  return (
    <>
      <li className={s.ImageGalleryItem}>
        <img
          className={s.ImageGalleryItemImage}
          src={webformatURL}
          alt={type}
          id={id}
        />
      </li>
    </>
  );
};
