import React from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { getPhotos } from '../Api/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import s from './App.module.css';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
export class App extends React.Component {
  state = { imagesData: [], page: 1, userInpunt: '', loading: false };

  buttonLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  async componentDidMount() {
    try {
      this.setState({ loading: true });
      const images = await getPhotos(this.state.userInpunt, this.state.page);
      this.setState({ imagesData: [...images] });
    } catch (error) {
      console.error();
    } finally {
      this.setState({ loading: false });
    }
  }

  async componentDidUpdate(_, prevState) {
    if (
      prevState.page !== this.state.page ||
      this.state.userInput !== prevState.userInput
    ) {
      try {
        this.setState({ loading: true });
        const images = await getPhotos(this.state.userInput, this.state.page);
        this.setState(prevState => ({
          imagesData: [...prevState.imagesData, ...images],
        }));
        // this.setState({ imagesData: [...prevState.imagesData, ...images] });
      } catch (error) {
        console.error();
      } finally {
        this.setState({ loading: false });
      }
    }
  }
  onSubmit = e => {
    e.preventDefault();
    const userInput = e.currentTarget.elements.userInput.value;
    this.setState({ userInput: userInput, page: 1, imagesData: [] });
  };
  render() {
    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery imagesData={this.state.imagesData} />
        {this.state.loading === true ? <Loader /> : null}
        <Button buttonLoadMore={this.buttonLoadMore} />
        <Modal />
      </div>
    );
  }
}
