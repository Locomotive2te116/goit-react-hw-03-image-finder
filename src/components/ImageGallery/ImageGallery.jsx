import React from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ imagesData }) => {
  return (
    <>
      <ul className="gallery">
        {imagesData.map(item => {
          return <ImageGalleryItem key={item.id} {...item} />;
        })}
      </ul>
    </>
  );
};
