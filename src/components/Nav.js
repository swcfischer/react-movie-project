import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { MdMovieFilter } from 'react-icons/md';

const Nav = props => (
  <Header>
    <Link to="/">
      <div className="nav-icon-container">
        <div className="nav-icon-background"></div>
        <MdMovieFilter className="nav-icon" />
      </div>
    </Link>

    <NavContainer>
      <li>
        <NavLink exact activeClassName="active-nav" to="/about">
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          activeClassName="active-nav"
          to={`/discover/page/${props.page}`}
          isActive={isMoviePage}
        >
          Explore Movies
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active-nav" to="/search">
          Search
        </NavLink>
      </li>
    </NavContainer>
    <a href="https://stevefischer.me">
      <small className="attribution">Created by Steve Fischer</small>
    </a>
  </Header>
);

const isMoviePage = (match, location) => {
  return location.pathname.includes('discover');
};

const mapStateToProps = state => ({
  page: state.explore.page
});

export default withRouter(connect(mapStateToProps, null)(Nav));

const Header = styled.header`
  display: flex;
  justify-content: center;
  position: relative;
  height: 50px;
  padding: 20px 0px;
  margin: 0;
  background-color: #111;
  color: white;
  box-shadow: 0px 0 10px rgba(0, 0, 0, 0.8);
  z-index: 9999;
  border-bottom: 5px solid #222;
  .nav-icon-container {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 10px;
    top: 10px;
    .nav-icon {
      position: relative;
      left: -30px;
      top: 0px;
      font-size: 70px;
      color: gold;
      z-index: 999999;
    }
    .nav-icon-background {
      position: relative;
      top: 5px;
      left: 28px;
      width: 40px;
      height: 35px;
      z-index: 99999;
      background: goldenrod;
    }
  }
  .attribution {
    position: absolute;
    top: 10px;
    right: 15px;
    font-style: italic;
  }
  @media (max-width: 800px) {
    .attribution {
      display: none;
    }
  }

  @media (max-width: 500px) {
    .nav-icon-container {
      display: none;
    }
  }
`;

const NavContainer = styled.ul`
  display: flex;
  justify-content: center;
  height: 100%;
  padding: 0;
  margin: 0;

  li {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    height: 100%;
    border-right: 2px dashed #fff;
    text-transform: uppercase;
    font-weight: normal;
    font-size: 18px;
    letter-spacing: 2px;
    font-style: italic;
  }

  li:first-of-type {
    border-left: 2px dashed #fff;
  }

  a {
    transition: color 0.35s;
  }

  .active-nav {
    color: gold;
  }

  @media (max-width: 600px) {
    li {
      font-size: 12px;
    }
  }
`;
