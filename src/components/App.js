import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import 'reset-css';
import styled from 'styled-components'; // eslint-disable-line
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import Nav from './Nav';
import Discover from './Discover';
import Home from './Home';
import Search from './Search';
import rootReducer from '../reducer/rootReducer';
import MovieDetail from './MovieDetail';

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

const App = () => (
  <Provider store={store}>
    <Router>
      <AppContainer>
        <Nav />
        <Switch>
          <Route exact path="/about" component={Home} />
          <Route path="/discover" component={Discover} />
          <Route path="/search/:id" component={MovieDetail} />
          <Route path="/search" component={Search} />
          <Redirect to="/discover/page/1" />
        </Switch>
      </AppContainer>
    </Router>
  </Provider>
);

export default App;

const AppContainer = styled.div`
  a {
    text-decoration: none;
    color: #fff;
  }
`;
