// teamReducer.ts
import { ADD_FAVORITE_TEAM, REMOVE_FAVORITE_TEAM } from './actionTypes';
import { teams } from "./initialState";
import { RootState } from '../store';

const TeamReducer = (state: RootState = teams, action: any) => {
  switch (action.type) {
    case ADD_FAVORITE_TEAM:
      return {
        ...state,
        favoriteTeams: [...state.favoriteTeams, action.payload]
      }
    case REMOVE_FAVORITE_TEAM:
      return {
        ...state,
        favoriteTeams: state.favoriteTeams.filter((team: any) => team.id !== action.payload)
      }
    default:
      return state;
  }
};

export default TeamReducer;
