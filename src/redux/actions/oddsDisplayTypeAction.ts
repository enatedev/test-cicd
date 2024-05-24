import * as actionTypes from "../reducers/actionTypes";

export const changeOddsDisplayType = (data: any) => {
  return { type: actionTypes.CHANGE_ODDS_DISPLAY_TYPE, payload: data };
};
