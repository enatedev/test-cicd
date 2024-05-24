import { CHANGE_BOOKMAKER } from "./actionTypes";

const BookmakerReducer = (state: number = 1, action: any) => {
  switch (action.type) {
    case CHANGE_BOOKMAKER:      
      return action.payload;
    default:
      return state;
  }
};

export default BookmakerReducer;
