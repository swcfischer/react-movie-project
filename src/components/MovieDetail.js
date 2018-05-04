/* eslint react/no-did-mount-set-state: 0 import/first: 0 */
import React, { PureComponent, Component } from 'react';
import { Link } from 'react-router-dom';
import { Poster } from './Movie';
import styled from 'styled-components';
import Overdrive from 'react-overdrive';
import BackButton from './BackButton';

const POSTER_PATH = 'http://image.tmdb.org/t/p/w154';
const BACKDROP_PATH = 'http://image.tmdb.org/t/p/w1280';

class MovieDetail extends PureComponent {
  state = {
    movie: {},
  };
  async componentDidMount() {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=49ab04c3e99d5e8468550f88238d2d2f&language=en-US`);
      const movie = await res.json();
      this.setState({
        movie,
      });
    } catch (err) {
      console.log(err); // eslint-disable-line
    }
  }

  render() {
    const { movie } = this.state;
    const numberWithCommas = (x) => {
      const parts = x.toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return parts.join('.');
    };
    return (
      <MovieWrapper backdrop={`${BACKDROP_PATH}${movie.backdrop_path}`}>
        <MovieInfo>
          <Overdrive id={String(movie.id)} >
            <Poster src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
          </Overdrive>
          <div>
            <h1>
              {movie.title}
            </h1>
            <GoBackContainer>
              <BackButton />
            </GoBackContainer>
            <h3>
              <strong>
              Description:
              </strong> {movie.overview}
            </h3>
            <p>
              <strong>
                Release Date:
              </strong> {movie.release_date} | <strong>
                Runtime:
              </strong> {movie.runtime} Min.
            </p>
            { movie.udge}
            <p>
              <strong className="finance">
              Budget:
              </strong>
              <span className="amount amount-1">
                <span className="money">
                $
                </span>
                {movie.budget && numberWithCommas(movie.budget)}
              </span>
            </p>
            <p>
              <strong className="finance">
                  Revenue:
              </strong> <span className="amount">
                <span className="money">
                  $
                </span>
                {(movie.revenue && Number(movie.revenue) > 10) && numberWithCommas(movie.revenue)}
                        </span>
            </p>
            <LinkContainer>
              {movie.homepage &&
                <Link to={`${movie.homepage}`} target="_blank">
                  Visit Movie Homepage
                </Link>
              }
              {movie.imdb_id &&
                <Link
                  className="right"
                  to={`https://www.imdb.com/title/${movie.imdb_id}`}
                  target="_blank"
                >

                  Visit IMDB page

                </Link>
              }
            </LinkContainer>
          </div>
        </MovieInfo>
      </MovieWrapper>
    );
  }
}

export default MovieDetail;

const MovieWrapper = styled.div`
  position: relative;
  padding-top: 50vh;
  background: url(${props => props.backdrop}) no-repeat;
  background-size: cover;
  span.money {
    color: green;
  }
  strong.finance {
    width: 75px;
    display: inline-block;
  }
  span.amount-1 {
    position: relative;
    right: -5px;
  }
  span.amount {
    display:inline-block;
    width: 150px;
    text-align:right;
  }
`;

const MovieInfo = styled.div`
  background: white;
  text-align: left;
  padding: 2rem 10%;
  display: flex;
  > div {
    margin-left: 20px;
  }
  h3 {
    font-weight: normal;
  }
  .return_home {
    color: blue;
  }
  img {
    position: relative;
    top: -5rem;
  }
`;

const GoBackContainer = styled.span`
  float: right;
  button {
    padding: 5px 10px;
    font-size: 16px;
    border-radius: 10px;
  }
`;

const LinkContainer = styled.div`
  color: #000;
  a {
    color: blue !important;
  }

  a.right {
    float: right;
  }
`;
