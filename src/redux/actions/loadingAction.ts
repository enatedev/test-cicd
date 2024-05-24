import * as actionTypes from "../reducers/actionTypes";

export const setLoading = (data: any) => {
  return { type: actionTypes.SET_LOADING, payload: data };
};
