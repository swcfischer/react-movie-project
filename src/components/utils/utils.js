const api = {
  fetchPage(page) {
    return fetch(`https://api.themoviedb.org/3/discover/movie?api_key=49ab04c3e99d5e8468550f88238d2d2f&language=en-US&certification.lte=G&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}`)
      .then(res => res.json())
      .then(res => res.results);
  },
};

export default api;
