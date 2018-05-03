import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import '../App.css';
import styled from 'styled-components'; // eslint-disable-line
import MoviesList from './MoviesList';
import MovieDetail from './MovieDetail';

const Discover = () => {
  return (
    <Switch>
      <Route exact={true} path="/discover/page/:page" component={MoviesList} />
      <Route path="/discover/:page/:id" component={MovieDetail} />
    </Switch>
  );
}


export default Discover;