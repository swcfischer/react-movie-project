# Box Office

To run this application, simply type npm install in your terminal, then npm start.

## Overview of Application

This application makes use of the api provided by The Movie Database.

If you click the "Explore" link above, you can view an array of popular movies. You can click "next" or click the exact page your would like to see. If you click a movie, you will be taken to a component that showcases the movie.

### Search
The "Search" link will take you to a search page, which will automatically run a search a half second after you last keystroke. I did this with setTimeout(). If no results turn up, it will say "No results found."

### React Libaries
I made use of a React library called Overdrive. It provides the animation that makes each movie image travel to its future spot when you click to view its details. I used the 'styled-components' for my styling, and created my own Backbutton component, which passes this.context.router.history.goBack() to an onClick event to return to the previous page.

If you would like to contact me, please visit my portfolio website: [Here](http://stevefischer.me/)