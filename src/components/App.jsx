import axios from 'axios';
import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    images: null,
    selectedImagesId: null,

    isModalOpen: false,
    modalData: null,

    isLoading: false,
    error: null,

    page: 1,
    searchValue: '',
  };

  fetchImages = async searchValue => {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '39466689-b0058dc694ac3f446d63717a4';

    try {
      this.setState({ isLoading: true });
      const { data } = await axios.get(
        `${BASE_URL}?key=${API_KEY}&q=${searchValue}&page=${this.state.page}&image_type=photo&orientation=horizontal&&per_page=12`
      );
      this.setState({ images: data });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  componentDidUpdate = () => {};

  componentDidMount = () => {};

  handleSubmit = searchValue => {
    if (searchValue !== this.state.searchValue) {
      this.setState({ searchValue, page: 1 });
      this.fetchImages(searchValue);
    }
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        <div>
          {this.state.error && <p>{this.state.error}</p>}
          {this.state.isLoading && <p>Loading...</p>}
          {this.state.images &&
            this.state.images.hits.map(image => (
              <div key={image.id}>
                <img src={image.webformatURL} alt={image.tags} />
                <p>{image.tags}</p>
              </div>
            ))}
        </div>
      </>
    );
  }
}
