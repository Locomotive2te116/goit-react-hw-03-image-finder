import React from 'react';

export const ImageGalleryItem = ({ id, webformatURL, type, largeImageURL }) => {
  return (
    <>
      <li className="gallery-item">
        <img src={webformatURL} alt={type} id={id} />
      </li>
      <li></li>
    </>
  );
};
