import api from '../components/utils/utils';

export const STORE_MOVIES = 'STORE_MOVIES';
export const SET_PAGE = 'SET_PAGE';

export function fetchMovies(page) {
  return async dispatch => {
    const movies = await api.fetchPage(page);
    dispatch(storeMovies(movies));
  };
}

export function storeMovies(payload) {
  return {
    type: STORE_MOVIES,
    payload
  };
}

export function setPage(newPage) {
  return { type: SET_PAGE, payload: newPage };
}
