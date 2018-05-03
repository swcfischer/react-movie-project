/* eslint react/no-did-mount-set-state: 0 */
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import '../App.css';
import styled from 'styled-components'; // eslint-disable-line
import Nav from './Nav';
import Discover from './Discover';
import Home from './Home';
import Search from './Search';


const App = () => (
  <Router>
    <AppContainer>
      <header>
        <Nav />
        <small>
          Created by Steve Fischer
        </small>
      </header>
      <Switch>
        <Route exact={true} path='/' component={Home} />
        <Route path="/discover" component={Discover} />
        <Route path="/search" component={Search} />
      </Switch>
    </AppContainer>
  </Router>
);

export default App;

const AppContainer = styled.div`
  text-align: center;
  header {
    background-color: #111;
    height: 60px;
    padding: 20px;
    color: white;
  }
  small {
    float: right;
  }
  h1 {
    font-weight: normal;
    display: inline-block
  }
  a {
    text-decoration: none;
    color: #fff;
  }
`;
