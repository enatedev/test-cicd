import * as actionTypes from "../reducers/actionTypes";

export const setSearchText = (text: String) => ({
  type: actionTypes.SET_SEARCH_TEXT,
  payload: text,
});

export const clearSearchText = () => ({
  type: actionTypes.CLEAR_SEARCH_TEXT,
});

export const addFilterValue = (data: any) => ({
  type: actionTypes.ADD_FILTER_VALUE,
  payload: data,
});

export const removeFilterValue = (params: { filterValue: string, filterType: string }) => ({
  type: actionTypes.REMOVE_FILTER_VALUE,
  payload: { filterValue: params.filterValue, filterType: params.filterType },
});
