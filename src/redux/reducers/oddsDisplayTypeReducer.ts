import { CHANGE_ODDS_DISPLAY_TYPE } from "./actionTypes";
import { oddsDisplayType } from "./initialState";

const OddsDisplayTypeReducer = (state: String = oddsDisplayType, action: any) => {
  switch (action.type) {
    case CHANGE_ODDS_DISPLAY_TYPE:      
      return action.payload;
    default:
      return state;
  }
};

export default OddsDisplayTypeReducer;
