import { STORE_MOVIES, SET_PAGE } from './exploreActions';

const initialState = {
  movies: [],
  page: 1
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case STORE_MOVIES:
      return {
        ...state,
        movies: payload
      };
    case SET_PAGE:
      return {
        ...state,
        page: payload
      };
    default:
      return state;
  }
}
