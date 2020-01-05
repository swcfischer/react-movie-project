import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MoviesList from './MoviesList';
import MovieDetail from './MovieDetail';

const Discover = () => (
  <Switch>
    <Route exact path="/discover/page/" component={MoviesList} />
    <Route path="/discover/page/:page" component={MoviesList} />
    <Route path="/discover/:page/:id" component={MovieDetail} />
  </Switch>
);

export default Discover;
