// searchReducer.js
import { SET_SEARCH_TEXT, CLEAR_SEARCH_TEXT } from './actionTypes';
import { searchText } from './initialState';

const SearchReducer = (state: String = searchText, action: any) => {
  switch (action.type) {
    case SET_SEARCH_TEXT:
      return { ...state, searchText: action.payload };
    case CLEAR_SEARCH_TEXT:
      return { ...state, searchText: '' };
    default:
      return state;
  }
};

export default SearchReducer;
