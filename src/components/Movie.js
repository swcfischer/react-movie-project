import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Overdrive from 'react-overdrive';
import Image from './Image';

const POSTER_PATH = 'http://image.tmdb.org/t/p/w154';
const Movie = ({ movie, link }) => {
  return (
    <MovieLink to={link}>
      <Overdrive id={String(movie.id)}>
        <Image src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
      </Overdrive>
      <MovieTitle>{movie.title}</MovieTitle>
    </MovieLink>
  );
};

export default Movie;

Movie.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired
};

const MovieLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MovieTitle = styled.div`
  padding-top: 10px;
  color: #000;
  width: 154px;
  text-align: center;
  font-size: 18px;
  font-style: italic;
`;
