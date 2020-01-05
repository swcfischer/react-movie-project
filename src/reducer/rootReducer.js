import { combineReducers } from 'redux';

import search from './searchReducer';
import explore from './exploreReducer';


const rootReducer = combineReducers({
  search,
  explore
});

export default rootReducer;
