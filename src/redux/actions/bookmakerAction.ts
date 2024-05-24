import * as actionTypes from "../reducers/actionTypes";

export const changeBookmaker = (data: any) => {
  return { type: actionTypes.CHANGE_BOOKMAKER, payload: data };
};
