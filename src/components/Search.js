import React, { Component, createRef } from 'react';
import Movie from './Movie';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { searchText, storeResults } from '../reducer/searchActions';
import { MovieGrid } from './MoviesList';

class Search extends Component {
  constructor(props) {
    super(props);

    this.input = createRef();
  }

  componentDidMount() {
    this.input.current.focus();
  }

  handleChange = e => {
    const search = e.target.value;
    this.props.searchText(search);
    clearTimeout(this.id);
    this.id = setTimeout(() => {
      if (!search) {
        this.props.storeResults(null);
      } else {
        this.search(search);
      }
    }, 500);
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  search = searchQuery => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=49ab04c3e99d5e8468550f88238d2d2f&language=en-US&query=${searchQuery}&page=1&include_adult=false`
    )
      .then(res => res.json())
      .then(({ results }) => {
        this.props.storeResults(results);
      });
  };

  render() {
    return (
      <SearchContainer>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Type the movie title"
            type="text"
            onChange={this.handleChange}
            value={this.props.search}
            ref={this.input}
          />
        </form>

        {this.props.results && (
          <MovieGrid>
            {this.props.results.length < 1 ? (
              <p>No results found</p>
            ) : (
              this.props.results.map(movie => (
                <Movie
                  link={`/search/${movie.id}`}
                  key={movie.id}
                  movie={movie}
                />
              ))
            )}
          </MovieGrid>
        )}
      </SearchContainer>
    );
  }
}

const mapStateToProps = state => ({
  search: state.search.search,
  results: state.search.results,
  movies: state.explore.movies
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      searchText,
      storeResults
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Search);

const SearchContainer = styled.div`
  input {
    margin-top: 100px;
    border-radius: 2px;
    width: 200px;
    height: 25px;
    font-size: 20px;
    border: none;
    border-bottom: 5px double #444;
    text-indent: 5px;
    outline: black;
    margin-bottom: 45px;
  }

  form {
    display: flex;
    justify-content: center;
    padding-bottom: 20px;
  }
`;
