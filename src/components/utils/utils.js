const api = {
  async fetchPage(page) {
    const results = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=49ab04c3e99d5e8468550f88238d2d2f&language=en-US&certification.lte=G&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}`
    );
    const movies = await results.json();

    return movies.results;
  },

  async fetchMovieDetail(movieId) {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=49ab04c3e99d5e8468550f88238d2d2f&language=en-US`
    );
    const movie = await res.json();
    return movie;
  }
};

export default api;
