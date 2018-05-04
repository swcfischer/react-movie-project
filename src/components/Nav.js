import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';


const Nav = () => (
      <NavContainer>
        <li>
          <NavLink exact={true} activeClassName='active-nav' to='/' >
            About
          </NavLink>
        </li>
         <li>
          <NavLink activeClassName='active-nav' to='/discover/page/' >
            Explore Movies
          </NavLink>
        </li>
         <li>
          <NavLink activeClassName='active-nav' to='/search' >
            Search
          </NavLink>
        </li>
      </NavContainer>
  );


export default Nav;


const NavContainer = styled.ul`
  li {
    display: inline-block;
    padding: 0 10px;
  }

  .active {
    color: #d0021b;
  }
`;
