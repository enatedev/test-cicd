import { SET_LOADING } from "./actionTypes";

const INITIAL_STATE = {
    loading: false
}
const LoadingReducer = (state: any = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default LoadingReducer;
