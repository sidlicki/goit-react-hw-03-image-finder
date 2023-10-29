import { Component } from 'react';

export class Searchbar extends Component {
  state = {
    searchValue: '',
  };

  handleChange = evt => {
    this.setState({ searchValue: evt.target.value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const val = this.state.searchValue.trim();
    this.props.onSubmit(val);
  };

  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchValue}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}
