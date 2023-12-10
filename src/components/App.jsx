import React from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { getPhotos } from './Api/api';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends React.Component {
  state = { imagesData: [] };

  async componentDidMount() {
    try {
      const images = await getPhotos({ per_page: 12 });
      console.log(images);
      this.setState({ imagesData: [...images] });
    } catch (error) {
      console.error();
    }
  }

  render() {
    return (
      <>
        <Searchbar />
        <ImageGallery imagesData={this.state.imagesData} />
        {<Button />}
      </>
    );
  }
}
