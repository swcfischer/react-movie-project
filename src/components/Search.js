import React, { Component } from 'react';
import Movie from './Movie';
import styled from 'styled-components';




class Search extends Component {
  state = {
    search: '',
    results: null
  }


  handleChange = (e) => {
    clearTimeout(this.id);
    const search = e.target.value;
    this.setState({
      search: e.target.value
    });


      this.id = setTimeout(function() {
        this.search(search);
      }.bind(this), 500);
  };

  search = (searchQuery) => {
     fetch(`https://api.themoviedb.org/3/search/movie?api_key=49ab04c3e99d5e8468550f88238d2d2f&language=en-US&query=${searchQuery}&page=1&include_adult=false`)
    .then(res =>  res.json())
    .then((result) => {
      this.setState({
        results: result.results
      })
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const search = this.state.search;

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=49ab04c3e99d5e8468550f88238d2d2f&language=en-US&query=${search}&page=1&include_adult=false`)
    .then(res =>  res.json())
    .then((result) => {
      this.setState({
        results: result.results
      })
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
          value={this.state.search}
          />
          <button type='submit'>
            Search
          </button>
        </form>

        { this.state.results &&

          <MovieGrid>
            {this.state.results.length < 1 ? (
              <p>No results found</p>

              ) : (
                this.state.results.map((movie) => <Movie key={movie.id} page={1} movie={movie} />)
              )
            }
          </MovieGrid>
        }
      </SearchContainer>
    );
  }
};


export default Search;

const SearchContainer = styled.div`
  input {
    margin-top: 100px;
    border-radius: 2px;
    width: 200px;
    height: 25px;
    font-size: 20px;
    border: none;
    border-bottom: 1px solid #000;
    text-indent: 5px;
    outline: black;
  }

  button {
    display: block;
    margin: 30px auto
    outline: none;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    font: 14px/100% Arial, Helvetica, sans-serif;
    padding: .5em 2em .55em;
    text-shadow: 0 1px 1px rgba(0,0,0,.3);
    -webkit-border-radius: .5em; 
    -moz-border-radius: .5em;
    border-radius: .5em;
    -webkit-box-shadow: 0 1px 2px rgba(0,0,0,.2);
    -moz-box-shadow: 0 1px 2px rgba(0,0,0,.2);
    box-shadow: 0 1px 2px rgba(0,0,0,.2);
  }
  button:hover {
    position: relative;
    top: 1px;
  }

`;

const MovieGrid = styled.div`
  display: grid;
  padding: 1rem;
  grid-template-columns: repeat(6, 1fr);
  grid-row-gap: 1rem;
`;