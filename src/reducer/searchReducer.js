import { SEARCH_TEXT, STORE_RESULTS } from './searchActions';

const initialState = {
  search: '',
  results: null
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case SEARCH_TEXT:
      return {
        ...state,
        search: payload
      };

    case STORE_RESULTS:
      return {
        ...state,
        results: payload
      };
    default:
      return state;
  }
}
