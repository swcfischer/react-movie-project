/* eslint react/no-did-mount-set-state: 0 */
import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Movie from './Movie';
import api from './utils/utils';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class MoviesList extends Component {
  state = {
    movies: [],
    page: this.props.match.params.page ? this.props.match.params.page : 1,
  };
  async componentDidMount() {
    try {
      const search = `https://api.themoviedb.org/3/discover/movie?api_key=49ab04c3e99d5e8468550f88238d2d2f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${this.props.match.params.page}`;
      const res = await fetch(search);
      const movies = await res.json();
      this.setState({
        movies: movies.results,
      });
    } catch (err) {
      console.log(err); // eslint-disable-line
    }
  }

  handlePrevPage = (e) => {
    api.fetchPage(Number(this.state.page) - 1)
      .then((results) => {
        this.setState({
          page: Number(this.state.page) - 1,
          movies: results,
        });
      });
  };

  returnLinks = () => {
    const linkArray = [];
    const currentPage = Number(this.state.page);
    let num;
    let end;
    if (currentPage !== 1 && currentPage > 10) {
      const tens = Math.floor(currentPage / 10) * 10;
      num = tens;
      end = tens + 10;
    } else {
      num = 1;
      end = 11;
    }
    { for (; num < end; num++) {
      linkArray.push(<li key={num}><Link id={num} onClick={this.handlePageClick} className={num === Number(this.state.page) ? 'active' : null} to={`/discover/page/${num}`}>{num}</Link></li>);
    } }

    return linkArray;
  };


  handleNextPage = (e) => {
    api.fetchPage(this.state.page + 1)
      .then((results) => {
        this.setState({
          page: Number(this.state.page) + 1,
          movies: results,
        });
      });
  };


  handlePageClick = (e) => {
    const page = e.target.id;
    api.fetchPage(e.target.id)
      .then((results) => {
        this.setState({
          page: Number(page),
          movies: results,
        });
      });
  };


  render() {
    return (
      <LinkAdjustment>
        {this.state.page > 1 ? (
          <Link className="arrow" onClick={this.handlePrevPage} to={`/discover/page/${this.state.page - 1}`}>
              Previous
          </Link>
          ) : (
            <span>Previous</span>
          )
        }
        <PagesContainer>
          {this.returnLinks()}
        </PagesContainer>
        <Link className="arrow" onClick={this.handleNextPage} to={`/discover/page/${Number(this.state.page) + 1}`}>
          Next
        </Link>
        <MovieGrid>
          <ReactCSSTransitionGroup
            transitionName="example"
            transitionAppear
            transitionEnterTimeout={750}
            transitionLeave={false}
            transitionAppearTimeout={0}
          >
            {this.state.movies.map(movie => <Movie key={movie.id} page={this.state.page} movie={movie} />)}
          </ReactCSSTransitionGroup>
        </MovieGrid>
      </LinkAdjustment>
    );
  }
}

export default MoviesList;

const PagesContainer = styled.ul`
  display: inline-block;
  padding: 0;
  margin: 0;
  li {
    width: 30px;
    display: inline-block;
  }

  li:hover {
    position: relative;
    top: 1px;
  }

  li > a {
    color: #999;
  }

  a {
    font-size: 20px;
  } 
`;

const LinkAdjustment = styled.div`
    height: 1000px;
    a.arrow {
      display: inline-block;
      color: #000;
      margin: 3px;
    }
    span {
      cursor: default;
      color: #888;
      margin: 3px;
    }
`;

const MovieGrid = styled.div`
  span {
    display: grid;
    padding: 1rem;
    grid-template-columns: repeat(6, 1fr);
    grid-row-gap: 1rem;  
  }
`;
