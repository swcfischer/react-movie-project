import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import styled from 'styled-components'; // eslint-disable-line


const Home = () => (
  <HomeContainer>
    <h1>Overview of Application</h1>

    <p>This application makes use of the api provided by The Movie Database.</p>
    <p>If you click the "Explore" link above, you can view an array of popular movies. You can click "next" or click the exact page your would like to see.
    If you click a movie, you will be taken to a component that showcases the movie.
    </p>
    <h2>Search</h2>
    <p>The "Search" link will take you to a search page, which will automatically run a search a half second after you last keystroke.
    I did this with setTimeout(). If no results turn up, it will say "No results found."
    </p>
    <h2>React Libaries</h2>
    <p>
      I made use of a React library called Overdrive. It provides the animation that makes each movie image travel to its future spot when you click to view its details.
      I used the 'styled-components' for my styling, and created my own Backbutton component, which passes this.context.router.history.goBack() to an onClick event to return to the previous page.
    </p>
    <p>If you would like to contact me, please visit my portfolio website: <Link style={{ color: '#000', fontWeight: 'bold', textDecoration: 'underline' }} to="http://stevefischer.me/" target="_blank">Here</Link></p>
  </HomeContainer>
);


export default Home;

const HomeContainer = styled.div`
    h1, h2 {
      color: #444;
      font-weight: 100;
    }
    width: 500px;
    margin: 0 auto;
    text-align: left;
    line-height: 25px;
    p {
      font-weight: 100;
    }
`;
