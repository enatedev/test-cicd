// filterReducer.js
import { ADD_FILTER_VALUE, REMOVE_FILTER_VALUE, SET_SEARCH_TEXT } from './actionTypes';
import { IFilter } from '../interfaces';
import { filter } from './initialState';
import { LEAGUES } from '../../utils/contants';

const FilterReducer = (state: IFilter = filter, action: any) => {
  switch (action.type) {
    case ADD_FILTER_VALUE:
      return { 
        ...state, 
        selectedLeagues: action.payload
      };
    case REMOVE_FILTER_VALUE:
      return { 
        ...state,
        [action.payload.filterType]: state[action.payload.filterType].filter((league: string) => league !== action.payload.filterValue) 
      };
    case SET_SEARCH_TEXT:
      return {
        ...state,
        textSearch: action.payload
      }
    default:
      return state;
  }
};

export default FilterReducer;
