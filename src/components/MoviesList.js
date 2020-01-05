/* eslint react/no-did-mount-set-state: 0 */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Movie from './Movie';
import Pagination from './Pagination';

import { fetchMovies, setPage } from '../reducer/exploreActions';

class MoviesList extends React.Component {
  componentDidMount() {
    if (this.props.movies.length === 0) {
      this.props.fetchMovies(this.props.match.params.page);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.page !== prevProps.page) {
      this.props.fetchMovies(this.props.page);
    }

    if (Number(this.props.match.params.page) !== this.props.page) {
      this.props.setPage(this.props.match.params.page);
    }
  }
  render() {
    return (
      <React.Fragment>
        <Pagination page={this.props.match.params.page} />
        <MovieGrid key="movie-grid">
          {this.props.movies.map(movie => (
            <Movie
              key={movie.id}
              link={`/discover/${this.props.page}/${movie.id}`}
              movie={movie}
            />
          ))}
        </MovieGrid>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  movies: state.explore.movies,
  page: state.explore.page
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchMovies,
      setPage
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);

export const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(4, 231px);
  grid-row-gap: 105px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 805px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 350px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
