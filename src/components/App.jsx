import React from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { getPhotos } from './Api/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import s from './App.module.css';
export class App extends React.Component {
  state = { imagesData: [], page: 1, userInpunt: '' };

  buttonLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  async componentDidMount() {
    try {
      const images = await getPhotos({ per_page: 12, page: 1 });
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
      <div className={s.App}>
        <Searchbar />
        <ImageGallery imagesData={this.state.imagesData} />
        <Button buttonLoadMore={this.buttonLoadMore} />
      </div>
    );
  }
}
