import React from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { getPhotos } from './Api/api';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends React.Component {
  state = { imagesData: [], page: 1, userInpunt: '' };

  buttonLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  async componentDidMount() {
    try {
      const images = await getPhotos({ per_page: 12, page: 1 });
      console.log(images);
      this.setState({ imagesData: [...images] });
    } catch (error) {
      console.error();
    }
  }

  async componentDidUpdate(_, prevState) {
    if (prevState.page !== this.state.page) {
      try {
        const images = await getPhotos(this.state.userInpunt, this.state.page);
        console.log(images);
        this.setState({ imagesData: [...prevState.imagesData, ...images] });
      } catch (error) {
        console.error();
      }
    }
  }

  render() {
    return (
      <>
        <Searchbar />
        <ImageGallery imagesData={this.state.imagesData} />
        <Button buttonLoadMore={this.buttonLoadMore} />
      </>
    );
  }
}
