import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Overdrive from 'react-overdrive';
import BackButton from './BackButton';
import api from './utils/utils';

const POSTER_PATH = 'http://image.tmdb.org/t/p/w154';
const BACKDROP_PATH = 'http://image.tmdb.org/t/p/w1280';

class MovieDetail extends PureComponent {
  state = {
    movie: {}
  };
  async componentDidMount() {
    window.scrollTo(0, 0);
    try {
      const movie = await api.fetchMovieDetail(this.props.match.params.id);
      this.setState({
        movie
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  render() {
    const { movie } = this.state;
    return (
      <MovieWrapper backdrop={`${BACKDROP_PATH}${movie.backdrop_path}`}>
        <MovieInfo>
          <Overdrive className="overdrive-item" id={String(movie.id)}>
            <Poster
              src={`${POSTER_PATH}${movie.poster_path}`}
              alt={movie.title}
            />
          </Overdrive>
          <div className="inner-container">
            <div className="upper-row">
              <h1 className="movie-title">{movie.title}</h1>
              <BackButton />
            </div>
            <p className="movie-description">
              <strong>Description:</strong> {movie.overview}
            </p>
            <p className="movie-info">
              <strong>Release Date:</strong> {movie.release_date} |{' '}
              <strong>Runtime:</strong> {movie.runtime} Min.
            </p>
            {movie.udge}
            {Boolean(movie.budget) && (
              <p className="movie-finance">
                <strong>Budget:</strong>
                <span className="amount top">
                  <span className="money">$</span>
                  {movie.budget && numberWithCommas(movie.budget)}
                </span>
              </p>
            )}

            {Boolean(movie.revenue) && (
              <p className="movie-finance">
                <strong>Revenue:</strong>{' '}
                <span className="amount">
                  <span className="money">$</span>
                  {movie.revenue &&
                    Number(movie.revenue) > 10 &&
                    numberWithCommas(movie.revenue)}
                </span>
              </p>
            )}

            <LinkContainer>
              {movie.homepage && (
                <a href={`${movie.homepage}`} target="_blank">
                  Visit Movie Homepage
                </a>
              )}
              {movie.imdb_id && (
                <a
                  className="right"
                  href={`https://www.imdb.com/title/${movie.imdb_id}`}
                  target="_blank"
                >
                  Visit IMDB page
                </a>
              )}
            </LinkContainer>
          </div>
        </MovieInfo>
      </MovieWrapper>
    );
  }
}

export default MovieDetail;

const numberWithCommas = x => {
  const parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};

const MovieWrapper = styled.div`
  position: relative;
  padding-top: 70vh;
  background: url(${props => props.backdrop}) no-repeat;
  background-size: 100%;
  background-position-y: -50px;
  background-color: #000;

  @media (max-width: 960px) {
    background-position-y: 0;
    padding-top: 40vh;
  }

  @media (max-width: 672px) {
    padding-top: 28vh;
  }
`;

const MovieInfo = styled.div`
  background: white;
  text-align: left;
  border-top: 1px solid #222;
  padding: 20px 2vw 20px 12vw;

  font-size: 18px;

  .overdrive-item {
    position: absolute;
  }

  strong {
    font-weight: bold;
  }

  .inner-container {
    margin-left: 154px;
    padding-left: 20px;
    .upper-row {
      display: flex;
      justify-content: space-between;
      max-width: 800px;
      .movie-title {
        font-size: 42px;
        font-style: italic;
        padding-bottom: 20px;
      }
    }

    .movie-description {
      font-size: 18px;
      line-height: 21px;
      padding-bottom: 10px;
      box-sizing: border-box;
      max-width: 650px;
      padding-left: 15px;
    }

    .movie-info {
      padding: 0 0 15px 15px;
    }

    .movie-finance {
      padding: 0 0 2px 15px;
      strong {
        display: inline-block;
        width: 80px;
      }
      .amount {
        display: inline-block;
        width: 130px;
        text-align: right;

        &.top {
          width: 134px;
        }
        .money {
          color: #728062;
        }
      }
    }
    @media (max-width: 672px) {
      margin: 0;
    }
  }

  @media (max-width: 672px) {
    padding: 20px;
  }
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  color: #000;
  padding: 20px 0 10px 15px;
  width: 400px;
  a {
    color: blue !important;
  }

  @media (max-width: 672px) {
    width: 100%;
  }
`;

const Poster = styled.img`
  position: relative;
  top: -100px;
  border-radius: 3px;
  box-shadow: 0 0 5px black;
  @media (max-width: 672px) {
    display: none;
  }
`;
